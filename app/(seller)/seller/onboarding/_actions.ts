'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ClerkUserMetadata, SellerOnboardingData, SellerOnboardingResponse } from './onboarding_type';
import { sellerOnboardingSchema } from './onboarding_validation';


export async function completeSellerOnboarding(
  formData: SellerOnboardingData
): Promise<SellerOnboardingResponse> {
  try {
    // 1. Authentication Check
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: 'Authentication required. Please sign in to continue.'
      };
    }

    // 2. Input Validation
    const validationResult = sellerOnboardingSchema.safeParse(formData);

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Please check your inputs and try again.',
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const validatedData = validationResult.data;

    // 3. Get Clerk client and user data
    const client = await clerkClient();
    let clerkUser;

    try {
      clerkUser = await client.users.getUser(userId);
    } catch (error) {
      console.error('[SELLER_ONBOARDING] Clerk user fetch error:', error);
      return {
        success: false,
        error: 'Failed to retrieve user information. Please try again.'
      };
    }

    // 4. Verify email exists
    const email = clerkUser.emailAddresses.find(
      (emailAddr) => emailAddr.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!email) {
      return {
        success: false,
        error: 'No email address found. Please contact support.'
      };
    }

    // 5. Check current role from Clerk metadata
    const currentMetadata = clerkUser.publicMetadata as ClerkUserMetadata;

    if (currentMetadata.onboardingComplete === true) {
      return {
        success: false,
        error: 'Onboarding already completed.'
      };
    }

    // 6. Parse full name
    const nameParts = validatedData.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // 7. Prepare metadata for Clerk
    const updatedMetadata: ClerkUserMetadata = {
      onboardingComplete: true,
      role: 'seller',
      bio: validatedData.bio,
      expertise: validatedData.expertise,
      teachingExperience: validatedData.teachingExperience,
    };

    // 8. Start atomic transaction-like operation
    try {
      // Update Clerk first (easier to rollback DB than Clerk)
      await client.users.updateUser(userId, {
        firstName,
        lastName,
        publicMetadata: updatedMetadata,
      });

      // 9. Check if user exists in database
      const existingUser = await db.query.users.findFirst({
        where: eq(users.clerkId, userId),
      });

      const now = new Date();

      if (existingUser) {
        // User exists - verify they're not already a different role
        if (existingUser.role === 'seller') {
          // Already a seller, just update data
          await db
            .update(users)
            .set({
              name: validatedData.fullName,
              imageUrl: clerkUser.imageUrl,
              updatedAt: now,
            })
            .where(eq(users.clerkId, userId));
        } else {
          // Role change from buyer to seller
          await db
            .update(users)
            .set({
              name: validatedData.fullName,
              imageUrl: clerkUser.imageUrl,
              role: 'seller',
              updatedAt: now,
            })
            .where(eq(users.clerkId, userId));
        }
      } else {
        // Create new user in database
        await db.insert(users).values({
          clerkId: userId,
          email,
          name: validatedData.fullName,
          imageUrl: clerkUser.imageUrl,
          role: 'seller',
          planType: 'free',
          xp: 0,
          level: 1,
          streakCount: 0,
          createdAt: now,
          updatedAt: now,
        });
      }

      // 10. Revalidate and redirect
      revalidatePath('/seller/dashboard');

    } catch (dbError) {
      console.error('[SELLER_ONBOARDING] Database error:', dbError);

      // Attempt to rollback Clerk update
      try {
        await client.users.updateUser(userId, {
          publicMetadata: {
            ...currentMetadata,
            onboardingComplete: false,
          },
        });
      } catch (rollbackError) {
        console.error('[SELLER_ONBOARDING] Rollback error:', rollbackError);
      }

      return {
        success: false,
        error: 'Failed to complete onboarding. Please try again or contact support.'
      };
    }

    return {
      success: true,
      message: 'Welcome aboard! Your seller profile is ready.'
    };

  } catch (error) {
    console.error('[SELLER_ONBOARDING] Unexpected error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    };
  }
}

// Separate redirect function to avoid issues with redirect in try-catch
export async function redirectToSellerDashboard(): Promise<void> {
  redirect('/seller/dashboard');
}
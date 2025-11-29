// app/seller/onboarding/_actions.ts
'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db'; // Adjust path to your database instance
import { users } from '@/lib/db/schema'; // Adjust path to your schema
import { eq } from 'drizzle-orm';

interface SellerOnboardingData {
  fullName: string;
  bio: string;
  expertise: string;
  teachingExperience: string;
}

export const completeSellerOnboarding = async (formData: SellerOnboardingData) => {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'No authenticated user' };
  }

  const client = await clerkClient();

  try {
    // Split full name
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Update Clerk user metadata
    await client.users.updateUser(userId, {
      firstName,
      lastName,
      publicMetadata: {
        onboardingComplete: true,
        role: 'seller',
        bio: formData.bio,
        expertise: formData.expertise,
        teachingExperience: formData.teachingExperience,
      },
    });

    // Get Clerk user email
    const clerkUser = await client.users.getUser(userId);
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      return { error: 'User email not found' };
    }

    // Check if user exists in database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    });

    if (existingUser) {
      // Update existing user in database
      await db
        .update(users)
        .set({
          name: formData.fullName,
          imageUrl: clerkUser.imageUrl,
          role: 'seller',
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, userId));
    } else {
      // Create new user in database
      await db.insert(users).values({
        clerkId: userId,
        email: email,
        name: formData.fullName,
        imageUrl: clerkUser.imageUrl,
        role: 'seller',
        planType: 'free',
        xp: 0,
        level: 1,
        streakCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return { message: 'Seller onboarding complete' };
  } catch (err) {
    console.error('Error completing seller onboarding:', err);
    return { error: 'There was an error completing onboarding. Please try again.' };
  }
};
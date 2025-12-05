import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { ClerkUserMetadata } from '@/app/(seller)/seller/onboarding/onboarding_type';

// Webhook event data types
interface UserCreatedEvent extends WebhookEvent {
  type: 'user.created';
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string;
    public_metadata: Record<string, unknown>;
    unsafe_metadata: Record<string, unknown>;
  };
}

interface UserUpdatedEvent extends WebhookEvent {
  type: 'user.updated';
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string;
    unsafe_metadata: Record<string, unknown>;
  };
}

interface UserDeletedEvent extends WebhookEvent {
  type: 'user.deleted';
  data: {
    id?: string;
    deleted: boolean;
  };
}

type ClerkWebhookEvent = UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent;

export async function POST(req: Request): Promise<NextResponse> {
  const requestId = crypto.randomUUID();
  console.log(`[WEBHOOK:${requestId}] 🔔 Received at:`, new Date().toISOString());

  // 1. Validate webhook secret exists
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error(`[WEBHOOK:${requestId}] ❌ CLERK_WEBHOOK_SECRET missing`);
    return NextResponse.json(
      { error: 'Webhook configuration error' },
      { status: 500 }
    );
  }

  // 2. Extract and validate Svix headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  console.log(`[WEBHOOK:${requestId}] 📋 Headers validation:`, {
    svix_id: !!svix_id,
    svix_timestamp: !!svix_timestamp,
    svix_signature: !!svix_signature,
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error(`[WEBHOOK:${requestId}] ❌ Missing Svix headers`);
    return NextResponse.json(
      { error: 'Missing required headers' },
      { status: 400 }
    );
  }

  // 3. Parse request body
  let payload: unknown;
  try {
    payload = await req.json();
    console.log(`[WEBHOOK:${requestId}] ✅ Payload parsed`);
  } catch (error) {
    console.error(`[WEBHOOK:${requestId}] ❌ Invalid JSON:`, error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const body = JSON.stringify(payload);

  // 4. Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: ClerkWebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkWebhookEvent;
    console.log(`[WEBHOOK:${requestId}] ✅ Signature verified`);
  } catch (error) {
    console.error(`[WEBHOOK:${requestId}] ❌ Verification failed:`, error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  const eventType = evt.type;
  console.log(`[WEBHOOK:${requestId}] 📨 Event type: ${eventType}`);

  // 5. Process webhook events
  try {
    switch (eventType) {
      case 'user.created': {
        await handleUserCreated(evt as UserCreatedEvent, requestId);
        break;
      }

      case 'user.updated': {
        await handleUserUpdated(evt as UserUpdatedEvent, requestId);
        break;
      }

      case 'user.deleted': {
        await handleUserDeleted(evt as UserDeletedEvent, requestId);
        break;
      }

      default: {
        console.log(`[WEBHOOK:${requestId}] ℹ️ Unhandled event: ${eventType}`);
        return NextResponse.json(
          { message: 'Event type not handled', eventType },
          { status: 200 }
        );
      }
    }

    console.log(`[WEBHOOK:${requestId}] 🎉 Success`);
    return NextResponse.json(
      { success: true, eventType },
      { status: 200 }
    );

  } catch (error) {
    console.error(`[WEBHOOK:${requestId}] ❌ Processing error:`, error);

    // Log detailed error information
    if (error instanceof Error) {
      console.error(`[WEBHOOK:${requestId}] Error details:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// ============================================================================
// Event Handlers
// ============================================================================

async function handleUserCreated(
  evt: UserCreatedEvent,
  requestId: string
): Promise<void> {
  const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;

  // Validate email exists
  const primaryEmail = email_addresses[0]?.email_address;
  if (!primaryEmail) {
    throw new Error('No email address found for user');
  }

  // Extract role from public_metadata (NOT unsafe_metadata)
  const metadata = unsafe_metadata as ClerkUserMetadata;
  const unsafeRole: 'buyer' | 'seller' = metadata.role || 'buyer';

  const backend = await clerkClient();
  await backend.users.updateUser(evt.data.id, {
    publicMetadata: {
      role: unsafeRole
    }
  });

  console.log(`[WEBHOOK:${requestId}] 👤 Creating user:`, {
    clerkId: id,
    email: primaryEmail,
    role: unsafeRole,
  });

  // Construct full name
  const fullName = [first_name, last_name]
    .filter(Boolean)
    .join(' ')
    .trim() || null;

  // Check if user already exists (idempotency)
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, id),
  });

  if (existingUser) {
    console.log(`[WEBHOOK:${requestId}] ℹ️ User already exists, skipping creation`);
    return;
  }

  // Insert new user
  const [newUser] = await db
    .insert(users)
    .values({
      clerkId: id,
      email: primaryEmail,
      name: fullName,
      imageUrl: image_url || null,
      role: unsafeRole,
      planType: 'free',
      xp: 0,
      level: 1,
      streakCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  console.log(`[WEBHOOK:${requestId}] ✅ User created:`, {
    id: newUser.id,
    clerkId: newUser.clerkId,
    role: newUser.role,
  });
}

async function handleUserUpdated(
  evt: UserUpdatedEvent,
  requestId: string
): Promise<void> {
  const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;

  console.log(`[WEBHOOK:${requestId}] 👤 Updating user: ${id}`);

  // Validate email exists
  const primaryEmail = email_addresses[0]?.email_address;
  if (!primaryEmail) {
    console.warn(`[WEBHOOK:${requestId}] ⚠️ No email found, skipping update`);
    return;
  }

  // Construct full name
  const fullName = [first_name, last_name]
    .filter(Boolean)
    .join(' ')
    .trim() || null;

  // Extract role from public_metadata
  const metadata = unsafe_metadata as ClerkUserMetadata;
  const role: 'buyer' | 'seller' | undefined = metadata.role;

  // Build update object dynamically
  const updateData: {
    email: string;
    name: string | null;
    imageUrl: string | null;
    role?: 'buyer' | 'seller';
    updatedAt: Date;
  } = {
    email: primaryEmail,
    name: fullName,
    imageUrl: image_url || null,
    updatedAt: new Date(),
  };

  // Only update role if it's explicitly set in metadata
  if (role) {
    updateData.role = role;
  }

  // Update user
  const [updatedUser] = await db
    .update(users)
    .set(updateData)
    .where(eq(users.clerkId, id))
    .returning();

  if (!updatedUser) {
    console.warn(`[WEBHOOK:${requestId}] ⚠️ User not found in database: ${id}`);
    return;
  }

  console.log(`[WEBHOOK:${requestId}] ✅ User updated:`, {
    id: updatedUser.id,
    clerkId: updatedUser.clerkId,
    role: updatedUser.role,
  });
}

async function handleUserDeleted(
  evt: UserDeletedEvent,
  requestId: string
): Promise<void> {
  const userId = evt.data.id;

  if (!userId) {
    console.warn(`[WEBHOOK:${requestId}] ⚠️ No user ID in delete event`);
    return;
  }

  console.log(`[WEBHOOK:${requestId}] 👤 Soft deleting user: ${userId}`);

  // Soft delete user
  const [deletedUser] = await db
    .update(users)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.clerkId, userId))
    .returning();

  if (!deletedUser) {
    console.warn(`[WEBHOOK:${requestId}] ⚠️ User not found for deletion: ${userId}`);
    return;
  }

  console.log(`[WEBHOOK:${requestId}] ✅ User soft deleted:`, {
    id: deletedUser.id,
    clerkId: deletedUser.clerkId,
  });
}
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('🔔 Webhook received at:', new Date().toISOString());

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('❌ CLERK_WEBHOOK_SECRET is missing in environment variables');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  console.log('✅ Webhook secret found');

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  console.log('📋 Svix Headers:', {
    svix_id: svix_id ? '✓' : '✗',
    svix_timestamp: svix_timestamp ? '✓' : '✗',
    svix_signature: svix_signature ? '✓' : '✗'
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Missing required svix headers');
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    );
  }

  // Get body
  let payload;
  try {
    payload = await req.json();
    console.log('✅ Payload parsed successfully');
  } catch (error) {
    console.error('❌ Failed to parse JSON payload:', error);
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  const body = JSON.stringify(payload);

  // Create svix instance and verify
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
    console.log('✅ Webhook signature verified');
  } catch (err) {
    console.error('❌ Webhook verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    );
  }

  const eventType = evt.type;
  console.log(`📨 Processing event: ${eventType}`);

  try {
    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;

      console.log('👤 User data:', {
        id,
        email: email_addresses[0]?.email_address,
        role: (unsafe_metadata as any)?.role
      });

      const role = (unsafe_metadata as { role?: 'buyer' | 'seller' })?.role || 'buyer';

      const [newUser] = await db.insert(users).values({
        clerkId: id,
        email: email_addresses[0]?.email_address || '',
        name: first_name && last_name ? `${first_name} ${last_name}` : first_name || last_name || null,
        imageUrl: image_url || null,
        role: role,
        planType: 'free',
      }).returning();

      console.log(`✅ User created in database:`, newUser);
      if (newUser.role === 'seller') {

        localStorage.setItem('seller_id', `${newUser.id}`)
      }
      localStorage.setItem('buyer_id', `${newUser.id}`)
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      console.log('👤 Updating user:', id);

      const [updatedUser] = await db
        .update(users)
        .set({
          email: email_addresses[0]?.email_address || '',
          name: first_name && last_name ? `${first_name} ${last_name}` : first_name || last_name || null,
          imageUrl: image_url || null,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id))
        .returning();

      console.log(`✅ User updated:`, updatedUser);
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      if (id) {
        console.log('👤 Soft deleting user:', id);

        const [deletedUser] = await db
          .update(users)
          .set({ deletedAt: new Date() })
          .where(eq(users.clerkId, id))
          .returning();

        console.log(`✅ User soft deleted:`, deletedUser);
      }
    }

    console.log('🎉 Webhook processed successfully');
    return NextResponse.json({ success: true, eventType }, { status: 200 });

  } catch (error) {
    console.error('❌ Database error:', error);

    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
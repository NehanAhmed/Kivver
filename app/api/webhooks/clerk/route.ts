
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env');
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error: Verification failed', { status: 400 });
  }

  const eventType = evt.type;

  // Handle user.created event
  if (eventType === 'user.created') {
    const { id, email_addresses, username, unsafe_metadata } = evt.data;

    try {
      // Extract role from unsafeMetadata (set during signup)
      const role = (unsafe_metadata as any)?.role || 'user';

      await db.insert(users).values({
        id: id,
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username || null,
        role: role === 'seller' ? 'seller' : 'user',
      });

      console.log(`✅ User created: ${id} with role: ${role}`);
      return new Response('User created', { status: 200 });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  // Handle user.updated event
  if (eventType === 'user.updated') {
    const { id, email_addresses, username, unsafe_metadata } = evt.data;

    try {
      const role = (unsafe_metadata as any)?.role;

      await db
        .update(users)
        .set({
          email: email_addresses[0].email_address,
          username: username || null,
          ...(role && { role: role === 'seller' ? 'seller' : 'user' }),
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, id));

      console.log(`✅ User updated: ${id}`);
      return new Response('User updated', { status: 200 });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  // Handle user.deleted event
  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    try {
      await db.delete(users).where(eq(users.clerkId, id!));

      console.log(`✅ User deleted: ${id}`);
      return new Response('User deleted', { status: 200 });
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error deleting user', { status: 500 });
    }
  }

  return new Response('Webhook processed', { status: 200 });
}
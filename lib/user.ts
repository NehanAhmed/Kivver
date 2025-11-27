import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

/**
 * Get the current user from the database with their role
 * This combines Clerk auth with your database user record
 */
export async function getCurrentUser() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return null;
  }

  // Fetch user from database
  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUser.id),
  });

  // If user doesn't exist in DB yet (webhook might not have fired)
  // Create them now with role from metadata
  if (!dbUser) {
    const role = (clerkUser.unsafeMetadata?.role as string) || 'user';
    
    const [newUser] = await db.insert(users).values({
      id: clerkUser.id,
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      username: clerkUser.username || null,
      role: role === 'seller' ? 'seller' : 'user',
    }).returning();

    return newUser;
  }

  return dbUser;
}

/**
 * Check if current user has a specific role
 */
export async function hasRole(role: 'user' | 'seller' | 'admin') {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * Require authentication and specific role
 * Throws error if user is not authenticated or doesn't have role
 */
export async function requireRole(role: 'user' | 'seller' | 'admin') {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized: User not authenticated');
  }

  if (user.role !== role && user.role !== 'admin') {
    throw new Error(`Unauthorized: Requires ${role} role`);
  }

  return user;
}

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string) {
  return await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });
}

/**
 * Update user XP and check for streak
 */
export async function updateUserXP(userId: string, xpAmount: number) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if last activity was yesterday for streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
  lastActivity?.setHours(0, 0, 0, 0);

  let newStreak = user.currentStreak;
  
  if (lastActivity) {
    const diffDays = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day - increment streak
      newStreak = user.currentStreak + 1;
    } else if (diffDays > 1) {
      // Streak broken - reset to 1
      newStreak = 1;
    }
    // If diffDays === 0, same day - keep current streak
  } else {
    // First activity ever
    newStreak = 1;
  }

  // Update longest streak if necessary
  const longestStreak = Math.max(user.longestStreak, newStreak);

  // Update user
  const [updatedUser] = await db
    .update(users)
    .set({
      totalXp: user.totalXp + xpAmount,
      currentStreak: newStreak,
      longestStreak: longestStreak,
      lastActivityDate: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();

  return {
    user: updatedUser,
    xpGained: xpAmount,
    streakUpdated: newStreak !== user.currentStreak,
    newStreak: newStreak,
  };
}
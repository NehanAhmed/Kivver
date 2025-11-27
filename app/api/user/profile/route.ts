import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/user';
import { db } from '@/lib/db';
import { userBadges, badges, userCourseEnrollments } from '@/lib/schema';
import { eq } from 'drizzle-orm';

/**
 * GET /api/user/profile
 * Returns current user profile with stats
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user badges
    const earnedBadges = await db
      .select({
        badge: badges,
        earnedAt: userBadges.earnedAt,
      })
      .from(userBadges)
      .innerJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, user.id));

    // Get enrolled courses count
    const enrolledCourses = await db
      .select()
      .from(userCourseEnrollments)
      .where(eq(userCourseEnrollments.userId, user.id));

    const completedCourses = enrolledCourses.filter(e => e.isCompleted).length;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        lastActivityDate: user.lastActivityDate,
      },
      stats: {
        earnedBadges: earnedBadges.length,
        enrolledCourses: enrolledCourses.length,
        completedCourses: completedCourses,
      },
      badges: earnedBadges,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile
 * Update user profile
 */
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { username } = body;

    // Update user in database
    const [updatedUser] = await db
      .update(users)
      .set({
        username: username,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { users } from '@/lib/schema';
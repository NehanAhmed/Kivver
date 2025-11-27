import { db } from './index';
import { users, courses, enrollments, userProgress, badges, userBadges, sellerAnalytics } from './schema';
import { eq, and, desc, sql, isNull } from 'drizzle-orm';
import type { NewUser, User } from '@/types/database';

// ==================== USER QUERIES ====================

export async function createUser(data: NewUser): Promise<User> {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}

export async function getUserByClerkId(clerkId: string): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  return user;
}

export async function getUserById(id: number): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user;
}

export async function updateUserStreak(userId: number, newStreakCount: number): Promise<void> {
  await db
    .update(users)
    .set({ 
      streakCount: newStreakCount, 
      lastActiveDate: new Date(),
      updatedAt: new Date() 
    })
    .where(eq(users.id, userId));
}

export async function addUserXP(userId: number, xpAmount: number): Promise<void> {
  await db
    .update(users)
    .set({ 
      xp: sql`${users.xp} + ${xpAmount}`,
      updatedAt: new Date() 
    })
    .where(eq(users.id, userId));
}

// ==================== COURSE QUERIES ====================

export async function getCourseById(courseId: number) {
  const [course] = await db
    .select()
    .from(courses)
    .where(and(
      eq(courses.id, courseId),
      isNull(courses.deletedAt)       // FIXED
    ))
    .limit(1);
  return course;
}

export async function getApprovedCourses(limit: number = 20) {
  return await db
    .select()
    .from(courses)
    .where(and(
      eq(courses.status, 'approved'),
      isNull(courses.deletedAt)       // FIXED
    ))
    .orderBy(desc(courses.createdAt))
    .limit(limit);
}

export async function getSellerCourses(sellerId: number) {
  return await db
    .select()
    .from(courses)
    .where(and(
      eq(courses.sellerId, sellerId),
      isNull(courses.deletedAt)       // FIXED
    ))
    .orderBy(desc(courses.createdAt));
}

// ==================== ENROLLMENT QUERIES ====================

export async function enrollUserInCourse(userId: number, courseId: number) {
  const [enrollment] = await db
    .insert(enrollments)
    .values({ userId, courseId })
    .returning();
  
  await db
    .update(courses)
    .set({ enrollmentCount: sql`${courses.enrollmentCount} + 1` })
    .where(eq(courses.id, courseId));
  
  return enrollment;
}

export async function getUserEnrollments(userId: number) {
  return await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .orderBy(desc(enrollments.lastAccessedAt));
}

// ==================== PROGRESS QUERIES ====================

export async function markLessonComplete(userId: number, lessonId: number) {
  await db
    .update(userProgress)
    .set({ 
      isCompleted: true, 
      completedAt: new Date(),
      lastAccessedAt: new Date() 
    })
    .where(and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId)));
}

// ==================== BADGE QUERIES ====================

export async function getUserBadges(userId: number) {
  return await db
    .select({
      badge: badges,
      earnedAt: userBadges.earnedAt,
    })
    .from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, userId))
    .orderBy(desc(userBadges.earnedAt));
}

export async function awardBadge(userId: number, badgeId: number) {
  const [userBadge] = await db
    .insert(userBadges)
    .values({ userId, badgeId })
    .returning();
  return userBadge;
}

// ==================== SELLER ANALYTICS QUERIES ====================

export async function getSellerAnalytics(sellerId: number) {
  const [analytics] = await db
    .select()
    .from(sellerAnalytics)
    .where(and(
      eq(sellerAnalytics.sellerId, sellerId),
      isNull(sellerAnalytics.courseId)   // FIXED
    ))
    .limit(1);

  return analytics;
}

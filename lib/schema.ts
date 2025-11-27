import { pgTable, text, timestamp, integer, boolean, jsonb, pgEnum, uuid, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'seller', 'admin']);
export const lessonTypeEnum = pgEnum('lesson_type', ['quiz', 'flashcard', 'match', 'fill_blank', 'speaking']);
export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced']);
export const courseStatusEnum = pgEnum('course_status', ['draft', 'pending', 'approved', 'rejected']);

// Users Table (minimal - Clerk handles auth)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull(),
  username: text('username'),
  role: userRoleEnum('role').default('user').notNull(),
  totalXp: integer('total_xp').default(0).notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  lastActivityDate: timestamp('last_activity_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Courses Table
export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  sellerId: text('seller_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  thumbnail: text('thumbnail'),
  difficulty: difficultyEnum('difficulty').default('beginner').notNull(),
  status: courseStatusEnum('status').default('draft').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]),
  estimatedDuration: integer('estimated_duration'), // in minutes
  totalLessons: integer('total_lessons').default(0).notNull(),
  enrollmentCount: integer('enrollment_count').default(0).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Lessons Table
export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  orderIndex: integer('order_index').notNull(),
  xpReward: integer('xp_reward').default(10).notNull(),
  lessonType: lessonTypeEnum('lesson_type').default('quiz').notNull(),
  isLocked: boolean('is_locked').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Lesson Content Table (stores questions/flashcards/etc)
export const lessonContent = pgTable('lesson_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  orderIndex: integer('order_index').notNull(),
  question: text('question').notNull(),
  type: lessonTypeEnum('type').notNull(),
  options: jsonb('options').$type<string[]>(), // for multiple choice
  correctAnswer: text('correct_answer').notNull(),
  explanation: text('explanation'),
  imageUrl: text('image_url'),
  audioUrl: text('audio_url'),
  points: integer('points').default(5).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Course Enrollments
export const userCourseEnrollments = pgTable('user_course_enrollments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
  completedLessons: integer('completed_lessons').default(0).notNull(),
  totalXpEarned: integer('total_xp_earned').default(0).notNull(),
  lastAccessedAt: timestamp('last_accessed_at'),
  isCompleted: boolean('is_completed').default(false).notNull(),
});

// User Progress (tracks individual lesson completion)
export const userProgress = pgTable('user_progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  isCompleted: boolean('is_completed').default(false).notNull(),
  score: integer('score'), // percentage
  xpEarned: integer('xp_earned').default(0).notNull(),
  attempts: integer('attempts').default(0).notNull(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Badges Table
export const badges = pgTable('badges', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  criteria: jsonb('criteria').$type<{
    type: 'streak' | 'xp' | 'lessons' | 'course_complete';
    value: number;
  }>().notNull(),
  color: text('color').default('#2979FF'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Badges (earned badges)
export const userBadges = pgTable('user_badges', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  badgeId: uuid('badge_id').notNull().references(() => badges.id, { onDelete: 'cascade' }),
  earnedAt: timestamp('earned_at').defaultNow().notNull(),
});

// Daily Activity (for streak tracking)
export const dailyActivity = pgTable('daily_activity', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  activityDate: timestamp('activity_date').notNull(),
  xpEarned: integer('xp_earned').default(0).notNull(),
  lessonsCompleted: integer('lessons_completed').default(0).notNull(),
});

// Leaderboard (cached weekly/monthly rankings)
export const leaderboard = pgTable('leaderboard', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  period: text('period').notNull(), // 'weekly', 'monthly', 'all-time'
  rank: integer('rank').notNull(),
  xp: integer('xp').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Seller Analytics
export const sellerAnalytics = pgTable('seller_analytics', {
  id: uuid('id').defaultRandom().primaryKey(),
  sellerId: text('seller_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  views: integer('views').default(0).notNull(),
  enrollments: integer('enrollments').default(0).notNull(),
  completions: integer('completions').default(0).notNull(),
  avgCompletionRate: integer('avg_completion_rate').default(0).notNull(), // percentage
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses),
  enrollments: many(userCourseEnrollments),
  progress: many(userProgress),
  badges: many(userBadges),
  dailyActivity: many(dailyActivity),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  seller: one(users, {
    fields: [courses.sellerId],
    references: [users.id],
  }),
  lessons: many(lessons),
  enrollments: many(userCourseEnrollments),
  analytics: many(sellerAnalytics),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  content: many(lessonContent),
  progress: many(userProgress),
}));

export const lessonContentRelations = relations(lessonContent, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonContent.lessonId],
    references: [lessons.id],
  }),
}));

export const userCourseEnrollmentsRelations = relations(userCourseEnrollments, ({ one }) => ({
  user: one(users, {
    fields: [userCourseEnrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [userCourseEnrollments.courseId],
    references: [courses.id],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [userProgress.lessonId],
    references: [lessons.id],
  }),
  course: one(courses, {
    fields: [userProgress.courseId],
    references: [courses.id],
  }),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
  userBadges: many(userBadges),
}));

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));
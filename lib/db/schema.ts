import { pgTable, text, timestamp, integer, boolean, jsonb, serial, varchar, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ==================== USERS TABLE ====================
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name'),
  imageUrl: text('image_url'),
  role: text('role', { enum: ['buyer', 'seller'] }).notNull().default('buyer'),
  planType: text('plan_type', { enum: ['free', 'pro', 'premium'] }).notNull().default('free'),
  
  // Gamification
  xp: integer('xp').notNull().default(0),
  level: integer('level').notNull().default(1),
  streakCount: integer('streak_count').notNull().default(0),
  lastActiveDate: timestamp('last_active_date'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

// ==================== COURSES TABLE ====================
  export const courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    sellerId: integer('seller_id').notNull().references(() => users.id),
    
    title: text('title').notNull(),
    description: text('description'),
    thumbnail: text('thumbnail'),
    category: text('category'),
    difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).default('beginner'),
    
    // Pricing
    price: numeric('price', { precision: 10, scale: 2 }).notNull().default('0'),
    isPremium: boolean('is_premium').notNull().default(false),
    
    // Admin approval
    status: text('status', { enum: ['draft', 'pending', 'approved', 'rejected'] }).notNull().default('draft'),
    
    // Stats
    totalLessons: integer('total_lessons').notNull().default(0),
    totalDuration: integer('total_duration').notNull().default(0), // in minutes
    enrollmentCount: integer('enrollment_count').notNull().default(0),
    
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  });

  // ==================== LESSONS TABLE ====================
  export const lessons = pgTable('lessons', {
    id: serial('id').primaryKey(),
    courseId: integer('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
    
    title: text('title').notNull(),
    description: text('description'),
    order: integer('order').notNull(), // Lesson sequence
    
    // Duration in seconds
    duration: integer('duration').notNull().default(0),
    
    // Status
    isPublished: boolean('is_published').notNull().default(false),
    
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });

  // ==================== LESSON CONTENT TABLE ====================
  export const lessonContent = pgTable('lesson_content', {
    id: serial('id').primaryKey(),
    lessonId: integer('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
    
    type: text('type', { enum: ['text', 'video', 'quiz'] }).notNull(),
    order: integer('order').notNull(),
    
    // Content based on type
    textContent: text('text_content'), // For type='text'
    videoUrl: text('video_url'), // For type='video'
    quizData: jsonb('quiz_data'), // For type='quiz' - stores questions, options, answers
    
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });

// ==================== USER ENROLLMENTS ====================
export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  courseId: integer('course_id').notNull().references(() => courses.id),
  
  // Progress tracking
  progress: integer('progress').notNull().default(0), // Percentage 0-100
  completedLessons: integer('completed_lessons').notNull().default(0),
  totalTimeSpent: integer('total_time_spent').notNull().default(0), // in seconds
  
  // Status
  status: text('status', { enum: ['active', 'completed', 'dropped'] }).notNull().default('active'),
  
  // Timestamps
  enrolledAt: timestamp('enrolled_at').notNull().defaultNow(),
  lastAccessedAt: timestamp('last_accessed_at'),
  completedAt: timestamp('completed_at'),
});

// ==================== USER PROGRESS (Per Lesson) ====================
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  lessonId: integer('lesson_id').notNull().references(() => lessons.id),
  
  isCompleted: boolean('is_completed').notNull().default(false),
  timeSpent: integer('time_spent').notNull().default(0), // in seconds
  lastPosition: integer('last_position').notNull().default(0), // For video playback resume
  
  // Quiz results
  quizScore: integer('quiz_score'),
  quizAttempts: integer('quiz_attempts').notNull().default(0),
  
  // Timestamps
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  lastAccessedAt: timestamp('last_accessed_at').notNull().defaultNow(),
});

// ==================== BADGES (Predefined) ====================
export const badges = pgTable('badges', {
  id: serial('id').primaryKey(),
  
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  iconUrl: text('icon_url'),
  
  // Achievement criteria
  criteriaType: text('criteria_type', { 
    enum: ['xp_milestone', 'streak_count', 'courses_completed', 'lessons_completed', 'quiz_perfect_score'] 
  }).notNull(),
  criteriaValue: integer('criteria_value').notNull(), // e.g., 1000 XP, 7 day streak
  
  // Badge tier
  tier: text('tier', { enum: ['bronze', 'silver', 'gold', 'platinum'] }).notNull().default('bronze'),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ==================== USER BADGES (Earned) ====================
export const userBadges = pgTable('user_badges', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  badgeId: integer('badge_id').notNull().references(() => badges.id),
  
  earnedAt: timestamp('earned_at').notNull().defaultNow(),
});

// ==================== SELLER ANALYTICS ====================
export const sellerAnalytics = pgTable('seller_analytics', {
  id: serial('id').primaryKey(),
  sellerId: integer('seller_id').notNull().references(() => users.id),
  courseId: integer('course_id').references(() => courses.id), // null for overall stats
  
  // Financial
  totalRevenue: numeric('total_revenue', { precision: 12, scale: 2 }).notNull().default('0'),
  totalSales: integer('total_sales').notNull().default(0),
  
  // Engagement
  totalEnrollments: integer('total_enrollments').notNull().default(0),
  totalWatchTime: integer('total_watch_time').notNull().default(0), // in seconds
  averageRating: numeric('average_rating', { precision: 3, scale: 2 }),
  totalReviews: integer('total_reviews').notNull().default(0),
  
  // Content
  totalCourses: integer('total_courses').notNull().default(0),
  totalLessons: integer('total_lessons').notNull().default(0),
  
  // Period tracking
  periodStart: timestamp('period_start').notNull().defaultNow(),
  periodEnd: timestamp('period_end'),
  
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ==================== RELATIONS ====================
export const usersRelations = relations(users, ({ many }) => ({
  coursesCreated: many(courses),
  enrollments: many(enrollments),
  progress: many(userProgress),
  badges: many(userBadges),
  analytics: many(sellerAnalytics),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  seller: one(users, {
    fields: [courses.sellerId],
    references: [users.id],
  }),
  lessons: many(lessons),
  enrollments: many(enrollments),
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

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
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

export const sellerAnalyticsRelations = relations(sellerAnalytics, ({ one }) => ({
  seller: one(users, {
    fields: [sellerAnalytics.sellerId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [sellerAnalytics.courseId],
    references: [courses.id],
  }),
}));
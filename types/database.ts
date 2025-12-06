import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

// User types
export type User = InferSelectModel<typeof schema.users>;
export type NewUser = InferInsertModel<typeof schema.users>;

// Course types
export type Course = InferSelectModel<typeof schema.courses>;
export type NewCourse = InferInsertModel<typeof schema.courses>;

// Lesson types
export type Lesson = InferSelectModel<typeof schema.le  ssons>;
export type NewLesson = InferInsertModel<typeof schema.lessons>;

// Lesson Content types
export type LessonContent = InferSelectModel<typeof schema.lessonContent>;
export type NewLessonContent = InferInsertModel<typeof schema.lessonContent>;

// Enrollment types
export type Enrollment = InferSelectModel<typeof schema.enrollments>;
export type NewEnrollment = InferInsertModel<typeof schema.enrollments>;

// User Progress types
export type UserProgress = InferSelectModel<typeof schema.userProgress>;
export type NewUserProgress = InferInsertModel<typeof schema.userProgress>;

// Badge types
export type Badge = InferSelectModel<typeof schema.badges>;
export type NewBadge = InferInsertModel<typeof schema.badges>;

// User Badge types
export type UserBadge = InferSelectModel<typeof schema.userBadges>;
export type NewUserBadge = InferInsertModel<typeof schema.userBadges>;

// Seller Analytics types
export type SellerAnalytics = InferSelectModel<typeof schema.sellerAnalytics>;
export type NewSellerAnalytics = InferInsertModel<typeof schema.sellerAnalytics>;

// Quiz data structure
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation?: string;
}

export interface QuizData {
  questions: QuizQuestion[];
  passingScore: number; // Percentage
  timeLimit?: number; // in seconds
}
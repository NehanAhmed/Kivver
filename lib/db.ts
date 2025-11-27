import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

// Export types for use in your app
export type User = typeof schema.users.$inferSelect;
export type NewUser = typeof schema.users.$inferInsert;
export type Course = typeof schema.courses.$inferSelect;
export type NewCourse = typeof schema.courses.$inferInsert;
export type Lesson = typeof schema.lessons.$inferSelect;
export type NewLesson = typeof schema.lessons.$inferInsert;
export type LessonContent = typeof schema.lessonContent.$inferSelect;
export type NewLessonContent = typeof schema.lessonContent.$inferInsert;
export type UserProgress = typeof schema.userProgress.$inferSelect;
export type NewUserProgress = typeof schema.userProgress.$inferInsert;
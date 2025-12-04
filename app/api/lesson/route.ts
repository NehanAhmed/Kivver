// app/api/lessons/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust path to your db instance
import { courses, lessons } from '@/lib/db/schema'; // Adjust path to your schema
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';

// Validation schema for lesson creation
const createLessonSchema = z.object({
  courseId: z.number().int().positive('Course ID must be a positive integer'),
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  description: z.string().optional().nullable(),
  order: z.number().int().nonnegative('Order must be a non-negative integer'),
  duration: z.number().int().nonnegative('Duration must be a non-negative integer').default(0),
  isPublished: z.boolean().default(false),
});

// Type inference from validation schema
type CreateLessonInput = z.infer<typeof createLessonSchema>;

// Response type for successful creation
interface LessonCreatedResponse {
  success: true;
  data: {
    id: number;
    courseId: number;
    title: string;
    description: string | null;
    order: number;
    duration: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  message: string;
}

// Response type for errors
interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<LessonCreatedResponse | ErrorResponse>> {
  try {
    // Parse request body
    const body: unknown = await request.json();

    // Validate input
    const validationResult = createLessonSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: errors as Record<string, string[]>,
        },
        { status: 400 }
      );
    }

    const validatedData: CreateLessonInput = validationResult.data;

    // Use a transaction to ensure both operations succeed or fail together
    const result = await db.transaction(async (tx) => {
      // Insert lesson into database
      const [newLesson] = await tx
        .insert(lessons)
        .values({
          courseId: validatedData.courseId,
          title: validatedData.title,
          description: validatedData.description ?? null,
          order: validatedData.order,
          duration: validatedData.duration,
          isPublished: validatedData.isPublished,
        })
        .returning();

      // Convert duration from seconds to minutes (round up)
      const durationInMinutes = Math.ceil(validatedData.duration / 60);

      // Update course stats
      await tx
        .update(courses)
        .set({
          totalLessons: sql`${courses.totalLessons} + 1`,
          totalDuration: sql`${courses.totalDuration} + ${durationInMinutes}`,
          updatedAt: new Date(),
        })
        .where(eq(courses.id, validatedData.courseId));

      return newLesson;
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'Lesson created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lesson:', error);

    // Handle database constraint violations
    if (error instanceof Error) {
      // Foreign key constraint violation (course doesn't exist)
      if (error.message.includes('foreign key constraint')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid course ID. The specified course does not exist.',
          },
          { status: 400 }
        );
      }

      // Unique constraint violation
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          {
            success: false,
            error: 'A lesson with this order already exists for the course.',
          },
          { status: 409 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while creating the lesson',
      },
      { status: 500 }
    );
  }
}
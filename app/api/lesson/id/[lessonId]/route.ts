// app/api/lesson/[lessonId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { lessons } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Lesson type based on schema
interface Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string | null;
  order: number;
  duration: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Success response type
interface LessonSuccessResponse {
  success: true;
  data: Lesson;
  message: string;
}

// Error response type
interface ErrorResponse {
  success: false;
  error: string;
}

// Route params type
interface RouteParams {
  params: Promise<{
    lessonId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<LessonSuccessResponse | ErrorResponse>> {
  try {
    // Await and extract lessonId from params
    const { lessonId: lessonIdParam } = await params;

    // Validate lessonId parameter
    if (!lessonIdParam) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lesson ID is required',
        },
        { status: 400 }
      );
    }

    // Parse lessonId to number
    const lessonId = parseInt(lessonIdParam, 10);

    // Validate that lessonId is a valid positive integer
    if (isNaN(lessonId) || lessonId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid lesson ID. Must be a positive integer.',
        },
        { status: 400 }
      );
    }

    // Query database for the lesson
    const [lesson] = await db
      .select({
        id: lessons.id,
        courseId: lessons.courseId,
        title: lessons.title,
        description: lessons.description,
        order: lessons.order,
        duration: lessons.duration,
        isPublished: lessons.isPublished,
        createdAt: lessons.createdAt,
        updatedAt: lessons.updatedAt,
      })
      .from(lessons)
      .where(eq(lessons.id, lessonId))
      .limit(1);

    // Check if lesson exists
    if (!lesson) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lesson not found',
        },
        { status: 404 }
      );
    }

    // Return success response with lesson data
    return NextResponse.json(
      {
        success: true,
        data: lesson,
        message: 'Lesson fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching lesson:', error);

    // Handle specific database errors
    if (error instanceof Error) {
      // Database connection error
      if (error.message.includes('connection')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Database connection error. Please try again later.',
          },
          { status: 503 }
        );
      }

      // Query error
      if (error.message.includes('query')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Database query error. Please try again later.',
          },
          { status: 500 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while fetching the lesson',
      },
      { status: 500 }
    );
  }
}
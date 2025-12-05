// app/api/lessons/[courseId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { lessons } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { Lesson } from '@/types/database';

// Lesson type based on schema


// Success response type
interface LessonsSuccessResponse {
  success: true;
  data: Lesson[];
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
    courseId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<LessonsSuccessResponse | ErrorResponse>> {
  try {
    // Await and extract courseId from params
    const { courseId: courseIdParam } = await params;

    // Validate courseId parameter
    if (!courseIdParam) {
      return NextResponse.json(
        {
          success: false,
          error: 'Course ID is required',
        },
        { status: 400 }
      );
    }

    // Parse courseId to number
    const courseId = parseInt(courseIdParam, 10);

    // Validate that courseId is a valid positive integer
    if (isNaN(courseId) || courseId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid course ID. Must be a positive integer.',
        },
        { status: 400 }
      );
    }

    // Query database for lessons
    const courseLessons = await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, courseId))
      .orderBy(asc(lessons.order));

    // Return success response with lessons
    return NextResponse.json(
      {
        success: true,
        data: courseLessons,
        message: 'Lessons fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching lessons:', error);

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
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while fetching lessons',
      },
      { status: 500 }
    );
  }
}
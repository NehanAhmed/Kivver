// app/api/lesson/[lessonId]/content/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { lessonContent, lessons } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';

// GET - Fetch lesson content blocks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
    const lessonIdNum = parseInt(lessonId);

    // Validate lesson exists
    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonIdNum),
    });

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Fetch content blocks for this lesson
    const contentBlocks = await db.query.lessonContent.findMany({
      where: eq(lessonContent.lessonId, lessonIdNum),
      orderBy: [asc(lessonContent.order)],
    });

    return NextResponse.json({
      success: true,
      data: contentBlocks,
    });
  } catch (error) {
    console.error('Error fetching lesson content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch lesson content' },
      { status: 500 }
    );
  }
}

// POST - Save lesson content blocks
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { contentBlocks } = await request.json();
    const { lessonId } = await params;
    const lessonIdNum = parseInt(lessonId);

    // Validate lesson exists
    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonIdNum),
    });

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Delete existing content blocks for this lesson
    await db.delete(lessonContent).where(eq(lessonContent.lessonId, lessonIdNum));

    // Insert new content blocks
    if (contentBlocks && contentBlocks.length > 0) {
      const insertPromises = contentBlocks.map((block: {
        type: 'text' | 'video' | 'quiz';
        order: number;
        textContent?: string;
        videoUrl?: string;
        quizData?: unknown;
      }) =>
        db.insert(lessonContent).values({
          lessonId: lessonIdNum,
          type: block.type,
          order: block.order,
          textContent: block.textContent || null,
          videoUrl: block.videoUrl || null,
          quizData: block.quizData || null,
        })
      );

      await Promise.all(insertPromises);
    }

    // Update lesson's updatedAt timestamp
    await db.update(lessons)
      .set({ updatedAt: new Date() })
      .where(eq(lessons.id, lessonIdNum));

    return NextResponse.json({
      success: true,
      message: 'Lesson content saved successfully',
      data: {
        savedBlocks: contentBlocks.length,
      },
    });
  } catch (error) {
    console.error('Error saving lesson content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save lesson content' },
      { status: 500 }
    );
  }
}
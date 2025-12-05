import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { Course } from "@/types/database";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface GetCourseResponse {
    success: boolean;
    data?: Course;
    message: string;
    error?: string;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<GetCourseResponse>> {
    try {
        const courseId = parseInt((await params).id, 10);

        if (isNaN(courseId) || courseId <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid course ID",
                    error: "Course ID must be a positive number",
                },
                { status: 400 }
            );
        }

        const [course] = await db
            .select()
            .from(courses)
            .where(eq(courses.id, courseId))
            .limit(1);

        if (!course) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Course not found",
                    error: `No course found with ID: ${courseId}`,
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Course fetched successfully",
                data: course,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching course:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch course",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

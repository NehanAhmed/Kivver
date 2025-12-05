'use cache'

import { ApiResponse, CourseFormData } from "@/app/(seller)/_components/CreateCourse/CourseForm"
import { Course, Lesson } from "@/types/database"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function fetchAllCourses(): Promise<Course[]> {
    try {
        const response = await fetch(`${BASE_URL}/api/course`)

        if (!response.ok) throw new Error("Error fetching Courses")

        const data = await response.json()

        return data.data
    } catch (error: any) {
        console.error("Error occured in fetchAllCourse", error)
        throw new Error(error)
    }
}
export async function fetchSellerCoursesById({ id }: { id: string }): Promise<Course> {
    try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
        const response = await fetch(`${BASE_URL}/api/course/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch course');
        }

        const result = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.message || 'Course not found');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch course: ${error.message}`);
        }
        throw new Error('Failed to fetch course: Unknown error');
    }
}

export async function createCourse(
    courseData: CourseFormData,
    sellerId: number
): Promise<ApiResponse<{ id: number; title: string; status: string }>> {
    try {
        const response = await fetch(`${BASE_URL}/api/course`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...courseData,
                sellerId,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to create course');
        }

        return result;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
}
interface LessonCreateData {
    courseId: number;
    title: string;
    description?: string;
    order: number;
    duration: number;
    isPublished: boolean;
}

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
export async function createLesson({ data }: { data: LessonCreateData }): Promise<LessonCreatedResponse> {

    try {
        const response = await fetch(`${BASE_URL}/api/lesson`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to create lesson');
        }

        return result.data;
    } catch (error) {
        console.error('Error creating lesson:', error);
        throw error;
    }
}


// lib/apiFetches/SellerCourses.ts (add this function)



export interface FetchLessonsResponse {
  success: true;
  data: Lesson[];
  count: number;
  message: string;
}

export async function fetchLessonsByCourseId(courseId: number): Promise<Lesson[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/${courseId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch lessons');
    }

    const result: FetchLessonsResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}          


export interface FetchLessonResponse {
  success: true;
  data: Lesson;
  message: string;
}

export async function fetchLessonById(lessonId: number): Promise<Lesson> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/id/${lessonId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // For server-side fetching with fresh data
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch lesson');
    }

    const result: FetchLessonResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching lesson:', error);
    throw error;
  }
}
// app/(seller)/seller/dashboard/course/[id]/page.tsx

import { CourseActionsPanel } from '@/app/(seller)/_components/CourseView/CourseActionPanel';
import { CourseHeader } from '@/app/(seller)/_components/CourseView/CourseHeader';
import { LessonsEmptyState } from '@/app/(seller)/_components/CourseView/LessonEmptyState';
import { LessonsList } from '@/app/(seller)/_components/CourseView/LessonList';
import { fetchLessonsByCourseId, fetchSellerCoursesById } from '@/lib/apiFetches/SellerCourses';

export interface Lesson {
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

export interface LessonContent {
    id: number;
    lessonId: number;
    type: 'text' | 'video' | 'quiz';
    order: number;
    textContent: string | null;
    videoUrl: string | null;
    quizData: Record<string, unknown> | null;
    createdAt: Date;
    updatedAt: Date;
}



export default async function CourseViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const courseId = parseInt(id);

    const course = await fetchSellerCoursesById({ id });
    const lessons = await fetchLessonsByCourseId(courseId);

    return (
        <div className="min-h-screen bg-background">
            {/* Course Header */}
            <CourseHeader course={course} />

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                    {/* Left Section - Lessons */}
                    <div className="p-5 bg-card border border-border rounded-2xl shadow-sm min-h-[500px]">

                        <LessonsList lessons={lessons} courseId={courseId} />

                    </div>

                    {/* Right Section - Actions Panel */}
                    <div className="lg:sticky lg:top-8 self-start">
                        <CourseActionsPanel id={course.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
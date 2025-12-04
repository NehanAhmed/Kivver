// app/(seller)/seller/dashboard/course/[id]/lesson/[lessonId]/page.tsx

import { LessonDetailsHeader } from '@/app/(seller)/_components/LessonView/LessonDetailsHeader';
import { LessonContentWrapper } from '@/app/(seller)/_components/LessonView/LessonContentWrapper';
import { fetchLessonById } from '@/lib/apiFetches/SellerCourses';

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



export default async function LessonViewPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id: courseId, lessonId } = await params;
  const lesson = await fetchLessonById(parseInt(lessonId));

  return (
    <div className="min-h-screen bg-background">
      {/* Top Half - Lesson Details */}
      <LessonDetailsHeader lesson={lesson} courseId={parseInt(courseId)} />

      {/* Bottom Half - Lesson Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <LessonContentWrapper lessonId={parseInt(lessonId)} />
      </div>
    </div>
  );
}




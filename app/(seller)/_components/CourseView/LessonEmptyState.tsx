'use client'
// components/seller/course-view/LessonsEmptyState.tsx
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface LessonsEmptyStateProps {
  id: number
}

export function LessonsEmptyState({  id }: LessonsEmptyStateProps) {
  const router = useRouter()
  const onCreateLesson = () => {
    router.push(`/seller/dashboard/course/${id}/lesson/create`);
  };
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      {/* Icon Container */}
      <div className="w-24 h-24 rounded-3xl bg-green-50 flex items-center justify-center mb-6">
        <BookOpen className="w-12 h-12 text-green-500" />
      </div>

      {/* Text Content */}
      <h3 className="text-xl font-bold text-foreground mb-2">
        No lessons yet
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Start building your course by creating your first lesson. Add content blocks like text, videos, and quizzes to engage your students.
      </p>

      {/* Create Button */}
      <Button
        onClick={onCreateLesson}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create First Lesson
      </Button>
    </div>
  );
}   
'use client';
// components/seller/LessonsList.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';// components/seller/LessonCard.tsx
import { Badge } from '@/components/ui/badge';
import { Clock, GripVertical, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

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

interface LessonCardProps {
  lesson: Lesson;
  onEdit?: (lessonId: number) => void;
  onDelete?: (lessonId: number) => void;
}

export function LessonCard({ lesson, onEdit, onDelete }: LessonCardProps) {
  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="group w-full border border-border rounded-xl p-4 bg-card hover:shadow-md transition-all duration-200 hover:border-green-500/50">
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <div className="flex-shrink-0 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing transition-colors">
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Order Badge */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
            <span className="text-sm font-bold text-green-600">
              {lesson.order}
            </span>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <Link href={`/seller/dashboard/course/${lesson.courseId}/lesson/${lesson.id}`}>
              <h3 className="font-semibold text-foreground text-base truncate flex-1">
                {lesson.title}
              </h3>            </Link>

            <Badge
              variant={lesson.isPublished ? 'default' : 'secondary'}
              className={`flex-shrink-0 ${lesson.isPublished
                ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20'
                : 'bg-muted text-muted-foreground'
                }`}
            >
              {lesson.isPublished ? (
                <>
                  <Eye className="w-3 h-3 mr-1" />
                  Published
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3 mr-1" />
                  Draft
                </>
              )}
            </Badge>
          </div>

          {lesson.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {lesson.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(lesson.duration)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(lesson.id)}
            className="h-8 w-8 p-0 hover:bg-green-500/10 hover:text-green-600"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(lesson.id)}
            className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}



interface LessonsListProps {
  courseId: number;
  lessons: Lesson[];
}

export function LessonsList({ courseId, lessons }: LessonsListProps) {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Course Lessons</h2>
            <p className="text-sm text-muted-foreground">
              {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
            </p>
          </div>
        </div>
        <Link href={`/seller/dashboard/course/${courseId}/lesson/create`}>
          <Button

            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lesson
          </Button>
        </Link>
      </div>

      {/* Lessons List */}
      {lessons.length === 0 ? (
        <Card className="border-2 border-dashed border-border rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No lessons yet
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Start building your course by adding your first lesson. Each lesson can include
              videos, text content, and resources.
            </p>
            <Link href={`/seller/dashboard/course/${courseId}/lesson/create`}>
              <Button
                onClick={() => console.log('Create first lesson')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Lesson
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onEdit={(id) => console.log('Edit lesson:', id)}
              onDelete={(id) => console.log('Delete lesson:', id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
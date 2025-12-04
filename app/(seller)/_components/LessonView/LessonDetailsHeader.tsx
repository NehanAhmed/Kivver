// app/(seller)/_components/LessonView/LessonDetailsHeader.tsx

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Eye, EyeOff, Edit, Save } from 'lucide-react';
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

interface LessonDetailsHeaderProps {
  lesson: Lesson;
  courseId: number;
}

export function LessonDetailsHeader({ lesson, courseId }: LessonDetailsHeaderProps) {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href={`/seller/dashboard/course/${courseId}`}>
            <Button variant="ghost" className="gap-2 hover:bg-muted">
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Button>
          </Link>
        </div>

        {/* Lesson Header Content */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Order Badge and Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <span className="text-lg font-bold text-green-600">
                  {lesson.order}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-foreground mb-2 break-words">
                  {lesson.title}
                </h1>
                
                {lesson.description && (
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {lesson.description}
                  </p>
                )}
              </div>
            </div>

            {/* Meta Information */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(lesson.duration)}</span>
              </div>

              <Badge
                variant={lesson.isPublished ? 'default' : 'secondary'}
                className={`${
                  lesson.isPublished
                    ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20'
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

              <span className="text-xs text-muted-foreground">
                Last updated: {new Date(lesson.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Button variant="outline" className="gap-2 border-border hover:bg-muted">
              <Edit className="w-4 h-4" />
              Edit Details
            </Button>
            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
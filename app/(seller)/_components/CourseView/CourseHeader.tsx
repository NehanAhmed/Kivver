'use client'
// components/seller/course-view/CourseHeader.tsx
import { ArrowLeft, Clock, Users, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Course } from '@/types/database';


interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const getStatusColor = (status: Course['status']) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-700',
      pending: 'bg-yellow-100 text-yellow-600',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-600',
    };
    return colors[status];
  };
  const router = useRouter()
  const onBack = () => {
    router.push('/seller/dashboard/course');
  };

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    const colors = {
      beginner: 'bg-blue-100 text-blue-600',
      intermediate: 'bg-purple-100 text-purple-600',
      advanced: 'bg-orange-100 text-orange-600',
    };
    return colors[difficulty];
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-3 text-muted-foreground hover:text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="flex gap-8">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-muted border border-border">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Course Info */}
          <div className="flex-1 min-w-0">
            {/* Status and Difficulty Badges */}
            <div className="flex gap-2 mb-4">
              <Badge className={`${getStatusColor(course.status)} border-0 font-medium px-3 py-1`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </Badge>
              <Badge className={`${getDifficultyColor(course.difficulty)} border-0 font-medium px-3 py-1`}>
                {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
              </Badge>
              {course.isPremium && (
                <Badge className="bg-purple-100 text-purple-600 border-0 font-medium px-3 py-1">
                  Premium
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground mb-3 line-clamp-2">
              {course.title}
            </h1>

            {/* Description */}
            {course.description && (
              <p className="text-muted-foreground text-base leading-relaxed mb-6 line-clamp-2">
                {course.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">
                  {course.totalLessons} {course.totalLessons === 1 ? 'Lesson' : 'Lessons'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">
                  {formatDuration(course.totalDuration)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">
                  {course.enrollmentCount} {course.enrollmentCount === 1 ? 'Student' : 'Students'}
                </span>
              </div>

              {course.category && (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    {course.category}
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-2xl font-bold text-green-600">
                ${parseFloat(course.price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
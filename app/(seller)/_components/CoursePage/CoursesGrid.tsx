// components/seller/courses/CourseGrid.tsx
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';
import { CourseCard } from './CourseCards';

// TODO: Replace with actual type from your schema
interface Course {
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  category: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: string;
  isPremium: boolean;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  totalLessons: number;
  totalDuration: number;
  enrollmentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export function CourseGrid() {
  // TODO: Replace with actual data from API
  const courses: Course[] = [];
  
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <BookOpen className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          No courses yet
        </h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Start creating your first course and share your knowledge with students around the world.
        </p>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Course
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
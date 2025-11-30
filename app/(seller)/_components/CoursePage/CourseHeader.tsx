// components/seller/courses/CourseHeader.tsx
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';

export function CourseHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          My Courses
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage and track your course content
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="rounded-xl"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Link href='create-course'>
          <Button
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>
    </div>
  );
}
// app/seller/courses/page.tsx

import { CourseFilters } from "@/app/(seller)/_components/CoursePage/CourseFilter";
import { CourseHeader } from "@/app/(seller)/_components/CoursePage/CourseHeader";
import { CourseGrid } from "@/app/(seller)/_components/CoursePage/CoursesGrid";
import { CourseStats } from "@/app/(seller)/_components/CoursePage/CourseStats";


export default function SellerCoursesPage() {
  // TODO: Fetch courses data from API
  // const courses = await fetchSellerCourses();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header with Actions */}
        <CourseHeader />
        
        {/* Stats Overview */}
        <CourseStats />
        
        {/* Filters & Search */}
        <CourseFilters />
        
        {/* Course Grid */}
        <CourseGrid />
      </div>
    </div>
  );
}
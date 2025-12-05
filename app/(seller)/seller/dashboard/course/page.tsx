// app/seller/courses/page.tsx

import { CourseFilters } from "@/app/(seller)/_components/CoursePage/CourseFilter";
import { CourseHeader } from "@/app/(seller)/_components/CoursePage/CourseHeader";
import { CourseGrid } from "@/app/(seller)/_components/CoursePage/CoursesGrid";
import { CourseStats } from "@/app/(seller)/_components/CoursePage/CourseStats";
import { fetchAllCourses } from "@/lib/apiFetches/SellerCourses";
import { cacheLife } from "next/cache";
import { Suspense } from "react";


export default async function SellerCoursesPage() {
  // const response = await fetch("http://localhost:3000/api/course")
  // const data = await response.json()

  // console.log(data.data);
  'use cache'
  cacheLife('hours');
  const courses = await fetchAllCourses()

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
        <Suspense fallback={<div>Loading...</div>}>

          <CourseGrid courses={courses} />
        </Suspense>
      </div>
    </div>
  );
}
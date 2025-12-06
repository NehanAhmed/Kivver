import { fetchLessonsByCourseId, fetchSellerCoursesById } from '@/lib/apiFetches/SellerCourses';
import { CourseHeroSection } from '../../_components/CourseHero';
import { CourseStatsBar } from '../../_components/CourseStatsBar';
import { CourseTabSection } from '../../_components/CourseTabs';
import { EnrollmentCard } from '../../_components/EnrollmentCard';
import { LessonsList } from '@/app/(seller)/_components/CourseView/LessonList';
import { Suspense } from 'react';

export default async function CourseViewPage({ params }: { params: Promise<{ id: string }> }) {
  // TODO: Fetch course data from API
  const {id} = await params
  const course = await fetchSellerCoursesById({ id});
  const lesson = await fetchLessonsByCourseId(Number(id));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Suspense fallback={<div>Loading course details...</div>}>
        
      <CourseHeroSection course={course} />
      </Suspense>

      {/* Stats Bar */}
      {/* <CourseStatsBar /> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Info */}
          {/* <div className="lg:col-span-2">
            <CourseTabSection />
          </div> */}

          {/* Right Column - Enrollment Card (Sticky) */}
          <div className="lg:col-span-1">
            {/* <div className="lg:sticky lg:top-24">
              <EnrollmentCard />
            </div> */}
          </div>
        </div>

        {/* Lessons Section */}
        <div
          
          className="mt-16"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Course Curriculum
            </h2>
            <p className="text-muted-foreground">
              Complete lessons to unlock achievements and gain XP
            </p>
          </div>
          
          {/* Your existing LessonsList component goes here */}
          <Suspense fallback={<div>Loading lessons...</div>}>
          <LessonsList isOnBuyerPage={true} courseId={Number(id)} lessons={lesson} /> 
          </Suspense>
        </div>
      </div>
    </div>
  );
}
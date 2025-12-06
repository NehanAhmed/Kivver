import { LessonContentList } from '@/app/(root)/_components/LessonContentList';
import { LessonHeroSection } from '@/app/(root)/_components/LessonHero';
import { LessonNavigation } from '@/app/(root)/_components/LessonNavigation';
import { LessonProgressBar } from '@/app/(root)/_components/LessonProgressBar';
import { LessonSidebar } from '@/app/(root)/_components/LessonSidebar';
import { fetchLessonById } from '@/lib/apiFetches/SellerCourses';


export default async function LessonViewPage({ params }: { params: Promise<{ lessonId: string }> }) {
    // TODO: Fetch lesson data from API
    const { lessonId } = await params;
    const lesson = await fetchLessonById(Number(lessonId));
    const reponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/id/${lessonId}/content`);
    if (!reponse.ok) {
        throw new Error('Failed to fetch lesson content');
    }
    const lessonContent = await reponse.json();    
    return (
        <div className="min-h-screen bg-background">
            {/* Progress Bar */}
            <LessonProgressBar />

            {/* Hero Section */}
            <LessonHeroSection lesson={lesson} />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column - Lesson Content */}
                    <div className="lg:col-span-3">
                        <LessonContentList contentItems={lessonContent.data} lessonId={Number(lessonId)} />

                        {/* Navigation */}
                        <LessonNavigation />
                    </div>

                    {/* Right Column - Sidebar (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24">
                            <LessonSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
'use client';
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CourseCards } from "../CourseCard";
import { fetchAllCourses } from "@/lib/apiFetches/SellerCourses";
import { Course } from "@/types/database";



interface CourseGridProps {
    courseData?: Course[];
    isLoading?: boolean;
}

export const CourseGrid = ({ courseData = [], isLoading = false }: CourseGridProps) => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const activeCategory = searchParams.get('category') || 'all';

    // Client-side filtering with useMemo for performance


    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (courseData.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500">
                    {searchQuery
                        ? `No results for "${searchQuery}". Try adjusting your search.`
                        : 'Try adjusting your filters'
                    }
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    {searchQuery ? `Results for "${searchQuery}"` : 'All Courses'}
                </h2>
                <p className="text-gray-500">
                    {courseData.length} {courseData.length === 1 ? 'course' : 'courses'}
                </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseData.map((course) => (
                    <CourseCards key={course.id} course={course} />
                ))}
            </div>
        </>
    );
};
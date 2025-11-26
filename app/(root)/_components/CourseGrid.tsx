'use client'
import { Search } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ICourseCard } from "@/types/course.type";



interface CourseGridProps {
    isLoading?: boolean;
}

export const CourseGrid = ({ isLoading = false }: CourseGridProps) => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const activeCategory = searchParams.get('category') || 'all';

    // Mock courses data with categories - Replace with API call
    const allCourses: ICourseCard[] = [
        {
            id: 1,
            title: 'Spanish for Beginners',
            instructor: 'Maria Rodriguez',
            description: 'Learn Spanish from scratch with interactive lessons and real-world conversations.',
            icon: '🇪🇸',
            gradient: 'from-red-400 to-yellow-400',
            rating: 4.8,
            lessons: 45,
            duration: '6 weeks',
            students: '12.5k',
            difficulty: 'Beginner',
            category: 'languages'
        },
        {
            id: 2,
            title: 'JavaScript Mastery',
            instructor: 'John Smith',
            description: 'Master modern JavaScript from fundamentals to advanced concepts.',
            icon: '💻',
            gradient: 'from-yellow-400 to-orange-500',
            rating: 4.9,
            lessons: 68,
            duration: '10 weeks',
            students: '25.3k',
            difficulty: 'Intermediate',
            category: 'technology'
        },
        {
            id: 3,
            title: 'UI/UX Design Fundamentals',
            instructor: 'Sarah Chen',
            description: 'Create beautiful and functional user interfaces with design thinking.',
            icon: '🎨',
            gradient: 'from-purple-400 to-pink-500',
            rating: 4.7,
            lessons: 32,
            duration: '5 weeks',
            students: '8.9k',
            difficulty: 'Beginner',
            category: 'design'
        },
        {
            id: 4,
            title: 'French Conversation',
            instructor: 'Pierre Dubois',
            description: 'Improve your French speaking skills with practical conversations.',
            icon: '🇫🇷',
            gradient: 'from-blue-400 to-indigo-500',
            rating: 4.6,
            lessons: 38,
            duration: '7 weeks',
            students: '6.2k',
            difficulty: 'Intermediate',
            category: 'languages'
        },
        {
            id: 5,
            title: 'Data Science Bootcamp',
            instructor: 'Dr. Alex Kumar',
            description: 'Dive into data analysis, machine learning, and visualization techniques.',
            icon: '📊',
            gradient: 'from-green-400 to-cyan-500',
            rating: 4.9,
            lessons: 92,
            duration: '14 weeks',
            students: '18.7k',
            difficulty: 'Advanced',
            category: 'technology'
        },
        {
            id: 6,
            title: 'German Grammar Simplified',
            instructor: 'Hans Mueller',
            description: 'Master German grammar rules with easy-to-follow lessons.',
            icon: '🇩🇪',
            gradient: 'from-gray-400 to-slate-600',
            rating: 4.5,
            lessons: 28,
            duration: '4 weeks',
            students: '4.1k',
            difficulty: 'Beginner',
            category: 'languages'
        },
        {
            id: 7,
            title: 'Business Strategy 101',
            instructor: 'Michael Chen',
            description: 'Learn essential business strategy frameworks and concepts.',
            icon: '💼',
            gradient: 'from-indigo-400 to-purple-500',
            rating: 4.7,
            lessons: 40,
            duration: '8 weeks',
            students: '10.2k',
            difficulty: 'Intermediate',
            category: 'business'
        },
    ];

    // Client-side filtering with useMemo for performance
    const filteredCourses = useMemo(() => {
        let filtered = allCourses;

        // Category filtering
        if (activeCategory !== 'all') {
            if (activeCategory === 'trending') {
                // Sort by students count for trending
                filtered = [...filtered].sort((a, b) => {
                    const aCount = parseFloat(a.students.replace('k', ''));
                    const bCount = parseFloat(b.students.replace('k', ''));
                    return bCount - aCount;
                }).slice(0, 6);
            } else if (activeCategory === 'popular') {
                // Sort by rating for popular
                filtered = [...filtered].sort((a, b) => b.rating - a.rating).slice(0, 6);
            } else {
                // Filter by category
                filtered = filtered.filter(course => course.category === activeCategory);
            }
        }

        // Search filtering
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.instructor.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, activeCategory]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (filteredCourses.length === 0) {
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
                    {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </>
    );
};
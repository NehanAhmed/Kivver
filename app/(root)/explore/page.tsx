'use client'
import React from 'react';
import { BookOpen, Trophy, Users, TrendingUp, Zap } from 'lucide-react';
import { CategoryFilter } from '../_components/CategoryFilter';
import { CourseGrid } from '../_components/CourseGrid';
import { StatsCard } from '../_components/StatsCard';
import { SearchBar } from '../_components/SearchBar';

const ExplorePage = () => {
    const categories = [
        { id: 'all', label: 'All Courses', icon: BookOpen },
        { id: 'trending', label: 'Trending', icon: TrendingUp },
        { id: 'popular', label: 'Popular', icon: Zap },
        { id: 'languages', label: 'Languages', icon: null },
        { id: 'technology', label: 'Technology', icon: null },
        { id: 'business', label: 'Business', icon: null },
        { id: 'design', label: 'Design', icon: null },
    ];

    const stats = [
        { icon: BookOpen, label: 'Total Courses', value: '500+', color: 'green' as const },
        { icon: Users, label: 'Active Learners', value: '125k', color: 'blue' as const },
        { icon: Trophy, label: 'Badges Earned', value: '2.3M', color: 'orange' as const },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Courses</h1>
                        <p className="text-gray-600">Discover your next learning adventure</p>
                    </div>
                    <SearchBar />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
                    <CategoryFilter categories={categories} />
                </div>

                {/* Course Grid with integrated search & category filtering */}
                <CourseGrid />
            </div>
        </div>
    );
};

export default ExplorePage;
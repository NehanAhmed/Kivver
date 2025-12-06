'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { Course } from '@/types/database';

interface CourseHeroSectionProps {
    course: Course
}

export function CourseHeroSection({ course }: CourseHeroSectionProps) {
    // Format duration from minutes to readable format
    const formatDuration = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins}m`;
        if (mins === 0) return `${hours}h`;
        return `${hours}h ${mins}m`;
    };

    // Get difficulty color
    const getDifficultyColor = (difficulty?: string): string => {
        switch (difficulty?.toLowerCase()) {
            case 'beginner':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
            case 'advanced':
                return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
        }
    };

    // Get difficulty indicator color
    const getDifficultyIndicatorColor = (difficulty?: string): string => {
        switch (difficulty?.toLowerCase()) {
            case 'beginner':
                return 'bg-green-500';
            case 'intermediate':
                return 'bg-yellow-500';
            case 'advanced':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-gray-900 dark:via-background dark:to-gray-800 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Course Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Category Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Badge className={`${getDifficultyColor(course.category || 'default')} hover:opacity-80 px-4 py-1.5 text-sm font-medium`}>
                                {course.category || 'Uncategorized'}
                            </Badge>
                        </motion.div>

                        {/* Course Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl lg:text-5xl font-bold text-foreground leading-tight"
                        >
                            {course.title || 'Untitled Course'}
                        </motion.h1>

                        {/* Course Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-muted-foreground leading-relaxed text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                            {course.description || 'No description available for this course.'}
                        </motion.p>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-6"
                        >
                            <QuickStat
                                icon={<BookOpen className="w-5 h-5" />}
                                label="Lessons"
                                value={course.totalLessons?.toString() || '0'}
                            />
                            <QuickStat
                                icon={<Clock className="w-5 h-5" />}
                                label="Duration"
                                value={formatDuration(course.totalDuration || 0)}
                            />
                            <QuickStat
                                icon={<Users className="w-5 h-5" />}
                                label="Students"
                                value={(course.enrollmentCount || 0).toLocaleString()}
                            />
                            <QuickStat
                                icon={<TrendingUp className="w-5 h-5" />}
                                label="Level"
                                value={course.difficulty ? course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1) : 'N/A'}
                            />
                        </motion.div>

                        {/* Difficulty Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
                                <div className={`w-2 h-2 rounded-full ${getDifficultyIndicatorColor(course.difficulty)} animate-pulse`} />
                                <span className="text-sm font-medium text-foreground">
                                    {course.difficulty ? course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1) : 'Unknown'} Level
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Course Thumbnail */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card"
                        >
                            {course.thumbnail ? (
                                <Image
                                    src={course.thumbnail}
                                    alt={course.title || 'Course'}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <BookOpen className="w-24 h-24 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg font-medium opacity-75">Course Thumbnail</p>
                                    </div>
                                </div>
                            )}

                            {/* Play Button Overlay */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm cursor-pointer"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl"
                                >
                                    <div className="w-0 h-0 border-l-[16px] border-l-green-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Total Students</p>
                                    <p className="text-lg font-bold text-foreground">{(course.enrollmentCount || 0).toLocaleString()}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

interface QuickStatProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function QuickStat({ icon, label, value }: QuickStatProps) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-2"
        >
            <div className="text-green-600 dark:text-green-400">
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-lg font-semibold text-foreground">{value}</p>
            </div>
        </motion.div>
    );
}
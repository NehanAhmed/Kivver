'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, CheckCircle2, PlayCircle } from 'lucide-react';
import { Lesson } from '@/types/database';

export function LessonHeroSection({ lesson }: { lesson: Lesson }) {
    // Format duration from seconds to readable format
    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours === 0 && minutes === 0) return `${secs}s`;
        if (hours === 0) return `${minutes}m ${secs}s`;
        return `${hours}h ${minutes}m`;
    };

    // Calculate XP reward based on duration (roughly 1 XP per 2 seconds, min 25, max 200)
    const calculateXPReward = (seconds: number): number => {
        const baseXP = Math.floor(seconds / 2);
        return Math.max(25, Math.min(200, baseXP));
    };

    const xpReward = calculateXPReward(lesson.duration || 0);

    return (
        <div className="relative bg-gradient-to-br from-green-50 via-background to-emerald-50 dark:from-gray-900 dark:via-background dark:to-gray-800 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
                <div className="max-w-4xl">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
                    >
                        <span className="hover:text-foreground cursor-pointer transition-colors">
                            {lesson.courseId ? `Course ${lesson.courseId}` : 'Course'}
                        </span>
                        <span>/</span>
                        <span className="hover:text-foreground cursor-pointer transition-colors">
                            Lesson {lesson.order || 1}
                        </span>
                        <span>/</span>
                        <span className="text-foreground font-medium">{lesson.title || 'Lesson'}</span>
                    </motion.div>

                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-4"
                    >
                        <Badge className={`${lesson.isPublished ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'} hover:opacity-80 px-4 py-1.5 text-sm font-medium gap-2`}>
                            <CheckCircle2 className="w-4 h-4" />
                            {lesson.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                    </motion.div>

                    {/* Lesson Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6"
                    >
                        {lesson.title || 'Untitled Lesson'}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-muted-foreground leading-relaxed mb-8"
                    >
                        {lesson.description || 'No description available for this lesson.'}
                    </motion.p>

                    {/* Lesson Meta Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-6"
                    >
                        <LessonMetaItem
                            icon={<Clock className="w-5 h-5" />}
                            label="Duration"
                            value={formatDuration(lesson.duration || 0)}
                        />
                        <LessonMetaItem
                            icon={<PlayCircle className="w-5 h-5" />}
                            label="Lesson #"
                            value={lesson.order?.toString() || 'N/A'}
                        />
                        <LessonMetaItem
                            icon={<Eye className="w-5 h-5" />}
                            label="Status"
                            value={lesson.isPublished ? 'Published' : 'Draft'}
                        />
                    </motion.div>

                    {/* XP Reward Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border border-yellow-200 dark:border-yellow-800 rounded-2xl px-6 py-3"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-2xl"
                        >
                            ⭐
                        </motion.div>
                        <div>
                            <p className="text-sm text-muted-foreground">Complete this lesson to earn</p>
                            <p className="text-lg font-bold text-foreground">+{xpReward} XP</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

interface LessonMetaItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function LessonMetaItem({ icon, label, value }: LessonMetaItemProps) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
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
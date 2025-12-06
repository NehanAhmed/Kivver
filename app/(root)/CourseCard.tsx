// components/course/CourseCard.tsx
'use client';

import { motion } from 'motion/react';
import { Clock, BookOpen, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types/database';

interface CourseCardProps {
    course: Course;
    className?: string;
}

const difficultyConfig = {
    beginner: { label: 'Beginner', className: 'bg-green-50 text-green-700 border-green-200' },
    intermediate: { label: 'Intermediate', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    advanced: { label: 'Advanced', className: 'bg-purple-100 text-purple-700 border-purple-200' },
};

export function CourseCards({
    course,
    className = '',
}: CourseCardProps) {
    const formatDuration = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    const formatPrice = (priceStr: string): string => {
        const numPrice = parseFloat(priceStr);
        return numPrice === 0 ? 'Free' : `$${numPrice.toFixed(2)}`;
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={className}
        >
            <Card className="group overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
                {/* Thumbnail Container */}
                <motion.div
                    className="relative w-full aspect-video overflow-hidden bg-muted"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    {course.thumbnail ? (
                        <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                            <BookOpen className="w-16 h-16 text-green-500 opacity-50" />
                        </div>
                    )}

                    {/* Premium Badge */}
                    {course.isPremium && (
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="absolute top-3 left-3"
                        >
                            <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200 font-semibold px-3 py-1 shadow-sm">
                                <Star className="w-3 h-3 mr-1 fill-yellow-600 text-yellow-600" />
                                Premium
                            </Badge>
                        </motion.div>
                    )}

                    {/* Category Badge */}
                    {course.category && (
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="absolute top-3 right-3"
                        >
                            <Badge className="bg-background/90 backdrop-blur-sm text-foreground border border-border font-medium px-3 py-1 shadow-sm">
                                {course.category}
                            </Badge>
                        </motion.div>
                    )}

                    {/* Difficulty Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ ythumbnail: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-3 left-3"
                    >
                        <Badge
                            className={`${difficultyConfig[course.difficulty].className} border font-medium px-3 py-1 shadow-sm`}
                        >
                            {difficultyConfig[course.difficulty].label}
                        </Badge>
                    </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                    {/* Title */}
                    <Link href={`/courses/${course.id}`} passHref>
                        <motion.h3
                            className="text-xl font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {course.title}
                        </motion.h3>
                    </Link>

                    {/* Description */}
                    {course.description && (
                        <motion.p
                            className="text-sm text-muted-foreground line-clamp-2 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                        >
                            {course.description}
                        </motion.p>
                    )}

                    {/* Stats */}
                    <motion.div
                        className="flex items-center gap-4 mb-4 mt-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-medium">{course.totalLessons}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">{formatDuration(course.totalDuration)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium">{course.enrollmentCount.toLocaleString()}</span>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        className="flex items-center justify-between pt-4 border-t border-border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                    >
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-primary">
                                {formatPrice(course.price)}
                            </span>
                        </div>
                        <Link href={`/courses/${course.id}`} passHref>
                            <Button
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-6 shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Enroll Now
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    );
}
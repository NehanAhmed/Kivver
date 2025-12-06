// components/course/FeaturedCoursesSection.tsx
'use client';

import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/database';
import { CourseCards } from '../CourseCard';
import Link from 'next/link';


interface FeaturedCoursesSectionProps {
    courses?: Course[];
    onViewAll?: () => void;
}

export function FeaturedCoursesSection({
    courses = [],
    onViewAll,
}: FeaturedCoursesSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section className="py-16 px-4 md:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold ">Featured Courses</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-black mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Start Learning Today
                    </motion.h2>

                    <motion.p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Explore our hand-picked selection of premium courses designed to help you master new skills
                    </motion.p>
                </motion.div>

                {/* Course Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <motion.div key={course.id} variants={itemVariants}>
                                <CourseCards
                                    key={course.id} course={course}
                            

                                />
                            </motion.div>
                        ))
                    ) : (
                        // Placeholder cards for empty state
                        Array.from({ length: 6 }).map((_, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="h-[420px] bg-muted rounded-2xl animate-pulse"
                            />
                        ))
                    )}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link href='/explore'>
                    <Button
                        onClick={onViewAll}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                        View All Courses
                        <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>
                    </Button>
                            </Link>
                </motion.div>
            </div>
        </section>
    );
}
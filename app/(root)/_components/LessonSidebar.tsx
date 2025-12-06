'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Target, BookMarked, MessageCircle } from 'lucide-react';

export function LessonSidebar() {
    return (
        <div className="space-y-6">
            {/* Your Progress Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="p-6 border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Your Progress</h3>
                        <span className="text-sm text-muted-foreground">65%</span>
                    </div>

                    <Progress value={65} className="mb-6 h-2" />

                    <div className="space-y-4">
                        <ProgressItem
                            icon={<Trophy className="w-5 h-5" />}
                            label="XP Earned"
                            value="350"
                            color="text-yellow-600"
                            bgColor="bg-yellow-100 dark:bg-yellow-900"
                        />
                        <ProgressItem
                            icon={<Flame className="w-5 h-5" />}
                            label="Day Streak"
                            value="7"
                            color="text-orange-600"
                            bgColor="bg-orange-100 dark:bg-orange-900"
                        />
                        <ProgressItem
                            icon={<Target className="w-5 h-5" />}
                            label="Completed"
                            value="15/24"
                            color="text-green-600"
                            bgColor="bg-green-100 dark:bg-green-900"
                        />
                    </div>
                </Card>
            </motion.div>

            {/* Quick Actions Car*/}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="p-6 border-border">
                    <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <QuickActionButton
                            icon={<BookMarked className="w-5 h-5" />}
                            label="Add to Bookmarks"
                        />
                        <QuickActionButton
                            icon={<MessageCircle className="w-5 h-5" />}
                            label="Ask Question"
                        />
                    </div>
                </Card>
            </motion.div>

            {/* Course Lessons List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="p-6 border-border">
                    <h3 className="font-semibold text-foreground mb-4">All Lessons</h3>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {[...Array(8)].map((_, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ x: 4 }}
                                className={`w-full text-left p-3 rounded-lg transition-colors ${index === 2
                                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-600'
                                    : 'hover:bg-accent'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${index < 2
                                        ? 'bg-green-600 text-white'
                                        : index === 2
                                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400'
                                            : 'bg-secondary text-muted-foreground'
                                        }`}>
                                        {index < 2 ? '✓' : index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            Lesson {index + 1}: Topic Name
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {index < 2 ? 'Completed' : index === 2 ? 'Current' : '15 min'}
                                        </p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
interface ProgressItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
    bgColor: string;
}
function ProgressItem({ icon, label, value, color, bgColor }: ProgressItemProps) {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center ${color}`}>
                    {icon}
                </div>
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <span className="text-lg font-bold text-foreground">{value}</span>
        </div >
        </>
);
}
interface QuickActionButtonProps {
    icon: React.ReactNode;
    label: string;
}
function QuickActionButton({ icon, label }: QuickActionButtonProps) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
                variant="outline"
                className="w-full justify-start gap-3 border-border hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
                <div className="text-green-600 dark:text-green-400">
                    {icon}
                </div>
                <span>{label}</span>
            </Button>
        </motion.div>
    );
}
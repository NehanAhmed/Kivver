'use client';

import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function LessonProgressBar() {
  const router = useRouter();
  // TODO: Get actual progress from API
  const progress = 45; // percentage

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Left - Back Button */}
          <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Button>
          </motion.div>

          {/* Center - Lesson Info */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>Lesson 3 of 24</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>15 min</span>
            </div>
          </div>

          {/* Right - Progress */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground hidden sm:block">
              {progress}% Complete
            </span>
            <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-green-600 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
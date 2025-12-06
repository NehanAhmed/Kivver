'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export function LessonNavigation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12 flex items-center justify-between gap-4"
    >
      {/* Previous Lesson */}
      <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-border hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <ChevronLeft className="w-5 h-5" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Previous</p>
            <p className="font-semibold text-foreground">Component Basics</p>
          </div>
        </Button>
      </motion.div>

      {/* Complete Lesson Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex-1 max-w-md"
      >
        <Button
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 h-14"
        >
          <CheckCircle2 className="w-5 h-5" />
          Complete & Continue
        </Button>
      </motion.div>

      {/* Next Lesson */}
      <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-border hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Next</p>
            <p className="font-semibold text-foreground">Advanced Patterns</p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
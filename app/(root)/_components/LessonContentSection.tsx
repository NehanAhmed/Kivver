'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Video, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { LessonContentRenderer } from '@/app/(root)/_components/LessonContentRenderer';

export function LessonContentSection() {
  // TODO: Fetch lesson content from API
  const [activeContent, setActiveContent] = useState(0);

  const contentItems = [
    { id: 1, type: 'video', order: 1 },
    { id: 2, type: 'text', order: 2 },
    { id: 3, type: 'quiz', order: 3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Content Navigation Tabs */}
      <Card className="p-2 border-border">
        <div className="flex items-center gap-2 overflow-x-auto">
          {contentItems.map((item, index) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveContent(index)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeContent === index
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-secondary text-muted-foreground hover:bg-accent'
              }`}
            >
              {item.type === 'video' && <Video className="w-4 h-4" />}
              {item.type === 'text' && <FileText className="w-4 h-4" />}
              {item.type === 'quiz' && <Brain className="w-4 h-4" />}
              <span className="font-medium">
                {item.type === 'video' && 'Video'}
                {item.type === 'text' && 'Reading'}
                {item.type === 'quiz' && 'Quiz'}
              </span>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Content Renderer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <LessonContentRenderer
            contentType={contentItems[activeContent].type}
            contentId={contentItems[activeContent].id}
          />
        </motion.div>
      </AnimatePresence>

      {/* Additional Resources Section */}
      <AdditionalResourcesSection />
    </motion.div>
  );
}

function AdditionalResourcesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-border overflow-hidden">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Additional Resources</h3>
            <p className="text-sm text-muted-foreground">Downloads, links, and references</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border"
          >
            <div className="p-6 space-y-3">
              {[
                'React Hooks Cheatsheet.pdf',
                'Code Examples Repository',
                'Official React Documentation',
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-foreground">{resource}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
// app/(seller)/_components/LessonView/LessonContentWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { LessonContentSection } from '../LessonCreate/LessonContentSection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { ContentBlock } from './lesson-content-type';

interface LessonContentWrapperProps {
  lessonId: number;
}

export function LessonContentWrapper({ lessonId }: LessonContentWrapperProps) {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContentBlocks();
  }, [lessonId]);

  const fetchContentBlocks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/lesson/id/${lessonId}/content`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch lesson content');
      }

      const result = await response.json();

      if (result.success && result.data) {
        const blocks: ContentBlock[] = result.data.map((block: {
          id: number;
          type: 'text' | 'video' | 'quiz';
          order: number;
          textContent: string | null;
          videoUrl: string | null;
          quizData: unknown;
        }) => ({
          id: `block_${block.id}`,
          type: block.type,
          order: block.order,
          textContent: block.textContent || undefined,
          videoUrl: block.videoUrl || undefined,
          quizData: block.quizData as ContentBlock['quizData'],
        }));

        setContentBlocks(blocks);
      }
    } catch (err) {
      console.error('Error fetching content blocks:', err);
      setError('Failed to load lesson content. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Loading lesson content</h3>
            <p className="text-sm text-muted-foreground">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
        <AlertDescription className="text-sm text-red-900 dark:text-red-100">
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <LessonContentSection
      lessonId={lessonId}
      initialContentBlocks={contentBlocks}
    />
  );
}
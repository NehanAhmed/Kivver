'use client';
// types/lesson.ts

export interface LessonFormData {
  title: string;
  description: string;
  order: number;
  duration: number;
  isPublished: boolean;
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'quiz';
  order: number;
  textContent?: string;
  videoUrl?: string;
  quizData?: QuizData;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

// app/seller/dashboard/course/[courseId]/lesson/create/page.tsx

import { Suspense, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { LessonDetailsForm } from '@/app/(seller)/_components/LessonCreate/LessonDetailForm';
import { LessonContentSection } from '@/app/(seller)/_components/LessonCreate/LessonContentSection';


export default function CreateLessonPage() {

  const params = useParams()
  const courseId = params.id as string


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10 rounded-2xl">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Create New Lesson</h1>
                  <p className="text-sm text-muted-foreground">Course ID: {courseId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl border-border"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md"
                >
                  Save & Publish
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className=" m-auto">
            {/* Lesson Details Section */}
            <LessonDetailsForm
              courseId={courseId}
            />

            {/* Lesson Content Section
          <LessonContentSection
            contentBlocks={contentBlocks}
            onContentBlocksChange={setContentBlocks}
          /> */}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
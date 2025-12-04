// app/(seller)/_components/LessonView/LessonContentWrapper.tsx

'use client';

import { useState } from 'react';
import { LessonContentSection } from '../LessonCreate/LessonContentSection';
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


interface LessonContentWrapperProps {
    lessonId: number;
}

export function LessonContentWrapper({ lessonId }: LessonContentWrapperProps) {
    // TODO: Fetch existing content blocks from API
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

    // TODO: Implement save to API
    const handleContentBlocksChange = (blocks: ContentBlock[]) => {
        setContentBlocks(blocks);
        // Save to API here
        console.log('Content blocks updated:', blocks);
    };

    return (
        <LessonContentSection
            contentBlocks={contentBlocks}
            onContentBlocksChange={handleContentBlocksChange}
        />
    );
}
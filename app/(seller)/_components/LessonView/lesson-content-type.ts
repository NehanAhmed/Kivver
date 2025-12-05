// app/(seller)/_components/LessonView/lesson-content-type.ts

export type ContentBlockType = 'text' | 'video' | 'quiz';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  order: number;
  textContent?: string;
  videoUrl?: string;
  quizData?: QuizData;
}

export interface LessonContentSectionProps {
  lessonId: number;
  initialContentBlocks?: ContentBlock[];
}

export interface SaveLessonContentPayload {
  lessonId: number;
  contentBlocks: Array<{
    type: ContentBlockType;
    order: number;
    textContent?: string;
    videoUrl?: string;
    quizData?: QuizData;
  }>;
}

export interface SaveLessonContentResponse {
  success: boolean;
  message: string;
  data?: {
    savedBlocks: number;
  };
}
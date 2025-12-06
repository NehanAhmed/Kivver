'use client';

import { useState } from 'react';
import { ContentBlockDisplayCard } from './ContentBlockDisplayCard';
import { ContentDisplayModal } from './ContentDisplayModal';

interface LessonContentItem {
  id: number;
  type: 'text' | 'video' | 'quiz';
  order: number;
  textContent?: string;
  videoUrl?: string;
  quizData?: {
    questions: {
      id: string;
      question: string;
      options: { id: string; text: string }[];
      correctAnswerId: string;
    }[];
  };
}

interface LessonContentListProps {
  lessonId: number;
  contentItems: LessonContentItem[];
}

export function LessonContentList({ lessonId, contentItems }: LessonContentListProps) {
  const [selectedContent, setSelectedContent] = useState<LessonContentItem | null>(null);

  const handleContentClick = (content: LessonContentItem) => {
    setSelectedContent(content);
  };

  const handleCloseModal = () => {
    setSelectedContent(null);
  };

  return (
    <div className="space-y-4">
      {contentItems.map((content) => (
        <ContentBlockDisplayCard
          key={content.id}
          id={content.id}
          type={content.type}
          order={content.order}
          onClick={() => handleContentClick(content)}
          isCompleted={false} // TODO: Track completion status
        />
      ))}

      {/* Modal */}
      {selectedContent && (
        <ContentDisplayModal
          isOpen={!!selectedContent}
          onClose={handleCloseModal}
          type={selectedContent.type}
          order={selectedContent.order}
          textContent={selectedContent.textContent}
          videoUrl={selectedContent.videoUrl}
          quizData={selectedContent.quizData}
        />
      )}
    </div>
  );
}
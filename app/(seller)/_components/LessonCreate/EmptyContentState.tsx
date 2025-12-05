// components/seller/lesson-create/EmptyContentState.tsx
import { Plus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentBlockType } from '../LessonView/lesson-content-type';

interface EmptyContentStateProps {
  onAddContent: (type: ContentBlockType) => void;
}

export function EmptyContentState({ onAddContent }: EmptyContentStateProps) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl bg-muted/30">
      <div className="w-20 h-20 rounded-2xl bg-green-50 dark:bg-green-950/20 flex items-center justify-center mx-auto mb-6 shadow-sm">
        <BookOpen className="w-10 h-10 text-green-500" />
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">
        No content blocks yet
      </h3>
      
      <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
        Start building your lesson by adding text explanations, video tutorials, or interactive quizzes
      </p>

      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={() => onAddContent('text')}
          variant="outline"
          className="rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-500 transition-all"
        >
          Add Text
        </Button>
        <Button
          onClick={() => onAddContent('video')}
          variant="outline"
          className="rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:border-purple-500 transition-all"
        >
          Add Video
        </Button>
        <Button
          onClick={() => onAddContent('quiz')}
          variant="outline"
          className="rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-500 transition-all"
        >
          Add Quiz
        </Button>
      </div>
    </div>
  );
}
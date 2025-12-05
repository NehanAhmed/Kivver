// components/seller/lesson-create/ContentBlockEditor.tsx
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentBlock } from '../LessonView/lesson-content-type';
import { TextBlockEditor } from './TextBlockEditor';
import { VideoBlockEditor } from './VideoBlockEditor';
import { QuizBlockEditor } from './QuizBlockEditor';

interface ContentBlockEditorProps {
  block: ContentBlock;
  onChange: (updates: Partial<ContentBlock>) => void;
  onClose: () => void;
}

export function ContentBlockEditor({ block, onChange, onClose }: ContentBlockEditorProps) {
  return (
    <div className="space-y-4">
      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Editing: {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="rounded-lg hover:bg-muted"
        >
          <X className="w-4 h-4 mr-2" />
          Close Editor
        </Button>
      </div>

      {/* Editor Content */}
      {block.type === 'text' && (
        <TextBlockEditor
          content={block.textContent || ''}
          onChange={(content) => onChange({ textContent: content })}
        />
      )}

      {block.type === 'video' && (
        <VideoBlockEditor
          videoUrl={block.videoUrl || ''}
          onChange={(url) => onChange({ videoUrl: url })}
        />
      )}

      {block.type === 'quiz' && (
        <QuizBlockEditor
          quizData={block.quizData || { questions: [] }}
          onChange={(data) => onChange({ quizData: data })}
        />
      )}
    </div>
  );
}
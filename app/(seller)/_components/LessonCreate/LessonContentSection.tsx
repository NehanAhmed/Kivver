'use client'
// components/seller/lesson-create/LessonContentSection.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Video, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ContentBlock } from '../../seller/dashboard/course/[id]/lesson/create/page';
import { ContentBlockCard } from './ContentBlockCard';
import { TextBlockEditor } from './TextBlockEditor';
import { VideoBlockEditor } from './VideoBlockEditor';
import { QuizBlockEditor } from './QuizBlockEditor';


interface LessonContentSectionProps {
  contentBlocks: ContentBlock[];
  onContentBlocksChange: (blocks: ContentBlock[]) => void;
}

export function LessonContentSection({
  contentBlocks,
  onContentBlocksChange,
}: LessonContentSectionProps) {
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  const addContentBlock = (type: 'text' | 'video' | 'quiz') => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type,
      order: contentBlocks.length + 1,
      textContent: type === 'text' ? '' : undefined,
      videoUrl: type === 'video' ? '' : undefined,
      quizData: type === 'quiz' ? { questions: [] } : undefined,
    };

    onContentBlocksChange([...contentBlocks, newBlock]);
    setEditingBlockId(newBlock.id);
  };

  const deleteContentBlock = (blockId: string) => {
    onContentBlocksChange(contentBlocks.filter((block) => block.id !== blockId));
    if (editingBlockId === blockId) {
      setEditingBlockId(null);
    }
  };

  const updateContentBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    onContentBlocksChange(
      contentBlocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    );
  };

  const editingBlock = contentBlocks.find((block) => block.id === editingBlockId);

  return (
    <Card className="border border-border rounded-2xl p-8 bg-card shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Lesson Content</h2>
            <p className="text-muted-foreground text-sm">
              Add content blocks to build your lesson
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md">
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => addContentBlock('text')}>
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                Text Content
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addContentBlock('video')}>
                <Video className="w-4 h-4 mr-2 text-purple-500" />
                Video Content
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addContentBlock('quiz')}>
                <HelpCircle className="w-4 h-4 mr-2 text-orange-500" />
                Quiz
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-6">
        {contentBlocks.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No content blocks yet</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Start adding text, videos, or quizzes to your lesson
            </p>
          </div>
        ) : (
          <>
            {/* Content Blocks List */}
            <div className="space-y-3">
              {contentBlocks.map((block) => (
                <div
                  key={block.id}
                  onClick={() => setEditingBlockId(block.id)}
                  className="cursor-pointer"
                >
                  <ContentBlockCard block={block} onDelete={deleteContentBlock} />
                </div>
              ))}
            </div>

            {/* Editor Section */}
            {editingBlock && (
              <div className="pt-6 border-t border-border">
                {editingBlock.type === 'text' && (
                  <TextBlockEditor
                    content={editingBlock.textContent || ''}
                    onChange={(content) =>
                      updateContentBlock(editingBlock.id, { textContent: content })
                    }
                  />
                )}

                {editingBlock.type === 'video' && (
                  <VideoBlockEditor
                    videoUrl={editingBlock.videoUrl || ''}
                    onChange={(url) =>
                      updateContentBlock(editingBlock.id, { videoUrl: url })
                    }
                  />
                )}

                {editingBlock.type === 'quiz' && (
                  <QuizBlockEditor
                    quizData={editingBlock.quizData || { questions: [] }}
                    onChange={(data) =>
                      updateContentBlock(editingBlock.id, { quizData: data })
                    }
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
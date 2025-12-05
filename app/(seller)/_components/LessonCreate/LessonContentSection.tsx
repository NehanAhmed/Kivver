// components/seller/lesson-create/LessonContentSection.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Save, Loader2 } from 'lucide-react';

import { ContentBlockCard } from './ContentBlockCard';
import { ContentBlockEditor } from './ContentBlockEditor';
import { EmptyContentState } from './EmptyContentState';
import { ContentBlock, ContentBlockType, LessonContentSectionProps, SaveLessonContentPayload } from '../LessonView/lesson-content-type';
import { ContentTypeMenu } from './ContentType';
import { toast } from 'sonner';

export function LessonContentSection({
  lessonId,
  initialContentBlocks = [],
}: LessonContentSectionProps) {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(initialContentBlocks);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // ==================== HANDLERS ====================
  
  const addContentBlock = (type: ContentBlockType) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type,
      order: contentBlocks.length + 1,
      textContent: type === 'text' ? '' : undefined,
      videoUrl: type === 'video' ? '' : undefined,
      quizData: type === 'quiz' ? { questions: [] } : undefined,
    };

    setContentBlocks((prev) => [...prev, newBlock]);
    setEditingBlockId(newBlock.id);
    setHasUnsavedChanges(true);
  };

  const deleteContentBlock = (blockId: string) => {
    setContentBlocks((prev) => prev.filter((block) => block.id !== blockId));
    
    if (editingBlockId === blockId) {
      setEditingBlockId(null);
    }
    
    setHasUnsavedChanges(true);
    toast.success('Content block deleted');
  };

  const updateContentBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setContentBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    );
    setHasUnsavedChanges(true);
  };

  // ==================== VALIDATION ====================
  
  const validateContentBlocks = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    contentBlocks.forEach((block, index) => {
      const blockNumber = index + 1;

      switch (block.type) {
        case 'text':
          if (!block.textContent || block.textContent.trim().length < 10) {
            errors.push(`Block ${blockNumber} (Text): Content must be at least 10 characters`);
          }
          break;

        case 'video':
          if (!block.videoUrl || !isValidVideoUrl(block.videoUrl)) {
            errors.push(`Block ${blockNumber} (Video): Valid video URL required`);
          }
          break;

        case 'quiz':
          if (!block.quizData || block.quizData.questions.length === 0) {
            errors.push(`Block ${blockNumber} (Quiz): At least one question required`);
          } else {
            block.quizData.questions.forEach((question, qIndex) => {
              if (!question.question.trim()) {
                errors.push(`Block ${blockNumber} (Quiz): Question ${qIndex + 1} is empty`);
              }
              if (question.options.length < 2) {
                errors.push(`Block ${blockNumber} (Quiz): Question ${qIndex + 1} needs at least 2 options`);
              }
              if (!question.correctAnswerId) {
                errors.push(`Block ${blockNumber} (Quiz): Question ${qIndex + 1} has no correct answer`);
              }
            });
          }
          break;
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const isValidVideoUrl = (url: string): boolean => {
    const videoPatterns = [
      /youtube\.com\/watch\?v=/,
      /youtu\.be\//,
      /vimeo\.com\//,
      /\.(mp4|webm|ogg)$/i,
    ];
    
    return videoPatterns.some((pattern) => pattern.test(url));
  };

  // ==================== SAVE FUNCTIONALITY ====================
  
  const handleSaveContent = async () => {
    const validation = validateContentBlocks();
    
    if (!validation.isValid) {
      toast.error('Validation Error', {
        description: validation.errors.join('\n'),
      });
      return;
    }

    if (contentBlocks.length === 0) {
      toast.error('No Content', {
        description: 'Please add at least one content block before saving.',
      });
      return;
    }

    setIsSaving(true);

    try {
      const payload: SaveLessonContentPayload = {
        lessonId,
        contentBlocks: contentBlocks.map((block) => ({
          type: block.type,
          order: block.order,
          textContent: block.textContent,
          videoUrl: block.videoUrl,
          quizData: block.quizData,
        })),
      };

      // SIMPLIFIED: Only lessonId in URL
      const response = await fetch(`/api/lesson/id/${lessonId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save lesson content');
      }

      const result = await response.json();
      setHasUnsavedChanges(false);

      toast.success('Content Saved', {
        description: `Successfully saved ${result.data.savedBlocks} content block${result.data.savedBlocks !== 1 ? 's' : ''}.`,
      });
    } catch (error) {
      console.error('Error saving lesson content:', error);
      toast.error('Save Failed', {
        description: 'Failed to save lesson content. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ==================== RENDER ====================
  
  const editingBlock = contentBlocks.find((block) => block.id === editingBlockId);

  return (
    <Card className="border border-border rounded-2xl p-8 bg-card shadow-sm">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Lesson Content</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Add content blocks to build your lesson
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSaveContent}
              disabled={isSaving || contentBlocks.length === 0}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Content
                </>
              )}
            </Button>
            <ContentTypeMenu onSelectType={addContentBlock} />
          </div>
        </div>

        {hasUnsavedChanges && (
          <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/20 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-medium">You have unsaved changes</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {contentBlocks.length === 0 ? (
          <EmptyContentState onAddContent={addContentBlock} />
        ) : (
          <>
            <div className="space-y-3">
              {contentBlocks.map((block) => (
                <ContentBlockCard
                  key={block.id}
                  block={block}
                  isActive={editingBlockId === block.id}
                  onEdit={() => setEditingBlockId(block.id)}
                  onDelete={deleteContentBlock}
                />
              ))}
            </div>

            {editingBlock && (
              <div className="pt-6 border-t border-border">
                <ContentBlockEditor
                  block={editingBlock}
                  onChange={(updates) => updateContentBlock(editingBlock.id, updates)}
                  onClose={() => setEditingBlockId(null)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
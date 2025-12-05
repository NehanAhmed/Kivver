// components/seller/lesson-create/ContentBlockCard.tsx
import { GripVertical, Trash2, FileText, Video, HelpCircle, ChevronRight, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ContentBlock } from '../LessonView/lesson-content-type';

interface ContentBlockCardProps {
  block: ContentBlock;
  isActive?: boolean;
  onEdit: () => void;
  onDelete: (blockId: string) => void;
}

export function ContentBlockCard({ 
  block, 
  isActive = false, 
  onEdit, 
  onDelete 
}: ContentBlockCardProps) {
  
  const getBlockConfig = () => {
    switch (block.type) {
      case 'text':
        return {
          icon: FileText,
          title: 'Text Content',
          bgColor: 'bg-blue-50 dark:bg-blue-950/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          iconBg: 'bg-blue-500',
          badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100',
          activeBorder: 'ring-2 ring-blue-500 border-blue-500',
          description: getTextPreview(),
        };
      case 'video':
        return {
          icon: Video,
          title: 'Video Content',
          bgColor: 'bg-purple-50 dark:bg-purple-950/20',
          borderColor: 'border-purple-200 dark:border-purple-800',
          iconBg: 'bg-purple-500',
          badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100',
          activeBorder: 'ring-2 ring-purple-500 border-purple-500',
          description: getVideoPreview(),
        };
      case 'quiz':
        return {
          icon: HelpCircle,
          title: 'Quiz',
          bgColor: 'bg-orange-50 dark:bg-orange-950/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          iconBg: 'bg-orange-500',
          badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100',
          activeBorder: 'ring-2 ring-orange-500 border-orange-500',
          description: getQuizPreview(),
        };
    }
  };

  const getTextPreview = () => {
    if (!block.textContent) return 'No content yet';
    const preview = block.textContent.slice(0, 60);
    return preview.length < block.textContent.length ? `${preview}...` : preview;
  };

  const getVideoPreview = () => {
    if (!block.videoUrl) return 'No video added';
    try {
      const url = new URL(block.videoUrl);
      return url.hostname.replace('www.', '');
    } catch {
      return 'Video URL added';
    }
  };

  const getQuizPreview = () => {
    const questionCount = block.quizData?.questions?.length || 0;
    if (questionCount === 0) return 'No questions yet';
    return `${questionCount} ${questionCount === 1 ? 'question' : 'questions'}`;
  };

  const config = getBlockConfig();
  const Icon = config.icon;

  return (
    <Card
      onClick={onEdit}
      className={cn(
        'border rounded-xl p-4 transition-all duration-200 cursor-pointer group hover:shadow-lg',
        config.bgColor,
        config.borderColor,
        isActive && config.activeBorder
      )}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Icon Container */}
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shadow-sm', config.iconBg)}>
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground">
              {config.title}
            </h4>
            <Badge variant="secondary" className={cn('text-xs font-medium px-2 py-0.5', config.badgeColor)}>
              #{block.order}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {config.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
            title="Edit block"
          >
            <Edit2 className="w-4 h-4" />
          </Button>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(block.id);
            }}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete block"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-medium">Currently editing</span>
          </div>
        </div>
      )}
    </Card>
  );
}
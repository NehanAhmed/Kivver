'use client';

import { FileText, Video, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ContentBlockDisplayCardProps {
  id: number;
  type: 'text' | 'video' | 'quiz';
  order: number;
  onClick: () => void;
  isCompleted?: boolean;
}

export function ContentBlockDisplayCard({
  id,
  type,
  order,
  onClick,
  isCompleted = false,
}: ContentBlockDisplayCardProps) {
  
  const getBlockConfig = () => {
    switch (type) {
      case 'text':
        return {
          icon: FileText,
          title: 'Reading Material',
          bgColor: 'bg-blue-50 dark:bg-blue-950/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          iconBg: 'bg-blue-500',
          badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100',
          hoverBorder: 'hover:border-blue-500',
        };
      case 'video':
        return {
          icon: Video,
          title: 'Video Lesson',
          bgColor: 'bg-purple-50 dark:bg-purple-950/20',
          borderColor: 'border-purple-200 dark:border-purple-800',
          iconBg: 'bg-purple-500',
          badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100',
          hoverBorder: 'hover:border-purple-500',
        };
      case 'quiz':
        return {
          icon: HelpCircle,
          title: 'Quiz Challenge',
          bgColor: 'bg-orange-50 dark:bg-orange-950/20',
          borderColor: 'border-orange-200 dark:border-orange-800',
          iconBg: 'bg-orange-500',
          badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100',
          hoverBorder: 'hover:border-orange-500',
        };
    }
  };

  const config = getBlockConfig();
  const Icon = config.icon;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'border rounded-xl p-5 transition-all duration-200 cursor-pointer group hover:shadow-lg',
        config.bgColor,
        config.borderColor,
        config.hoverBorder,
        isCompleted && 'ring-2 ring-green-500 border-green-500'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110',
          config.iconBg
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-base font-semibold text-foreground">
              {config.title}
            </h4>
            <Badge variant="secondary" className={cn('text-xs font-medium px-2 py-0.5', config.badgeColor)}>
              #{order}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Click to {type === 'quiz' ? 'start' : 'view'}
          </p>
        </div>

        {/* Completion Indicator */}
        {isCompleted && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
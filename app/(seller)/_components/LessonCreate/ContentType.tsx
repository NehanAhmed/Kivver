// components/seller/lesson-create/ContentTypeMenu.tsx
import { Plus, FileText, Video, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ContentBlockType } from '../LessonView/lesson-content-type';

interface ContentTypeMenuProps {
  onSelectType: (type: ContentBlockType) => void;
}

export function ContentTypeMenu({ onSelectType }: ContentTypeMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary hover:bg-green-600 text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 p-2">
        <DropdownMenuItem
          onClick={() => onSelectType('text')}
          className="rounded-lg p-3 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-950/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Text Content</p>
              <p className="text-xs text-muted-foreground">Add written lessons</p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onSelectType('video')}
          className="rounded-lg p-3 cursor-pointer focus:bg-purple-50 dark:focus:bg-purple-950/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Video Content</p>
              <p className="text-xs text-muted-foreground">Embed video lessons</p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onSelectType('quiz')}
          className="rounded-lg p-3 cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-950/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Quiz</p>
              <p className="text-xs text-muted-foreground">Test knowledge</p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
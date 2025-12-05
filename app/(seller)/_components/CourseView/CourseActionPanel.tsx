// components/seller/course-view/CourseActionsPanel.tsx
'use client'
import { Settings, Trash2, Eye, Share2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

interface CourseActionsPanelProps {
  id: number
}

export function CourseActionsPanel({
  id
}: CourseActionsPanelProps) {
  const onEditCourse = () => {
    router.push(`/seller/dashboard/course/${id}/edit`);
  };
  const router = useRouter();


  const onPreviewCourse = () => {
    // Preview logic
    console.log('Preview course');
  };

  const onShareCourse = () => {
    // Share logic
    console.log('Share course');
  };

  const onDeleteCourse = () => {
    // Delete logic
    console.log('Delete course');
  };
  return (
    <Card className="border border-border rounded-2xl p-6 bg-card shadow-sm">
      <h3 className="text-sm font-bold text-foreground mb-4">Course Actions</h3>

      <div className="space-y-2">
        {/* Edit Course */}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl"
          onClick={onEditCourse}
        >
          <Settings className="w-4 h-4 mr-3" />
          Edit Course
        </Button>

        {/* Preview Course */}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl"
          onClick={onPreviewCourse}
        >
          <Eye className="w-4 h-4 mr-3" />
          Preview
        </Button>

        {/* Share Course */}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl"
          onClick={onShareCourse}
        >
          <Share2 className="w-4 h-4 mr-3" />
          Share
        </Button>

        <div className="pt-2 border-t border-border">
          {/* Delete Course */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
            onClick={onDeleteCourse}
          >
            <Trash2 className="w-4 h-4 mr-3" />
            Delete Course
          </Button>
        </div>
      </div>

      {/* More Options - Mobile */}
      <div className="mt-4 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full rounded-xl">
              <MoreVertical className="w-4 h-4 mr-2" />
              More Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onEditCourse}>
              <Settings className="w-4 h-4 mr-2" />
              Edit Course
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onPreviewCourse}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShareCourse}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDeleteCourse} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
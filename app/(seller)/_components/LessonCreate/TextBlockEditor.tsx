// components/seller/lesson-create/editors/TextBlockEditor.tsx
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TextBlockEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TextBlockEditor({ content, onChange }: TextBlockEditorProps) {
  const characterCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <Card className="border-blue-500/20 bg-blue-50 dark:bg-blue-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">Text Content</CardTitle>
            <CardDescription>Add text-based learning content for your students</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label htmlFor="textContent" className="text-sm font-semibold">
            Lesson Content <span className="text-red-600">*</span>
          </Label>
          <Textarea
            id="textContent"
            placeholder="Write your lesson content here. You can include explanations, examples, and key points...&#10;&#10;**Tip:** Use markdown formatting for better readability:&#10;- Use **bold** for emphasis&#10;- Use # for headings&#10;- Use - or * for bullet points"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            className="rounded-xl bg-white dark:bg-gray-900 border-blue-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 resize-none font-mono text-sm"
          />
          
          {/* Character/Word Count */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{wordCount} words • {characterCount} characters</span>
            {characterCount > 0 && characterCount < 50 && (
              <span className="text-orange-600">Consider adding more detail</span>
            )}
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="bg-blue-100 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
            Markdown formatting is supported. Use ** for bold, * for italic, # for headings, and - for lists.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
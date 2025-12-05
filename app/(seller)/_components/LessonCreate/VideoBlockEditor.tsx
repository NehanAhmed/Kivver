// components/seller/lesson-create/editors/VideoBlockEditor.tsx
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Upload, Link2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface VideoBlockEditorProps {
  videoUrl: string;
  onChange: (url: string) => void;
}

export function VideoBlockEditor({ videoUrl, onChange }: VideoBlockEditorProps) {
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);

  const validateUrl = (url: string) => {
    if (!url) {
      setIsValidUrl(null);
      return;
    }
    
    const videoPatterns = [
      /youtube\.com\/watch\?v=/,
      /youtu\.be\//,
      /vimeo\.com\//,
      /\.(mp4|webm|ogg)$/i
    ];
    
    const valid = videoPatterns.some(pattern => pattern.test(url));
    setIsValidUrl(valid);
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    validateUrl(url);
  };

  return (
    <Card className="border-purple-500/20 bg-purple-50 dark:bg-purple-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-md">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">Video Content</CardTitle>
            <CardDescription>Add a video to enhance your lesson experience</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Video URL Input */}
        <div className="space-y-3">
          <Label htmlFor="videoUrl" className="text-sm font-semibold flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Video URL <span className="text-red-600">*</span>
          </Label>
          <div className="relative">
            <Input
              id="videoUrl"
              type="url"
              placeholder="https://youtube.com/watch?v=example or https://vimeo.com/123456789"
              value={videoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="rounded-xl bg-white dark:bg-gray-900 border-purple-200 focus-visible:ring-purple-500 focus-visible:border-purple-500 pr-10"
            />
            {videoUrl && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidUrl === true && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                {isValidUrl === false && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          
          {/* Validation Message */}
          {videoUrl && isValidUrl === false && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Please enter a valid YouTube, Vimeo, or direct video link
            </p>
          )}
          {videoUrl && isValidUrl === true && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Valid video URL
            </p>
          )}
        </div>

        {/* Supported Platforms */}
        <Alert className="bg-purple-100 border-purple-200 dark:bg-purple-950/50 dark:border-purple-800">
          <Video className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-sm text-purple-900 dark:text-purple-100">
            Supported: YouTube, Vimeo, and direct video files (.mp4, .webm, .ogg)
          </AlertDescription>
        </Alert>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Or</span>
          <Separator className="flex-1" />
        </div>

        {/* Upload Button */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full rounded-xl border-dashed border-2 border-purple-300 py-8 hover:bg-purple-100 hover:border-purple-500 dark:hover:bg-purple-950/50 transition-all group"
            type="button"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Upload Video File</p>
                <p className="text-xs text-muted-foreground">or drag and drop</p>
              </div>
              <p className="text-xs text-muted-foreground">MP4, WEBM or OGG (max. 500MB)</p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
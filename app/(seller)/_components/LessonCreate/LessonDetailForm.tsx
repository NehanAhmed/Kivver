// components/seller/lesson-create/LessonDetailsForm.tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { createLesson } from '@/lib/apiFetches/SellerCourses';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function LessonDetailsForm({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [order, setOrder] = useState<string>(''); // Keep as string for input
  const [duration, setDuration] = useState<string>(''); // Keep as string for input
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Lesson title is required!');
      return;
    }

    if (!order.trim()) {
      setError('Lesson order is required!');
      return;
    }

    const orderNum = parseInt(order, 10);
    const durationNum = duration.trim() ? parseInt(duration, 10) : 0;

    if (isNaN(orderNum) || orderNum < 1) {
      setError('Lesson order must be a positive number!');
      return;
    }

    if (isNaN(durationNum) || durationNum < 0) {
      setError('Duration must be a non-negative number!');
      return;
    }

    const formData = {
      courseId: parseInt(courseId),
      title: title.trim(),
      description: description.trim() || undefined,
      order: orderNum,
      duration: durationNum,
      isPublished,
    };

    try {
      setIsSubmitting(true);
      const response = await createLesson({ data: formData });
      
      // Success - you might want to redirect or show success message
    toast.success('Lesson created successfully!');      
    router.push(`/seller/dashboard/course/${courseId}/lesson/${response.id}`);
      // Optional: Reset form or redirect
      // router.push(`/seller/dashboard/course/${courseId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create lesson';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="my-3">
          <AlertTitle>
            <div className="flex gap-3 items-center">
              <AlertCircle />
              {error}
            </div>
          </AlertTitle>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <Card className="border border-border rounded-2xl p-8 bg-card shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Lesson Details</h2>
            <p className="text-muted-foreground text-sm">
              Provide basic information about this lesson
            </p>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-foreground">
                Lesson Title <span className="text-red-600">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to React Hooks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-xl border-border focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of what students will learn in this lesson..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="rounded-xl border-border focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>

            {/* Order and Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order */}
              <div className="space-y-2">
                <Label htmlFor="order" className="text-sm font-semibold text-foreground">
                  Lesson Order <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="order"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="rounded-xl border-border focus:ring-green-500 focus:border-green-500"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  The order in which this lesson appears in the course
                </p>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-semibold text-foreground">
                  Duration (seconds)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  placeholder="300"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="rounded-xl border-border focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-muted-foreground">
                  Estimated time to complete this lesson
                </p>
              </div>
            </div>

            {/* Publish Status */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
              <div className="space-y-0.5">
                <Label htmlFor="isPublished" className="text-sm font-semibold text-foreground">
                  Publish Lesson
                </Label>
                <p className="text-xs text-muted-foreground">
                  Make this lesson visible to students
                </p>
              </div>
              <Switch
                id="isPublished"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>

            <div>
              <div className="my-10 w-full flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Lesson'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </form>
    </>
  );
}
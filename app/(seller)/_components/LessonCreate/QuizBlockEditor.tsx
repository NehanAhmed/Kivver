// components/seller/lesson-create/editors/QuizBlockEditor.tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Plus, Trash2, CheckCircle2, GripVertical } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
}

interface QuizData {
  questions: QuizQuestion[];
}

interface QuizBlockEditorProps {
  quizData: QuizData;
  onChange: (data: QuizData) => void;
}

export function QuizBlockEditor({ quizData, onChange }: QuizBlockEditorProps) {
  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q_${Date.now()}`,
      question: '',
      options: [
        { id: `opt_${Date.now()}_1`, text: '' },
        { id: `opt_${Date.now()}_2`, text: '' },
      ],
      correctAnswerId: '',
    };

    onChange({
      questions: [...quizData.questions, newQuestion],
    });
  };

  const updateQuestion = (questionId: string, field: string, value: string) => {
    const updatedQuestions = quizData.questions.map((q) =>
      q.id === questionId ? { ...q, [field]: value } : q
    );
    onChange({ questions: updatedQuestions });
  };

  const deleteQuestion = (questionId: string) => {
    onChange({
      questions: quizData.questions.filter((q) => q.id !== questionId),
    });
  };

  const addOption = (questionId: string) => {
    const updatedQuestions = quizData.questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [
            ...q.options,
            { id: `opt_${Date.now()}`, text: '' },
          ],
        };
      }
      return q;
    });
    onChange({ questions: updatedQuestions });
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    const updatedQuestions = quizData.questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.map((opt) =>
            opt.id === optionId ? { ...opt, text } : opt
          ),
        };
      }
      return q;
    });
    onChange({ questions: updatedQuestions });
  };

  const deleteOption = (questionId: string, optionId: string) => {
    const updatedQuestions = quizData.questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.filter((opt) => opt.id !== optionId),
        };
      }
      return q;
    });
    onChange({ questions: updatedQuestions });
  };

  const setCorrectAnswer = (questionId: string, optionId: string) => {
    updateQuestion(questionId, 'correctAnswerId', optionId);
  };

  return (
    <Card className="border-orange-500/20 bg-orange-50 dark:bg-orange-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Quiz</CardTitle>
              <CardDescription>Test your students' knowledge with interactive questions</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100">
            {quizData.questions.length} {quizData.questions.length === 1 ? 'Question' : 'Questions'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {quizData.questions.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-orange-300 dark:border-orange-800 rounded-xl bg-white dark:bg-orange-950/20">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">No questions yet</h4>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Create your first quiz question to start testing your students
            </p>
            <Button
              onClick={addQuestion}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Question
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {quizData.questions.map((question, qIndex) => (
                <Card key={question.id} className="border-orange-200 bg-white dark:bg-gray-900 shadow-sm">
                  <CardContent className="p-5">
                    {/* Question Header */}
                    <div className="flex items-start gap-3 mb-5">
                      <button className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mt-2">
                        <GripVertical className="w-5 h-5" />
                      </button>
                      <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100 mt-2 font-semibold">
                        Q{qIndex + 1}
                      </Badge>
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Enter your question..."
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          className="rounded-xl border-orange-200 focus-visible:ring-orange-500 focus-visible:border-orange-500 font-medium text-base"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Separator className="mb-4" />

                    {/* Options */}
                    <div className="ml-12 space-y-3">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Answer Options
                      </Label>
                      {question.options.map((option, oIndex) => (
                        <div key={option.id} className="flex items-center gap-3 group">
                          <button
                            onClick={() => setCorrectAnswer(question.id, option.id)}
                            className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                              question.correctAnswerId === option.id
                                ? 'border-green-500 bg-green-500 shadow-md'
                                : 'border-gray-300 hover:border-green-400 hover:shadow-sm'
                            }`}
                            title={question.correctAnswerId === option.id ? 'Correct answer' : 'Mark as correct'}
                          >
                            {question.correctAnswerId === option.id && (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            )}
                          </button>
                          <Input
                            placeholder={`Option ${oIndex + 1}`}
                            value={option.text}
                            onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                            className="rounded-xl border-border flex-1 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteOption(question.id, option.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={question.options.length <= 2}
                            title={question.options.length <= 2 ? 'Minimum 2 options required' : 'Delete option'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                        className="rounded-xl border-dashed w-full border-orange-300 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/50 mt-2"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>

                    {/* Validation Alert */}
                    {!question.correctAnswerId && question.options.some(opt => opt.text) && (
                      <Alert className="mt-4 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800">
                        <AlertDescription className="text-xs text-yellow-800 dark:text-yellow-100">
                          Please mark the correct answer by clicking on the circle next to it
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Question Button */}
            <Button
              onClick={addQuestion}
              variant="outline"
              className="w-full rounded-xl border-dashed border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/50 py-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Question
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
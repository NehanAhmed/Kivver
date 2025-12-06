'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, HelpCircle, X, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
interface QuizQuestion {
    id: string;
    question: string;
    options: { id: string; text: string }[];
    correctAnswerId: string;
}

interface QuizData {
    questions: QuizQuestion[];
}

interface ContentDisplayModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'text' | 'video' | 'quiz';
    order: number;
    textContent?: string;
    videoUrl?: string;
    quizData?: QuizData;
}

export function ContentDisplayModal({
    isOpen,
    onClose,
    type,
    order,
    textContent,
    videoUrl,
    quizData,
}: ContentDisplayModalProps) {

    const getModalConfig = () => {
        switch (type) {
            case 'text':
                return {
                    icon: FileText,
                    title: 'Reading Material',
                    subtitle: 'Expand your knowledge',
                    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
                    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100',
                    glowColor: 'shadow-blue-500/20',
                    accentColor: 'text-blue-600',
                };
            case 'video':
                return {
                    icon: Video,
                    title: 'Video Lesson',
                    subtitle: 'Watch and learn',
                    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
                    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100',
                    glowColor: 'shadow-purple-500/20',
                    accentColor: 'text-purple-600',
                };
            case 'quiz':
                return {
                    icon: HelpCircle,
                    title: 'Quiz Challenge',
                    subtitle: 'Test your knowledge',
                    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
                    badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100',
                    glowColor: 'shadow-orange-500/20',
                    accentColor: 'text-orange-600',
                };
        }
    };

    const config = getModalConfig();
    const Icon = config.icon;

    return (
        <div className='min-w-7xl'>
            <Dialog open={isOpen} onOpenChange={onClose} >
                <DialogContent className="max-w-8xl max-h-[90vh] overflow-hidden rounded-3xl p-0 gap-0 border-0 shadow-2xl">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 pointer-events-none" />

                    {/* Floating Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
                    />

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <DialogHeader className="relative z-10 bg-card/80 backdrop-blur-xl border-b border-border/50 p-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 15,
                                            delay: 0.2
                                        }}
                                        className={cn(
                                            'w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl',
                                            config.iconBg,
                                            config.glowColor
                                        )}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <div>
                                        <DialogTitle className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
                                            {config.title}
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 10, -10, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <Sparkles className={cn("w-5 h-5", config.accentColor)} />
                                            </motion.div>
                                        </DialogTitle>
                                        <p className="text-sm text-muted-foreground">{config.subtitle}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge
                                                variant="secondary"
                                                className={cn('text-xs font-semibold px-3 py-1 shadow-sm', config.badgeColor)}
                                            >
                                                Section #{order}
                                            </Badge>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>~5 min</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent transition-colors flex items-center justify-center"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </motion.button>
                            </div>
                        </DialogHeader>
                    </motion.div>

                    {/* Content - Scrollable */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative z-10 overflow-y-auto max-h-[calc(90vh-240px)] p-8 min-w-7xl"
                    >
                        <AnimatePresence mode="wait">
                            {type === 'text' && <TextContentDisplay content={textContent || ''} />}
                            {type === 'video' && <VideoContentDisplay videoUrl={videoUrl || ''} />}
                            {type === 'quiz' && <QuizContentDisplay quizData={quizData} />}
                        </AnimatePresence>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="relative z-10 bg-card/80 backdrop-blur-xl border-t border-border/50 p-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="rounded-xl border-border hover:bg-accent"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Close
                                </Button>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={onClose}
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all px-6 h-11"
                                >
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Mark as Complete
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="ml-2"
                                    >
                                        ✨
                                    </motion.div>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// ==================== TEXT CONTENT DISPLAY ====================
interface TextContentDisplayProps {
    content: string;
}

function TextContentDisplay({ content }: TextContentDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="prose prose-lg max-w-none dark:prose-invert"
        >
            <div className="bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl p-8 border border-border shadow-lg">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}

                >
                    {content || 'No content available'}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
}
// ==================== VIDEO CONTENT DISPLAY ====================
interface VideoContentDisplayProps {
    videoUrl: string;
}

function VideoContentDisplay({ videoUrl }: VideoContentDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                {/* TODO: You will replace this with your video player */}
                <div className="w-full h-full flex items-center justify-center relative">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl"
                    />
                    <div className="text-center text-white relative z-10">
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Video className="w-20 h-20 mx-auto mb-4 opacity-50" />
                        </motion.div>
                        <p className="text-lg font-medium opacity-90 mb-2">Video Player Will Render Here</p>
                        <p className="text-sm opacity-60 max-w-md mx-auto break-all px-4">{videoUrl}</p>
                    </div>
                </div>
            </div>

            {/* Video Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">Video Lesson</h4>
                        <p className="text-sm text-muted-foreground">
                            Watch the full video to understand the concepts thoroughly. You can pause and replay as needed.
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ==================== QUIZ CONTENT DISPLAY ====================
interface QuizContentDisplayProps {
    quizData?: QuizData;
}

function QuizContentDisplay({ quizData }: QuizContentDisplayProps) {
    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
            >
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <HelpCircle className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                </motion.div>
                <p className="text-muted-foreground text-lg">No quiz questions available</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            {/* Quiz Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg"
                        >
                            <HelpCircle className="w-7 h-7 text-white" />
                        </motion.div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground">Test Your Knowledge</h3>
                            <p className="text-sm text-muted-foreground">
                                {quizData.questions.length} {quizData.questions.length === 1 ? 'question' : 'questions'} to complete
                            </p>
                        </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100 font-semibold px-4 py-2 text-sm">
                        +50 XP
                    </Badge>
                </div>
            </motion.div>

            {/* Questions */}
            <div className="space-y-5">
                {quizData.questions.map((question, index) => (
                    <QuizQuestionCard
                        key={question.id}
                        question={question}
                        questionNumber={index + 1}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ==================== QUIZ QUESTION CARD ====================
interface QuizQuestionCardProps {
    question: QuizQuestion;
    questionNumber: number;
    delay?: number;
}

function QuizQuestionCard({ question, questionNumber, delay = 0 }: QuizQuestionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
        >
            {/* Question */}
            <div className="flex items-start gap-4 mb-6">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex-shrink-0"
                >
                    <Badge className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold px-4 py-2 text-base shadow-md">
                        Q{questionNumber}
                    </Badge>
                </motion.div>
                <p className="text-xl font-semibold text-foreground flex-1 leading-relaxed">
                    {question.question}
                </p>
            </div>

            {/* Options */}
            <div className="space-y-3 ml-2">
                {question.options.map((option, index) => (
                    <QuizOptionButton
                        key={option.id}
                        option={option}
                        optionLetter={String.fromCharCode(65 + index)}
                        delay={delay + (index + 1) * 0.05}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ==================== QUIZ OPTION BUTTON ====================
interface QuizOptionButtonProps {
    option: { id: string; text: string };
    optionLetter: string;
    delay?: number;
}

function QuizOptionButton({ option, optionLetter, delay = 0 }: QuizOptionButtonProps) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay }}
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsSelected(!isSelected)}
            className={cn(
                'w-full text-left p-5 rounded-xl border-2 transition-all group',
                isSelected
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 shadow-md'
                    : 'border-border hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/10',
                'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
            )}
        >
            <div className="flex items-center gap-4">
                <motion.div
                    animate={{
                        scale: isSelected ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                    className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all',
                        isSelected
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-secondary text-muted-foreground group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30'
                    )}
                >
                    {optionLetter}
                </motion.div>
                <span className={cn(
                    "text-base transition-colors",
                    isSelected ? "text-foreground font-medium" : "text-foreground"
                )}>
                    {option.text}
                </span>
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="ml-auto"
                    >
                        <CheckCircle2 className="w-6 h-6 text-orange-500" />
                    </motion.div>
                )}
            </div>
        </motion.button>
    );
}
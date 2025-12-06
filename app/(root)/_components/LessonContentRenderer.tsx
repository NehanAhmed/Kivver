'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2, AlertCircle } from 'lucide-react';

interface LessonContentRendererProps {
  contentType: string;
  contentId: number;
}

export function LessonContentRenderer({ contentType, contentId }: LessonContentRendererProps) {
  // TODO: Fetch content based on contentId and contentType

  if (contentType === 'video') {
    return <VideoContent />;
  }

  if (contentType === 'text') {
    return <TextContent />;
  }

  if (contentType === 'quiz') {
    return <QuizContent />;
  }

  return null;
}

function VideoContent() {
  return (
    <Card className="border-border overflow-hidden">
      {/* Video Player */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
          >
            <Play className="w-10 h-10 text-green-600 ml-1" />
          </motion.div>
        </motion.div>
        
        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm">0:00 / 15:30</span>
            <div className="flex items-center gap-3">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Introduction to React Hooks
        </h3>
        <p className="text-muted-foreground">
          Watch this video to understand the fundamentals of React Hooks and how they revolutionize 
          state management in functional components.
        </p>
      </div>
    </Card>
  );
}

function TextContent() {
  return (
    <Card className="p-8 border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="prose prose-lg max-w-none dark:prose-invert"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Understanding State in React
        </h2>
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            {/* TODO: Replace with actual content */}
            State is one of the most important concepts in React. It represents the data that can 
            change over time and affects what is rendered on the screen.
          </p>

          <div className="bg-accent/50 border border-border rounded-xl p-6 my-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Key Concept</h4>
                <p className="text-sm">
                  When state changes, React re-renders the component to reflect the new data.
                </p>
              </div>
            </div>
          </div>

          <p>
            In functional components, we use the <code className="px-2 py-1 bg-secondary rounded text-sm">useState</code> hook 
            to add state to our components. This hook returns an array with two elements: the current 
            state value and a function to update it.
          </p>

          <div className="bg-gray-900 rounded-xl p-6 my-6 overflow-x-auto">
            <pre className="text-sm text-green-400">
              <code>{`const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}`}</code>
            </pre>
          </div>

          <p>
            This pattern is much simpler than class components and makes it easier to reuse 
            stateful logic between components.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-border"
        >
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Mark as Complete
          </Button>
        </motion.div>
      </motion.div>
    </Card>
  );
}

function QuizContent() {
  return (
    <Card className="p-8 border-border">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            🧠
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Test Your Knowledge
          </h3>
          <p className="text-muted-foreground">
            Answer these questions to complete the lesson
          </p>
        </div>

        {/* Quiz Question */}
        <div className="space-y-4">
          <div className="bg-accent/50 rounded-xl p-6">
            <p className="font-semibold text-foreground mb-4">
              Question 1: What does the useState hook return?
            </p>
            
            <div className="space-y-3">
              {[
                'A single state value',
                'An array with state value and setter function',
                'An object with state properties',
                'A function to update state',
              ].map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-foreground">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
              Submit Answer
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </Card>
  );
}
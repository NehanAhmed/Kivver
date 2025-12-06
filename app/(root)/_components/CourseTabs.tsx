'use client';

import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { CheckCircle2, BookOpen, Users, MessageSquare, Star } from 'lucide-react';

export function CourseTabSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none h-auto p-0 space-x-6">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none bg-transparent px-0 pb-4"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="curriculum"
            className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none bg-transparent px-0 pb-4"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            What You'll Learn
          </TabsTrigger>
          <TabsTrigger
            value="instructor"
            className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none bg-transparent px-0 pb-4"
          >
            <Users className="w-4 h-4 mr-2" />
            Instructor
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none bg-transparent px-0 pb-4"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="curriculum" className="mt-8">
          <CurriculumTab />
        </TabsContent>

        <TabsContent value="instructor" className="mt-8">
          <InstructorTab />
        </TabsContent>

        <TabsContent value="reviews" className="mt-8">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function OverviewTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Card className="p-6 border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">About This Course</h3>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          {/* TODO: Replace with actual description */}
          <p>
            This comprehensive course will take you from beginner to advanced in React and Next.js development. 
            You'll learn everything you need to know to build modern, scalable web applications.
          </p>
          <p>
            Through hands-on projects and real-world examples, you'll master the latest features and best practices 
            in the React ecosystem.
          </p>
        </div>
      </Card>

      <Card className="p-6 border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">Requirements</h3>
        <ul className="space-y-3">
          {['Basic HTML & CSS knowledge', 'JavaScript fundamentals', 'No prior React experience needed'].map((req, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{req}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}

function CurriculumTab() {
  const learningPoints = [
    'Build modern web applications with React and Next.js',
    'Master React Hooks and state management',
    'Implement server-side rendering and static generation',
    'Create responsive and accessible user interfaces',
    'Deploy production-ready applications',
    'Optimize performance and SEO',
  ];

  return (
    <Card className="p-6 border-border">
      <h3 className="text-xl font-bold text-foreground mb-6">Skills You'll Gain</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-foreground">{point}</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

function InstructorTab() {
  return (
    <Card className="p-6 border-border">
      <div className="flex items-start gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {/* TODO: Replace with actual instructor name */}
            John Doe
          </h3>
          <p className="text-muted-foreground mb-4">Senior Full-Stack Developer</p>
          <p className="text-muted-foreground leading-relaxed">
            {/* TODO: Replace with actual bio */}
            With over 10 years of experience in web development, John has taught thousands of students 
            and helped them launch successful careers in tech.
          </p>
          <div className="flex gap-6 mt-6">
            <div>
              <p className="text-2xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">25</p>
              <p className="text-sm text-muted-foreground">Courses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.9</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ReviewsTab() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Student Name</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Amazing course! The instructor explains everything clearly and the projects are very practical.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
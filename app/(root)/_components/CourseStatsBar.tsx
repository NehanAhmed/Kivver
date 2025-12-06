'use client';

import { motion } from 'motion/react';
import { Star, Award, Target, Zap } from 'lucide-react';

export function CourseStatsBar() {
  const stats = [
    { icon: Star, label: 'Rating', value: '4.8', color: 'text-yellow-600' },
    { icon: Award, label: 'Certificates', value: '850+', color: 'text-purple-600' },
    { icon: Target, label: 'Success Rate', value: '92%', color: 'text-blue-600' },
    { icon: Zap, label: 'XP Reward', value: '500', color: 'text-orange-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="border-y border-border bg-card/50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
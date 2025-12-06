'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Download, Share2, Heart, Lock } from 'lucide-react';

export function EnrollmentCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-6 border-border shadow-xl">
        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold text-foreground">$49</span>
            <span className="text-lg text-muted-foreground line-through">$99</span>
            <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
              50% OFF
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Limited time offer</p>
        </div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg">
            <Play className="w-5 h-5 mr-2" />
            Enroll Now
          </Button>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          30-day money-back guarantee
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-border" />

        {/* Course Includes */}
        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-foreground">This course includes:</h4>
          {[
            { icon: Play, text: '24 video lessons' },
            { icon: Download, text: 'Downloadable resources' },
            { icon: Lock, text: 'Lifetime access' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <item.icon className="w-4 h-4 text-green-600" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-xl">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
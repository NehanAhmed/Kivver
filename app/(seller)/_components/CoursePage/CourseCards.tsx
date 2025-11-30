// components/seller/courses/CourseCard.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Edit, 
  Eye, 
  Trash2,
  Clock,
  BookOpen,
  Users,
  DollarSign
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string | null;
    thumbnail: string | null;
    category: string | null;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    price: string;
    isPremium: boolean;
    status: 'draft' | 'pending' | 'approved' | 'rejected';
    totalLessons: number;
    totalDuration: number;
    enrollmentCount: number;
    updatedAt: Date;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };
  
  const difficultyColors = {
    beginner: 'bg-blue-100 text-blue-700',
    intermediate: 'bg-purple-100 text-purple-700',
    advanced: 'bg-orange-100 text-orange-700',
  };
  
  return (
    <Card className="group overflow-hidden rounded-2xl border-border hover:shadow-xl transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {course.thumbnail ? (
          <Image 
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-green">
            <BookOpen className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${statusColors[course.status]} capitalize rounded-full px-3 py-1`}>
            {course.status}
          </Badge>
        </div>
        
        {/* Premium Badge */}
        {course.isPremium && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1">
              Premium
            </Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Category & Difficulty */}
        <div className="flex items-center gap-2 mb-3">
          {course.category && (
            <Badge variant="outline" className="rounded-full text-xs">
              {course.category}
            </Badge>
          )}
          <Badge className={`${difficultyColors[course.difficulty]} rounded-full text-xs capitalize`}>
            {course.difficulty}
          </Badge>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {course.title}
        </h3>
        
        {/* Description */}
        {course.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
        )}
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Lessons</p>
              <p className="text-sm font-semibold text-foreground">{course.totalLessons}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Students</p>
              <p className="text-sm font-semibold text-foreground">{course.enrollmentCount}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-semibold text-foreground">{course.totalDuration}m</p>
            </div>
          </div>
        </div>
        
        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-foreground">
              {parseFloat(course.price) === 0 ? 'Free' : `$${course.price}`}
            </span>
          </div>
          
          {/* Action Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Last Updated */}
        <p className="text-xs text-muted-foreground mt-4">
          Updated {new Date(course.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
}
// components/seller/courses/CourseFilters.tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

export function CourseFilters() {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search courses..."
            className="pl-10 rounded-xl h-12"
          />
        </div>
        
        {/* Status Filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px] rounded-xl h-12">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Difficulty Filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px] rounded-xl h-12">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        
        {/* More Filters Button */}
        <Button variant="outline" className="rounded-xl h-12">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
}
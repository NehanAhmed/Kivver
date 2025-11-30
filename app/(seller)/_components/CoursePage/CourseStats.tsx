// components/seller/courses/CourseStats.tsx
import { Card } from '@/components/ui/card';
import { BookOpen, Users, DollarSign, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

function StatsCard({ icon, label, value, trend, trendUp }: StatsCardProps) {
  return (
    <Card className="p-6 rounded-2xl border-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium mb-2">
            {label}
          </p>
          <h3 className="text-3xl font-bold text-foreground mb-1">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1">
              <TrendingUp 
                className={`w-4 h-4 ${trendUp ? 'text-green-600' : 'text-red-600'}`} 
              />
              <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        
        <div className="icon-container bg-green-50">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function CourseStats() {
  // TODO: Replace with actual data from API
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        icon={<BookOpen className="w-6 h-6 text-green-600" />}
        label="Total Courses"
        value="12"
        trend="+2 this month"
        trendUp={true}
      />
      
      <StatsCard 
        icon={<Users className="w-6 h-6 text-blue-600" />}
        label="Total Students"
        value="1,234"
        trend="+18.2%"
        trendUp={true}
      />
      
      <StatsCard 
        icon={<DollarSign className="w-6 h-6 text-purple-600" />}
        label="Revenue"
        value="$12,450"
        trend="+12.5%"
        trendUp={true}
      />
      
      <StatsCard 
        icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
        label="Avg. Rating"
        value="4.8"
        trend="+0.3"
        trendUp={true}
      />
    </div>
  );
}
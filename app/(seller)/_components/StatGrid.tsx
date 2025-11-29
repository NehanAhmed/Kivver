// ============================================
// STATS GRID COMPONENT
// ============================================

import { Award, BookOpen, Clock, DollarSign, Star, Users } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsGridProps {
  stats: {
    totalRevenue: string;
    totalEnrollments: number;
    totalCourses: number;
    averageRating: string;
    totalWatchTime: number;
    totalReviews: number;
  };
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const formatWatchTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Revenue"
        value={`$${stats.totalRevenue}`}
        change={12.5}
        changeLabel="vs last month"
        icon={DollarSign}
        iconColor="text-green-600"
        iconBg="bg-green-50"
      />
      <StatCard
        title="Total Students"
        value={stats.totalEnrollments}
        change={8.2}
        changeLabel="vs last month"
        icon={Users}
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
      />
      <StatCard
        title="Active Courses"
        value={stats.totalCourses}
        icon={BookOpen}
        iconColor="text-purple-600"
        iconBg="bg-purple-100"
      />
      <StatCard
        title="Average Rating"
        value={stats.averageRating}
        icon={Star}
        iconColor="text-yellow-600"
        iconBg="bg-yellow-100"
      />
      <StatCard
        title="Total Watch Time"
        value={formatWatchTime(stats.totalWatchTime)}
        change={15.3}
        changeLabel="vs last month"
        icon={Clock}
        iconColor="text-orange-600"
        iconBg="bg-orange-100"
      />
      <StatCard
        title="Total Reviews"
        value={stats.totalReviews}
        icon={Award}
        iconColor="text-pink-600"
        iconBg="bg-pink-100"
      />
    </div>
  );
};

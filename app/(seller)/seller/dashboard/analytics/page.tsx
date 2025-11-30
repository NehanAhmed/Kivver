'use client'
import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BookOpen, 
  Clock,
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { DateRangeSelector } from '@/components/CalendarRange';

// Main Analytics Page
export default function SellerAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <AnalyticsHeader />
        
        {/* Date Range Selector & Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <DateRangeSelector />
          <FilterActions />
        </div>
        
        {/* Key Metrics Overview */}
        <MetricsOverview />
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart />
          <EnrollmentChart />
        </div>
        
        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <EngagementMetrics />
          <RatingMetrics />
          <ContentMetrics />
        </div>
        
        {/* Top Performing Courses */}
        <TopPerformingCourses />
      </div>
    </div>
  );
}

// Analytics Header Component
function AnalyticsHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-2">
        Analytics Dashboard
      </h1>
      <p className="text-muted-foreground text-lg">
        Track your performance and grow your business
      </p>
    </div>
  );
}


// Filter Actions Component
function FilterActions() {
  return (
    <div className="flex items-center gap-3">
      <button className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-all font-medium text-foreground">
        <Filter className="w-4 h-4 inline mr-2" />
        Filters
      </button>
      
      <button className="px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all">
        <Download className="w-4 h-4 inline mr-2" />
        Export Report
      </button>
    </div>
  );
}

// Metrics Overview Component
function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        icon={<DollarSign className="w-6 h-6 text-green-600" />}
        iconBg="bg-green-50"
        label="Total Revenue"
        value="$24,580"
        change="+18.2%"
        changePositive={true}
        subtitle="vs last month"
      />
      
      <MetricCard
        icon={<Users className="w-6 h-6 text-blue-600" />}
        iconBg="bg-blue-50"
        label="Total Enrollments"
        value="1,234"
        change="+12.5%"
        changePositive={true}
        subtitle="new students"
      />
      
      <MetricCard
        icon={<BookOpen className="w-6 h-6 text-purple-600" />}
        iconBg="bg-purple-50"
        label="Total Courses"
        value="12"
        change="+2"
        changePositive={true}
        subtitle="this month"
      />
      
      <MetricCard
        icon={<Star className="w-6 h-6 text-orange-600" />}
        iconBg="bg-orange-50"
        label="Average Rating"
        value="4.8"
        change="+0.3"
        changePositive={true}
        subtitle="from 156 reviews"
      />
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  subtitle: string;
}

function MetricCard({ icon, iconBg, label, value, change, changePositive, subtitle }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
          changePositive 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {changePositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {change}
        </div>
      </div>
      
      <div>
        <p className="text-muted-foreground text-sm font-medium mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-bold text-foreground mb-1">
          {value}
        </h3>
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// Revenue Chart Component
function RevenueChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly revenue trends</p>
        </div>
        <select className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground outline-none">
          <option>Last 6 months</option>
          <option>Last year</option>
          <option>All time</option>
        </select>
      </div>
      
      {/* Chart Placeholder */}
      <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center border border-border">
        <div className="text-center">
          <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Revenue chart will be displayed here
          </p>
        </div>
      </div>
      
      {/* Chart Legend */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-muted-foreground">Target</span>
        </div>
      </div>
    </div>
  );
}

// Enrollment Chart Component
function EnrollmentChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">Enrollment Trends</h3>
          <p className="text-sm text-muted-foreground">Student enrollment over time</p>
        </div>
        <select className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground outline-none">
          <option>Last 6 months</option>
          <option>Last year</option>
          <option>All time</option>
        </select>
      </div>
      
      {/* Chart Placeholder */}
      <div className="h-64 bg-muted/30 rounded-xl flex items-center justify-center border border-border">
        <div className="text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Enrollment chart will be displayed here
          </p>
        </div>
      </div>
      
      {/* Chart Legend */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-sm text-muted-foreground">New Students</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-sm text-muted-foreground">Returning</span>
        </div>
      </div>
    </div>
  );
}

// Engagement Metrics Component
function EngagementMetrics() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <Eye className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Engagement</h3>
          <p className="text-xs text-muted-foreground">Student activity</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <ProgressMetric
          label="Watch Time"
          value="2,456 hrs"
          percentage={78}
          color="bg-blue-500"
        />
        <ProgressMetric
          label="Completion Rate"
          value="68%"
          percentage={68}
          color="bg-green-500"
        />
        <ProgressMetric
          label="Active Students"
          value="892"
          percentage={85}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}

// Rating Metrics Component
function RatingMetrics() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
          <Star className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Ratings</h3>
          <p className="text-xs text-muted-foreground">Student feedback</p>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-foreground mb-2">4.8</div>
        <div className="flex items-center justify-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-orange-500 text-orange-500" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Based on 156 reviews</p>
      </div>
      
      <div className="space-y-2">
        {[
          { stars: 5, count: 98 },
          { stars: 4, count: 42 },
          { stars: 3, count: 12 },
          { stars: 2, count: 3 },
          { stars: 1, count: 1 },
        ].map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-8">{item.stars}★</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${(item.count / 156) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-foreground w-8 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Content Metrics Component
function ContentMetrics() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Content</h3>
          <p className="text-xs text-muted-foreground">Your library</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <ContentStat
          icon={<BookOpen className="w-5 h-5 text-purple-600" />}
          label="Total Courses"
          value="12"
          iconBg="bg-purple-50"
        />
        <ContentStat
          icon={<Clock className="w-5 h-5 text-blue-600" />}
          label="Total Lessons"
          value="156"
          iconBg="bg-blue-50"
        />
        <ContentStat
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          label="Total Duration"
          value="24.5 hrs"
          iconBg="bg-green-50"
        />
      </div>
    </div>
  );
}

// Progress Metric Component
interface ProgressMetricProps {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

function ProgressMetric({ label, value, percentage, color }: ProgressMetricProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Content Stat Component
interface ContentStatProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
}

function ContentStat({ icon, iconBg, label, value }: ContentStatProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <span className="text-xl font-bold text-foreground">{value}</span>
    </div>
  );
}

// Top Performing Courses Component
function TopPerformingCourses() {
  const courses = [
    {
      id: 1,
      title: 'Complete JavaScript Bootcamp',
      enrollments: 456,
      revenue: '$12,450',
      rating: 4.9,
      trend: '+12%',
      trendPositive: true,
    },
    {
      id: 2,
      title: 'React & Next.js Masterclass',
      enrollments: 389,
      revenue: '$9,870',
      rating: 4.8,
      trend: '+8%',
      trendPositive: true,
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      enrollments: 267,
      revenue: '$6,890',
      rating: 4.7,
      trend: '+5%',
      trendPositive: true,
    },
  ];
  
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            Top Performing Courses
          </h3>
          <p className="text-sm text-muted-foreground">
            Your best selling courses this month
          </p>
        </div>
        <button className="text-sm font-semibold text-green-600 hover:text-green-700">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div 
            key={course.id}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all border border-transparent hover:border-border"
          >
            {/* Rank */}
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <span className="text-sm font-bold text-green-600">#{index + 1}</span>
            </div>
            
            {/* Course Info */}
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{course.title}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrollments}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  {course.rating}
                </span>
              </div>
            </div>
            
            {/* Revenue */}
            <div className="text-right">
              <p className="text-xl font-bold text-foreground mb-1">{course.revenue}</p>
              <span className={`text-xs font-semibold ${
                course.trendPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {course.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
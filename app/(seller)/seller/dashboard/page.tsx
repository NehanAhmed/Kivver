
// ============================================
// TYPE DEFINITIONS
// ============================================

import { useUser } from "@clerk/nextjs";
import { AnalyticsSection } from "../../_components/AnalyticsSection";
import { CoursesGrid } from "../../_components/CourseGrid";
import { StatsGrid } from "../../_components/StatGrid";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

export interface CourseCardProps {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  enrollmentCount: number;
  totalRevenue: string;
  averageRating: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export interface RecentEnrollmentProps {
  id: number;
  userName: string;
  userImage: string;
  courseName: string;
  enrolledAt: string;
  progress: number;
}

const Page = async () => {
  // Mock data - Replace with actual API calls
  const mockStats = {
    totalRevenue: "24,580",
    totalEnrollments: 1847,
    totalCourses: 12,
    averageRating: "4.8",
    totalWatchTime: 145800, // in seconds
    totalReviews: 432
  };

  const mockCourses: CourseCardProps[] = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp 2024",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      category: "Development",
      enrollmentCount: 543,
      totalRevenue: "8,240",
      averageRating: 4.9,
      status: "approved"
    },
    {
      id: 2,
      title: "Master React & Next.js - Advanced Course",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      category: "Programming",
      enrollmentCount: 387,
      totalRevenue: "6,120",
      averageRating: 4.7,
      status: "approved"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      category: "Design",
      enrollmentCount: 421,
      totalRevenue: "5,890",
      averageRating: 4.8,
      status: "pending"
    }
  ];

  const mockRevenueData = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 2800 },
    { month: "Apr", revenue: 3800 },
    { month: "May", revenue: 4200 },
    { month: "Jun", revenue: 3600 }
  ];

  const mockEnrollments: RecentEnrollmentProps[] = [
    {
      id: 1,
      userName: "Sarah Johnson",
      userImage: "https://i.pravatar.cc/150?img=1",
      courseName: "Complete Web Development Bootcamp",
      enrolledAt: "2 hours ago",
      progress: 15
    },
    {
      id: 2,
      userName: "Michael Chen",
      userImage: "https://i.pravatar.cc/150?img=2",
      courseName: "Master React & Next.js",
      enrolledAt: "5 hours ago",
      progress: 8
    },
    {
      id: 3,
      userName: "Emma Wilson",
      userImage: "https://i.pravatar.cc/150?img=3",
      courseName: "UI/UX Design Fundamentals",
      enrolledAt: "1 day ago",
      progress: 42
    },
    {
      id: 4,
      userName: "James Brown",
      userImage: "https://i.pravatar.cc/150?img=4",
      courseName: "Complete Web Development Bootcamp",
      enrolledAt: "2 days ago",
      progress: 67
    }
  ];
  // Use `auth()` to access `isAuthenticated` - if false, the user is not signed in
  const { isAuthenticated } = await auth()

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    redirect('/join', RedirectType.push)
  }

  // Get the Backend User object when you need access to the user's information
  const user = await currentUser()
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullName}! 👋</h1>
            <p className="text-green-50 text-lg">Here's what's happening with your courses today</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <p className="text-xs font-medium text-green-50">This Month</p>
            <p className="text-2xl font-bold">+18.2%</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={mockStats} />

      {/* Analytics Section */}
      <AnalyticsSection
        revenueData={mockRevenueData}
        enrollments={mockEnrollments}
      />

      {/* Courses Grid */}
      <CoursesGrid courses={mockCourses} />
    </div>
  );
};

export default Page;
'use client'
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  Mail,
  Eye,
  UserX,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Users,
  GraduationCap,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Types
interface Student {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  courseName: string;
  enrolledAt: Date;
  lastAccessedAt: Date | null;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  totalTimeSpent: number;
  status: 'active' | 'completed' | 'dropped';
}

type SortField = 'name' | 'enrolledAt' | 'progress' | 'lastAccessedAt';
type SortDirection = 'asc' | 'desc';

// Main Students Page
export default function SellerStudentsPage() {
  const [sortField, setSortField] = useState<SortField>('enrolledAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <StudentsHeader />
        
        {/* Stats Overview */}
        <StudentsStats />
        
        {/* Filters & Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <SearchBar />
          <TableActions />
        </div>
        
        {/* Data Table */}
        <StudentsDataTable 
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={(field: SortField) => {
            if (field === sortField) {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
            } else {
              setSortField(field);
              setSortDirection('desc');
            }
          }}
        />
      </div>
    </div>
  );
}

// Students Header Component
function StudentsHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-2">
        My Students
      </h1>
      <p className="text-muted-foreground text-lg">
        Track and manage your enrolled students
      </p>
    </div>
  );
}

// Students Stats Component
function StudentsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<Users className="w-6 h-6 text-blue-600" />}
        iconBg="bg-blue-50"
        label="Total Students"
        value="1,234"
        change="+12.5%"
        changePositive={true}
      />
      
      <StatCard
        icon={<GraduationCap className="w-6 h-6 text-green-600" />}
        iconBg="bg-green-50"
        label="Active Learners"
        value="892"
        change="+8.2%"
        changePositive={true}
      />
      
      <StatCard
        icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
        iconBg="bg-purple-50"
        label="Avg. Completion"
        value="68%"
        change="+3.1%"
        changePositive={true}
      />
      
      <StatCard
        icon={<Clock className="w-6 h-6 text-orange-600" />}
        iconBg="bg-orange-50"
        label="Avg. Study Time"
        value="4.5 hrs"
        change="+15%"
        changePositive={true}
      />
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
}

function StatCard({ icon, iconBg, label, value, change, changePositive }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          changePositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {change}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-foreground">{value}</h3>
    </div>
  );
}

// Search Bar Component
function SearchBar() {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search students by name, email, or course..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
      />
    </div>
  );
}

// Table Actions Component
function TableActions() {
  return (
    <div className="flex items-center gap-3">
      <select className="px-4 py-3 rounded-xl border border-border bg-card text-foreground font-medium outline-none cursor-pointer hover:bg-muted transition-all">
        <option value="all">All Courses</option>
        <option value="course1">JavaScript Bootcamp</option>
        <option value="course2">React Masterclass</option>
        <option value="course3">UI/UX Design</option>
      </select>
      
      <select className="px-4 py-3 rounded-xl border border-border bg-card text-foreground font-medium outline-none cursor-pointer hover:bg-muted transition-all">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="dropped">Dropped</option>
      </select>
      
      <button className="px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold transition-all">
        <Filter className="w-4 h-4 inline mr-2" />
        More Filters
      </button>
      
      <button className="px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all">
        <Download className="w-4 h-4 inline mr-2" />
        Export
      </button>
    </div>
  );
}

// Students Data Table Component
interface StudentsDataTableProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

function StudentsDataTable({ sortField, sortDirection, onSort }: StudentsDataTableProps) {
  // Mock data - Replace with actual API data
  const students: Student[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      courseName: 'Complete JavaScript Bootcamp',
      enrolledAt: new Date('2024-01-15'),
      lastAccessedAt: new Date('2024-12-01'),
      progress: 75,
      completedLessons: 15,
      totalLessons: 20,
      totalTimeSpent: 14400,
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      courseName: 'React & Next.js Masterclass',
      enrolledAt: new Date('2024-02-10'),
      lastAccessedAt: new Date('2024-11-28'),
      progress: 100,
      completedLessons: 25,
      totalLessons: 25,
      totalTimeSpent: 21600,
      status: 'completed'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      courseName: 'UI/UX Design Fundamentals',
      enrolledAt: new Date('2024-03-05'),
      lastAccessedAt: new Date('2024-08-15'),
      progress: 30,
      completedLessons: 6,
      totalLessons: 20,
      totalTimeSpent: 7200,
      status: 'dropped'
    },
  ];
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-green-600" />
      : <ChevronDown className="w-4 h-4 text-green-600" />;
  };
  
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-border text-green-500 focus:ring-2 focus:ring-ring"
                />
              </th>
              
              <th className="px-6 py-4 text-left">
                <button 
                  onClick={() => onSort('name')}
                  className="flex items-center gap-2 font-semibold text-sm text-foreground hover:text-green-600 transition-colors"
                >
                  Student
                  {getSortIcon('name')}
                </button>
              </th>
              
              <th className="px-6 py-4 text-left">
                <span className="font-semibold text-sm text-foreground">Course</span>
              </th>
              
              <th className="px-6 py-4 text-left">
                <button 
                  onClick={() => onSort('enrolledAt')}
                  className="flex items-center gap-2 font-semibold text-sm text-foreground hover:text-green-600 transition-colors"
                >
                  Enrolled
                  {getSortIcon('enrolledAt')}
                </button>
              </th>
              
              <th className="px-6 py-4 text-left">
                <button 
                  onClick={() => onSort('progress')}
                  className="flex items-center gap-2 font-semibold text-sm text-foreground hover:text-green-600 transition-colors"
                >
                  Progress
                  {getSortIcon('progress')}
                </button>
              </th>
              
              <th className="px-6 py-4 text-left">
                <button 
                  onClick={() => onSort('lastAccessedAt')}
                  className="flex items-center gap-2 font-semibold text-sm text-foreground hover:text-green-600 transition-colors"
                >
                  Last Active
                  {getSortIcon('lastAccessedAt')}
                </button>
              </th>
              
              <th className="px-6 py-4 text-left">
                <span className="font-semibold text-sm text-foreground">Status</span>
              </th>
              
              <th className="px-6 py-4 text-left">
                <span className="font-semibold text-sm text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {students.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer / Pagination */}
      <TableFooter />
    </div>
  );
}

// Student Row Component
function StudentRow({ student }: { student: Student }) {
  const statusColors = {
    active: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    dropped: 'bg-red-100 text-red-700',
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };
  
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="px-6 py-4">
        <input 
          type="checkbox" 
          className="w-4 h-4 rounded border-border text-green-500 focus:ring-2 focus:ring-ring"
        />
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-green flex items-center justify-center text-white font-semibold">
            {student.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-foreground">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <p className="font-medium text-foreground">{student.courseName}</p>
        <p className="text-sm text-muted-foreground">
          {student.completedLessons}/{student.totalLessons} lessons • {formatTime(student.totalTimeSpent)}
        </p>
      </td>
      
      <td className="px-6 py-4">
        <p className="text-sm text-foreground">{formatDate(student.enrolledAt)}</p>
      </td>
      
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">{student.progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${student.progress}%` }}
            />
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <p className="text-sm text-foreground">{formatDate(student.lastAccessedAt)}</p>
      </td>
      
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${statusColors[student.status]}`}>
          {student.status}
        </span>
      </td>
      
      <td className="px-6 py-4">
        <StudentActions />
      </td>
    </tr>
  );
}

// Student Actions Dropdown Component
function StudentActions() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-muted-foreground" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-20">
            <button className="w-full px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </button>
            <button className="w-full px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Send Message
            </button>
            <div className="border-t border-border" />
            <button className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
              <UserX className="w-4 h-4" />
              Remove Student
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Table Footer / Pagination Component
function TableFooter() {
  return (
    <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Showing</span>
        <select className="px-2 py-1 rounded-lg border border-border bg-background text-foreground font-medium outline-none cursor-pointer">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
        <span>of 1,234 students</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        
        <div className="flex items-center gap-1">
          {[1, 2, 3, '...', 10].map((page, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                page === 1
                  ? 'bg-green-500 text-white'
                  : 'bg-card hover:bg-muted text-foreground border border-border'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground font-medium transition-all">
          Next
        </button>
      </div>
    </div>
  );
}
import { PlayCircle } from "lucide-react";
import { CourseCardProps } from "../seller/dashboard/page";
import { CourseCard } from "./CourseCard";

interface CoursesGridProps {
  courses: CourseCardProps[];
}

export const CoursesGrid: React.FC<CoursesGridProps> = ({ courses }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your course performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-md">
          <PlayCircle className="w-4 h-4" />
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};
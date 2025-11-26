import { ICourseCard } from "@/types/course.type";
import { BookOpen, Clock, Star, Users } from "lucide-react";

// File: components/courses/CourseCard.jsx
export const CourseCard = ({ course }: { course: ICourseCard }) => {
    const difficultyColors = {
        Beginner: 'bg-green-50 text-green-700 border-green-200',
        Intermediate: 'bg-yellow-100 text-yellow-600 border-yellow-200',
        Advanced: 'bg-orange-100 text-orange-600 border-orange-200'
    };

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Course Image/Icon */}
            <div className={`h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all"></div>
                <div className="relative z-10 text-6xl">{course.icon}</div>
            </div>

            {/* Course Content */}
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1 group-hover:text-green-600 transition-colors">
                            {course.title}
                        </h3>
                        <p className="text-sm text-gray-500">{course.instructor}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-sm font-semibold text-yellow-600">{course.rating}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                    </div>
                </div>

                {/* Tags & Difficulty */}
                <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${difficultyColors[course.difficulty]}`}>
                        {course.difficulty}
                    </span>
                    <button className="text-green-600 font-semibold text-sm hover:text-green-700 hover:underline transition-all">
                        Start Learning →
                    </button>
                </div>
            </div>
        </div>
    );
};
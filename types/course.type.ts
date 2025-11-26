// File: types/course.types.ts
import { LucideIcon } from "lucide-react";

export interface ICourseCard {
    id: number;
    title: string;
    instructor: string;
    description: string;
    icon: string;
    gradient: string;
    rating: number;
    lessons: number;
    duration: string;
    students: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
}

export interface Category {
    id: string;
    label: string;
    icon: LucideIcon | null;
}

export interface SearchBarProps {
    placeholder?: string;
}

export interface CategoryFilterProps {
    categories: Category[];
}

export interface CategoryPillProps {
    label: string;
    icon: LucideIcon | null;
    active: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export interface CourseGridProps {
    isLoading?: boolean;
}
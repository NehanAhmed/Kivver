'use client'
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
    label: string;
    icon: LucideIcon | null;
    active: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export const CategoryPill = ({ 
    label, 
    icon: Icon, 
    active, 
    onClick,
    disabled = false 
}: CategoryPillProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 border-2",
                active 
                    ? "bg-green-500 text-white border-green-500 shadow-md hover:bg-green-600 hover:border-green-600" 
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500 hover:text-green-600 hover:shadow-sm",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{label}</span>
        </button>
    );
};
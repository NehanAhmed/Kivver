'use client'
import { CategoryPill } from "./CategoryPill";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { LucideIcon } from "lucide-react";

interface Category {
    id: string;
    label: string;
    icon: LucideIcon | null;
}

interface CategoryFilterProps {
    categories: Category[];
}

export const CategoryFilter = ({ categories }: CategoryFilterProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const activeCategory = searchParams.get('category') || 'all';

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (categoryId === 'all') {
            params.delete('category');
        } else {
            params.set('category', categoryId);
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="relative">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                    <CategoryPill   
                        key={category.id}
                        label={category.label}
                        icon={category.icon}
                        active={activeCategory === category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        disabled={isPending}
                    />
                ))}
            </div>
            {isPending && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] pointer-events-none" />
            )}
        </div>
    );
};
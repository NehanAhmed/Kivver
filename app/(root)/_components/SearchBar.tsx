'use client'
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

interface SearchBarProps {
    placeholder?: string;
}

export const SearchBar = ({ placeholder = "Search courses..." }: SearchBarProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const currentSearch = searchParams.get('search') || '';

    const handleSearchChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="relative w-full max-w-2xl ">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
                type="text"
                value={currentSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            />
            {isPending && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
};
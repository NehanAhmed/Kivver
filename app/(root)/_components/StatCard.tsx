import React from 'react';
import { BookOpen, Users, Trophy, Star } from 'lucide-react';
import { PricingStat } from '@/types/pricing.type';

interface StatCardProps {
    stat: PricingStat;
}

const iconMap = {
    BookOpen: BookOpen,
    Users: Users,
    Trophy: Trophy,
    Star: Star,
    Zap: BookOpen,
    Crown: BookOpen,
};

export const StatCard = ({ stat }: StatCardProps) => {
    const Icon = iconMap[stat.icon];

    return (
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-2xl mb-3">
                <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
        </div>
    );
};
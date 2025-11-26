import React from 'react';
import { StatCard } from './StatCard';
import { PricingStat } from '@/types/pricing.type';

interface StatsGridProps {
    stats: PricingStat[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="bg-white rounded-3xl border border-gray-200 p-12">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Join Our Growing Community
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>
            </div>
        </div>
    );
};
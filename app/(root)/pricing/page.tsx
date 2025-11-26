import React from 'react';
import { BookOpen, Users, Trophy, Star, Zap, Crown } from 'lucide-react';
import { PricingPlan, PricingStat } from '@/types/pricing.type';
import { PricingHero } from '../_components/PricingHero';
import { PricingGrid } from '../_components/PricingGrid';
import { StatsGrid } from '../_components/StatsGrid';
import { PricingCTA } from '../_components/PricingCTA';


const PricingPage = () => {
    // TODO: Replace with API call - await fetch('/api/pricing')
    const plans: PricingPlan[] = [
        {
            id: 'free',
            name: 'Free',
            icon: 'BookOpen',
            iconBg: 'bg-gray-100',
            iconColor: 'text-gray-600',
            price: { monthly: 0, yearly: 0 },
            badge: null,
            description: 'Perfect for getting started',
            features: [
                'Access to basic courses',
                '5 lessons per day',
                'Basic progress tracking',
                'Community support',
                'Mobile app access',
            ],
            cta: 'Start Learning',
            highlighted: false,
            gradient: 'from-gray-50 to-gray-100',
        },
        {
            id: 'pro',
            name: 'Pro',
            icon: 'Zap',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            price: { monthly: 9.99, yearly: 99.99 },
            badge: 'Most Popular',
            description: 'For serious learners',
            features: [
                'Unlimited lessons',
                'All courses access',
                'Advanced progress analytics',
                'Offline mode',
                'Priority support',
                'No ads',
                'Custom learning paths',
                'Certificates of completion',
            ],
            cta: 'Start Pro Trial',
            highlighted: true,
            gradient: 'from-green-50 to-emerald-50',
        },
        {
            id: 'premium',
            name: 'Premium',
            icon: 'Crown',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            price: { monthly: 19.99, yearly: 199.99 },
            badge: 'Best Value',
            description: 'Ultimate learning experience',
            features: [
                'Everything in Pro',
                'AI-powered lessons',
                '1-on-1 tutoring sessions',
                'Personalized learning plans',
                'Early access to new courses',
                'Premium community access',
                'Course creation tools',
                'Lifetime course updates',
                'Priority feature requests',
            ],
            cta: 'Go Premium',
            highlighted: false,
            gradient: 'from-purple-50 to-pink-50',
        },
    ];

    // TODO: Replace with API call - await fetch('/api/stats')
    const stats: PricingStat[] = [
        { icon: 'Users', value: '125k+', label: 'Active Learners', color: 'text-blue-600' },
        { icon: 'BookOpen', value: '500+', label: 'Courses', color: 'text-green-600' },
        { icon: 'Trophy', value: '2.3M', label: 'Badges Earned', color: 'text-orange-600' },
        { icon: 'Star', value: '4.9/5', label: 'Average Rating', color: 'text-purple-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <PricingHero />
            <PricingGrid plans={plans} />
            <StatsGrid stats={stats} />
            <PricingCTA />
        </div>
    );
};

export default PricingPage;
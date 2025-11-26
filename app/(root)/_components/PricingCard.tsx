import React from 'react';
import { Check, BookOpen, Zap, Crown } from 'lucide-react';
import { BillingCycle, PricingPlan } from '@/types/pricing.type';

interface PricingCardProps {
    plan: PricingPlan;
    billingCycle: BillingCycle;
}

const iconMap = {
    BookOpen: BookOpen,
    Zap: Zap,
    Crown: Crown,
    Users: BookOpen,
    Trophy: BookOpen,
    Star: BookOpen,
};

export const PricingCard = ({ plan, billingCycle }: PricingCardProps) => {
    const Icon = iconMap[plan.icon];
    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
    
    const calculateSavings = () => {
        if (billingCycle === 'yearly' && plan.price.monthly > 0) {
            const monthlyCost = plan.price.monthly * 12;
            const savings = ((monthlyCost - plan.price.yearly) / monthlyCost) * 100;
            return Math.round(savings);
        }
        return 0;
    };

    const savings = calculateSavings();

    return (
        <div
            className={`relative bg-white rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl ${
                plan.highlighted
                    ? 'border-green-500 shadow-xl scale-105 md:scale-110'
                    : 'border-gray-200 hover:border-green-300'
            }`}
        >
            {/* Badge */}
            {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                        {plan.badge}
                    </div>
                </div>
            )}

            <div className="p-8">
                {/* Icon */}
                <div className={`w-14 h-14 ${plan.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${plan.iconColor}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                    {price === 0 ? (
                        <div className="flex items-baseline">
                            <span className="text-5xl font-bold text-gray-900">Free</span>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-5xl font-bold text-gray-900">${price}</span>
                                <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                            </div>
                            {savings > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 line-through">
                                        ${plan.price.monthly * 12}
                                    </span>
                                    <span className="text-sm font-semibold text-green-600">
                                        Save {savings}%
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all mb-6 ${
                        plan.highlighted
                            ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                            : 'border-2 border-green-500 text-green-600 hover:bg-green-50'
                    }`}
                >
                    {plan.cta}
                </button>

                {/* Features */}
                <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                <Check className="w-3.5 h-3.5 text-green-600" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
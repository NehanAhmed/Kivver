'use client'
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { BillingToggle } from './BillingToggle';
import { BillingCycle } from '@/types/pricing.type';

export const PricingHero = () => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>Limited Time Offer - Save up to 40%</span>
                </div>
                
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Choose Your Learning Journey
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                    Start learning for free or unlock unlimited potential with our premium plans
                </p>

                <BillingToggle 
                    billingCycle={billingCycle}
                    onBillingChange={setBillingCycle}
                />
            </div>
        </div>
    );
};
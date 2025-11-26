'use client'
import React, { useState } from 'react';
import { PricingCard } from './PricingCard';
import { BillingCycle, PricingPlan } from '@/types/pricing.type';

interface PricingGridProps {
    plans: PricingPlan[];
}

export const PricingGrid = ({ plans }: PricingGridProps) => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PricingCard 
                        key={plan.id} 
                        plan={plan} 
                        billingCycle={billingCycle}
                    />
                ))}
            </div>
        </div>
    );
};
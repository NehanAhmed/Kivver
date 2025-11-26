'use client'
import { BillingCycle } from '@/types/pricing.type';
import React from 'react';

interface BillingToggleProps {
    billingCycle: BillingCycle;
    onBillingChange: (cycle: BillingCycle) => void;
}

export const BillingToggle = ({ billingCycle, onBillingChange }: BillingToggleProps) => {
    return (
        <div className="inline-flex items-center gap-4 bg-gray-100 p-1.5 rounded-full">
            <button
                onClick={() => onBillingChange('monthly')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    billingCycle === 'monthly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                }`}
            >
                Monthly
            </button>
            <button
                onClick={() => onBillingChange('yearly')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    billingCycle === 'yearly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                }`}
            >
                Yearly
                <span className="ml-2 text-green-600 text-sm font-semibold">Save 40%</span>
            </button>
        </div>
    );
};
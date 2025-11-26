import React from 'react';
import { Gift } from 'lucide-react';

export const PricingCTA = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <Gift className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Not sure which plan is right for you?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
                Try Pro free for 7 days. No credit card required.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                Start Free Trial
            </button>
        </div>
    );
};
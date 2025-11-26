export type IconName = 'BookOpen' | 'Zap' | 'Crown' | 'Users' | 'Trophy' | 'Star';

export interface PricingPlan {
    id: string;
    name: string;
    icon: IconName;
    iconBg: string;
    iconColor: string;
    price: {
        monthly: number;
        yearly: number;
    };
    badge: string | null;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
    gradient: string;
}

export interface PricingStat {
    icon: IconName;
    value: string;
    label: string;
    color: string;
}

export type BillingCycle = 'monthly' | 'yearly';
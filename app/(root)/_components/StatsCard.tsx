// File: app/(root)/_components/StatsCard.tsx
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: 'green' | 'blue' | 'purple' | 'orange';
}

export const StatsCard = ({ icon: Icon, label, value, color = "green" }: StatsCardProps) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${colorClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};
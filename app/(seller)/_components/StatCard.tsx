

// ============================================
// STAT CARD COMPONENT
// ============================================

import { TrendingDown, TrendingUp } from "lucide-react";
import { StatCardProps } from "../seller/dashboard/page";

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon,
  iconColor,
  iconBg 
}) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-xs font-semibold">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
      {changeLabel && (
        <p className="text-xs text-muted-foreground mt-2">{changeLabel}</p>
      )}
    </div>
  );
};

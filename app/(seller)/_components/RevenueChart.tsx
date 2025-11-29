import { ChartCard } from "./ChartCard";

interface RevenueChartProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <ChartCard 
      title="Revenue Overview" 
      subtitle="Monthly revenue performance"
    >
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((item, index) => {
          const maxRevenue = Math.max(...data.map(d => d.revenue));
          const height = (item.revenue / maxRevenue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-green-50 rounded-t-lg overflow-hidden relative group cursor-pointer">
                <div 
                  className="bg-gradient-to-t from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 transition-all duration-300 rounded-t-lg"
                  style={{ height: `${height}%`, minHeight: '20px' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-semibold text-xs">${item.revenue}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-medium">{item.month}</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
};


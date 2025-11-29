import { ChevronRight } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { RecentEnrollment } from "./RecentEnrollment";
import { RecentEnrollmentProps } from "../seller/dashboard/page";

interface EnrollmentActivityProps {
  enrollments: RecentEnrollmentProps[];
}

export const EnrollmentActivity: React.FC<EnrollmentActivityProps> = ({ enrollments }) => {
  return (
    <ChartCard 
      title="Recent Enrollments" 
      subtitle="Latest student activity"
    >
      <div className="space-y-2">
        {enrollments.map((enrollment) => (
          <RecentEnrollment key={enrollment.id} {...enrollment} />
        ))}
      </div>
      
      <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-border hover:bg-accent text-foreground rounded-xl font-medium transition-colors">
        View All Enrollments
        <ChevronRight className="w-4 h-4" />
      </button>
    </ChartCard>
  );
};


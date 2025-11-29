import { RecentEnrollmentProps } from "../seller/dashboard/page";
import { EnrollmentActivity } from "./EnrollmentActivity";
import { RevenueChart } from "./RevenueChart";

interface AnalyticsSectionProps {
  revenueData: {
    month: string;
    revenue: number;
  }[];
  enrollments: RecentEnrollmentProps[];
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ revenueData, enrollments }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RevenueChart data={revenueData} />
      <EnrollmentActivity enrollments={enrollments} />
    </div>
  );
};

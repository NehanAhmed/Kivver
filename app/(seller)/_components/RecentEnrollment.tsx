import { RecentEnrollmentProps } from "../seller/dashboard/page";

export const RecentEnrollment: React.FC<RecentEnrollmentProps> = ({
  userName,
  userImage,
  courseName,
  enrolledAt,
  progress
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent transition-colors">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img src={userImage} alt={userName} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm truncate">{userName}</p>
        <p className="text-xs text-muted-foreground truncate">{courseName}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-xs text-muted-foreground mb-1">{enrolledAt}</p>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-foreground">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

import { ChevronRight, Eye, Star } from "lucide-react";
import { CourseCardProps } from "../seller/dashboard/page";

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  thumbnail,
  category,
  enrollmentCount,
  totalRevenue,
  averageRating,
  status
}) => {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-600',
    pending: 'bg-yellow-100 text-yellow-600',
    approved: 'bg-green-50 text-green-600',
    rejected: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
            {category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Students</p>
            <p className="text-sm font-semibold text-foreground">{enrollmentCount}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Revenue</p>
            <p className="text-sm font-semibold text-foreground">${totalRevenue}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Rating</p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
              <p className="text-sm font-semibold text-foreground">{averageRating}</p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl font-medium transition-colors">
          <Eye className="w-4 h-4" />
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

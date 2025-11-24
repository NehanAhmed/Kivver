import { Users, Award, BookOpen, Globe } from "lucide-react";

export function Stats() {
  const stats = [
    { icon: Users, value: "10M+", label: "Active Learners" },
    { icon: Globe, value: "40+", label: "Languages" },
    { icon: BookOpen, value: "500M+", label: "Lessons Completed" },
    { icon: Award, value: "95%", label: "Success Rate" },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-4 group"
              >
                {/* Icon Container */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                  </div>
                </div>

                {/* Value */}
                <p className="text-gray-900 text-3xl md:text-4xl font-bold tracking-tight">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
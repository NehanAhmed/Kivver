import { Card } from "@/components/ui/card";
import { Zap, Target, Gamepad2, Trophy, Heart, Brain } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Bite-sized lessons",
      description: "Learn in just 5 minutes a day with our quick, effective lessons that fit your schedule.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Gamepad2,
      title: "Game-like experience",
      description: "Stay motivated with points, levels, and achievements as you progress through your learning journey.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Brain,
      title: "Science-backed method",
      description: "Our courses are based on proven teaching methods that help you learn faster and retain more.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Target,
      title: "Personalized learning",
      description: "Adaptive lessons that adjust to your level and learning style for optimal progress.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Trophy,
      title: "Track your progress",
      description: "Monitor your learning streak, set goals, and celebrate milestones along the way.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Heart,
      title: "Learn what you love",
      description: "Choose from 40+ languages and customize your learning path based on your interests.",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Why millions choose us
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Experience the most effective way to learn a new language with our proven methodology and engaging approach.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 rounded-2xl group hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-gray-900 text-xl font-bold mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
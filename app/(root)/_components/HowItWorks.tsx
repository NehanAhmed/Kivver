import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function HowItWorks() {
    const steps = [
        {
            number: "1",
            title: "Choose your language",
            description: "Select from 40+ languages including Spanish, French, German, Japanese, and more.",
        },
        {
            number: "2",
            title: "Set your daily goal",
            description: "Decide how much time you want to dedicate - from 5 to 20 minutes per day.",
        },
        {
            number: "3",
            title: "Complete fun lessons",
            description: "Practice with interactive exercises that feel like games, not homework.",
        },
        {
            number: "4",
            title: "Track your progress",
            description: "Build your streak, earn achievements, and watch yourself improve every day.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center bg-green-50 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
                            Simple & Effective
                        </div>

                        {/* Heading */}
                        <div>
                            <h2 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Start learning in 4 easy steps
                            </h2>
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                Our proven method makes language learning accessible and fun for everyone. No complicated textbooks or boring lectures.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-8 pt-4">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-5 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {step.number}
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-gray-900 text-xl font-bold mb-2 leading-snug">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Card */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-sm">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                <div>
                                    <p className="text-gray-900 text-lg font-bold mb-2">
                                        100% free to start
                                    </p>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        No credit card required. Begin your language journey today.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative mt-12 lg:mt-0">
                        {/* Background Blur Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur-3xl opacity-20 -z-10"></div>
                        
                        {/* Main Image */}
                        <div className="relative">
                            <img
                                width={600}
                                height={600}
                                src="https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzYzOTczOTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="People studying together"
                                className="relative rounded-3xl shadow-2xl w-full h-[500px] md:h-[600px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
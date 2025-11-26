import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="font-nunito relative overflow-hidden">
            {/* Hero Content */}
            <div className="container mx-auto px-6 py-20 md:py-28 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 max-w-xl">
                        {/* Badge */}
                        <div className="inline-flex items-center bg-green-50 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
                            Free language education for everyone
                        </div>

                        {/* Heading */}
                        <h1 className="text-gray-900 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                            Learn a language for free. Forever.
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                            Master new languages with bite-sized lessons. Science-backed, game-like, and proven to work. Join millions of learners worldwide.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href='/join'>
                                <Button
                                    size="lg"
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Start Learning Now
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold text-base px-8 py-6 rounded-xl transition-all duration-200"
                            >
                                <Play className="w-5 h-5 mr-2 fill-current" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-5 pt-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-3 border-white shadow-md"
                                    />
                                ))}
                            </div>
                            <p className="text-base text-gray-600 font-medium">
                                Join <span className="text-green-600 font-bold">10M+ learners</span> worldwide
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Image Section */}
                    <div className="relative mt-12 lg:mt-0">
                        {/* Background Blur Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-3xl opacity-20 -z-10"></div>

                        {/* Main Image */}
                        <div className="relative">
                            <img
                                width={600}
                                height={500}
                                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjQwMDIyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Happy student learning"
                                className="relative rounded-3xl shadow-2xl w-full h-[450px] md:h-[500px] object-cover"
                            />
                        </div>

                        {/* Floating Achievement Card - Bottom Left */}
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4 border border-gray-100">
                            <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                                ⭐
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-0.5">Daily Streak</p>
                                <p className="text-lg font-bold text-green-600">7 days</p>
                            </div>
                        </div>

                        {/* Floating Achievement Card - Top Right */}
                        <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4 border border-gray-100">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                                🏆
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-0.5">Level Up!</p>
                                <p className="text-lg font-bold text-purple-600">Advanced</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
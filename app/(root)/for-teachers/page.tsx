import React from 'react';
import { ArrowRight, DollarSign, Users, Wrench, BarChart3, Headphones, Megaphone, Trophy, Sparkles, Target, Zap, Star, TrendingUp, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Types
interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
    accentColor: string;
}

interface Step {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface Testimonial {
    name: string;
    subject: string;
    avatar: string;
    earnings: string;
    students: string;
    quote: string;
    rating: number;
}

interface Stat {
    value: string;
    label: string;
    icon: React.ReactNode;
    color: string;
}

// Hero Section Component
const HeroSection: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Join 500+ Expert Instructors</span>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Share Your{' '}
                            <span className="text-green-600">Expertise.</span>
                            <br />
                            Build Your{' '}
                            <span className="text-green-600">Income.</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed">
                            Turn your passion into profit with our gamified learning platform.
                            Create engaging courses, reach thousands of eager learners, and earn
                            <span className="font-bold text-green-600"> 70% revenue</span> on every sale.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href='/for-sellers/join'>
                                <button className="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center gap-2 group">
                                    Start Teaching Today
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <button className="btn-secondary px-8 py-4 text-lg inline-flex items-center justify-center gap-2">
                                <Award className="w-5 h-5" />
                                View Requirements
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-8 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-gray-900">$2M+</div>
                                <div className="text-sm text-gray-600">Paid to Creators</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">125k+</div>
                                <div className="text-sm text-gray-600">Active Learners</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                                <div className="text-sm text-gray-600">Avg Course Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 shadow-2xl">
                            <div className="h-full flex flex-col justify-center items-center text-white space-y-6">
                                <Trophy className="w-24 h-24" />
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2">70%</div>
                                    <div className="text-xl">Revenue Share</div>
                                </div>
                                <div className="w-full bg-white/20 backdrop-blur rounded-2xl p-6 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Your Earnings</span>
                                        <span className="font-bold">$700</span>
                                    </div>
                                    <div className="flex items-center justify-between opacity-60">
                                        <span className="text-sm">Platform Fee</span>
                                        <span className="font-bold">$300</span>
                                    </div>
                                    <div className="h-px bg-white/30"></div>
                                    <div className="flex items-center justify-between text-lg">
                                        <span>Total Sale</span>
                                        <span className="font-bold">$1000</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                            🎉 No upfront costs
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                            ⚡ Quick approval
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Benefits Grid Component
const BenefitsSection: React.FC = () => {
    const benefits: Benefit[] = [
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Earn Competitive Revenue",
            description: "Keep 70% of your earnings. Get paid monthly via direct deposit with transparent tracking.",
            accentColor: "bg-green-100 text-green-600"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Reach 125k+ Learners",
            description: "Access our growing community of engaged students eager to learn from experts like you.",
            accentColor: "bg-blue-100 text-blue-600"
        },
        {
            icon: <Wrench className="w-8 h-8" />,
            title: "Easy-to-Use Tools",
            description: "Intuitive course builder with no technical skills needed. Create engaging lessons in minutes.",
            accentColor: "bg-purple-100 text-purple-600"
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Real-Time Analytics",
            description: "Track student progress, course performance, and earnings with powerful insights dashboard.",
            accentColor: "bg-orange-100 text-orange-600"
        },
        {
            icon: <Headphones className="w-8 h-8" />,
            title: "Dedicated Support",
            description: "Get help from our creator success team. We're here to support your teaching journey.",
            accentColor: "bg-pink-100 text-pink-500"
        },
        {
            icon: <Megaphone className="w-8 h-8" />,
            title: "Marketing Included",
            description: "We promote your courses to our audience through email, social media, and platform features.",
            accentColor: "bg-yellow-100 text-yellow-600"
        }
    ];

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Why Teach With Us?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join a platform that values your expertise and provides everything you need to succeed as an online instructor.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className={`${benefit.accentColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// How It Works Component
const HowItWorksSection: React.FC = () => {
    const steps: Step[] = [
        {
            number: "01",
            title: "Sign Up as Instructor",
            description: "Create your instructor account and submit your professional credentials for verification.",
            icon: <Award className="w-8 h-8" />
        },
        {
            number: "02",
            title: "Create Your Course",
            description: "Use our intuitive course builder to upload videos, create quizzes, and design gamified lessons.",
            icon: <BookOpen className="w-8 h-8" />
        },
        {
            number: "03",
            title: "Set Your Pricing",
            description: "Choose your course price. Remember, you keep 70% of every sale with monthly payouts.",
            icon: <DollarSign className="w-8 h-8" />
        },
        {
            number: "04",
            title: "Publish & Earn",
            description: "Once approved, your course goes live. Start earning as students enroll and complete lessons.",
            icon: <TrendingUp className="w-8 h-8" />
        }
    ];

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Start teaching in four simple steps. From signup to earning, we make it easy.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100">
                                <div className="text-6xl font-bold text-green-100 mb-4">
                                    {step.number}
                                </div>
                                <div className="bg-green-500 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Arrow */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <ArrowRight className="w-8 h-8 text-green-500" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Success Stories Component
const SuccessStoriesSection: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            name: "Sarah Johnson",
            subject: "Web Development",
            avatar: "SJ",
            earnings: "$45,000",
            students: "2,340",
            quote: "This platform transformed my side hustle into a full-time career. The gamified approach keeps students engaged, and the 70% revenue share is the best I've found.",
            rating: 5
        },
        {
            name: "Michael Chen",
            subject: "Digital Marketing",
            avatar: "MC",
            earnings: "$32,000",
            students: "1,890",
            quote: "I love how easy it is to create courses here. The analytics help me understand what works, and my students actually complete the lessons thanks to the XP system.",
            rating: 5
        },
        {
            name: "Emma Rodriguez",
            subject: "Graphic Design",
            avatar: "ER",
            earnings: "$28,500",
            students: "1,560",
            quote: "As a professional designer, I appreciate the quality standards here. The approval process ensures only serious instructors, which elevates everyone's courses.",
            rating: 5
        }
    ];

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Success Stories</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Join Successful Instructors
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Real stories from real instructors earning meaningful income teaching what they love.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-500 hover:-translate-y-2"
                        >
                            {/* Instructor Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-600">{testimonial.subject}</p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-green-50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{testimonial.earnings}</div>
                                    <div className="text-xs text-gray-600 mt-1">Total Earned</div>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{testimonial.students}</div>
                                    <div className="text-xs text-gray-600 mt-1">Students</div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 leading-relaxed italic">
                                "{testimonial.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Platform Stats Component
const PlatformStatsSection: React.FC = () => {
    const stats: Stat[] = [
        {
            value: "500+",
            label: "Active Instructors",
            icon: <Users className="w-8 h-8" />,
            color: "from-green-500 to-green-600"
        },
        {
            value: "$2M+",
            label: "Paid to Creators",
            icon: <DollarSign className="w-8 h-8" />,
            color: "from-blue-500 to-blue-600"
        },
        {
            value: "10M+",
            label: "Lessons Delivered",
            icon: <BookOpen className="w-8 h-8" />,
            color: "from-purple-500 to-purple-600"
        },
        {
            value: "4.8/5",
            label: "Average Rating",
            icon: <Star className="w-8 h-8" />,
            color: "from-yellow-500 to-orange-500"
        }
    ];

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-green-600 via-green-500 to-green-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Join a Thriving Community
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Our platform is growing fast, and so are our instructors' earnings.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
                        >
                            <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
                                {stat.icon}
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-white/90 text-lg">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA in Stats Section */}
                <div className="text-center mt-16">
                    <button className="bg-white text-green-600 hover:bg-gray-50 px-10 py-5 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 group">
                        Become an Instructor Today
                        <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

// Main Component - Part 1
const ForTeachersPagePart1: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            <BenefitsSection />
            <HowItWorksSection />
            <SuccessStoriesSection />
            <PlatformStatsSection />
        </div>
    );
};

export default ForTeachersPagePart1;
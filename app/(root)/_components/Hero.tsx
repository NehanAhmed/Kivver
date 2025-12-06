'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Handle closing on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsVideoOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isVideoOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isVideoOpen]);

    return (
        <section className="font-nunito relative overflow-hidden">
            {/* Hero Content */}
            <div className="container mx-auto px-6 py-20 md:py-28 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 max-w-xl">
                        {/* Badge */}
                        <div className="inline-flex items-center bg-green-50 text-green-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm border border-green-100">
                            Free language education for everyone
                        </div>

                        {/* Heading */}
                        <h1 className="text-gray-900 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
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
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto"
                                >
                                    Start Learning Now
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => setIsVideoOpen(true)}
                                className="border-1 border-neutral-600 hover:text-green-500 text-green-600  font-semibold  px-8 py-6 rounded-xl transition-all duration-200 w-full sm:w-auto "
                            >
                                <Play className="w-5 h-5 mr-2 fill-current  transition-transform" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-5 pt-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className=""
                                    >
                                        <Image className="p-0.5 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-[3px] border-white shadow-md" src='/FounderImages/Nehan.jpeg' width={12} height={12} alt="Founder Image" />
                                    </div>
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
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-3xl opacity-20 -z-10 animate-pulse"></div>

                        {/* Main Image */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-[26px] opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
                            <img
                                width={600}
                                height={500}
                                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjQwMDIyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Happy student learning"
                                className="relative rounded-3xl shadow-2xl w-full h-[450px] md:h-[500px] object-cover border border-white/50"
                            />
                        </div>

                        {/* Floating Achievement Card - Bottom Left */}
                        <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-900/5 p-5 flex items-center gap-4 border border-green-50 animate-bounce-slow">
                            <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-2xl shadow-inner">
                                ⭐
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-0.5">Daily Streak</p>
                                <p className="text-lg font-bold text-green-600">7 days</p>
                            </div>
                        </div>

                        {/* Floating Achievement Card - Top Right */}
                        <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-purple-900/5 p-5 flex items-center gap-4 border border-purple-50 animate-bounce-slow delay-700">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-2xl shadow-inner">
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

            {/* Video Modal Overlay */}
            {isVideoOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
                        onClick={() => setIsVideoOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-green-500/20 border border-white/10 animate-in zoom-in-95 duration-300 ease-out">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:rotate-90 group"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* YouTube Embed (Autoplay Enabled) */}
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/khACGlUQCzg?autoplay=1&rel=0&modestbranding=1"
                            title="Product Demo Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
}
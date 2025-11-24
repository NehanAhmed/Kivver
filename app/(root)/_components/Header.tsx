import { Button } from '@/components/ui/button';
import React from 'react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
                        <span className="text-2xl">🦉</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600 tracking-tight">
                        Kivver
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-10">
                    <a 
                        href="#features" 
                        className="text-gray-700 text-base font-medium hover:text-green-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-200 hover:after:w-full"
                    >
                        Features
                    </a>
                    <a 
                        href="#how-it-works" 
                        className="text-gray-700 text-base font-medium hover:text-green-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-200 hover:after:w-full"
                    >
                        How it works
                    </a>
                    <a 
                        href="#pricing" 
                        className="text-gray-700 text-base font-medium hover:text-green-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-200 hover:after:w-full"
                    >
                        Pricing
                    </a>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        className="text-green-600 font-semibold hover:text-green-700 hover:bg-green-50 transition-all duration-200"
                    >
                        Sign In
                    </Button>
                    <Button 
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Get Started
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
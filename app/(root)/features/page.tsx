// =============================================
// FILE: app/how-it-works/page.tsx
// =============================================
import React from 'react';
import { 
    Target, Trophy, Zap, TrendingUp, Download, Users, 
    BookOpen, Sparkles, Award, Flame, MousePointerClick,
    Calendar, Globe, Brain, Star, CheckCircle, Rocket,
    Shield, Clock, Smartphone
} from 'lucide-react';

const HowItWorksPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Learn Smarter, Not Harder</span>
                    </div>
                    
                    <h1 className="text-6xl font-bold mb-6">
                        How It Works
                    </h1>
                    <p className="text-2xl text-green-50 max-w-3xl mx-auto mb-8">
                        Experience the most engaging way to learn new skills with our gamified, bite-sized lessons
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Get Started Free
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Why Learners Love Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to make learning effective and enjoyable
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                            <Target className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Personalized Learning</h3>
                        <p className="text-gray-600">
                            AI-powered lessons adapt to your pace and learning style for maximum effectiveness
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                            <Trophy className="w-7 h-7 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Gamified Experience</h3>
                        <p className="text-gray-600">
                            Earn XP, unlock badges, and compete on leaderboards to stay motivated
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                            <Zap className="w-7 h-7 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Bite-Sized Lessons</h3>
                        <p className="text-gray-600">
                            Learn in 5-10 minute sessions that fit perfectly into your busy schedule
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                            <TrendingUp className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Progress</h3>
                        <p className="text-gray-600">
                            Visual analytics show your improvement over time with detailed insights
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                        <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-4">
                            <Download className="w-7 h-7 text-cyan-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Offline Mode</h3>
                        <p className="text-gray-600">
                            Download lessons and learn anywhere, anytime without internet
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                        <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
                            <Users className="w-7 h-7 text-pink-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Active Community</h3>
                        <p className="text-gray-600">
                            Connect with learners worldwide and practice together in real-time
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works Steps */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Your Learning Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Four simple steps to mastering any skill
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <BookOpen className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                                    1
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Course</h3>
                            <p className="text-gray-600">
                                Browse 500+ courses across languages, tech, business, and more
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                                    2
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Interactive Lessons</h3>
                            <p className="text-gray-600">
                                Engage with quizzes, challenges, and real-world scenarios
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                                    3
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Practice Daily</h3>
                            <p className="text-gray-600">
                                Build your streak, earn XP, and watch your skills grow
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                    <Award className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                                    4
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Master Your Skills</h3>
                            <p className="text-gray-600">
                                Earn certificates and showcase your expertise to the world
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gamification Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Stay Motivated with Gamification
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Turn learning into an exciting adventure with rewards and achievements
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* XP Points */}
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-white hover:scale-105 transition-all shadow-lg">
                        <Zap className="w-12 h-12 mb-4" />
                        <div className="text-4xl font-bold mb-2">2.3M+</div>
                        <h3 className="text-xl font-bold mb-2">XP Points</h3>
                        <p className="text-yellow-50">
                            Earn experience points for every lesson completed
                        </p>
                    </div>

                    {/* Daily Streaks */}
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white hover:scale-105 transition-all shadow-lg">
                        <Flame className="w-12 h-12 mb-4" />
                        <div className="text-4xl font-bold mb-2">365 Days</div>
                        <h3 className="text-xl font-bold mb-2">Daily Streaks</h3>
                        <p className="text-orange-50">
                            Maintain your learning momentum with streak tracking
                        </p>
                    </div>

                    {/* Badges */}
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 text-white hover:scale-105 transition-all shadow-lg">
                        <Award className="w-12 h-12 mb-4" />
                        <div className="text-4xl font-bold mb-2">50+</div>
                        <h3 className="text-xl font-bold mb-2">Badges</h3>
                        <p className="text-purple-50">
                            Collect achievement badges as you progress
                        </p>
                    </div>

                    {/* Leaderboards */}
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 text-white hover:scale-105 transition-all shadow-lg">
                        <Trophy className="w-12 h-12 mb-4" />
                        <div className="text-4xl font-bold mb-2">Top 100</div>
                        <h3 className="text-xl font-bold mb-2">Leaderboards</h3>
                        <p className="text-green-50">
                            Compete with friends and global learners
                        </p>
                    </div>
                </div>
            </div>

            {/* Learning Methods */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Proven Learning Methods
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Science-backed techniques that actually work
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Method 1 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                    <MousePointerClick className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Interactive Quizzes</h3>
                                <p className="text-gray-600">
                                    Test your knowledge with engaging multiple-choice, fill-in-the-blank, and matching exercises that reinforce learning.
                                </p>
                            </div>
                        </div>

                        {/* Method 2 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                                    <Calendar className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Spaced Repetition</h3>
                                <p className="text-gray-600">
                                    Our algorithm ensures you review content at optimal intervals for long-term retention and mastery.
                                </p>
                            </div>
                        </div>

                        {/* Method 3 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                                    <Globe className="w-8 h-8 text-purple-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-World Scenarios</h3>
                                <p className="text-gray-600">
                                    Apply your learning through practical exercises based on real-life situations you'll actually encounter.
                                </p>
                            </div>
                        </div>

                        {/* Method 4 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                                    <Brain className="w-8 h-8 text-orange-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Adaptive Learning</h3>
                                <p className="text-gray-600">
                                    Lessons automatically adjust difficulty based on your performance and progress for optimal challenge.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Our Learners Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of successful learners
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-6">
                            "This platform transformed how I learn. The gamification keeps me motivated, and I've completed 3 courses in just 2 months!"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                                👩‍💻
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">Sarah Johnson</div>
                                <div className="text-sm text-gray-600">Web Developer</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-6">
                            "Finally, a learning platform that doesn't feel like work. The bite-sized lessons fit perfectly into my lunch breaks."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                                👨‍💼
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">Michael Chen</div>
                                <div className="text-sm text-gray-600">Product Manager</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-6">
                            "The progress tracking and leaderboards push me to stay consistent. I've maintained a 90-day streak and learned Spanish!"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                                👩‍🎓
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">Emily Rodriguez</div>
                                <div className="text-sm text-gray-600">Student</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Rocket className="w-16 h-16 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Start Your Learning Journey?
                    </h2>
                    <p className="text-xl text-green-50 mb-8">
                        Join 125,000+ learners already mastering new skills
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Start Learning Free
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                            Explore Courses
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;
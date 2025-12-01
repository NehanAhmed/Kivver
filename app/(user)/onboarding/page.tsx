import React from 'react';
import {
  User,
  BookOpen,
  Sparkles,
  GraduationCap,
  Loader2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// ============================================
// BUYER ONBOARDING PAGE
// ============================================

const BuyerOnboardingPage = () => {
  const [isSubmitting] = React.useState(false);
  const [error] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form logic handled by parent component
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
          {/* Top Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-500" />

          <div className="p-8 sm:p-12">
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-50 dark:bg-green-900/20 mb-6 shadow-md">
                <BookOpen className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-3">
                Welcome Aboard! 🎓
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Let's personalize your learning journey to help you achieve your goals
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:inline">Setup</span>
              </div>
              <div className="w-12 h-0.5 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-border text-muted-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Explore</span>
              </div>
              <div className="w-12 h-0.5 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-border text-muted-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Learn</span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  Full Name
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full h-14 pl-12 pr-4 bg-accent/50 border-2 border-border rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Learning Interests Field */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  What would you like to learn?
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-muted-foreground">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Web Development, Data Science, Marketing..."
                    className="w-full h-14 pl-12 pr-4 bg-accent/50 border-2 border-border rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  This helps us recommend the perfect courses for you
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Setting up your account...
                  </>
                ) : (
                  <>
                    Complete Setup & Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Info Banner */}
            <div className="mt-8 p-5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    What's next?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Get instant access to thousands of courses, earn XP, unlock badges, and track your learning streaks!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex items-center justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">10K+</p>
            <p className="text-xs text-muted-foreground">Active Learners</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">500+</p>
            <p className="text-xs text-muted-foreground">Courses</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">4.9★</p>
            <p className="text-xs text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyerOnboardingPage
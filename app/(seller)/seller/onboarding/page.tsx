'use client';

import {
  User,
  BookOpen,
  Sparkles,
  GraduationCap,
  Loader2,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import React from 'react';
import { completeSellerOnboarding, redirectToSellerDashboard } from './_actions';
import { SellerOnboardingData } from './onboarding_type';

const SellerOnboardingPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});
  
  const [formData, setFormData] = React.useState<SellerOnboardingData>({
    fullName: '',
    bio: '',
    expertise: '',
    teachingExperience: 'beginner',
  });

  const bioLength = formData.bio.length;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear general error
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setFieldErrors({});

    try {
      const result = await completeSellerOnboarding(formData);

      if (!result.success) {
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        setError(result.error || 'Something went wrong. Please try again.');
      } else {
        // Success - redirect to dashboard
        await redirectToSellerDashboard();
      }
    } catch (err) {
      console.error('Onboarding error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const experienceLevels: Array<{ value: SellerOnboardingData['teachingExperience']; label: string }> = [
    { value: 'beginner', label: 'Just Starting (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'experienced', label: 'Experienced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
          {/* Top Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

          <div className="p-8 sm:p-12">
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-purple-50 dark:bg-purple-900/20 mb-6 shadow-md">
                <GraduationCap className="w-10 h-10 text-purple-600" />
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-3">
                Start Teaching Today! ✨
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Set up your instructor profile and inspire thousands of students worldwide
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:inline">
                  Profile
                </span>
              </div>
              <div className="w-12 h-0.5 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-border text-muted-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                  Create
                </span>
              </div>
              <div className="w-12 h-0.5 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-border text-muted-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                  Earn
                </span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-3">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                >
                  Full Name
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                    className="w-full h-14 pl-12 pr-4 bg-accent/50 border-2 border-border rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.fullName[0]}
                  </p>
                )}
              </div>

              {/* Bio Field */}
              <div className="space-y-3">
                <label
                  htmlFor="bio"
                  className="text-sm font-semibold text-foreground flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    About You
                    <span className="text-red-500">*</span>
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {bioLength}/500
                  </span>
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell students about yourself, your teaching philosophy, and what makes you passionate about education..."
                  rows={5}
                  maxLength={500}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-accent/50 border-2 border-border rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {fieldErrors.bio ? (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.bio[0]}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    This will be displayed on your instructor profile
                  </p>
                )}
              </div>

              {/* Expertise Field */}
              <div className="space-y-3">
                <label
                  htmlFor="expertise"
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                >
                  Areas of Expertise
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <input
                    id="expertise"
                    name="expertise"
                    type="text"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development, Data Science, Digital Marketing..."
                    disabled={isSubmitting}
                    className="w-full h-14 pl-12 pr-4 bg-accent/50 border-2 border-border rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                {fieldErrors.expertise ? (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.expertise[0]}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Separate multiple topics with commas
                  </p>
                )}
              </div>

              {/* Teaching Experience Field */}
              <div className="space-y-3">
                <label
                  htmlFor="teachingExperience"
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                >
                  Teaching Experience
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <select
                    id="teachingExperience"
                    name="teachingExperience"
                    value={formData.teachingExperience}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full h-14 pl-12 pr-10 bg-accent/50 border-2 border-border rounded-xl text-base text-foreground focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {fieldErrors.teachingExperience && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.teachingExperience[0]}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Setting up your profile...
                  </>
                ) : (
                  <>
                    Complete Setup & Start Teaching
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Info Banner */}
            <div className="mt-8 p-5 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-900/20 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Ready to inspire?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Create your first course, reach students globally, and start earning. Our
                    platform handles payments and marketing!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex items-center justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">$2.5M+</p>
            <p className="text-xs text-muted-foreground">Paid to Instructors</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">850+</p>
            <p className="text-xs text-muted-foreground">Active Instructors</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">50K+</p>
            <p className="text-xs text-muted-foreground">Students Taught</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOnboardingPage;
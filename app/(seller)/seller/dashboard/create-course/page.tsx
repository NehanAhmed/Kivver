'use client'
import { CourseForm } from '@/app/(seller)/_components/CreateCourse/CourseForm';
import { CourseHeader } from '@/app/(seller)/_components/CreateCourse/CourseHeader';
import React, { useState } from 'react';

// Main Page Component
export default function CreateCoursePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <CourseHeader />
        
        {/* Progress Indicator */}
        <ProgressSteps currentStep={1} />
        
        {/* Form Content */}
        <div className="mt-8">
          <CourseForm />
        </div>
      </div>
    </div>
  );
}

// Course Header Component


// Progress Steps Component
function ProgressSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: 'Basic Info', active: true },
    { number: 2, label: 'Pricing', active: false },
    { number: 3, label: 'Settings', active: false },
  ];
  
  return (
    <div className="flex items-center justify-between mb-8 bg-card border border-border rounded-2xl p-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step.active 
                  ? 'bg-green-500 text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.number}
            </div>
            <div>
              <p className={`font-semibold ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground">Step {step.number} of 3</p>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-border mx-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Main Course Form Component

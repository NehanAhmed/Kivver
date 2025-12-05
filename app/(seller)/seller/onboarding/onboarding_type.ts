export interface SellerOnboardingData {
  fullName: string;
  bio: string;
  expertise: string;
  teachingExperience: 'beginner' | 'intermediate' | 'experienced' | 'expert';
}

export interface SellerOnboardingResponse {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ClerkUserMetadata {
  onboardingComplete?: boolean;
  role?: 'buyer' | 'seller';
  bio?: string;
  expertise?: string;
  teachingExperience?: string;
}
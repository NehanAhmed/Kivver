export type UserRole = 'buyer' | 'seller';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
      onboardingComplete?: boolean;
    };
  }
}

export {};
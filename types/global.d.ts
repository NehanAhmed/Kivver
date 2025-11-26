export type UserRole = 'buyer' | 'seller';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
    };
  }
}

export {};
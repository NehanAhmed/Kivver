import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ClerkUserMetadata } from './onboarding_type';

interface SellerOnboardingLayoutProps {
  children: React.ReactNode;
}

export default async function SellerOnboardingLayout({ 
  children 
}: SellerOnboardingLayoutProps) {
  const { sessionClaims } = await auth();
  
  // Type-safe metadata access
  const metadata = sessionClaims?.metadata as ClerkUserMetadata | undefined;
  
  if (metadata?.onboardingComplete === true) {
    redirect('/seller/dashboard');
  }

  return <>{children}</>;
}
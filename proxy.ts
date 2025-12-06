import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ClerkUserMetadata } from './app/(seller)/seller/onboarding/onboarding_type';

const isPublicRoute = createRouteMatcher([
  '/login(.*)',
  '/join(.*)',
  '/for-sellers/login(.*)',
  '/for-sellers/join(.*)',
  '/',
  '/pricing',
  '/explore',
  '/features',
  '/courses(.*)',
  '/for-teachers',
  '/api/webhooks(.*)',
  '/api/course(.*)',
  '/api/lesson(.*)',
]);

const isAuthPage = createRouteMatcher([
  '/login(.*)',
  '/signup(.*)',
  '/join(.*)',
  '/auth(.*)',
  '/for-sellers/login(.*)',
  '/for-sellers/join(.*)',
]);

const isOnboardingRoute = createRouteMatcher([
  '/onboarding(.*)',
  '/seller/onboarding(.*)',
]);

const isSellerRoute = createRouteMatcher([
  '/seller(.*)',
  '/teacher(.*)',
]);

const isDashboardRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Allow onboarding routes for authenticated users
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // If no user and route is protected → redirect to sign in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  let role: 'buyer' | 'seller' | undefined = undefined;
  let onboardingComplete = false;

  if (userId) {
    // Get metadata from sessionClaims first (faster, already available)
    const metadata = sessionClaims?.metadata as ClerkUserMetadata | undefined;
    
    role = metadata?.role;
    onboardingComplete = metadata?.onboardingComplete ?? false;

    // If metadata is missing from session, fetch from Clerk backend
    if (!role) {
      try {
        const backend = await clerkClient();
        const user = await backend.users.getUser(userId);
        const publicMetadata = user.publicMetadata as ClerkUserMetadata;
        
        role = publicMetadata.role;
        onboardingComplete = publicMetadata.onboardingComplete ?? false;
      } catch (error) {
        console.error('[MIDDLEWARE] Failed to fetch user metadata:', error);
        // Default to buyer if we can't determine role
        role = 'buyer';
      }
    }

    // Check if onboarding is incomplete
    if (!onboardingComplete) {
      // Don't redirect if already on onboarding page
      if (isOnboardingRoute(req)) {
        return NextResponse.next();
      }

      // Redirect to appropriate onboarding page based on role
      const onboardingUrl = role === 'seller' 
        ? new URL('/seller/onboarding', req.url)
        : new URL('/onboarding', req.url);
      
      return NextResponse.redirect(onboardingUrl);
    }
  }

  // Redirect logged-in users away from auth pages
  if (userId && isAuthPage(req)) {
    if (role === 'seller') {
      return NextResponse.redirect(new URL('/seller/dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Role-based route protection
  if (userId && onboardingComplete) {
    if (isSellerRoute(req) && role !== 'seller') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (isDashboardRoute(req) && role === 'seller') {
      return NextResponse.redirect(new URL('/seller/dashboard', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
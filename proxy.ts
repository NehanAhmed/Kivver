// middleware.ts
import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/login(.*)',
  '/join(.*)',
  '/for-sellers/login(.*)',
  '/for-sellers/join(.*)',
  '/',
  '/pricing',
  '/explore',
  '/features',
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

  let role: string | undefined = undefined;

  if (userId) {
    // fetch full user object including unsafeMetadata
    const backend = await clerkClient();
    const user = await backend.users.getUser(userId);
    role = user.unsafeMetadata?.role as string | undefined;

    // Check if onboarding is incomplete
    const onboardingComplete = sessionClaims?.metadata?.onboardingComplete;

    if (!onboardingComplete) {
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
  if (userId) {
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
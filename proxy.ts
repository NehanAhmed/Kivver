import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
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
  '/api/webhooks(.*)', // Allow webhook endpoint
]);

// Pages that logged-in users should NOT access
const isAuthPage = createRouteMatcher([
  '/login(.*)',
  '/signup(.*)',
  '/join(.*)',
  '/auth(.*)',
  '/for-sellers/login(.*)',
  '/for-sellers/join(.*)'
]);

const isSellerRoute = createRouteMatcher([
  '/seller(.*)',
  '/teacher(.*)',
]);

const isDashboardRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  
  // Get role from unsafe_metadata (set during signup)
  const role = (sessionClaims?.unsafeMetadata as { role?: string })?.role;

  // 1. Redirect logged-in users away from auth pages to their correct dashboard
  if (userId && isAuthPage(req)) {
    if (role === 'seller') {
      return NextResponse.redirect(new URL('/seller/dashboard', req.url));
    }
    // Default to user dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 2. Protect private routes - redirect to login if not authenticated
  if (!userId && !isPublicRoute(req)) {
    return (await auth()).redirectToSignIn();
  }

  // 3. Role-based route protection
  if (userId) {
    // Prevent users from accessing seller routes
    if (isSellerRoute(req) && role !== 'seller') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Prevent sellers from accessing user dashboard (optional)
    // Remove this block if sellers should access both dashboards
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
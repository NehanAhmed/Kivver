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
  '/for-teachers'

]);

const isTeacherRoute = createRouteMatcher(['/for-sellers(.*)']);
const isBuyerRoute = createRouteMatcher(['/join', '/login']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  // 1. If user is logged in and tries to access auth pages (login/join)
  if (userId && isPublicRoute(req)) {
    if (role === 'seller') {
      return NextResponse.redirect(new URL('/seller/dashboard', req.url));
    }
    if (role === 'buyer') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // 2. Protect Dashboard Routes
  if (!userId && !isPublicRoute(req)) {
    return (await auth()).redirectToSignIn();
  }

  // 3. Optional: Prevent Buyers from accessing Teacher Dashboard and vice versa
  // Add logic here if strict separation is needed beyond just redirects.
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
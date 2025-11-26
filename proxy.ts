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

// Pages that logged-in users should NOT access
const isAuthPage = createRouteMatcher([
  '/login(.*)',
  '/signup(.*)',
  '/join(.*)',
  '/auth(.*)',
  '/for-sellers/login(.*)',
  '/for-sellers/join(.*)'
]);

const isTeacherRoute = createRouteMatcher(['/for-sellers(.*)']);
const isBuyerRoute = createRouteMatcher(['/join', '/login']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  // 1. Redirect logged-in users only when they hit AUTH PAGES
  if (userId && isAuthPage(req)) {
    if (role === 'seller') {
      return NextResponse.redirect(new URL('/seller/dashboard', req.url));
    }
    if (role === 'buyer') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // 2. Protect private routes
  if (!userId && !isPublicRoute(req)) {
    return (await auth()).redirectToSignIn();
  }

  // 3. Optional stricter separation (teacher vs buyer)
  // Add here if needed.
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

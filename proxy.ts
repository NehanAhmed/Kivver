// proxy.ts
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
]);

const isAuthPage = createRouteMatcher([
  '/login(.*)',
  '/signup(.*)',
  '/join(.*)',
  '/auth(.*)',
  '/for-sellers/login(.*)',
  '/for-sellers/join(.*)',
]);

const isSellerRoute = createRouteMatcher([
  '/seller(.*)',
  '/teacher(.*)',
]);

const isDashboardRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

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

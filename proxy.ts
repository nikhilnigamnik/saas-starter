import { NextRequest, NextResponse } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup'];

  // Check if the current path is a public route
  const isPublicRoute =
    pathname === '/' || publicRoutes.some((route) => pathname.startsWith(route));

  // If user is logged in and trying to access auth routes, redirect to dashboard
  // Allow authenticated users to access the home page (/)
  if (sessionCookie && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not logged in and trying to access protected routes, redirect to signin
  if (!sessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Static file extensions (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|json|woff|woff2|ttf|eot)).*)',
  ],
};

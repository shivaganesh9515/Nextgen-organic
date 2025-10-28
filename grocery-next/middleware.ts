import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Handle role-based redirects after login
    if (path === '/' && token) {
      // Redirect authenticated users based on their role
      switch (token.role) {
        case 'ADMIN':
          return NextResponse.redirect(new URL('/admin', req.url));
        case 'VENDOR':
          return NextResponse.redirect(new URL('/vendor/dashboard', req.url));
        case 'CUSTOMER':
        default:
          return NextResponse.redirect(new URL('/account', req.url));
      }
    }

    // Admin routes protection
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Vendor routes protection
    if (path.startsWith('/vendor/dashboard') && token?.role !== 'VENDOR') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Customer routes protection
    if (path.startsWith('/account') && !token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes
        if (
          path === '/' ||
          path.startsWith('/shop') ||
          path.startsWith('/vendors') ||
          path.startsWith('/auth') ||
          path.startsWith('/api/auth')
        ) {
          return true;
        }

        // Protected routes require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/', // Add root path to trigger role-based redirects
    '/admin/:path*',
    '/vendor/dashboard/:path*',
    '/account/:path*',
    '/checkout/:path*',
  ],
};
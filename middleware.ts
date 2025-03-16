import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret });
  
  // Define protected routes (admin and dashboard routes)
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') || 
                     request.nextUrl.pathname.startsWith('/dashboard');
  
  // If the route is protected and the user isn't logged in, redirect to login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Check for role-based access (e.g., admin routes)
  if (request.nextUrl.pathname.startsWith('/admin') && token?.role !== 'admin') {
    // Redirect non-admin users to dashboard or another appropriate page
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths should be processed by the middleware
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};

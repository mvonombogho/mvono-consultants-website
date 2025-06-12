import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

<<<<<<< HEAD
// This function runs before each request to protected routes
export async function middleware(request: NextRequest) {
  // Always proceed in development mode
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  
  // In production environments, nothing to protect (dashboard removed)
  return NextResponse.next();
}

// Update config to remove dashboard matchers
export const config = {
  matcher: [], // Empty array since dashboard routes have been removed
=======
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
>>>>>>> f3fdf5fe94b4c05bc250053eb106d87d9ed6b7fa
};

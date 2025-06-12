import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

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
};

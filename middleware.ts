// Middleware disabled - no authentication required
// All routes are now publicly accessible for the business management system

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // No authentication checks - direct access to all routes
  return NextResponse.next();
}

// No routes require protection - empty matcher
export const config = {
  matcher: [],
};

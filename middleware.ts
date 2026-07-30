import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // Protect /sellers routes
  if (request.nextUrl.pathname.startsWith('/sellers')) {
    if (!token) {
      return NextResponse.redirect(new URL('/onboarding/sellers/sign-in', request.url));
    }
  }

  // Also protect /profile
  if (request.nextUrl.pathname.startsWith('/profile')) {
    if (!token) {
      return NextResponse.redirect(new URL('/onboarding/role-select', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sellers/:path*', '/profile/:path*'],
};

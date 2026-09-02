import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// Simple in-memory rate limiting (Note: in production a Redis store is recommended)
const rateLimit = new Map<string, { count: number, resetTime: number }>();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

  // Apply basic rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 100;

    let rateData = rateLimit.get(ip);
    if (!rateData || now > rateData.resetTime) {
      rateData = { count: 1, resetTime: now + windowMs };
    } else {
      rateData.count++;
    }
    rateLimit.set(ip, rateData);

    if (rateData.count > maxRequests) {
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }
  }

  // Device Unlocking Logic (Secret URL)
  if (request.nextUrl.searchParams.get('unlock') === 'devansh2026') {
    const res = NextResponse.redirect(new URL('/admin/login', request.url));
    res.cookies.set('device_unlocked', 'true', { maxAge: 60 * 60 * 24 * 365 * 5, path: '/' });
    return res;
  }

  const isUnlocked = request.cookies.has('device_unlocked');
  const isAnyAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  // Completely hide all admin routes (including login) from unauthorized devices by returning 404
  if (isAnyAdminPath && !isUnlocked) {
    return NextResponse.rewrite(new URL('/404-hidden', request.url));
  }

  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isAdminApi = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login');
  let response = NextResponse.next();

  if (isAdminRoute || isAdminApi) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Add Security Headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

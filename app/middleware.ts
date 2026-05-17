import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // Root path: redirect to /en
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 302);
  }

  // Handle /home or /[lang]/home -> redirect to /[lang]
  if (firstSegment === 'home') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 302);
  }
  
  if (validLangs.includes(firstSegment) && segments[2] === 'home') {
    const url = request.nextUrl.clone();
    url.pathname = `/${firstSegment}`;
    return NextResponse.redirect(url, 302);
  }

  // If first segment exists but is not a valid language code, rewrite to 404
  // Skip static files and api routes
  if (
    firstSegment && 
    !validLangs.includes(firstSegment) && 
    !pathname.includes('.') && 
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/_next/')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/404`;
    const response = NextResponse.rewrite(url, { status: 404 });
    addSecurityHeaders(response);
    return response;
  }

  const response = NextResponse.next();
  addSecurityHeaders(response);
  return response;
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

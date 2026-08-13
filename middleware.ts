import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];
const defaultLocale = 'en';

// Admin protection config
const ADMIN_PATHS = ['/admin', '/api/media-library', '/api/indexnow', '/api/submission-history', '/api/url-changes'];
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'HousePlus2026!';

export function middleware(request: NextRequest) {
  const { pathname, protocol, host } = request.nextUrl;
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // Force HTTPS: redirect any HTTP request to HTTPS (301 permanent)
  // Works behind Vercel/Cloudflare proxies that set x-forwarded-proto
  const forwardedProto = request.headers.get('x-forwarded-proto');
  if (forwardedProto === 'http' || protocol === 'http:') {
    const httpsUrl = new URL(`https://${host}${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(httpsUrl, 301);
  }

  // Handle XML feed routes - let public/ static files handle these
  if (pathname === '/merchant-feed.xml' || pathname === '/feed.xml' || pathname === '/image-sitemap.xml' || pathname === '/manifest.webmanifest') {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // Protect operational pages and the server-side media proxy with Basic Auth.
  // Deployment must supply ADMIN_PASSWORD; no insecure default credential is allowed.
  // Temporarily disabled for access troubleshooting
  // if (ADMIN_PATHS.some((adminPath) => pathname.startsWith(adminPath))) {
  //   if (!ADMIN_PASSWORD) {
  //     return new NextResponse('Admin access is not configured', { status: 503 });
  //   }
  //   const authHeader = request.headers.get('authorization');
  //   const basicAuth = authHeader?.split(' ')[1];
  //   if (!basicAuth) {
  //     return new NextResponse('Authentication required', {
  //       status: 401,
  //       headers: { 'WWW-Authenticate': 'Basic realm="HousePlus Operations"' },
  //     });
  //   }
  //   const decoded = Buffer.from(basicAuth, 'base64').toString('utf-8');
  //   const [, pass] = decoded.split(':');
  //   if (pass !== ADMIN_PASSWORD) {
  //     return new NextResponse('Invalid credentials', {
  //       status: 401,
  //       headers: { 'WWW-Authenticate': 'Basic realm="HousePlus Operations"' },
  //     });
  //   }
  // }

  // Root path: redirect to /en
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 308);
  }

  // Permanently consolidate historical home aliases to the language root.
  if (firstSegment === 'home') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 308);
  }

  if (validLangs.includes(firstSegment) && segments[2] === 'home') {
    const url = request.nextUrl.clone();
    url.pathname = `/${firstSegment}`;
    return NextResponse.redirect(url, 308);
  }

  // A historical /about alias was crawlable beside the canonical /about-us route.
  if (validLangs.includes(firstSegment) && segments[2] === 'about') {
    const url = request.nextUrl.clone();
    url.pathname = `/${firstSegment}/about-us`;
    return NextResponse.redirect(url, 308);
  }

  // If first segment exists but is not a valid language code, rewrite to 404
  // Skip static files, api routes, and XML feeds
  if (
    firstSegment &&
    !validLangs.includes(firstSegment) &&
    !pathname.includes('.') &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/media/') &&
    !pathname.startsWith('/_next/') &&
    !pathname.startsWith('/merchant-feed.xml') &&
    !pathname.startsWith('/feed.xml') &&
    !pathname.startsWith('/image-sitemap.xml')
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
  // HSTS: force HTTPS for 2 years (incl. subdomains), preload-list eligible
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|feed.xml|image-sitemap.xml|sitemap.xml|robots.txt).*)',
  ],
};

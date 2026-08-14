import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];
const defaultLocale = 'en';
const localizedFoundationSlugs = new Set([
  'about-us', 'brand', 'careers', 'case-studies', 'certifications', 'contact',
  'factory', 'faq', 'news', 'oem-odm', 'products', 'regions', 'service', 'support', 'team',
]);

// Admin protection config
const ADMIN_PATHS = ['/admin', '/api/media-library', '/api/indexnow', '/api/submission-history', '/api/url-changes'];
// Prefer the dedicated key when it is configured. Keep the existing Vercel
// production key as a temporary compatibility path so protected operations
// remain available while credentials are rotated.
const ADMIN_PASSWORD = process.env.HOUSEPLUS_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

export function middleware(request: NextRequest) {
  const { pathname, protocol, host } = request.nextUrl;
  const segments = pathname.split('/');
  const firstSegment = segments[1];
  const requestHeaders = new Headers(request.headers);
  if (validLangs.includes(firstSegment)) {
    requestHeaders.set('x-houseplus-locale', firstSegment);
  }

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
  if (ADMIN_PATHS.some((adminPath) => pathname.startsWith(adminPath))) {
    const authHeader = request.headers.get('authorization');
    const basicAuth = authHeader?.split(' ')[1];
    if (!basicAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="HousePlus Operations"' },
      });
    }
    const decoded = Buffer.from(basicAuth, 'base64').toString('utf-8');
    const [, pass] = decoded.split(':');
    if (!ADMIN_PASSWORD || pass !== ADMIN_PASSWORD) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="HousePlus Operations"' },
      });
    }
  }

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

  // Consolidate the historical Europe alias before rendering so crawlers receive
  // a standard permanent redirect rather than a second indexable region URL.
  if (validLangs.includes(firstSegment) && segments[2] === 'regions' && segments[3] === 'eu') {
    const url = request.nextUrl.clone();
    url.pathname = `/${firstSegment}/regions/europe`;
    return NextResponse.redirect(url, 301);
  }

  // Non-English foundational pages previously shared English source content and
  // were intentionally omitted from the sitemap. Render verified localized copy
  // internally while preserving the public canonical language URL.
  if (validLangs.includes(firstSegment) && firstSegment !== 'en') {
    const foundationSlug = segments.slice(2).filter(Boolean).join('/');
    if (localizedFoundationSlugs.has(foundationSlug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${firstSegment}/__localized-foundation${foundationSlug ? `/${foundationSlug}` : ''}`;
      const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
      addSecurityHeaders(response);
      return response;
    }
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

  const response = NextResponse.next({ request: { headers: requestHeaders } });
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

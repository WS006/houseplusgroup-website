import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];
const defaultLocale = 'en';

// Admin protection config
const ADMIN_PATH = '/admin';
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

  // Handle XML feed routes - rewrite to api route to bypass language routing
  if (pathname === '/merchant-feed.xml') {
    const url = request.nextUrl.clone();
    url.pathname = '/api/merchant-feed';
    return NextResponse.rewrite(url);
  }
  if (pathname === '/feed.xml' || pathname === '/image-sitemap.xml') {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // Admin path protection
  if (pathname.startsWith(ADMIN_PATH)) {
    const authHeader = request.headers.get('authorization');
    const basicAuth = authHeader?.split(' ')[1];

    if (!basicAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Panel"' },
      });
    }

    const decoded = Buffer.from(basicAuth, 'base64').toString('utf-8');
    const [user, pass] = decoded.split(':');

    if (pass !== ADMIN_PASSWORD) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Panel"' },
      });
    }
  }

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
  // Skip static files, api routes, and XML feeds
  if (
    firstSegment &&
    !validLangs.includes(firstSegment) &&
    !pathname.includes('.') &&
    !pathname.startsWith('/api/') &&
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
    '/((?!_next/static|_next/image|favicon.ico|feed.xml|image-sitemap.xml|sitemap.xml|robots.txt|\\.txt$|\\.json$|\\.svg$|\\.png$|\\.jpg$|\\.jpeg$|\\.gif$|\\.webp$|\\.ico$|\\.css$|\\.js$|\\.woff$|\\.woff2$|\\.ttf$|\\.eot$)).*)',
  ],
};

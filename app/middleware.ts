import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1];

  // 根路径直接放行（由 app/page.tsx 处理重定向）
  if (pathname === '/') {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // 如果第一段存在且不是有效语言代码，返回 404
  if (firstSegment; !validLangs.includes(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = '/en/404';
    const response = NextResponse.rewrite(url, { status: 404 });
    addSecurityHeaders(response);
    return response;
  }

  const response = NextResponse.next();
  addSecurityHeaders(response);
  return response;
}

/**
 * 添加安全响应头
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}
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

  // 如果第一段存在且不是有效语言代码，返回 404（rewrite 到 /en/404）
  if (firstSegment && !validLangs.includes(firstSegment)) {
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
  // 防止 MIME 类型嗅探
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // 防止点击劫持
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  // XSS 防护
  response.headers.set('X-XSS-Protection', '1; mode=block');
  // 引用来源策略
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // 禁用浏览器权限（摄像头、麦克风、地理位置）
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

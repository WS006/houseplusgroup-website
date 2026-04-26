import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1];

  // 根路径直接放行（由 app/page.tsx 处理重定向）
  if (pathname === '/') return NextResponse.next();

  // 如果第一段存在且不是有效语言代码，返回 404（rewrite 到 /en/404）
  if (firstSegment && !validLangs.includes(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = '/en/404'; // 会被 catch-all 路由捕获并显示英文 404
    return NextResponse.rewrite(url, { status: 404 });
  }

  // 添加安全响应头
  const response = NextResponse.next();

  // 防止被 iframe 嵌套（点击劫持防护）
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // 阻止 MIME 类型嗅探
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 控制 Referrer 信息泄露
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 限制浏览器权限（相机、麦克风、地理位置等）
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

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

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

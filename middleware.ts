import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, LanguageDetector } from '../i18n-config';

const publicFile = /\.(.*)$/;
const excludeFile = /(api|static|app|assets|favicon\.png|robots\.txt|sitemap\.xml|googleadservices|google-ads|googlesyndication)/;

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;

  // 静态文件不处理
  if (publicFile.test(pathname) || excludeFile.test(pathname)) {
    return res;
  }

  // 检测语言
  const detector = new LanguageDetector(request, i18n);
  const lng = detector.detect();

  // 如果路径不包含语言前缀，重定向到带语言前缀的路径
  if (!pathname.match(/^\/[a-z]{2}(\/|$)/)) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, request.url));
  }

  // 设置语言 cookie
  res.cookies.set('i18next', lng);

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*'],
};

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('middleware forwards the locale for server-rendered HTML attributes', () => {
  const middleware = read('middleware.ts');
  assert.match(middleware, /requestHeaders\.set\('x-houseplus-locale', firstSegment\)/);
  assert.match(middleware, /NextResponse\.next\(\{ request: \{ headers: requestHeaders \} \}\)/);
});

test('root layout renders localized lang and direction attributes', () => {
  const layout = read('app/layout.tsx');
  assert.match(layout, /export const dynamic = 'force-dynamic'/);
  assert.match(layout, /headers\(\)\.get\('x-houseplus-locale'\)/);
  assert.match(layout, /<html lang=\{locale\} dir=\{getLocaleDirection\(locale\)\}>/);
});

test('client-side locale navigation keeps Arabic document direction in sync', () => {
  const layout = read('app/[lang]/layout.tsx');
  assert.match(layout, /document\.documentElement\.lang=/);
  assert.match(layout, /document\.documentElement\.dir=/);
  assert.match(layout, /lang === 'ar' \? 'rtl' : 'ltr'/);
});

test('product pages use localized quotation guidance instead of unverified GEO or fixed commercial claims', () => {
  const productPage = read('app/[lang]/products/[slug]/page.tsx');
  assert.doesNotMatch(productPage, /GEO Fact:/);
  assert.match(productPage, /const quotationFaq = \[\{ question: ui\.quoteQuestion, answer: ui\.quoteAnswer \}\]/);
  assert.match(productPage, /b2bInfo: undefined/);
  assert.match(productPage, /value: ui\.confirmByQuote/);
  assert.match(productPage, /ui\.questionPrefix/);
  assert.match(productPage, /ui\.answerPrefix/);
});

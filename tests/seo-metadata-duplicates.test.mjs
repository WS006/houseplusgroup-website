import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('legacy EU region URL permanently redirects and is excluded from the indexable region list', () => {
  const regionPage = read('app/[lang]/regions/[region]/page.tsx');
  const middleware = read('middleware.ts');
  const urls = read('lib/urls.ts');
  assert.match(regionPage, /permanentRedirect\(`\/\$\{lang\}\/regions\/\$\{legacyRegionAliases\[region\]\}`\)/);
  assert.match(regionPage, /legacyRegionAliases: Record<string, string> = \{ eu: 'europe' \}/);
  assert.match(middleware, /segments\[2\] === 'regions' && segments\[3\] === 'eu'/);
  assert.match(middleware, /return NextResponse\.redirect\(url, 301\)/);
  assert.doesNotMatch(urls, /'eu'/);
});

test('middleware reads its administrator password only from the deployment environment', () => {
  const middleware = read('middleware.ts');
  assert.match(middleware, /const ADMIN_PASSWORD = process\.env\.HOUSEPLUS_ADMIN_PASSWORD \|\| process\.env\.ADMIN_PASSWORD/);
  assert.match(middleware, /if \(!ADMIN_PASSWORD \|\| pass !== ADMIN_PASSWORD\)/);
  assert.doesNotMatch(middleware, /const ADMIN_PASSWORD = ['"`]/);
});

test('formerly duplicated multilingual news metadata uses localized title and description maps', () => {
  for (const path of [
    'app/[lang]/news/energy-efficiency-standards-appliances/page.tsx',
    'app/[lang]/news/global-wholesale-guide-home-appliances/page.tsx',
    'app/[lang]/news/oem-odm-manufacturing-guide/page.tsx',
  ]) {
    const source = read(path);
    assert.match(source, /const titles: Record<string, string>/);
    assert.match(source, /const descriptions: Record<string, string>/);
    assert.match(source, /title: titles\[lang\] \|\| titles\.en/);
    assert.match(source, /description: descriptions\[lang\] \|\| descriptions\.en/);
  }
});

test('French electronics and smart-home market pages retain distinct metadata', () => {
  const electronics = read('app/[lang]/news/2026-electronics-market-update/page.tsx');
  const smartHome = read('app/[lang]/news/2026-smart-home-appliances-market-guide/page.tsx');
  assert.match(electronics, /Tendances du marché de l’électronique 3C en 2026/);
  assert.match(smartHome, /Tendances du marché mondial des appareils électroménagers intelligents 2026/);
  assert.doesNotMatch(electronics, /Explorez les tendances clés qui façonnent le marché des appareils électroménagers intelligents/);
});

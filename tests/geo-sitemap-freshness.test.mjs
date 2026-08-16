import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('GEO/AEO entity and product updates emit fresh sitemap lastmod signals', () => {
  const sitemap = read('app/sitemap.ts');
  for (const slug of ["''", "'about-us'", "'products'", "'factory'", "'service'", "'certifications'", "'oem-odm'", "'brand'"]) {
    assert.match(sitemap, new RegExp(`${slug}: '2026-08-16'`));
  }
  assert.match(sitemap, /slug\.startsWith\('products\/'\)/);
  assert.match(sitemap, /\? '2026-08-16'/);
});

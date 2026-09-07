import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const tags = read('lib/revalidation.ts');
const route = read('app/api/revalidate/route.ts');

test('revalidation rules cover all five locales and related public paths', () => {
  assert.match(tags, /homepage: \(lang: Locale\)/);
  assert.match(tags, /productSlug: \(lang: Locale, slug: string\)/);
  assert.match(tags, /for \(const lang of locales\)/);
  assert.match(tags, /\/products\/\$\{event\.slug\}\//);
  assert.match(tags, /\/news\/\$\{event\.slug\}\//);
});

test('revalidation endpoint requires signed, timestamped, identified events', () => {
  assert.match(route, /HOUSEPLUS_REVALIDATE_SECRET/);
  assert.match(route, /x-houseplus-timestamp/);
  assert.match(route, /x-houseplus-signature/);
  assert.match(route, /x-houseplus-event-id/);
  assert.match(route, /timingSafeEqual/);
  assert.match(route, /MAX_CLOCK_SKEW_MS/);
});

test('revalidation endpoint validates events before invalidating paths and tags', () => {
  assert.match(route, /isRevalidationEvent\(payload\)/);
  assert.match(route, /revalidatePath\(path\)/);
  assert.match(route, /revalidateTag\(tag\)/);
  assert.match(route, /Cache-Control.*no-store/);
});

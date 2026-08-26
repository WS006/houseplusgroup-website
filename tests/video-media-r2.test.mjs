import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const articleSource = readFileSync(new URL('../lib/blog-data/august-2026-b2b-insights.ts', import.meta.url), 'utf8');
const articlePageSource = readFileSync(new URL('../app/[lang]/news/[slug]/page.tsx', import.meta.url), 'utf8');

const mediaUrls = [
  'https://images.houseplus-ch.com/media/houseplus-portable-power-supply-product-overview-video/',
  'https://images.houseplus-ch.com/media/houseplus-portable-power-supply-product-overview-poster/',
  'https://images.houseplus-ch.com/media/houseplus-portable-power-supply-captions-en/',
];

test('portable power video articles reference durable v2 R2 media URLs instead of temporary storage', () => {
  assert.doesNotMatch(articleSource, /manus-storage\/houseplus-portable-power/);
  for (const url of mediaUrls) assert.match(articleSource, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal((articleSource.match(/video: portablePowerOverviewVideo/g) ?? []).length, 2);
  assert.match(articleSource, /heroImageFocus: 'upper'/);
});

test('video player exposes verified visual descriptions for the no-narration source video', () => {
  assert.match(articlePageSource, /<source src=\{post\.video\.contentUrl\} type="video\/mp4" \/>/);
  assert.match(articlePageSource, /kind="descriptions"/);
  assert.match(articlePageSource, /label="English visual descriptions"/);
  assert.match(articlePageSource, /poster=\{post\.video\.poster\}/);
  assert.match(articlePageSource, /src=\{post\.video\.captionsUrl\}/);
  assert.match(articlePageSource, /post\.heroImageFocus === 'upper' \? 'object-\[50%_15%\]' : 'object-center'/);
});

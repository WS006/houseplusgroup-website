import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const config = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8');
const carousel = readFileSync(new URL('../components/Carousel.tsx', import.meta.url), 'utf8');
const industry = readFileSync(new URL('../components/IndustrySection.tsx', import.meta.url), 'utf8');
const productPage = readFileSync(new URL('../app/[lang]/products/[slug]/page.tsx', import.meta.url), 'utf8');

test('remote R2 images remain eligible for Next responsive image optimization', () => {
  assert.doesNotMatch(config, /unoptimized:\s*true/);
  assert.match(config, /hostname:\s*'images\.houseplus-ch\.com'/);
});

test('homepage carousel prioritizes only the initial hero and defers the remaining slides', () => {
  assert.match(carousel, /import Image from 'next\/image'/);
  assert.match(carousel, /priority=\{index === 0\}/);
  assert.match(carousel, /loading=\{index === 0 \? undefined : 'lazy'\}/);
  assert.match(carousel, /sizes="100vw"/);
});

test('below-the-fold industry and product LCP images declare responsive sizes', () => {
  assert.match(industry, /sizes="\(max-width: 1024px\) 100vw, 50vw"/);
  assert.match(industry, /loading="lazy"/);
  assert.match(productPage, /sizes="\(max-width: 1024px\) 100vw, 50vw"/);
  assert.match(productPage, /priority/);
});

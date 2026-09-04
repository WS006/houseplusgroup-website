import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const config = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8');
const carousel = readFileSync(new URL('../components/Carousel.tsx', import.meta.url), 'utf8');
const industry = readFileSync(new URL('../components/IndustrySection.tsx', import.meta.url), 'utf8');
const productPage = readFileSync(new URL('../app/[lang]/products/[slug]/page.tsx', import.meta.url), 'utf8');
const productCatalog = readFileSync(new URL('../app/[lang]/products/page.tsx', import.meta.url), 'utf8');
const serviceWidget = readFileSync(new URL('../components/ServiceWidget.tsx', import.meta.url), 'utf8');
const globals = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const pageSources = [
  ...['about-us', 'careers', 'case-studies', 'contact', 'faq', 'team'].map((slug) => readFileSync(new URL(`../app/[lang]/${slug}/page.tsx`, import.meta.url), 'utf8')),
  readFileSync(new URL('../components/ArticleFeatureImage.tsx', import.meta.url), 'utf8'),
  readFileSync(new URL('../components/ArticleMeta.tsx', import.meta.url), 'utf8'),
];

test('remote R2 images remain eligible for Next responsive image optimization', () => {
  assert.doesNotMatch(config, /unoptimized:\s*true/);
  assert.match(config, /hostname:\s*'images\.houseplus-ch\.com'/);
  assert.match(config, /formats:\s*\['image\/avif', 'image\/webp'\]/);
  assert.match(config, /productionBrowserSourceMaps:\s*true/);
});

test('homepage carousel exposes every slide for discovery while prioritizing only the initial hero', () => {
  assert.match(carousel, /import Image from 'next\/image'/);
  assert.doesNotMatch(carousel, /loadedSlides/);
  assert.match(carousel, /src=\{item\.image\.filename\}/);
  assert.match(carousel, /alt=\{item\.image\.alt \|\| item\.title\}/);
  assert.match(carousel, /priority=\{index === 0\}/);
  assert.match(carousel, /loading=\{index === 0 \? 'eager' : 'lazy'\}/);
  assert.match(carousel, /fetchPriority=\{index === 0 \? 'high' : 'low'\}/);
  assert.match(carousel, /sizes="\(max-width: 767px\) 100vw, 1400px"/);
});

test('below-the-fold industry and product LCP images declare responsive sizes', () => {
  assert.match(industry, /sizes="\(max-width: 1024px\) 100vw, 50vw"/);
  assert.match(industry, /loading="lazy"/);
  assert.match(productPage, /sizes="\(max-width: 1024px\) 100vw, 50vw"/);
  assert.match(productPage, /priority/);
  assert.match(productCatalog, /import Image from 'next\/image'/);
  assert.match(productCatalog, /sizes="\(max-width: 768px\) 100vw, \(max-width: 1280px\) 33vw, 400px"/);
  assert.match(productCatalog, /quality=\{78\}/);
});

test('closed service widget can shrink to zero width on mobile regardless of localized label length', () => {
  assert.match(serviceWidget, /min-w-0 flex-none/);
  assert.match(serviceWidget, /isOpen \? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none'/);
});

test('mobile headings wrap long localized compound terms rather than widening the document', () => {
  assert.match(globals, /@media \(max-width: 767px\)/);
  assert.match(globals, /overflow-wrap: anywhere/);
  assert.match(globals, /hyphens: auto/);
});

test('public page image components use Next Image instead of native img tags', () => {
  for (const source of pageSources) {
    assert.doesNotMatch(source, /<img\b/);
  }
});

test('floating interaction tools are delayed so they do not block the initial homepage bundle', () => {
  const layout = readFileSync(new URL('../app/[lang]/layout.tsx', import.meta.url), 'utf8');
  const floatingTools = readFileSync(new URL('../components/FloatingTools.tsx', import.meta.url), 'utf8');
  assert.match(layout, /import FloatingTools from '@\/components\/FloatingTools'/);
  assert.doesNotMatch(layout, /import (ServiceWidget|ChatBot|BackToTop)/);
  assert.match(floatingTools, /dynamic\(\(\) => import\('@\/components\/(ServiceWidget|ChatBot|BackToTop)'\), \{ ssr: false \}\)/);
});

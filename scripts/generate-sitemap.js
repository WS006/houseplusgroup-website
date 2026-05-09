/**
 * Sitemap Generator (Standalone)
 *
 * Note: The primary sitemap is generated via app/sitemap.ts (Next.js route).
 * This script is provided as a fallback for manual sitemap generation.
 *
 * Usage: node scripts/generate-sitemap.js [--output public/sitemap.xml]
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://houseplus-ch.com';
const LOCALES = ['en', 'zh', 'es', 'fr', 'de'];

const STATIC_PAGES = [
  '/',
  '/about-us',
  '/contact',
  '/products',
  '/faq',
  '/terms',
  '/privacy',
];

// These would normally come from Storyblok API
const PRODUCTS = [
  'solar-panels-300w',
  'portable-power-station-1000w',
  'home-refrigerator-200l',
  'washing-machine-8kg',
  'solar-fan-dc',
  'water-purifier-5-stage',
  'led-lighting-kit',
  'portable-power-station-500w',
  'portable-power-station-300w',
  'solar-panel-100w',
  'deep-freezer-300l',
  'electric-kettle-1-8l',
  'blender-750w',
  'rice-cooker-1-5l',
  'microwave-700w',
  'solar-home-system',
  'ice-maker-15kg',
  'gas-cooker-2-burner',
  'ceiling-fan-52-inch',
];

const BLOG_POSTS = [
  'how-to-choose-solar-supplier',
  'portable-power-station-buying-guide',
  'home-appliance-wholesale-tips',
  'solar-energy-market-trends-2026',
  'oem-odm-manufacturing-guide',
  'ce-certification-guide-importers',
  'solar-power-africa-opportunities',
];

function generateSitemap() {
  const now = new Date().toISOString();
  let urls = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    urls.push({
      loc: `${SITE_URL}/en${page}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: page === '/' ? '1.0' : '0.8',
      alternates: LOCALES.map(l => ({
        lang: l,
        href: `${SITE_URL}/${l}${page}`,
      })),
    });
  }

  // Product pages
  for (const product of PRODUCTS) {
    urls.push({
      loc: `${SITE_URL}/en/products/${product}`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '0.7',
      alternates: LOCALES.map(l => ({
        lang: l,
        href: `${SITE_URL}/${l}/products/${product}`,
      })),
    });
  }

  // Blog posts
  for (const post of BLOG_POSTS) {
    urls.push({
      loc: `${SITE_URL}/en/news/${post}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.6',
      alternates: LOCALES.map(l => ({
        lang: l,
        href: `${SITE_URL}/${l}/news/${post}`,
      })),
    });
  }

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    for (const alt of url.alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />\n`;
    }
    xml += '  </url>\n';
  }

  xml += '</urlset>';
  return xml;
}

function main() {
  const args = process.argv.slice(2);
  const outputIdx = args.indexOf('--output');
  const outputFile = outputIdx >= 0
    ? args[outputIdx + 1]
    : path.join(__dirname, '..', 'public', 'sitemap.xml');

  const sitemap = generateSitemap();
  fs.writeFileSync(outputFile, sitemap);
  console.log(`Sitemap generated: ${outputFile}`);
  console.log(`Total URLs: ${(sitemap.match(/<loc>/g) || []).length}`);
}

main();

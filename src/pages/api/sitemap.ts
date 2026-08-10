/**
 * Dynamic Sitemap Generator
 * Updated: 2026-07-28
 *
 * Generates /sitemap.xml with:
 * - Multi-language URLs (hreflang alternates)
 * - Product pages (with lastmod from database)
 * - Category pages
 * - Static pages (home, about, contact, FAQ)
 * - Proper priority and changefreq values
 *
 * Accessible at: https://www.houseplus-ch.com/sitemap.xml
 *
 * SEO Impact:
 * - Ensures all pages are discovered by crawlers
 * - Multi-language sitemap with hreflang improves international SEO
 * - lastmod helps crawlers prioritize recently updated content
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { siteConfig } from '../../config/seo-config';
import { blogSlugs, blogPosts } from '../../data/blog';

// === Sitemap configuration ===
const BASE_URL = siteConfig.url;
const SUPPORTED_LOCALES = ['en', 'es', 'de', 'fr', 'ar'];

// === Static pages (exist in all languages) ===
const staticPages = [
  { path: '', priority: 1.0, changefreq: 'daily' },           // Homepage
  { path: '/products', priority: 0.9, changefreq: 'daily' },   // Product list
  { path: '/about', priority: 0.7, changefreq: 'monthly' },    // About us
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },  // Contact
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },      // FAQ
  { path: '/certifications', priority: 0.6, changefreq: 'monthly' }, // Certifications
  { path: '/oem-odm', priority: 0.7, changefreq: 'monthly' },  // OEM/ODM services
  { path: '/blog', priority: 0.6, changefreq: 'weekly' },      // Blog index
];

// === Product categories ===
const productCategories = [
  'solar-panels',
  'solar-inverters',
  'solar-batteries',
  'portable-power-stations',
  'home-appliances',
  'kitchen-appliances',
  '3c-electronics',
  'tws-earphones',
  'smart-watches',
  'portable-ssd',
];

// === Product slugs (in production, fetch from database/CMS) ===
const productSlugs = [
  'monocrystalline-solar-panel-500w',
  'monocrystalline-solar-panel-400w',
  'polycrystalline-solar-panel-300w',
  'flexible-solar-panel-200w',
  'hybrid-solar-inverter-5kw',
  'off-grid-solar-inverter-3kw',
  'mppt-solar-charge-controller-60a',
  'lifepo4-battery-12v-200ah',
  'lifepo4-battery-48v-100ah',
  'portable-power-station-1000w',
  'portable-power-station-500w',
  'solar-street-light-100w',
  'solar-street-light-60w',
  'air-fryer-6l-digital',
  'electric-kettle-1.7l-stainless',
  'blender-1500w-professional',
  'slow-juicer-masticating',
  'rice-cooker-5l-smart',
  'tws-earphones-bluetooth-5.3',
  'tws-earphones-anc-noise-cancelling',
  'smart-watch-fitness-tracker',
  'smart-watch-amoled-display',
  'portable-ssd-1tb-usb-c',
  'portable-ssd-2tb-type-c',
  'power-bank-20000mah-fast-charge',
  'led-ring-light-18-inch',
  'mini-projector-1080p',
  'car-vacuum-cleaner-cordless',
];

// === Blog post slugs — imported from the centralized data registry ===
// Blog article slugs and metadata are managed in src/data/blog/index.ts.
// Adding a new article there automatically includes it in the sitemap.

// === XML escape helper ===
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return char;
    }
  });
}

// === Build URL element with hreflang alternates ===
function buildUrlElement(
  path: string,
  priority: number,
  changefreq: string,
  lastmod?: string
): string {
  const alternates = SUPPORTED_LOCALES.map((locale) => {
    const url = `${BASE_URL}/${locale}${path}`;
    return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(url)}" />`;
  }).join('\n');

  const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}/en${path}`)}" />`;

  const lastmodTag = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '';

  return `  <url>
    <loc>${escapeXml(`${BASE_URL}/en${path}`)}</loc>
${lastmodTag}    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
${alternates}
${xdefault}
  </url>`;
}

// === Generate sitemap index (for very large sites, split into multiple sitemaps) ===
function generateSitemapIndex(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-products.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// === Main sitemap generator ===
function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  const urls: string[] = [];

  // 1. Static pages
  staticPages.forEach((page) => {
    urls.push(buildUrlElement(page.path, page.priority, page.changefreq, today));
  });

  // 2. Product category pages
  productCategories.forEach((category) => {
    urls.push(
      buildUrlElement(
        `/products?category=${category}`,
        0.8,
        'weekly',
        today
      )
    );
  });

  // 3. Individual product pages
  productSlugs.forEach((slug) => {
    urls.push(
      buildUrlElement(
        `/products/${slug}`,
        0.8,
        'weekly',
        today
      )
    );
  });

  // 4. Blog posts — use dateModified from each article for accurate lastmod
  blogSlugs.forEach((slug) => {
    const post = blogPosts[slug];
    const lastmod = post ? post.dateModified : today;
    urls.push(
      buildUrlElement(
        `/blog/${slug}`,
        0.7,
        'weekly',
        lastmod
      )
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

// === API handler ===
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set cache headers — sitemap can be cached for 6 hours
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=21600, s-maxage=21600');

    // In production, you might fetch dynamic data here:
    // const products = await fetchProductsFromCMS();
    // const blogPosts = await fetchBlogPostsFromCMS();

    const sitemap = generateSitemap();
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?>\n<error>Sitemap generation failed</error>');
  }
}

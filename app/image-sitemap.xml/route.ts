import { PRODUCT_DATA } from '@/lib/product-data';
import { blogPosts } from '@/lib/blog-data';
import { r2MediaUrl } from '@/lib/r2-media-map';
import { canonicalSiteUrl } from '@/lib/urls';
import { CURATED_CORE_PAGE_IMAGES } from '@/lib/image-sitemap-governance';
import { getSitemapLastModified, PRODUCT_DETAIL_LAST_MODIFIED } from '@/lib/sitemap-lastmod';

const BASE_URL = 'https://www.houseplus-ch.com';

interface ImageEntry {
  loc: string;
  title: string;
  caption: string;
}

interface PageImages {
  pageUrl: string;
  lastModified: string;
  images: ImageEntry[];
}

const ARTICLE_COVERS: Record<string, { title: string; caption: string; image?: string }> = {
  'consumer-electronics-battery-life-testing': {
    title: 'Consumer electronics battery cycle life testing',
    caption: 'Battery cycle life testing in a controlled consumer electronics laboratory in Zhongshan, Guangdong, China.',
  },
  'appliance-energy-efficiency-vs-actual-consumption': {
    title: 'Appliance energy consumption measurement',
    caption: 'Energy consumption measurement for home appliances in a professional test environment in Zhongshan, Guangdong, China.',
  },
  'solar-storage-efficiency-optimization-guide': {
    title: 'Industrial solar storage efficiency optimization',
    caption: 'Engineer reviewing an industrial solar energy storage system for efficiency optimization in Zhongshan, Guangdong, China.',
  },
  '2026-solar-market-update': {
    title: 'Solar energy innovations for 2026',
    caption: 'Modern solar microgrid and battery energy storage equipment for global B2B wholesale markets.',
  },
  '2026-appliances-market-update': {
    title: 'Energy-efficient smart home appliances for 2026',
    caption: 'Connected kitchen appliances for global wholesale buyers, sourced from Zhongshan, Guangdong, China.',
  },
  '2026-electronics-market-update': {
    title: '3C electronics trends for 2026',
    caption: 'Curated 3C electronics collection including audio, storage and charging accessories for global B2B distribution.',
  },
  '2026-smart-home-appliances-market-guide': {
    title: 'Smart home appliance procurement guide',
    caption: 'Connected smart home appliances and energy monitoring products for 2026 B2B procurement.',
  },
  'solar-energy-storage-industrial-manufacturing': {
    title: 'Industrial solar energy storage systems',
    caption: 'Industrial lithium battery racks and solar energy storage infrastructure for sustainable manufacturing.',
  },
  'oem-odm-manufacturing-guide': {
    title: 'OEM and ODM appliance product development',
    caption: 'Product development table with appliance prototypes and packaging samples for OEM and ODM manufacturing.',
  },
  'energy-efficiency-standards-appliances': {
    title: 'Home appliance energy efficiency standards',
    caption: 'Home appliance compliance testing for CE and RoHS-ready international wholesale distribution.',
  },
  'global-wholesale-guide-home-appliances': {
    title: 'Global wholesale home appliance distribution',
    caption: 'Export-ready home appliances prepared for global B2B warehouse logistics.',
  },
  'advanced-manufacturing-home-appliances': {
    title: 'Advanced home appliance manufacturing',
    caption: 'Robotic manufacturing line for quality-controlled home appliance production in Zhongshan, Guangdong, China.',
  },
  'the-future-of-smart-home-appliances': {
    title: 'Future-ready smart home appliances',
    caption: 'Connected energy-efficient appliances in a refined contemporary smart-home environment.',
  },
  'smart-home-appliances': {
    title: 'Smart home appliances and connected living',
    caption: 'Connected smart home appliances and energy-efficient product concepts for global B2B sourcing.',
    image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-smart-home-appliances-connected-living-b2b-guide/',
  },
  'solar-energy-storage-solutions': {
    title: 'Solar energy storage solutions',
    caption: 'Solar battery systems and portable power equipment for global energy storage procurement.',
    image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-solar-energy-storage-solutions-b2b-guide/',
  },
  'the-evolution-of-3c-electronics': {
    title: 'Evolution of 3C electronics',
    caption: '3C electronics and accessories for product sourcing and international distribution.',
    image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/',
  },
  'the-future-of-solar-energy': {
    title: 'Future solar energy technology',
    caption: 'Solar panels and portable energy equipment for global procurement discussions.',
    image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-future-solar-energy-b2b-guide/',
  },
};

function absolute(path: string): string {
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

function coverPath(slug: string): string {
  return r2MediaUrl(`/images/articles/covers/${slug}.jpg`);
}

const dynamicArticleImages: PageImages[] = Object.values(blogPosts).map((post) => ({
  pageUrl: `/en/news/${post.slug}`,
  lastModified: post.dateModified || post.datePublished,
  images: [{
    loc: absolute(post.heroImage),
    title: post.title,
    caption: post.heroImageAlt,
  }],
}));

const staticArticleImages: PageImages[] = Object.entries(ARTICLE_COVERS).map(([slug, image]) => ({
  pageUrl: `/en/news/${slug}`,
  lastModified: getSitemapLastModified(`news/${slug}`),
  images: [{
    loc: absolute(image.image || coverPath(slug)),
    title: image.title,
    caption: image.caption,
  }],
}));

const productImages: PageImages[] = Object.entries(PRODUCT_DATA).map(([slug, product]) => ({
  pageUrl: `/en/products/${slug}`,
  lastModified: PRODUCT_DETAIL_LAST_MODIFIED,
  images: [{
    loc: absolute(product.coverImage),
    title: product.imageTitle || product.name,
    caption: product.imageAlt || product.description,
  }],
}));

const corePageImages: PageImages[] = Object.values(
  CURATED_CORE_PAGE_IMAGES.reduce<Record<string, PageImages>>((pages, image) => {
    const page = pages[image.pageUrl] || {
      pageUrl: image.pageUrl,
      lastModified: getSitemapLastModified(image.pageUrl.replace(/^\/en\/?/, '')),
      images: [],
    };
    page.images.push({ loc: absolute(image.loc), title: image.title, caption: image.caption });
    pages[image.pageUrl] = page;
    return pages;
  }, {})
);

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}



// The media Worker currently returns a small historical set of 404 JSON
// responses. Keep those stale objects out of the public image Sitemap until
// the corresponding assets are restored or retired in the media control plane.
const INVALID_DYNAMIC_MEDIA_URLS = new Set([
  'https://images.houseplus-ch.com/media/houseplus-3c-electronics-banner-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-solar-panel-3-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-solar-panel-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-solar-battery-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-rice-cooker-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-kitchen-appliances-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-led-lighting-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-portable-power-station-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-power-bank-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-bluetooth-earbuds-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-electric-kettle-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-headphone-over-ear-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-power-bank-white-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-power-station-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-smartwatch-display-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-product-wall-outlet-usb-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-solar-panel-2-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-solar-power-station-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-wireless-charger-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-site-factory-worker-precision/',
  'https://images.houseplus-ch.com/media/houseplus-site-team-collaboration-office/',
  'https://images.houseplus-ch.com/media/houseplus-site-team-working-together/',
  'https://images.houseplus-ch.com/media/houseplus-site-warehouse-logistics-shipping/',
  'https://images.houseplus-ch.com/media/houseplus-appliances-package-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-appliances-showcase-wholesale/',
  'https://images.houseplus-ch.com/media/houseplus-carousel-carousel-electronics/',
  'https://images.houseplus-ch.com/media/houseplus-carousel-carousel-home-appliances/',
  'https://images.houseplus-ch.com/media/houseplus-carousel-carousel-solar-energy/',
  'https://images.houseplus-ch.com/media/houseplus-home-appliances-hero/',
  'https://images.houseplus-ch.com/media/houseplus-home-electronics-hero/',
  'https://images.houseplus-ch.com/media/houseplus-home-solar-hero/',
  'https://images.houseplus-ch.com/media/houseplus-about-houseplus-group-factory/',
  'https://images.houseplus-ch.com/media/houseplus-about-manufacturing-facility/',
  'https://images.houseplus-ch.com/media/houseplus-about-production-line/',
  'https://images.houseplus-ch.com/media/houseplus-articles-appliances-home-appliance-manufacturing-line-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-appliances-appliance-energy-efficiency-label-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-appliances-home-appliance-refrigerator-interior-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-appliances-smart-home-living-room-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-appliances-smart-kitchen-appliances-modern-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-electronics-battery-testing-lab-equipment-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-bluetooth-speaker-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-headphones-audio-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-power-bank-product-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-router-network-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-smartwatch-product-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-service-factory-production-line-automated-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-service-quality-control-lab-testing-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-solar-solar-energy-farm-panels-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-solar-solar-panel-sunset-industrial-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-articles-solar-solar-power-station-outdoor-b2b-guide/',
  'https://images.houseplus-ch.com/media/houseplus-site-customer-support-helpdesk/',
  'https://images.houseplus-ch.com/media/houseplus-team-logistics-port/',
  'https://images.houseplus-ch.com/media/houseplus-team-office-meeting/'
]);

function removeInvalidDynamicImages(block: string): string {
  return block.replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, (image) => {
    const loc = extractTag(image, 'image:loc');
    return loc && INVALID_DYNAMIC_MEDIA_URLS.has(loc) ? '' : image;
  });
}

const DYNAMIC_MEDIA_SITEMAP_URL = `${(process.env.HOUSEPLUS_MEDIA_API_URL || 'https://houseplus-media-api.jack006hu.workers.dev').replace(/\/$/, '')}/sitemap-images.xml`;

function renderPage(page: PageImages): string {
  const imageTags = page.images.map((image) => `    <image:image>\n      <image:loc>${escapeXml(image.loc)}</image:loc>\n      <image:title>${escapeXml(image.title)}</image:title>\n      <image:caption>${escapeXml(image.caption)}</image:caption>\n      <image:license>${canonicalSiteUrl('terms')}</image:license>\n    </image:image>`).join('\n');
  return `  <url>\n    <loc>${canonicalSiteUrl(page.pageUrl)}</loc>\n    <lastmod>${escapeXml(page.lastModified)}</lastmod>\n${imageTags}\n  </url>`;
}

function extractTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match?.[1] || null;
}

function mergeDynamicMediaSitemap(staticXml: string, dynamicXml: string): string {
  const staticBlocks = [...staticXml.matchAll(/<url>[\s\S]*?<\/url>/g)]
    .map((match) => removeInvalidDynamicImages(match[0]))
    .filter((block) => /<image:image>[\s\S]*?<\/image:image>/.test(block));
  const dynamicBlocks = [...dynamicXml.matchAll(/<url>[\s\S]*?<\/url>/g)]
    .map((match) => removeInvalidDynamicImages(match[0]))
    .filter((block) => /<image:image>[\s\S]*?<\/image:image>/.test(block));
  const blocks = new Map<string, string>();
  for (const block of staticBlocks) {
    const loc = extractTag(block, 'loc');
    if (loc) blocks.set(loc, block);
  }
  for (const block of dynamicBlocks) {
    const loc = extractTag(block, 'loc');
    if (!loc) continue;
    const existing = blocks.get(loc);
    if (!existing) {
      blocks.set(loc, block);
      continue;
    }
    const existingImages = [...existing.matchAll(/<image:image>[\s\S]*?<\/image:image>/g)].map((match) => match[0]);
    const knownImageLocs = new Set(existingImages.map((image) => extractTag(image, 'image:loc')));
    const additions = [...block.matchAll(/<image:image>[\s\S]*?<\/image:image>/g)]
      .map((match) => match[0])
      .filter((image) => !knownImageLocs.has(extractTag(image, 'image:loc')));
    const dynamicLastmod = extractTag(block, 'lastmod');
    const existingLastmod = extractTag(existing, 'lastmod');
    const lastmod = dynamicLastmod && (!existingLastmod || dynamicLastmod > existingLastmod) ? dynamicLastmod : existingLastmod;
    const withoutImages = existing.replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, '');
    const merged = withoutImages.replace('</url>', `${additions.join('')}\n  </url>`);
    blocks.set(loc, lastmod ? merged.replace(/<lastmod>[\s\S]*?<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`) : merged);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${[...blocks.values()].join('\n')}\n</urlset>`;
}

function generateStaticImageSitemap(): string {
  const pages = [...dynamicArticleImages, ...staticArticleImages, ...productImages, ...corePageImages];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${pages.map(renderPage).join('\n')}\n</urlset>`;
}

export async function GET() {
  const staticXml = generateStaticImageSitemap();
  let xml = staticXml;
  try {
    const response = await fetch(DYNAMIC_MEDIA_SITEMAP_URL, { cache: 'no-store' });
    if (response.ok) xml = mergeDynamicMediaSitemap(staticXml, await response.text());
  } catch {
    // Static source data remains a safe fallback if the media Worker is unavailable.
  }
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}

import { PRODUCT_DATA } from '@/lib/product-data';
import { blogPosts } from '@/lib/blog-data';
import { r2MediaUrl } from '@/lib/r2-media-map';

const BASE_URL = 'https://www.houseplus-ch.com';

interface ImageEntry {
  loc: string;
  title: string;
  caption: string;
}

interface PageImages {
  pageUrl: string;
  images: ImageEntry[];
}

const ARTICLE_COVERS: Record<string, { title: string; caption: string }> = {
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
};

function absolute(path: string): string {
  return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

function coverPath(slug: string): string {
  return r2MediaUrl(`/images/articles/covers/${slug}.jpg`);
}

const dynamicArticleImages: PageImages[] = Object.values(blogPosts).map((post) => ({
  pageUrl: `/en/news/${post.slug}`,
  images: [{
    loc: absolute(post.heroImage),
    title: post.title,
    caption: post.heroImageAlt,
  }],
}));

const staticArticleImages: PageImages[] = Object.entries(ARTICLE_COVERS).map(([slug, image]) => ({
  pageUrl: `/en/news/${slug}`,
  images: [{
    loc: absolute(coverPath(slug)),
    title: image.title,
    caption: image.caption,
  }],
}));

const productImages: PageImages[] = Object.entries(PRODUCT_DATA).map(([slug, product]) => ({
  pageUrl: `/en/products/${slug}`,
  images: [{
    loc: absolute(product.coverImage),
    title: product.imageTitle || product.name,
    caption: product.imageAlt || product.description,
  }],
}));

const corePageImages: PageImages[] = [
  {
    pageUrl: '/en',
    images: [
      { loc: absolute('https://images.houseplus-ch.com/media/d52528a6-ba27-4a75-9dea-a7c36c2780e7'), title: 'HousePlus Group logo', caption: 'HousePlus global wholesale manufacturer logo based in Zhongshan, Guangdong, China.' },
      { loc: absolute('https://images.houseplus-ch.com/media/e0fd1e30-2241-4255-bc5f-cf5e8dc55135'), title: 'HousePlus solar energy solutions', caption: 'Solar panels, inverters and energy storage solutions for global wholesale buyers.' },
      { loc: absolute('https://images.houseplus-ch.com/media/b7dbffd2-f52e-42bc-b0c2-43329ca68682'), title: 'HousePlus home appliances', caption: 'Energy-efficient home appliances with OEM and ODM support from Zhongshan, Guangdong, China.' },
      { loc: absolute('https://images.houseplus-ch.com/media/7f712b0f-2530-48e8-866b-d70eb0b3bd75'), title: 'HousePlus 3C electronics', caption: '3C electronics and accessories for international B2B distribution.' },
    ],
  },
  {
    pageUrl: '/en/brand',
    images: [
      { loc: absolute('https://images.houseplus-ch.com/media/d52528a6-ba27-4a75-9dea-a7c36c2780e7'), title: 'HousePlus Group brand logo', caption: 'HousePlus Group global wholesale manufacturer brand identity.' },
      { loc: absolute('https://images.houseplus-ch.com/media/ca450b7a-5f1a-46e9-85b4-ff523b4b1bb8'), title: 'HousePlus production line', caption: 'Home appliance manufacturing production line in Zhongshan, Guangdong, China.' },
    ],
  },
  {
    pageUrl: '/en/contact',
    images: [{ loc: absolute('https://images.houseplus-ch.com/media/d52528a6-ba27-4a75-9dea-a7c36c2780e7'), title: 'Contact HousePlus', caption: 'HousePlus wholesale manufacturer contact page for global B2B buyers.' }],
  },
  {
    pageUrl: '/en/factory',
    images: [
      { loc: absolute('https://images.houseplus-ch.com/media/d3642fb5-d016-4cec-aa3a-e9ab2326050a'), title: 'HousePlus factory operations', caption: 'HousePlus manufacturing operations in Zhongshan, Guangdong, China.' },
      { loc: absolute('https://images.houseplus-ch.com/media/ca450b7a-5f1a-46e9-85b4-ff523b4b1bb8'), title: 'Home appliance production line', caption: 'Precision manufacturing line for home appliances.' },
      { loc: absolute('https://images.houseplus-ch.com/media/fa65d41c-2e23-4880-a19f-774c3bacdaa1'), title: 'Solar energy assembly line', caption: 'Solar energy equipment assembly line at HousePlus.' },
      { loc: absolute('https://images.houseplus-ch.com/media/93c9172f-bc50-400b-b347-4c212f7b2137'), title: 'HousePlus appliance quality laboratory', caption: 'Home appliance quality assurance laboratory in Zhongshan, Guangdong, China.' },
    ],
  },
  {
    pageUrl: '/en/team',
    images: [
      { loc: absolute('https://images.houseplus-ch.com/media/2946709f-9053-4d33-991a-28e37dfd3f27'), title: 'HousePlus manufacturing collaboration team', caption: 'Manufacturing operations team collaborating in Zhongshan, Guangdong, China.' },
      { loc: absolute('https://images.houseplus-ch.com/media/93e131d6-97cb-4ef4-a371-909061a46afc'), title: 'HousePlus quality engineering team', caption: 'Quality engineers conducting product testing for international compliance.' },
      { loc: absolute('https://images.houseplus-ch.com/media/886e83cd-9f61-4f90-a1e7-5d8e2c290394'), title: 'HousePlus innovation and R&D culture', caption: 'Research and development team collaborating on product innovation.' },
    ],
  },
];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateImageSitemap(): string {
  const lastmod = new Date().toISOString().split('T')[0];
  const pages = [...dynamicArticleImages, ...staticArticleImages, ...productImages, ...corePageImages];

  const urlEntries = pages.map((page) => {
    const imageTags = page.images.map((image) => `    <image:image>\n      <image:loc>${escapeXml(image.loc)}</image:loc>\n      <image:title>${escapeXml(image.title)}</image:title>\n      <image:caption>${escapeXml(image.caption)}</image:caption>\n      <image:license>${BASE_URL}/terms</image:license>\n    </image:image>`).join('\n');
    return `  <url>\n    <loc>${BASE_URL}${page.pageUrl}</loc>\n    <lastmod>${lastmod}</lastmod>\n${imageTags}\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlEntries}\n</urlset>`;
}

export async function GET() {
  return new Response(generateImageSitemap(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.houseplus-ch.com';

interface ImageEntry {
  loc: string;
  title: string;
  caption: string;
  geoLocation?: string;
}

interface PageImages {
  pageUrl: string;
  images: ImageEntry[];
}

const articleImages: PageImages[] = [
  {
    pageUrl: '/en/news/solar-storage-efficiency-optimization-guide',
    images: [
      {
        loc: `${BASE_URL}/images/articles/solar-lifepo4-battery-storage-800x600.webp`,
        title: 'LiFePO4 Solar Battery Storage System',
        caption: 'Industrial LiFePO4 battery bank with 95% round-trip efficiency and 6000 cycle life',
        geoLocation: 'Lagos, Nigeria',
      },
      {
        loc: `${BASE_URL}/images/articles/mppt-charge-controller-40a-800x600.webp`,
        title: 'MPPT Solar Charge Controller 40A',
        caption: 'MPPT charge controller with 98% conversion efficiency for solar battery systems',
      },
    ],
  },
  {
    pageUrl: '/en/news/appliance-energy-efficiency-vs-actual-consumption',
    images: [
      {
        loc: `${BASE_URL}/images/articles/home-appliance-energy-rating-vs-actual-800x600.webp`,
        title: 'Home Appliance Energy Rating vs Actual Consumption',
        caption: 'Comparison chart showing 15-30% variance between rated and actual energy consumption',
      },
      {
        loc: `${BASE_URL}/images/articles/refrigerator-energy-consumption-test-800x600.webp`,
        title: 'Refrigerator Energy Consumption Test Conditions',
        caption: 'Refrigerator tested at 25°C baseline with door opening frequency impact analysis',
      },
    ],
  },
  {
    pageUrl: '/en/news/consumer-electronics-battery-life-testing',
    images: [
      {
        loc: `${BASE_URL}/images/articles/battery-cycle-life-test-equipment-800x600.webp`,
        title: 'Battery Cycle Life Test Equipment',
        caption: '1C charge-discharge cycle testing equipment at 25°C standard test conditions',
      },
      {
        loc: `${BASE_URL}/images/articles/lithium-ion-capacity-retention-curve-800x600.webp`,
        title: 'Lithium-ion Battery Capacity Retention Curve',
        caption: 'Capacity retention curve showing 80% threshold at 500 charge-discharge cycles',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-solar-market-update',
    images: [
      {
        loc: `${BASE_URL}/images/articles/solar-panels-2026-installation-800x600.webp`,
        title: 'HousePlus High-Efficiency Solar Panels 2026',
        caption: 'High-efficiency solar panels installation for B2B wholesale market in 2026',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-appliances-market-update',
    images: [
      {
        loc: `${BASE_URL}/images/articles/home-appliances-2026-showcase-800x600.webp`,
        title: 'HousePlus Home Appliances 2026 Collection',
        caption: 'Premium home appliances lineup for 2026 wholesale distribution with energy efficiency ratings',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-electronics-market-update',
    images: [
      {
        loc: `${BASE_URL}/images/articles/3c-electronics-2026-lineup-800x600.webp`,
        title: '3C Electronics 2026 Product Lineup',
        caption: '3C electronics product lineup including headphones, smartwatches and power banks for B2B market',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-smart-home-appliances-market-guide',
    images: [
      {
        loc: `${BASE_URL}/images/articles/smart-home-appliances-2026-guide-800x600.webp`,
        title: 'Smart Home Appliances 2026 Market Guide',
        caption: 'Smart home appliances integration guide for residential and commercial applications',
      },
    ],
  },
  {
    pageUrl: '/en/news/solar-energy-storage-solutions',
    images: [
      {
        loc: `${BASE_URL}/images/articles/solar-energy-storage-solutions-overview-800x600.webp`,
        title: 'Solar Energy Storage Solutions Overview',
        caption: 'Solar energy storage solutions for residential, commercial and industrial applications',
      },
    ],
  },
  {
    pageUrl: '/en/news/solar-energy-storage-industrial-manufacturing',
    images: [
      {
        loc: `${BASE_URL}/images/articles/industrial-solar-storage-manufacturing-800x600.webp`,
        title: 'Industrial Solar Storage Manufacturing Process',
        caption: 'Industrial-grade solar storage system manufacturing in 20000 sqm ISO 9001 facility',
      },
    ],
  },
  {
    pageUrl: '/en/news/energy-efficiency-standards-appliances',
    images: [
      {
        loc: `${BASE_URL}/images/articles/energy-efficiency-standards-compliance-800x600.webp`,
        title: 'Energy Efficiency Standards Compliance',
        caption: 'CE, FCC, RoHS and ISO 9001 energy efficiency standards compliance for home appliances',
      },
    ],
  },
  {
    pageUrl: '/en/news/advanced-manufacturing-home-appliances',
    images: [
      {
        loc: `${BASE_URL}/images/articles/advanced-appliance-manufacturing-line-800x600.webp`,
        title: 'Advanced Home Appliance Manufacturing Line',
        caption: 'Advanced manufacturing line for premium home appliances with automated quality control',
      },
    ],
  },
  {
    pageUrl: '/en/news/oem-odm-manufacturing-guide',
    images: [
      {
        loc: `${BASE_URL}/images/articles/oem-odm-manufacturing-process-800x600.webp`,
        title: 'OEM ODM Manufacturing Service Process',
        caption: 'OEM and ODM manufacturing service workflow from design to delivery with MOQ 100 units',
      },
    ],
  },
  {
    pageUrl: '/en/news/global-wholesale-guide-home-appliances',
    images: [
      {
        loc: `${BASE_URL}/images/articles/global-appliance-wholesale-guide-800x600.webp`,
        title: 'Global Wholesale Guide Home Appliances',
        caption: 'Global wholesale distribution guide for home appliances to 53+ countries worldwide',
      },
    ],
  },
  {
    pageUrl: '/en/news/smart-home-appliances',
    images: [
      {
        loc: `${BASE_URL}/images/articles/smart-home-appliances-integration-800x600.webp`,
        title: 'Smart Home Appliances Integration',
        caption: 'Smart home appliances with IoT integration and remote control capabilities',
      },
    ],
  },
  {
    pageUrl: '/en/news/the-future-of-solar-energy',
    images: [
      {
        loc: `${BASE_URL}/images/articles/future-solar-energy-technology-800x600.webp`,
        title: 'Future Solar Energy Technology Innovations',
        caption: 'Future solar energy technology including perovskite cells and bifacial modules',
      },
    ],
  },
  {
    pageUrl: '/en/news/the-future-of-smart-home-appliances',
    images: [
      {
        loc: `${BASE_URL}/images/articles/future-smart-home-appliances-800x600.webp`,
        title: 'Future Smart Home Appliances Trends',
        caption: 'Future smart home appliances with AI integration and energy-saving features',
      },
    ],
  },
  {
    pageUrl: '/en/news/the-evolution-of-3c-electronics',
    images: [
      {
        loc: `${BASE_URL}/images/articles/evolution-3c-electronics-800x600.webp`,
        title: 'Evolution of 3C Electronics Industry',
        caption: 'Evolution of 3C electronics industry from wired to wireless smart devices',
      },
    ],
  },
];

const productImages: PageImages[] = [
  {
    pageUrl: '/en/products/solar-panel-500w',
    images: [
      {
        loc: `${BASE_URL}/images/products/solar-panel-500w-monocrystalline-800x800.webp`,
        title: '500W Monocrystalline Solar Panel',
        caption: 'High-efficiency 500W monocrystalline solar panel for commercial and industrial installations',
      },
    ],
  },
  {
    pageUrl: '/en/products/lithium-battery-5kwh',
    images: [
      {
        loc: `${BASE_URL}/images/products/lifepo4-battery-5kwh-storage-800x800.webp`,
        title: 'LiFePO4 Battery 5kWh Energy Storage',
        caption: '5kWh LiFePO4 battery energy storage system with 6000 cycle life and 95% efficiency',
      },
    ],
  },
  {
    pageUrl: '/en/products/portable-power-station-3000w',
    images: [
      {
        loc: `${BASE_URL}/images/products/portable-power-station-3000w-800x800.webp`,
        title: '3000W Portable Power Station',
        caption: '3000W portable power station for off-grid solar applications with multiple output ports',
      },
    ],
  },
];

function generateImageSitemap(): string {
  const allPages = [...articleImages, ...productImages];
  const lastmod = new Date().toISOString().split('T')[0];

  const urlEntries = allPages
    .map((page) => {
      const imageTags = page.images
        .map(
          (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      ${img.geoLocation ? `<image:geo_location>${escapeXml(img.geoLocation)}</image:geo_location>` : ''}
      <image:license>https://www.houseplus-ch.com/terms</image:license>
    </image:image>`
        )
        .join('\n');

      return `  <url>
    <loc>${BASE_URL}${page.pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
${imageTags}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const xml = generateImageSitemap();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

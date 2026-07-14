import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.houseplus-ch.com';
const IMAGE_BASE_URL = 'https://images.houseplus-ch.com';

interface ImageEntry {
  loc: string;
  title: string;
  caption: string;
  license?: string;
}

interface PageImages {
  pageUrl: string;
  images: ImageEntry[];
}

const articleImages: PageImages[] = [
  {
    pageUrl: '/en/news/the-future-of-smart-home-appliances',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/appliances-showcase.jpg`,
        title: 'Modern Smart Home Appliances HousePlus',
        caption: 'Modern smart home appliances showcase with stainless steel kitchen appliances and connected devices',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/kitchen-appliances.jpg`,
        title: 'HousePlus Smart Kitchen Appliances',
        caption: 'Professional kitchen appliances collection with modern design and smart features',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/appliances-package.jpg`,
        title: 'HousePlus Appliances Package',
        caption: 'Global wholesale distribution of home appliances with shipping containers at port',
      },
    ],
  },
  {
    pageUrl: '/en/news/the-future-of-solar-energy',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/solar-power-station.jpg`,
        title: 'HousePlus Solar Power Station',
        caption: 'Industrial solar power station with solar panels and energy storage systems',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/portable-power-station.jpg`,
        title: 'HousePlus Portable Power Station',
        caption: 'Portable solar power station for off-grid and emergency use',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/solar-panel-3.jpg`,
        title: 'HousePlus Solar Panels',
        caption: 'High-efficiency monocrystalline solar panels for commercial installations',
      },
    ],
  },
  {
    pageUrl: '/en/news/solar-energy-storage-solutions',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/solar/solar-energy-storage-battery-bank.jpg`,
        title: 'Solar Energy Storage Battery Bank',
        caption: 'Industrial-grade solar energy storage battery bank with LiFePO4 technology',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/solar-power-station.jpg`,
        title: 'Solar Power Station Outdoor',
        caption: 'Outdoor solar power station in industrial setting',
      },
    ],
  },
  {
    pageUrl: '/en/news/solar-energy-storage-industrial-manufacturing',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/solar/solar-energy-farm-panels.jpg`,
        title: 'Industrial Solar Farm Panels',
        caption: 'Large-scale industrial solar farm with solar panels under blue sky',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/solar/solar-panel-installation-rooftop.jpg`,
        title: 'Solar Panel Installation Rooftop',
        caption: 'Professional solar panel installation on commercial rooftop',
      },
    ],
  },
  {
    pageUrl: '/en/news/solar-storage-efficiency-optimization-guide',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/solar/solar-energy-storage-battery-bank.jpg`,
        title: 'LiFePO4 Solar Battery Storage',
        caption: 'LiFePO4 battery bank with high round-trip efficiency',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/solar/solar-panel-sunset-industrial.jpg`,
        title: 'Industrial Solar Panel Sunset',
        caption: 'Industrial solar panels at sunset with power infrastructure',
      },
    ],
  },
  {
    pageUrl: '/en/news/consumer-electronics-battery-life-testing',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/electronics/battery-testing-lab-equipment.jpg`,
        title: 'Battery Testing Lab Equipment',
        caption: 'Professional battery testing equipment in laboratory setting',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/power-bank.jpg`,
        title: 'HousePlus Power Bank',
        caption: 'High-capacity power bank with fast charging technology',
      },
    ],
  },
  {
    pageUrl: '/en/news/energy-efficiency-standards-appliances',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/appliance-energy-efficiency-label.jpg`,
        title: 'Appliance Energy Efficiency Label',
        caption: 'Energy efficiency rating labels on home appliances',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/appliances-showcase.jpg`,
        title: 'Energy Efficient Appliances',
        caption: 'Energy-efficient smart home appliances collection',
      },
    ],
  },
  {
    pageUrl: '/en/news/appliance-energy-efficiency-vs-actual-consumption',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/home-appliance-refrigerator-interior.jpg`,
        title: 'Refrigerator Energy Efficiency',
        caption: 'Energy-efficient refrigerator interior with LED lighting',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/home-appliance-washing-machine.jpg`,
        title: 'Washing Machine Energy Efficiency',
        caption: 'Modern energy-efficient washing machine',
      },
    ],
  },
  {
    pageUrl: '/en/news/advanced-manufacturing-home-appliances',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/home-appliance-manufacturing-line.jpg`,
        title: 'Home Appliance Manufacturing Line',
        caption: 'Automated manufacturing line for home appliances',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/service/factory-production-line-automated.jpg`,
        title: 'Automated Factory Production Line',
        caption: 'Advanced automated production line in modern factory',
      },
    ],
  },
  {
    pageUrl: '/en/news/oem-odm-manufacturing-guide',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/service/factory-assembly-workers.jpg`,
        title: 'Factory Assembly Workers',
        caption: 'Skilled workers assembling products in manufacturing facility',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/service/quality-control-lab-testing.jpg`,
        title: 'Quality Control Lab Testing',
        caption: 'Quality control testing in modern laboratory',
      },
    ],
  },
  {
    pageUrl: '/en/news/global-wholesale-guide-home-appliances',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/home-appliance-wholesale-warehouse.jpg`,
        title: 'Home Appliance Wholesale Warehouse',
        caption: 'Large warehouse with home appliances for wholesale distribution',
      },
      {
        loc: `${IMAGE_BASE_URL}/site/warehouse-logistics-shipping.jpg`,
        title: 'Warehouse Logistics Shipping',
        caption: 'Global logistics and shipping operations in warehouse',
      },
    ],
  },
  {
    pageUrl: '/en/news/smart-home-appliances',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/smart-home-living-room.jpg`,
        title: 'Smart Home Living Room',
        caption: 'Modern smart home living room with connected devices',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/smart-kitchen-appliances-modern.jpg`,
        title: 'Smart Kitchen Appliances',
        caption: 'Modern smart kitchen with connected appliances',
      },
    ],
  },
  {
    pageUrl: '/en/news/the-evolution-of-3c-electronics',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/electronics/electronics-headphones-product.jpg`,
        title: '3C Electronics Headphones',
        caption: 'Premium over-ear headphones with microphone',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/electronics/electronics-smartwatch-product.jpg`,
        title: 'Smartwatch Product',
        caption: 'Modern smartwatch with fitness tracking features',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/wireless-charger.jpg`,
        title: 'Wireless Charger',
        caption: 'Wireless charging pad for smartphones',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-solar-market-update',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/solar/solar-power-station-outdoor.jpg`,
        title: '2026 Solar Market Update',
        caption: 'Outdoor solar power station for 2026 market',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/solar-panel-3.jpg`,
        title: 'HousePlus Solar Panels 2026',
        caption: 'High-efficiency solar panels for 2026 wholesale market',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-appliances-market-update',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/appliances-showcase.jpg`,
        title: '2026 Home Appliances Market',
        caption: '2026 home appliances collection for wholesale distribution',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/home-appliance-kitchen-modern.jpg`,
        title: 'Modern Kitchen Appliances 2026',
        caption: 'Modern kitchen with premium home appliances',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-electronics-market-update',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/power-bank.jpg`,
        title: '2026 Electronics Market Update',
        caption: '2026 consumer electronics including power banks',
      },
      {
        loc: `${IMAGE_BASE_URL}/articles/electronics/electronics-power-bank-product.jpg`,
        title: 'Power Bank Product',
        caption: 'High-capacity portable power bank for 2026 market',
      },
    ],
  },
  {
    pageUrl: '/en/news/2026-smart-home-appliances-market-guide',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/appliances/smart-home-living-room.jpg`,
        title: 'Smart Home Appliances 2026',
        caption: 'Smart home appliances integration guide for 2026',
      },
      {
        loc: `${IMAGE_BASE_URL}/products/kitchen-appliances.jpg`,
        title: 'Smart Kitchen Appliances 2026',
        caption: '2026 smart kitchen appliances collection',
      },
    ],
  },
];

const productImages: PageImages[] = [
  {
    pageUrl: '/en/products/solar-panel-500w',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/solar-panel-3.jpg`,
        title: '500W Monocrystalline Solar Panel',
        caption: 'High-efficiency 500W monocrystalline solar panel for commercial installations',
      },
    ],
  },
  {
    pageUrl: '/en/products/lithium-battery-5kwh',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/solar/solar-energy-storage-battery-bank.jpg`,
        title: '5kWh LiFePO4 Lithium Battery',
        caption: '5kWh LiFePO4 battery energy storage system with long cycle life',
      },
    ],
  },
  {
    pageUrl: '/en/products/portable-power-station-3000w',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/portable-power-station.jpg`,
        title: '3000W Portable Power Station',
        caption: '3000W portable power station for off-grid solar applications',
      },
    ],
  },
  {
    pageUrl: '/en/products/air-fryer-5-8l',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/kitchen-appliances.jpg`,
        title: '5.8L Digital Air Fryer',
        caption: 'Digital air fryer with oil-free cooking technology',
      },
    ],
  },
  {
    pageUrl: '/en/products/headphone-over-ear',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/articles/electronics/electronics-headphones-product.jpg`,
        title: 'Over-Ear Headphones',
        caption: 'Premium over-ear headphones with noise cancellation',
      },
    ],
  },
];

const pageImages: PageImages[] = [
  {
    pageUrl: '/en',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/home/solar-hero.jpg`,
        title: 'HousePlus Solar Energy Solutions',
        caption: 'HousePlus solar energy systems and products for global wholesale',
      },
      {
        loc: `${IMAGE_BASE_URL}/home/appliances-hero.jpg`,
        title: 'HousePlus Home Appliances',
        caption: 'HousePlus home appliances collection for B2B wholesale',
      },
      {
        loc: `${IMAGE_BASE_URL}/home/electronics-hero.jpg`,
        title: 'HousePlus 3C Electronics',
        caption: 'HousePlus consumer electronics products',
      },
    ],
  },
  {
    pageUrl: '/en/about-us',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/about/houseplus-group-factory.jpg`,
        title: 'HousePlus Group Factory',
        caption: 'HousePlus manufacturing facility in Zhongshan, Guangdong',
      },
      {
        loc: `${IMAGE_BASE_URL}/about/houseplus-automated-manufacturing-facility.jpg`,
        title: 'HousePlus Automated Manufacturing',
        caption: 'Automated manufacturing facility with ISO 9001 certification',
      },
    ],
  },
  {
    pageUrl: '/en/factory',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/factory/assembly-line.jpg`,
        title: 'HousePlus Assembly Line',
        caption: 'Assembly line in HousePlus manufacturing facility',
      },
      {
        loc: `${IMAGE_BASE_URL}/factory/production-line.jpg`,
        title: 'HousePlus Production Line',
        caption: 'Production line for solar products and appliances',
      },
    ],
  },
  {
    pageUrl: '/en/service',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/service/factory-production-line-automated.jpg`,
        title: 'Automated Production Service',
        caption: 'Automated production services for OEM/ODM clients',
      },
    ],
  },
];

function generateImageSitemap(): string {
  const allPages = [...articleImages, ...productImages, ...pageImages];
  const lastmod = new Date().toISOString().split('T')[0];

  const urlEntries = allPages
    .map((page) => {
      const imageTags = page.images
        .map(
          (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
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

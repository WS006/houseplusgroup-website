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
        loc: `${IMAGE_BASE_URL}/products/solar-panel-500w.jpg`,
        title: '500W Monocrystalline Solar Panel HP-SP500',
        caption: 'High-efficiency 500W monocrystalline solar panel with 21.5% conversion rate for commercial and off-grid installations',
      },
    ],
  },
  {
    pageUrl: '/en/products/solar-inverter-3kw',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/solar-inverter-3kw.jpg`,
        title: '3kW Pure Sine Wave Solar Inverter HP-INV3000',
        caption: '3kW pure sine wave solar inverter with built-in MPPT charge controller for grid-tie and off-grid operation',
      },
    ],
  },
  {
    pageUrl: '/en/products/lithium-battery-5kwh',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/lithium-battery-5kwh.jpg`,
        title: '5kWh LiFePO4 Lithium Battery HP-LFP5K',
        caption: '5kWh LiFePO4 battery with built-in BMS, 6000+ charge cycles, 10-year design life for solar storage',
      },
    ],
  },
  {
    pageUrl: '/en/products/lead-acid-battery-100ah',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/lead-acid-battery-100ah.jpg`,
        title: '100Ah Deep Cycle Lead-Acid Battery HP-LA100',
        caption: 'Maintenance-free VRLA deep-cycle battery for solar storage, UPS and marine applications',
      },
    ],
  },
  {
    pageUrl: '/en/products/charge-controller-60a',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/charge-controller-60a.jpg`,
        title: 'MPPT Solar Charge Controller 60A HP-MPPT60',
        caption: '60A MPPT solar charge controller with 99.5% tracking efficiency and multi-protection for 12V/24V/48V systems',
      },
    ],
  },
  {
    pageUrl: '/en/products/solar-street-light-200w',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/solar-street-light-200w.jpg`,
        title: '200W All-in-One Solar Street Light HP-SSL200',
        caption: '200W integrated solar street light with motion sensor, remote control and IP65 waterproof rating',
      },
    ],
  },
  {
    pageUrl: '/en/products/solar-fan-20w',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/solar-fan-20w.jpg`,
        title: 'DC Solar Fan 20W HP-SF20',
        caption: '20W brushless DC solar fan for off-grid cabins, greenhouses and livestock shelters ventilation',
      },
    ],
  },
  {
    pageUrl: '/en/products/solar-power-bank-20000mah',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/solar-power-bank-20000mah.jpg`,
        title: '20000mAh Solar Power Bank HP-SPB20K',
        caption: '20000mAh solar power bank with dual USB, USB-C 18W PD fast charge and waterproof casing',
      },
    ],
  },
  {
    pageUrl: '/en/products/air-fryer-5-8l',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/air-fryer-5-8l.jpg`,
        title: '5.8L Digital Air Fryer HP-AF58',
        caption: '5.8L digital air fryer with 8 preset programmes, touch panel and 360-degree rapid air circulation',
      },
    ],
  },
  {
    pageUrl: '/en/products/induction-cooktop-2000w',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/induction-cooktop-2000w.jpg`,
        title: '2000W Induction Cooktop HP-IC2000',
        caption: '2000W slim ceramic glass induction cooktop with 10 power levels and automatic pan detection',
      },
    ],
  },
  {
    pageUrl: '/en/products/electric-kettle-1-5l',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/electric-kettle-1-5l.jpg`,
        title: '1.5L Stainless Steel Electric Kettle HP-EK15',
        caption: '1.5L BPA-free stainless steel electric kettle with 1500W rapid boil and auto shut-off protection',
      },
    ],
  },
  {
    pageUrl: '/en/products/toaster-2-slice',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/toaster-2-slice.jpg`,
        title: '2-Slice Stainless Steel Toaster HP-TS2',
        caption: 'Wide-slot stainless steel toaster with 7 browning settings and removable crumb tray',
      },
    ],
  },
  {
    pageUrl: '/en/products/headphone-over-ear',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/headphone-over-ear.jpg`,
        title: 'Over-Ear Headphone with Microphone HP-HE01',
        caption: 'Foldable over-ear headphone with 40mm drivers, built-in microphone and 3.5mm universal jack',
      },
    ],
  },
  {
    pageUrl: '/en/products/bluetooth-earphone-tws',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/bluetooth-earphone-tws.jpg`,
        title: 'True Wireless Bluetooth Earphones HP-TWS01',
        caption: 'Bluetooth 5.3 TWS earbuds with active noise cancellation and 30-hour total playtime',
      },
    ],
  },
  {
    pageUrl: '/en/products/smart-watch',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/smart-watch.jpg`,
        title: 'Smart Watch with Heart Rate Monitor HP-SW01',
        caption: '1.7 inch colour touch screen smartwatch with heart rate, SpO2 monitoring and 20+ sport modes',
      },
    ],
  },
  {
    pageUrl: '/en/products/portable-ssd-1tb',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/portable-ssd-1tb.jpg`,
        title: '1TB USB-C Portable SSD HP-SSD1T',
        caption: '1TB portable SSD with up to 1050 MB/s read speed, shock-resistant aluminium casing and USB 3.2 Gen 2',
      },
    ],
  },
  {
    pageUrl: '/en/products/micro-sd-128gb',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/micro-sd-128gb.jpg`,
        title: '128GB Micro SD Card Class 10 A2 HP-SD128',
        caption: '128GB UHS-I U3 A2 rated micro SD card with up to 100 MB/s read speed for cameras and drones',
      },
    ],
  },
  {
    pageUrl: '/en/products/usb-c-cable-2m',
    images: [
      {
        loc: `${IMAGE_BASE_URL}/products/usb-c-cable-2m.jpg`,
        title: 'Fast Charging USB-C Cable 2m HP-CC2M',
        caption: '100W USB-C to USB-C braided cable supporting PD 3.0, QC 4.0 and 480 Mbps data transfer',
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

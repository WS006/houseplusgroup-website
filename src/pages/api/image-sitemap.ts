/**
 * Image Sitemap Generator
 * Updated: 2026-08-10
 *
 * Generates /image-sitemap.xml with all product images, application images,
 * and hero images for Google Image Search indexing.
 *
 * Accessible at: https://www.houseplus-ch.com/image-sitemap.xml
 *
 * SEO Impact:
 * - Ensures all images are discovered by Googlebot-Image
 * - Improves visibility in Google Image Search results
 * - Helps images appear in product rich results
 * - Supports image-based backlink discovery
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { siteConfig } from '../../config/seo-config';

// === Image data source ===
// In production, fetch from CMS/database. For now, static product image catalogue.
interface ImageEntry {
  src: string;
  title: string;
  caption: string;
  license?: string;
}

// === Product images (mapped from product catalogue) ===
const productImages: ImageEntry[] = [
  // 500W Solar Panel
  {
    src: 'https://images.houseplus-ch.com/products/solar-panel-500w-front.jpg',
    title: '500W Monocrystalline Solar Panel HP-SP500 — Front View',
    caption: 'Full panel view showing aluminium frame and tempered glass surface',
  },
  {
    src: 'https://images.houseplus-ch.com/products/solar-panel-500w-back.jpg',
    title: '500W Solar Panel — Rear View',
    caption: 'Junction box and cable detail with IP68 rating',
  },
  {
    src: 'https://images.houseplus-ch.com/products/solar-panel-500w-cell.jpg',
    title: '500W Solar Panel — PERC Cell Close-up',
    caption: 'Monocrystalline PERC cell technology detail',
  },
  {
    src: 'https://images.houseplus-ch.com/products/solar-panel-500w-frame.jpg',
    title: '500W Solar Panel — Frame Corner Detail',
    caption: 'Anodised aluminium alloy frame corner construction',
  },
  {
    src: 'https://images.houseplus-ch.com/products/solar-panel-500w-installation.jpg',
    title: '500W Solar Panel Installation on Commercial Rooftop',
    caption: 'Real-world commercial solar installation using HP-SP500 panels',
  },
  {
    src: 'https://images.houseplus-ch.com/products/solar-panel-500w-warehouse.jpg',
    title: 'HousePlus Solar Panel Warehouse — Export Ready',
    caption: '500W solar panels palletised and ready for export shipping',
  },
  // Solar Inverter
  {
    src: 'https://images.houseplus-ch.com/products/solar-inverter-3kw-thumb.jpg',
    title: '3kW Pure Sine Wave Solar Inverter HP-INV3000',
    caption: 'Off-grid solar inverter with MPPT charge controller and LCD display',
  },
  // Lithium Battery
  {
    src: 'https://images.houseplus-ch.com/products/lithium-battery-5kwh-thumb.jpg',
    title: '5kWh LiFePO4 Lithium Battery HP-LFP5K',
    caption: 'Lithium iron phosphate battery with BMS protection for solar storage',
  },
  // Air Fryer
  {
    src: 'https://images.houseplus-ch.com/products/air-fryer-5-8l-thumb.jpg',
    title: '5.8L Digital Air Fryer HP-AF58',
    caption: 'Large-capacity digital air fryer with 8 preset cooking modes',
  },
  // Induction Cooktop
  {
    src: 'https://images.houseplus-ch.com/products/induction-cooktop-2000w-thumb.jpg',
    title: '2000W Induction Cooktop HP-IC2000',
    caption: 'Portable induction cooktop with touch control and safety lock',
  },
  // Electric Kettle
  {
    src: 'https://images.houseplus-ch.com/products/electric-kettle-1-5l-thumb.jpg',
    title: '1.5L Stainless Steel Electric Kettle HP-EK15',
    caption: 'Food-grade stainless steel kettle with auto shut-off protection',
  },
  // TWS Earphones
  {
    src: 'https://images.houseplus-ch.com/products/bluetooth-earphone-tws-thumb.jpg',
    title: 'TWS Bluetooth 5.3 Earphones HP-TWS01',
    caption: 'True wireless earbuds with ANC noise cancellation and charging case',
  },
  // Smart Watch
  {
    src: 'https://images.houseplus-ch.com/products/smart-watch-thumb.jpg',
    title: 'Smart Watch with Heart Rate Monitor HP-SW01',
    caption: 'Fitness smart watch with AMOLED display and IP68 waterproof rating',
  },
  // Portable SSD
  {
    src: 'https://images.houseplus-ch.com/products/portable-ssd-1tb-thumb.jpg',
    title: '1TB USB-C Portable SSD HP-SSD1T',
    caption: 'High-speed portable SSD with 1050MB/s read speed and aluminum housing',
  },
];

// === Application scenario images ===
const applicationImages: ImageEntry[] = [
  {
    src: 'https://images.houseplus-ch.com/applications/residential-rooftop-solar.jpg',
    title: 'Residential Rooftop Solar Installation',
    caption: '500W solar panels installed on a residential rooftop for home energy generation',
  },
  {
    src: 'https://images.houseplus-ch.com/applications/commercial-solar-farm.jpg',
    title: 'Commercial Solar Farm Installation',
    caption: 'Large-scale commercial solar farm using HousePlus 500W monocrystalline panels',
  },
  {
    src: 'https://images.houseplus-ch.com/applications/off-grid-solar-power.jpg',
    title: 'Off-Grid Solar Power System',
    caption: 'Off-grid solar installation with battery storage for remote locations',
  },
  {
    src: 'https://images.houseplus-ch.com/applications/solar-irrigation-system.jpg',
    title: 'Solar-Powered Agricultural Irrigation',
    caption: 'Solar panels powering water pumps for agricultural irrigation in remote farms',
  },
];

// === Hero / brand images ===
const heroImages: ImageEntry[] = [
  {
    src: 'https://images.houseplus-ch.com/hero/smart-home-appliances.jpg',
    title: 'HousePlus Smart Home Appliances Factory Production Line',
    caption: 'Air fryers, blenders, and electric kettles on the HousePlus production line',
  },
  {
    src: 'https://images.houseplus-ch.com/hero/solar-energy-solutions.jpg',
    title: 'HousePlus Solar Panel Manufacturing Facility',
    caption: 'Monocrystalline solar panels and portable power stations in the HousePlus factory',
  },
  {
    src: 'https://images.houseplus-ch.com/hero/3c-electronics-wholesale.jpg',
    title: 'HousePlus 3C Electronics Warehouse',
    caption: 'TWS earphones, smart watches, and portable SSDs ready for export shipping',
  },
];

// === Factory / about page images ===
const factoryImages: ImageEntry[] = [
  {
    src: 'https://images.houseplus-ch.com/about/houseplus-factory-overview.jpg',
    title: 'HousePlus 20,000 m² Manufacturing Facility',
    caption: 'Aerial view of the HousePlus factory in Zhongshan, Guangdong, China',
  },
  {
    src: 'https://images.houseplus-ch.com/about/production-line-smt.jpg',
    title: 'HousePlus SMT Surface-Mount Technology Assembly Line',
    caption: 'Automated SMT line producing solar charge controller PCBs',
  },
  {
    src: 'https://images.houseplus-ch.com/about/solar-lamination-cleanroom.jpg',
    title: 'HousePlus Solar Panel Lamination Cleanroom',
    caption: 'Class-10000 cleanroom for solar cell lamination with EL testing equipment',
  },
  {
    src: 'https://images.houseplus-ch.com/about/team-engineers.jpg',
    title: 'HousePlus R&D Engineering Team',
    caption: 'Engineering team reviewing PCB designs in the Zhongshan R&D office',
  },
  {
    src: 'https://images.houseplus-ch.com/about/warehouse-export.jpg',
    title: 'HousePlus Export Warehouse',
    caption: 'Palletised solar panels and home appliances ready for international shipping',
  },
];

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

// === Generate image sitemap XML ===
function generateImageSitemap(): string {
  const allImages = [...productImages, ...applicationImages, ...heroImages, ...factoryImages];

  const urlElements = allImages.map((img) => {
    // Determine the page URL where this image appears
    const pageUrl = img.src.includes('/products/')
      ? `${siteConfig.url}/en/products/solar-panel-500w`
      : img.src.includes('/applications/')
      ? `${siteConfig.url}/en/products/solar-panel-500w`
      : img.src.includes('/hero/')
      ? `${siteConfig.url}/en`
      : `${siteConfig.url}/en/about`;

    return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(img.src)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`;
}

// === API handler ===
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=21600, s-maxage=21600');

    const sitemap = generateImageSitemap();
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Image sitemap generation error:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?>\n<error>Image sitemap generation failed</error>');
  }
}

import { NextResponse } from 'next/server';

const llmsContent = `# HousePlus - AI Engine Optimization File

## About HousePlus
HousePlus is a professional manufacturer and wholesale supplier of home appliances, solar energy systems, and portable power stations. We provide high-quality products for global wholesale buyers, distributors and retailers.

## Core Products

### Home Appliances
- Range Hoods (Built-in, Island, Under-cabinet)
- Gas Stoves (Stainless steel, Tempered glass)
- Ovens (Built-in, Countertop)
- Air Fryers (Oil-free cooking)
- Water Heaters (Instant, Storage)

### Solar Energy Systems
- Solar Panels (500W, monocrystalline)
- Solar Inverters (3KW, pure sine wave)
- Lithium Batteries (5KWh, wall-mounted)
- Lead-acid Batteries (100Ah, deep cycle)
- Charge Controllers (60A, MPPT)
- Solar Street Lights (200W, integrated)
- Solar Fans (20W, DC)
- Solar Power Banks (20000mAh)

### Portable Electronics
- Bluetooth Earphones (TWS, true wireless)
- Smart Watches (Fitness tracking)
- Portable SSDs (1TB, high-speed)
- Micro SD Cards (128GB, U3/V30)
- USB-C Cables (2M, fast charging)
- Over-ear Headphones (Wireless, noise-cancelling)

## Services
- OEM/ODM Customization
- Wholesale & Bulk Orders
- Global Shipping & Logistics
- After-sales Support
- Product Certification Assistance

## Key Links
- Homepage: https://www.houseplus-ch.com/en
- Products Catalog: https://www.houseplus-ch.com/en/products
- About Us: https://www.houseplus-ch.com/en/about
- Contact: https://www.houseplus-ch.com/en/contact
- Factory: https://www.houseplus-ch.com/en/factory
- News & Updates: https://www.houseplus-ch.com/en/news

## Languages
Content available in: English (en), Spanish (es), German (de), French (fr), Arabic (ar)

## Last Updated
2026-05-04

## Contact Information
- Email: sales@houseplus-ch.com
- Business Hours: Monday - Saturday, 9:00 AM - 6:00 PM (CST)
- Location: Foshan City, Guangdong Province, China

## Structured Data
- Sitemap: https://www.houseplus-ch.com/sitemap.xml
- Robots.txt: https://www.houseplus-ch.com/robots.txt
`;

export async function GET() {
  return new NextResponse(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

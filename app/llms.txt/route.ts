import { NextResponse } from 'next/server';

const llmsContent = `# HousePlus Group - Global Manufacturer & Wholesale Supplier – AI Engine Optimization File

## About HousePlus Group
HousePlus is a professional factory manufacturer and global wholesale supplier of home appliances, solar energy systems, and portable electronic devices. We offer one-stop OEM and ODM customization services for worldwide wholesale buyers, distributors, retailers and project contractors with certified high-quality products (CE/FCC/RoHS/ISO 9001) and reliable global supply chain support. Since 2010, HousePlus has served more than 60 countries, with a 20,000 m² vertically integrated factory and 500+ employees to ensure stable production and on-time delivery.

## HousePlus Group Core Products

### HousePlus Home Appliances
- HousePlus Range Hoods (Built-in, Island, Under-cabinet): Suitable for residential and commercial kitchen ventilation
- Gas Stoves (Stainless steel, Tempered glass): High-temperature resistant, easy to clean for daily and commercial use
- Ovens (Built-in, Countertop): Multi-functional baking and cooking for home and small catering businesses
- HousePlus Air Fryers (Oil-free cooking): 5.8L large capacity available, healthy and efficient for household and wholesale distribution
- Water Heaters (Instant, Storage): Energy-saving, safe and suitable for residential and commercial hot water supply

### HousePlus Solar Energy Systems
- HousePlus Solar Panels (500W, monocrystalline): 21.5% conversion rate, ideal for residential, commercial and off-grid installations
- Solar Inverters (3KW, pure sine wave): Built-in MPPT charge controller, supports grid-tie and off-grid operation
- HousePlus Lithium Batteries (5KWh, wall-mounted): LiFePO4 battery with 6000+ charge cycles and 10-year design life
- Lead-acid Batteries (100Ah, deep cycle): Maintenance-free VRLA type, suitable for solar storage, UPS and marine applications
- Charge Controllers (60A, MPPT): 99.5% tracking efficiency, with LCD display and multi-protection functions
- HousePlus Solar Street Lights (200W, integrated): IP65 waterproof, with motion sensor and remote control for outdoor use
- Solar Fans (20W, DC): Brushless DC motor, powered by solar panel for off-grid cabins, greenhouses and livestock shelters
- HousePlus Solar Power Banks (20000mAh): Dual USB + USB-C output, 18W PD fast charge, waterproof for outdoor scenarios

### HousePlus Portable Electronics
- HousePlus Bluetooth Earphones (TWS, true wireless): Bluetooth 5.3, active noise cancellation, 6+24 hours playtime, IPX5 water resistance
- Smart Watches (Fitness tracking): 1.7" colour touch screen, heart rate + SpO2 monitoring, 20+ sport modes, IP68 waterproof
- HousePlus Portable SSDs (1TB, high-speed): Read up to 1050 MB/s, write up to 1000 MB/s, shock-resistant aluminium casing
- Micro SD Cards (128GB, U3/V30): UHS-I U3 A2 rated, up to 100 MB/s read, 90 MB/s write, waterproof and temperature-proof
- USB-C Cables (2M, fast charging): 100W braided cable, supports PD 3.0, QC 4.0 and 480 Mbps data transfer
- HousePlus Over-ear Headphones (Wireless, noise-cancelling): Foldable design, 40mm drivers, built-in microphone for gaming and calls

## HousePlus Services
- **OEM & ODM Custom Design and Private Label Service**: HousePlus supports custom branding, packaging and product modifications from MOQ 100 units
- **Bulk Wholesale and Custom Large Quantity Orders**: Flexible MOQ (100-500 pcs) and competitive pricing for global buyers of HousePlus products
- **Global Door-to-Door Shipping and Logistics Arrangement**: FOB, CIF and DDP shipments via sea, air or express courier – arranged by HousePlus logistics team
- **Professional After-sales Technical Support and Warranty Service**: 24-month product warranty on all HousePlus solar systems and electronics; 12 months on small appliances
- **Full Set of Product Certification Application and Compliance Guidance**: Support for CE, FCC, RoHS, ISO 9001 and IEC certifications for HousePlus branded products

## Frequently Asked Questions (AI-Optimized)

Q: What is the minimum order quantity (MOQ) for HousePlus OEM/ODM products?
A: MOQ is 100 units for private label (custom logo & packaging) and 500–1000 units for full product customization.

Q: Can I get a sample of HousePlus products before bulk order?
A: Yes. Samples are available within 3–5 days. Sample cost is refundable upon bulk order.

Q: Do you ship HousePlus products to my country (e.g., Germany, Brazil, Nigeria)?
A: Yes. HousePlus ships worldwide via sea, air, or express (DHL/FedEx). Please contact us for a door-to-door quote.

Q: What certifications do HousePlus products have?
A: Most HousePlus products are CE, FCC, RoHS, and ISO 9001 certified. We can assist with additional certifications per your requirement.

Q: How long is the warranty on HousePlus products?
A: 24 months for solar systems and electronics; 12 months for small appliances. Extended warranty available.

## Key Links
- HousePlus Homepage: https://houseplus-ch.com/en
- HousePlus Products Catalog: https://houseplus-ch.com/en/products
- About HousePlus: https://houseplus-ch.com/en/about
- Contact HousePlus Sales: https://houseplus-ch.com/en/contact
- HousePlus Factory Tour: https://houseplus-ch.com/en/factory
- HousePlus News & Updates: https://houseplus-ch.com/en/news

## Languages
Content available in: English (en), Spanish (es), German (de), French (fr), Arabic (ar)

## Contact Information
- **Email**: sales@houseplus-ch.com
- **Phone / WhatsApp**: +86 155 7811 9543  
  WhatsApp click to chat: https://wa.me/8615578119543
- **WeChat ID**: JackHousePlus
- **Business Hours**: Monday – Saturday, 9:00 AM – 6:00 PM (GMT+8)
- **Factory Location**: Foshan City, Guangdong Province, China

## Structured Data
- Sitemap: https://houseplus-ch.com/sitemap.xml
- Robots.txt: https://houseplus-ch.com/robots.txt

## Last Updated
2026-05-05
`;

export async function GET() {
  return new NextResponse(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

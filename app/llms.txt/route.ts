import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# HousePlus - Large Language Models Optimization File

## Company Overview
HousePlus is a professional manufacturer of home appliances, solar systems, and portable power stations for global wholesale buyers.

## Products
- Home Appliances: Refrigerators, washing machines, air conditioners, microwaves, etc.
- Solar Systems: Solar panels, inverters, battery storage, etc.
- Portable Power Stations: Portable power stations for outdoor and emergency use.

## Languages
- English: https://www.houseplus-ch.com/en
- Spanish: https://www.houseplus-ch.com/es
- German: https://www.houseplus-ch.com/de
- French: https://www.houseplus-ch.com/fr
- Arabic: https://www.houseplus-ch.com/ar

## Key Pages
- Home: https://www.houseplus-ch.com/en
- About Us: https://www.houseplus-ch.com/en/about-us
- Products: https://www.houseplus-ch.com/en/products
- Factory: https://www.houseplus-ch.com/en/factory
- Contact: https://www.houseplus-ch.com/en/contact
- FAQ: https://www.houseplus-ch.com/en/faq
- News: https://www.houseplus-ch.com/en/news

## Contact
- Email: info@houseplus-ch.com
- Phone: +86 123 4567 8900
- Address: No. 123, Industrial Park, Guangzhou, China

## Structured Data
This website uses JSON-LD for structured data. See:
- https://www.houseplus-ch.com/en (Organization schema)
- https://www.houseplus-ch.com/en/products (Product schema)
- https://www.houseplus-ch.com/en/faq (FAQ schema)

## Last Updated
${new Date().toISOString().split('T')[0]}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}

import { r2MediaUrl } from './r2-media-map';

export interface StaticNewsFeedEntry {
  slug: string;
  title: string;
  datePublished: string;
  image: string;
  category: string;
}

const cover = (slug: string) => r2MediaUrl(`/images/articles/covers/${slug}.jpg`);

// These pages predate the data-driven blog registry. The feed deliberately uses
// neutral summaries so that it does not republish unverified product-specific
// commercial, certification, inventory, MOQ or performance statements.
export const staticNewsFeedEntries: StaticNewsFeedEntry[] = [
  { slug: 'consumer-electronics-battery-life-testing', title: 'Battery Cycle Life Testing Standards: Technical Analysis for Consumer Electronics', datePublished: '2026-07-12', image: cover('consumer-electronics-battery-life-testing'), category: '3C Electronics' },
  { slug: 'appliance-energy-efficiency-vs-actual-consumption', title: 'Home Appliance Energy Efficiency Ratings vs Actual Consumption: Technical Analysis', datePublished: '2026-07-08', image: cover('appliance-energy-efficiency-vs-actual-consumption'), category: 'Home Appliances' },
  { slug: 'solar-storage-efficiency-optimization-guide', title: 'Solar Storage Efficiency Optimization: Technical Guide for Industrial Systems', datePublished: '2026-07-03', image: cover('solar-storage-efficiency-optimization-guide'), category: 'Solar & Storage' },
  { slug: '2026-solar-market-update', title: 'Solar Energy Innovations in 2026', datePublished: '2026-03-08', image: cover('2026-solar-market-update'), category: 'Solar & Storage' },
  { slug: '2026-appliances-market-update', title: 'Smart Home Appliances 2026: Energy-Efficient Designs for Global Markets', datePublished: '2026-05-16', image: cover('2026-appliances-market-update'), category: 'Home Appliances' },
  { slug: '2026-electronics-market-update', title: '3C Electronics Trends 2026', datePublished: '2026-04-17', image: cover('2026-electronics-market-update'), category: '3C Electronics' },
  { slug: '2026-smart-home-appliances-market-guide', title: '2026 Global Smart Home Appliance Market Trends & B2B Procurement Guide', datePublished: '2026-05-15', image: cover('2026-smart-home-appliances-market-guide'), category: 'Home Appliances' },
  { slug: 'solar-energy-storage-industrial-manufacturing', title: 'Solar Energy Storage Systems in Industrial Manufacturing', datePublished: '2026-05-15', image: cover('solar-energy-storage-industrial-manufacturing'), category: 'Solar & Storage' },
  { slug: 'oem-odm-manufacturing-guide', title: 'OEM & ODM Manufacturing: Product Development Considerations', datePublished: '2025-09-17', image: cover('oem-odm-manufacturing-guide'), category: 'OEM & ODM' },
  { slug: 'energy-efficiency-standards-appliances', title: 'Energy Efficiency Standards in Modern Appliances', datePublished: '2025-05-08', image: cover('energy-efficiency-standards-appliances'), category: 'Home Appliances' },
  { slug: 'global-wholesale-guide-home-appliances', title: 'Guide to Wholesale Home Appliance Sourcing', datePublished: '2025-01-20', image: cover('global-wholesale-guide-home-appliances'), category: 'Home Appliances' },
  { slug: 'advanced-manufacturing-home-appliances', title: 'Advanced Manufacturing in Home Appliances', datePublished: '2024-10-14', image: cover('advanced-manufacturing-home-appliances'), category: 'Home Appliances' },
  { slug: 'the-future-of-smart-home-appliances', title: 'The Future of Smart Home Appliances', datePublished: '2024-08-01', image: cover('the-future-of-smart-home-appliances'), category: 'Home Appliances' },
  { slug: 'smart-home-appliances', title: 'Smart Home Appliances: Efficiency and Innovation', datePublished: '2023-07-22', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-smart-home-appliances-connected-living-b2b-guide/', category: 'Home Appliances' },
  { slug: 'solar-energy-storage-solutions', title: 'Solar Energy Storage Solutions', datePublished: '2024-02-19', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-solar-energy-storage-solutions-b2b-guide/', category: 'Solar & Storage' },
  { slug: 'the-evolution-of-3c-electronics', title: 'The Evolution of 3C Electronics', datePublished: '2023-11-08', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/', category: '3C Electronics' },
  { slug: 'the-future-of-solar-energy', title: 'The Future of Solar Energy', datePublished: '2023-03-15', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-future-solar-energy-b2b-guide/', category: 'Solar & Storage' },
];

export function staticNewsFeedDescription(entry: StaticNewsFeedEntry): string {
  return `HousePlus industry insight on ${entry.category}. Product availability, applicable documentation, certification scope and commercial terms are confirmed for each product and destination.`;
}

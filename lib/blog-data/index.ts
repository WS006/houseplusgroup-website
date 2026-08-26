/**
 * Blog Article Data Registry
 *
 * Aggregates all blog article data files into a single registry.
 * This shared data module is consumed by App Router pages and API routes.
 *
 * SEO IMPACT:
 *   - Each article is pre-rendered at build time (SSG) for maximum
 *     crawlability and page speed.
 *   - The registry is the single source of truth for all blog content,
 *     ensuring consistent metadata across sitemap, RSS feed, and pages.
 *
 * Adding a new article:
 *   1. Create a new data file in this directory (e.g. `my-new-article.ts`)
 *   2. Import and add it to the `blogPosts` record below
 *   3. The dynamic route will automatically generate the page
 */

import type { BlogPost } from './types';

import howToChooseWholesaleSolarPanels from './how-to-choose-wholesale-solar-panels';
import howToChooseSolarPanelManufacturer from './how-to-choose-solar-panel-manufacturer-china';
import monoVsPolyVsPerc from './mono-vs-poly-vs-perc-solar-panels';
import lifepo4VsLeadAcid from './lifepo4-vs-lead-acid-battery';
import ceCertificationGuide from './ce-certification-solar-panels-guide';
import mpptVsPwm from './mppt-vs-pwm-charge-controller';
import solarPanelWholesalePrice from './solar-panel-wholesale-price-guide';
import twsEarphonesOemManufacturingGuide from './tws-earphones-oem-manufacturing-guide';
import portableSsdVsExternalHdd from './portable-ssd-vs-external-hdd';
import homeApplianceOemManufacturerGuide from './home-appliance-oem-manufacturer-guide-china';
import airFryerSourcingGuide from './air-fryer-sourcing-guide-china';
import kitchenAppliancesWholesaleGuide from './kitchen-appliances-wholesale-guide';
import {
  solarRfqChecklist,
  applianceSampleEvaluation,
  usbCProcurementGuide,
  batteryRfqDataGuide,
  portablePowerB2bGuide,
} from './august-2026-b2b-insights';

// === Article Registry ===
// This record is the single source of truth consumed by:
//   - app/[lang]/blog/[slug]/page.tsx  (dynamic article pages)
//   - app/[lang]/blog/page.tsx        (blog listing page)
//   - app/sitemap.ts                  (XML sitemap)
//   - app/feed.xml/route.ts           (RSS feed)
export const blogPosts: Record<string, BlogPost> = {
  'how-to-choose-wholesale-solar-panels': howToChooseWholesaleSolarPanels,
  'how-to-choose-solar-panel-manufacturer-china': howToChooseSolarPanelManufacturer,
  'mono-vs-poly-vs-perc-solar-panels': monoVsPolyVsPerc,
  'lifepo4-vs-lead-acid-battery': lifepo4VsLeadAcid,
  'ce-certification-solar-panels-guide': ceCertificationGuide,
  'mppt-vs-pwm-charge-controller': mpptVsPwm,
  'solar-panel-wholesale-price-guide': solarPanelWholesalePrice,
  'tws-earphones-oem-manufacturing-guide': twsEarphonesOemManufacturingGuide,
  'portable-ssd-vs-external-hdd': portableSsdVsExternalHdd,
  'home-appliance-oem-manufacturer-guide-china': homeApplianceOemManufacturerGuide,
  'air-fryer-sourcing-guide-china': airFryerSourcingGuide,
  'kitchen-appliances-wholesale-guide': kitchenAppliancesWholesaleGuide,
  'solar-panel-rfq-checklist-international-buyers': solarRfqChecklist,
  'home-appliance-oem-sample-evaluation-checklist': applianceSampleEvaluation,
  'usb-c-accessories-wholesale-specification-checklist': usbCProcurementGuide,
  'battery-energy-storage-rfq-data-checklist': batteryRfqDataGuide,
  'portable-power-supply-solar-storage-b2b-guide': portablePowerB2bGuide,
};

// === Sorted list for blog index page (newest first) ===
export const sortedBlogPosts: BlogPost[] = Object.values(blogPosts).sort(
  (a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
);

// === All unique slugs (for getStaticPaths) ===
export const blogSlugs: string[] = Object.keys(blogPosts);

// === Total article count ===
export const totalArticleCount: number = blogSlugs.length;

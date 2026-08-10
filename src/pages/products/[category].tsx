/**
 * HousePlus Product Category Page — CollectionPage Template
 * Updated: 2026-07-28
 *
 * SEO IMPACT & DESIGN:
 * 1. getStaticPaths + getStaticProps — pre-renders every category page as static
 *    HTML at build time (SSG). Static category pages load instantly, achieve
 *    top Core Web Vitals, and are crawled/indexed faster than client-rendered
 *    equivalents.
 * 2. CollectionPage Schema (via SchemaOrg.CollectionPageSchema) — tells Google
 *    this is a product listing/collection page and emits an ItemList of products,
 *    which can surface product entries in SERPs and improve crawl coverage.
 * 3. Breadcrumb component — BreadcrumbList schema clarifies site hierarchy.
 * 4. HreflangTags — declares en/es/de/fr/ar alternates so Google serves the
 *    correct language version and avoids duplicate-content penalties.
 * 5. FAQSection — FAQPage schema targets long-tail question queries (e.g.
 *    "wholesale solar panels MOQ") and can expand SERP real estate.
 * 6. Keyword-rich H1 + description copy targeting buyer-intent queries
 *    ("wholesale solar panels", "monocrystalline solar panel manufacturer").
 * 7. Product cards (image, name, model, short desc, CTA) with descriptive alt
 *    text and internal links — distributes PageRank to detail pages.
 * 8. Sidebar filters (category nav, price range, certification) are client-side
 *    interactive so the SSG page still hydrates into a fully usable filter UI.
 *
 * ROUTE NOTE:
 *   This file is named `category.tsx` and demonstrates the full SSG structure.
 *   In production, rename to `src/pages/products/category/[category].tsx` (or
 *   move into the dynamic route) so getStaticPaths generates one static page
 *   per category slug (e.g. /en/products/category/solar-panels).
 */

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import SEOHead from '../../components/SEOHead';
import Breadcrumb from '../../components/Breadcrumb';
import HreflangTags from '../../components/HreflangTags';
import FAQSection from '../../components/FAQSection';
import OptimizedImage from '../../components/OptimizedImage';
import { CollectionPageSchema } from '../../components/SchemaOrg';
import { siteConfig } from '../../config/seo-config';

// ============================================================================
// TYPES
// ============================================================================

interface CategoryProduct {
  slug: string;
  name: string;
  model: string;
  shortDesc: string;
  image: string;
  imageAlt: string;
  /** Wholesale unit price in USD. */
  price: number;
  /** Key spec shown as a badge (e.g. "500W", "5kWh"). */
  headlineSpec: string;
  certifications: string[];
  badge?: 'BEST SELLER' | 'NEW' | 'HOT' | 'ECO';
}

interface CategoryData {
  slug: string;
  name: string;
  /** SEO-optimized H1. */
  title: string;
  /** Meta description (kept <= 160 chars). */
  metaDescription: string;
  /** On-page intro copy (longer, keyword-rich). */
  description: string;
  /** Category-specific FAQs for the FAQSection + FAQPage schema. */
  faqs: { question: string; answer: string }[];
  products: CategoryProduct[];
}

interface CategoryPageProps {
  category: CategoryData;
  /** All category slugs/names for the sidebar navigation. */
  allCategories: { slug: string; name: string }[];
  locale: string;
}

// ============================================================================
// CATEGORY DATA
// In production, source from a CMS/database. The solar-panels category below is
// the worked example; a few sibling categories are included so the sidebar
// navigation and getStaticPaths are realistic.
// ============================================================================

const categories: Record<string, CategoryData> = {
  'solar-panels': {
    slug: 'solar-panels',
    name: 'Solar Panels',
    title: 'Wholesale Solar Panels — Monocrystalline & Polycrystalline Manufacturer',
    metaDescription:
      'Buy wholesale solar panels from HousePlus: 100W–600W mono & poly modules, 21.5% efficiency, CE/IEC certified. OEM/ODM, MOQ 100 pcs, 25-year warranty. 53+ countries.',
    description:
      'Browse HousePlus wholesale solar panels — high-efficiency monocrystalline, polycrystalline, bifacial, flexible, and portable modules from 100W to 600W. Every panel is CE, RoHS, IEC 61215, and IEC 61730 certified and produced in our 20,000 m² Zhongshan factory with 100% EL testing. OEM/ODM customisation (logo printing, bespoke specs, branded packaging) is available from MOQ 500 pcs; stock panels ship from MOQ 100 pcs with 20–35 day lead time.',
    faqs: [
      {
        question: 'What wattages of solar panels do you manufacture wholesale?',
        answer:
          'HousePlus manufactures solar panels from 100W to 600W, including monocrystalline (100W–600W), polycrystalline (250W–300W), bifacial dual-glass (545W–550W), flexible ETFE (100W–200W), and portable folding panels (150W). All are available for wholesale with MOQ 100 pcs for stock models and 500 pcs for OEM/ODM customisation.',
      },
      {
        question: 'What is the MOQ and lead time for wholesale solar panels?',
        answer:
          'The minimum order quantity is 100 pieces for stock solar panels and 500 pieces for OEM/ODM orders with custom branding or modified specifications. Standard production lead time is 20–35 days from order confirmation; OEM/ODM orders requiring tooling take 45–60 days. A 40HQ container holds approximately 600–650 panels for cost-efficient sea freight.',
      },
      {
        question: 'Which certifications do your solar panels carry?',
        answer:
          'All HousePlus solar panels are CE, RoHS, IEC 61215 (design qualification), and IEC 61730 (safety qualification) certified. For the US market we can provide UL 61730 listing; for Australia, Clean Energy Council (CEC) approval. Digital certificate PDFs are supplied with every order and certificate numbers can be verified against the issuing body’s database.',
      },
      {
        question: 'Do you offer OEM solar panels with my own brand?',
        answer:
          'Yes. From MOQ 500 pieces we offer full OEM/ODM: custom logo printing on the frame and junction box, branded packaging design, and specification modifications such as bespoke dimensions, coloured back sheets, or custom electrical parameters. Our R&D team supports you from concept through mass production.',
      },
      {
        question: 'What warranty comes with wholesale solar panels?',
        answer:
          'Stock solar panels include a 12-year product warranty covering manufacturing defects and a 25-year linear power output warranty guaranteeing at least 80% of rated power at year 25. Extended 18–24 month product warranty is available for bulk orders. Our RMA process ensures quick resolution of any quality issues.',
      },
    ],
    products: [
      {
        slug: 'monocrystalline-solar-panel-500w',
        name: '500W Monocrystalline Solar Panel',
        model: 'HP-SP500',
        shortDesc:
          '21.5% efficient mono PERC panel with IP68 junction box, MC4 connectors, and 25-year linear warranty.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-500w-front.jpg',
        imageAlt: '500W monocrystalline solar panel HP-SP500 front view with aluminium frame',
        price: 95,
        headlineSpec: '500W · 21.5%',
        certifications: ['CE', 'RoHS', 'IEC 61215', 'IEC 61730'],
        badge: 'BEST SELLER',
      },
      {
        slug: 'bifacial-solar-panel-550w',
        name: '550W Bifacial Dual Glass Solar Panel',
        model: 'HP-SP550B',
        shortDesc:
          'Bifacial dual-glass module delivering up to 30% extra rear-side yield for ground-mount and tracker systems.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-550w-bifacial.jpg',
        imageAlt: '550W bifacial dual glass solar panel for ground-mount solar farms',
        price: 110,
        headlineSpec: '550W · Bifacial',
        certifications: ['CE', 'RoHS', 'IEC 61215', 'IEC 61730'],
        badge: 'NEW',
      },
      {
        slug: 'monocrystalline-solar-panel-600w',
        name: '600W Monocrystalline Solar Panel',
        model: 'HP-SP600',
        shortDesc:
          'High-output 600W module for utility-scale farms; 1500V system voltage, low temperature coefficient.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-600w.jpg',
        imageAlt: '600W monocrystalline solar panel for utility-scale solar farms',
        price: 130,
        headlineSpec: '600W · Utility',
        certifications: ['CE', 'RoHS', 'IEC 61215', 'IEC 61730'],
      },
      {
        slug: 'half-cut-solar-panel-450w',
        name: '450W Half-Cut Monocrystalline Solar Panel',
        model: 'HP-SP450H',
        shortDesc:
          'Half-cut cell design reduces resistance and improves shade tolerance for rooftop installations.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-450w-halfcut.jpg',
        imageAlt: '450W half-cut monocrystalline solar panel for rooftop systems',
        price: 88,
        headlineSpec: '450W · Half-Cut',
        certifications: ['CE', 'RoHS', 'IEC 61215'],
      },
      {
        slug: 'monocrystalline-solar-panel-400w',
        name: '400W Monocrystalline Solar Panel',
        model: 'HP-SP400',
        shortDesc:
          'Versatile 400W mono panel balancing output and footprint for residential rooftops.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-400w.jpg',
        imageAlt: '400W monocrystalline solar panel for residential rooftops',
        price: 80,
        headlineSpec: '400W · Residential',
        certifications: ['CE', 'RoHS', 'IEC 61215'],
      },
      {
        slug: 'monocrystalline-solar-panel-330w',
        name: '330W Monocrystalline Solar Panel',
        model: 'HP-SP330',
        shortDesc:
          'Compact 330W panel ideal for off-grid cabins, telecom, and small commercial arrays.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-330w.jpg',
        imageAlt: '330W monocrystalline solar panel for off-grid and telecom use',
        price: 68,
        headlineSpec: '330W · Off-Grid',
        certifications: ['CE', 'RoHS', 'IEC 61215'],
      },
      {
        slug: 'polycrystalline-solar-panel-300w',
        name: '300W Polycrystalline Solar Panel',
        model: 'HP-PP300',
        shortDesc:
          'Budget-friendly 300W poly panel for large-scale commercial farms with ample mounting space.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-300w-poly.jpg',
        imageAlt: '300W polycrystalline solar panel for commercial solar farms',
        price: 60,
        headlineSpec: '300W · Poly',
        certifications: ['CE', 'RoHS', 'IEC 61215'],
        badge: 'ECO',
      },
      {
        slug: 'polycrystalline-solar-panel-250w',
        name: '250W Polycrystalline Solar Panel',
        model: 'HP-PP250',
        shortDesc:
          'Economical 250W poly module for solar street lighting and rural electrification projects.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-250w-poly.jpg',
        imageAlt: '250W polycrystalline solar panel for street lighting projects',
        price: 50,
        headlineSpec: '250W · Poly',
        certifications: ['CE', 'RoHS'],
      },
      {
        slug: 'flexible-solar-panel-200w',
        name: '200W Flexible ETFE Solar Panel',
        model: 'HP-FP200',
        shortDesc:
          'Lightweight bendable 200W ETFE panel for RVs, boats, and curved surfaces — only 2.5 kg.',
        image: 'https://images.houseplus-ch.com/products/flexible-solar-panel-200w.jpg',
        imageAlt: '200W flexible ETFE solar panel for RV and marine use',
        price: 55,
        headlineSpec: '200W · Flexible',
        certifications: ['CE', 'RoHS'],
      },
      {
        slug: 'flexible-solar-panel-100w',
        name: '100W Flexible Solar Panel',
        model: 'HP-FP100',
        shortDesc:
          'Ultra-thin 100W flexible panel that mounts with adhesive — perfect for vans and teardrop trailers.',
        image: 'https://images.houseplus-ch.com/products/flexible-solar-panel-100w.jpg',
        imageAlt: '100W flexible solar panel with adhesive mounting for vans',
        price: 30,
        headlineSpec: '100W · Flexible',
        certifications: ['CE', 'RoHS'],
      },
      {
        slug: 'portable-folding-solar-panel-150w',
        name: '150W Portable Folding Solar Panel',
        model: 'HP-PP150',
        shortDesc:
          'Foldable 150W panel with USB/DC outputs for camping, charging power stations on the go.',
        image: 'https://images.houseplus-ch.com/products/portable-folding-solar-panel-150w.jpg',
        imageAlt: '150W portable folding solar panel with USB and DC outputs',
        price: 48,
        headlineSpec: '150W · Portable',
        certifications: ['CE', 'RoHS'],
        badge: 'HOT',
      },
      {
        slug: 'monocrystalline-solar-panel-100w',
        name: '100W Monocrystalline Solar Panel',
        model: 'HP-SP100',
        shortDesc:
          'Entry-level 100W mono panel for small off-grid systems, gate openers, and trickle charging.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-100w.jpg',
        imageAlt: '100W monocrystalline solar panel for small off-grid systems',
        price: 25,
        headlineSpec: '100W · Mono',
        certifications: ['CE', 'RoHS'],
      },
    ],
  },

  'solar-inverters': {
    slug: 'solar-inverters',
    name: 'Solar Inverters',
    title: 'Wholesale Solar Inverters & Charge Controllers — HousePlus Manufacturer',
    metaDescription:
      'Wholesale solar inverters (1kW–5kW) and MPPT charge controllers from HousePlus. Pure sine wave, hybrid & off-grid, CE certified. OEM/ODM, MOQ 100 pcs.',
    description:
      'Wholesale solar inverters and MPPT charge controllers from HousePlus — pure sine wave hybrid and off-grid inverters from 1kW to 5kW, plus 30A–60A MPPT controllers with up to 99.5% tracking efficiency. CE and RoHS certified, OEM/ODM available from MOQ 500 pcs.',
    faqs: [
      {
        question: 'What types of solar inverters do you offer wholesale?',
        answer:
          'HousePlus offers pure sine wave off-grid inverters (1kW–5kW), hybrid inverters with built-in MPPT and battery charging, and MPPT solar charge controllers (30A–60A). All are CE and RoHS certified and support OEM/ODM customisation.',
      },
      {
        question: 'What is the MOQ for solar inverters?',
        answer:
          'MOQ is 100 pieces for stock inverter models and 500 pieces for OEM/ODM orders with custom branding, firmware, or packaging. Standard lead time is 20–35 days.',
      },
    ],
    products: [
      {
        slug: 'hybrid-solar-inverter-5kw',
        name: '5kW Hybrid Solar Inverter',
        model: 'HP-INV5000',
        shortDesc:
          '5kW pure sine wave hybrid inverter with built-in MPPT and battery charging for on/off-grid systems.',
        image: 'https://images.houseplus-ch.com/products/solar-inverter-5kw.jpg',
        imageAlt: '5kW hybrid solar inverter with MPPT charge controller',
        price: 420,
        headlineSpec: '5kW · Hybrid',
        certifications: ['CE', 'RoHS'],
        badge: 'BEST SELLER',
      },
      {
        slug: 'off-grid-solar-inverter-3kw',
        name: '3kW Pure Sine Wave Solar Inverter',
        model: 'HP-INV3000',
        shortDesc:
          '3kW off-grid inverter with 99.5% MPPT tracking efficiency and built-in Wi-Fi monitoring.',
        image: 'https://images.houseplus-ch.com/products/solar-inverter-3kw.jpg',
        imageAlt: '3kW pure sine wave off-grid solar inverter with Wi-Fi',
        price: 280,
        headlineSpec: '3kW · Off-Grid',
        certifications: ['CE', 'RoHS'],
      },
      {
        slug: 'off-grid-solar-inverter-1kw',
        name: '1kW Off-Grid Solar Inverter',
        model: 'HP-INV1000',
        shortDesc:
          'Compact 1kW pure sine wave inverter for small home and cabin solar systems.',
        image: 'https://images.houseplus-ch.com/products/solar-inverter-1kw.jpg',
        imageAlt: '1kW off-grid pure sine wave solar inverter for home systems',
        price: 95,
        headlineSpec: '1kW · Off-Grid',
        certifications: ['CE', 'RoHS'],
      },
      {
        slug: 'mppt-solar-charge-controller-60a',
        name: 'MPPT Solar Charge Controller 60A',
        model: 'HP-MPPT60',
        shortDesc:
          '60A MPPT controller with 99.5% tracking efficiency, LCD display, and multi-battery support.',
        image: 'https://images.houseplus-ch.com/products/mppt-charge-controller-60a.jpg',
        imageAlt: '60A MPPT solar charge controller with LCD display',
        price: 120,
        headlineSpec: '60A · MPPT',
        certifications: ['CE', 'RoHS'],
      },
      {
        slug: 'mppt-solar-charge-controller-30a',
        name: 'MPPT Solar Charge Controller 30A',
        model: 'HP-MPPT30',
        shortDesc:
          '30A MPPT controller for small off-grid systems with automatic battery recognition.',
        image: 'https://images.houseplus-ch.com/products/mppt-charge-controller-30a.jpg',
        imageAlt: '30A MPPT solar charge controller for small off-grid systems',
        price: 55,
        headlineSpec: '30A · MPPT',
        certifications: ['CE', 'RoHS'],
      },
    ],
  },

  'solar-batteries': {
    slug: 'solar-batteries',
    name: 'Solar Batteries',
    title: 'Wholesale LiFePO4 Solar Batteries — HousePlus Manufacturer',
    metaDescription:
      'Wholesale LiFePO4 & AGM solar batteries from HousePlus: 12V–48V, 100Ah–200Ah, 6000+ cycles, smart BMS. CE/UN38.3 certified. OEM/ODM, MOQ 100 pcs.',
    description:
      'Wholesale solar energy storage batteries from HousePlus — LiFePO4 lithium batteries (12V–48V, 100Ah–200Ah) with 6,000+ cycle life and smart BMS, plus deep-cycle AGM options. CE, RoHS, and UN38.3 certified for safe global shipping. OEM/ODM available from MOQ 500 pcs.',
    faqs: [
      {
        question: 'LiFePO4 vs AGM batteries — which should I buy wholesale?',
        answer:
          'LiFePO4 lithium batteries offer 6,000+ cycles, 95% depth of discharge, and lighter weight, making them ideal for long-life solar storage. AGM batteries are cheaper upfront but last only 500–1,200 cycles. For most wholesale buyers, LiFePO4 delivers the lowest cost per cycle.',
      },
    ],
    products: [
      {
        slug: 'lifepo4-battery-48v-100ah',
        name: '48V 100Ah LiFePO4 Lithium Battery',
        model: 'HP-LFP48100',
        shortDesc:
          '48V 100Ah rack LiFePO4 battery with 6,000+ cycles, smart BMS, and RS485/CAN comms.',
        image: 'https://images.houseplus-ch.com/products/lifepo4-battery-48v-100ah.jpg',
        imageAlt: '48V 100Ah LiFePO4 lithium battery with BMS for solar storage',
        price: 980,
        headlineSpec: '48V · 100Ah',
        certifications: ['CE', 'RoHS', 'UN38.3'],
        badge: 'BEST SELLER',
      },
      {
        slug: 'lifepo4-battery-12v-200ah',
        name: '12V 200Ah LiFePO4 Lithium Battery',
        model: 'HP-LFP12200',
        shortDesc:
          'Drop-in 12V 200Ah LiFePO4 replacement for lead-acid, 5,000+ cycles, Bluetooth BMS.',
        image: 'https://images.houseplus-ch.com/products/lifepo4-battery-12v-200ah.jpg',
        imageAlt: '12V 200Ah LiFePO4 lithium battery with Bluetooth BMS',
        price: 520,
        headlineSpec: '12V · 200Ah',
        certifications: ['CE', 'RoHS', 'UN38.3'],
      },
      {
        slug: 'lifepo4-stackable-battery-5kwh',
        name: '5kWh LiFePO4 Stackable Battery',
        model: 'HP-LFP5K',
        shortDesc:
          '5kWh stackable lithium battery for home energy storage systems, scalable to 20kWh.',
        image: 'https://images.houseplus-ch.com/products/lifepo4-stackable-battery-5kwh.jpg',
        imageAlt: '5kWh stackable LiFePO4 battery for home energy storage',
        price: 1850,
        headlineSpec: '5kWh · Stackable',
        certifications: ['CE', 'RoHS', 'UN38.3'],
        badge: 'NEW',
      },
      {
        slug: 'agm-deep-cycle-battery-12v-200ah',
        name: '12V 200Ah Deep Cycle AGM Battery',
        model: 'HP-AGM200',
        shortDesc:
          'Maintenance-free AGM deep-cycle battery for budget solar and backup power systems.',
        image: 'https://images.houseplus-ch.com/products/agm-deep-cycle-battery-12v-200ah.jpg',
        imageAlt: '12V 200Ah deep cycle AGM battery for solar backup systems',
        price: 280,
        headlineSpec: '12V · 200Ah AGM',
        certifications: ['CE', 'RoHS'],
      },
    ],
  },

  'home-appliances': {
    slug: 'home-appliances',
    name: 'Home Appliances',
    title: 'Wholesale Home & Kitchen Appliances — HousePlus Manufacturer',
    metaDescription:
      'Wholesale home & kitchen appliances from HousePlus: air fryers, kettles, induction cooktops. CE/FCC/RoHS, OEM/ODM, MOQ 100 pcs.',
    description:
      'Wholesale home and kitchen appliances from HousePlus — energy-efficient air fryers, electric kettles, induction cooktops and more, engineered for durability with full OEM/ODM customisation and CE/FCC/RoHS certifications for global markets.',
    faqs: [
      {
        question: 'Can I get home appliances with my own brand (OEM)?',
        answer:
          'Yes. From MOQ 500 pieces we offer OEM/ODM for all home appliances including custom logo printing, bespoke colours, custom packaging, and specification adjustments. Stock models ship from MOQ 100 pieces.',
      },
    ],
    products: [
      {
        slug: 'air-fryer-5-8l',
        name: '5.8L Digital Air Fryer',
        model: 'HP-AF58',
        shortDesc:
          '5.8L digital air fryer with 8 presets, rapid air tech, and dishwasher-safe basket.',
        image: 'https://images.houseplus-ch.com/products/air-fryer-5.8l.jpg',
        imageAlt: '5.8L digital air fryer with touchscreen and 8 presets',
        price: 38,
        headlineSpec: '5.8L · 8 Presets',
        certifications: ['CE', 'FCC', 'RoHS'],
        badge: 'BEST SELLER',
      },
      {
        slug: 'electric-kettle-1-7l-stainless',
        name: '1.7L Stainless Steel Electric Kettle',
        model: 'HP-EK17',
        shortDesc:
          '1.7L 2200W stainless steel kettle with auto shut-off and boil-dry protection.',
        image: 'https://images.houseplus-ch.com/products/electric-kettle-1.7l.jpg',
        imageAlt: '1.7L stainless steel electric kettle with auto shut-off',
        price: 12,
        headlineSpec: '1.7L · 2200W',
        certifications: ['CE', 'RoHS'],
      },
      {
        slug: 'induction-cooktop-2000w',
        name: '2000W Induction Cooktop',
        model: 'HP-IC2000',
        shortDesc:
          '2000W portable induction cooktop with touch control and 10 power levels.',
        image: 'https://images.houseplus-ch.com/products/induction-cooktop-2000w.jpg',
        imageAlt: '2000W portable induction cooktop with touch control',
        price: 32,
        headlineSpec: '2000W · Touch',
        certifications: ['CE', 'FCC', 'RoHS'],
      },
    ],
  },
};

// ============================================================================
// FILTERING CONSTANTS
// ============================================================================

const PRODUCTS_PER_PAGE = 9;

/** Price range filter options (USD). */
const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-50', label: 'Under $50', min: 0, max: 50 },
  { id: '50-200', label: '$50 – $200', min: 50, max: 200 },
  { id: '200-500', label: '$200 – $500', min: 200, max: 500 },
  { id: '500-plus', label: '$500 & above', min: 500, max: Infinity },
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A–Z' },
];

// ============================================================================
// STATIC PATHS — pre-render every category slug at build time (SSG)
// ============================================================================

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(categories).map((slug) => ({
    params: { category: slug },
  }));

  return {
    paths,
    // New categories become indexable on-demand without a full rebuild.
    fallback: 'blocking' as const,
  };
};

// ============================================================================
// STATIC PROPS — resolve category data at build time
// ============================================================================

export const getStaticProps: GetStaticProps<CategoryPageProps> = async (
  context: GetStaticPropsContext
) => {
  const { params, locale } = context;
  const slug = (params?.category as string) || 'solar-panels';
  const category = categories[slug];

  // Unknown category → 404.
  if (!category) {
    return { notFound: true };
  }

  // Sidebar navigation: all categories (slug + display name).
  const allCategories = Object.values(categories).map((c) => ({
    slug: c.slug,
    name: c.name,
  }));

  return {
    props: {
      category,
      allCategories,
      locale: locale || 'en',
    },
    // Re-validate hourly so new products appear without a manual rebuild.
    revalidate: 3600,
  };
};

// ============================================================================
// PAGINATION HELPER — build a compact page-number list with ellipsis
// ============================================================================

function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | '...')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push('...');
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push('...');
  pages.push(total);
  return pages;
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function CategoryPage({
  category,
  allCategories,
  locale = 'en',
}: CategoryPageProps) {
  const canonical = `${siteConfig.url}/${locale}/products/category/${category.slug}`;

  // --- Client-side filter state ---
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [priceRangeId, setPriceRangeId] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Certifications present in this category (drives the filter checkbox list).
  const availableCerts = useMemo(() => {
    const set = new Set<string>();
    category.products.forEach((p) => p.certifications.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [category.products]);

  // Reset to page 1 whenever filters/category change.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCerts, priceRangeId, sortBy, category.slug]);

  // --- Apply filters + sort (memoised) ---
  const filteredProducts = useMemo(() => {
    const range =
      PRICE_RANGES.find((r) => r.id === priceRangeId) || PRICE_RANGES[0];

    let list = category.products.filter((p) => {
      // Price filter
      if (p.price < range.min || p.price >= range.max) return false;
      // Certification filter (AND-logic: product must have ALL selected certs)
      if (selectedCerts.length > 0) {
        const hasAll = selectedCerts.every((c) => p.certifications.includes(c));
        if (!hasAll) return false;
      }
      return true;
    });

    // Sort
    list = [...list];
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Featured = badges first, then price ascending.
        list.sort((a, b) => {
          const ba = a.badge ? 1 : 0;
          const bb = b.badge ? 1 : 0;
          if (bb !== ba) return bb - ba;
          return a.price - b.price;
        });
        break;
    }
    return list;
  }, [category.products, priceRangeId, selectedCerts, sortBy]);

  // --- Pagination slice ---
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  // --- Filter handlers ---
  const toggleCert = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const clearFilters = () => {
    setSelectedCerts([]);
    setPriceRangeId('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCerts.length > 0 || priceRangeId !== 'all' || sortBy !== 'featured';

  // --- Breadcrumb (last item = current page, no href) ---
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: category.name },
  ];

  // --- CollectionPage structured data (ItemList of products) ---
  const collectionSchema = CollectionPageSchema(
    category.name,
    pagedProducts.map((p) => ({
      name: p.name,
      url: `${siteConfig.url}/${locale}/products/${p.slug}`,
    }))
  );

  return (
    <>
      {/* ============================================================
          SEO HEAD — page meta + CollectionPage schema.
          Note: Organization & WebSite schemas are injected globally
          by _app.tsx, so only the CollectionPage schema is added here.
      ============================================================ */}
      <SEOHead
        title={`${category.title} | ${siteConfig.name}`}
        description={category.metaDescription}
        keywords={`${category.name.toLowerCase()} wholesale, ${category.name.toLowerCase()} manufacturer china, buy ${category.name.toLowerCase()} bulk, OEM ${category.name.toLowerCase()}`}
        canonical={canonical}
        ogImage={`${siteConfig.url}/api/og-image?title=${encodeURIComponent(
          category.name
        )}&subtitle=${encodeURIComponent('Wholesale from HousePlus')}&type=category`}
        ogType="website"
        locale={locale}
        jsonLd={collectionSchema}
      />

      {/* Hreflang alternates for multi-language SEO */}
      <HreflangTags path={`/products/category/${category.slug}`} />

      <div className="page-wrapper">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </div>

        {/* ============================================================
            CATEGORY HEADER — H1, description, count
        ============================================================ */}
        <section className="category-header">
          <div className="container">
            <h1>{category.title}</h1>
            <p className="category-description">{category.description}</p>
            <div className="category-meta">
              <span className="product-count">
                {filteredProducts.length} product
                {filteredProducts.length === 1 ? '' : 's'}
                {hasActiveFilters && ` (filtered from ${category.products.length})`}
              </span>
              <span className="meta-divider">·</span>
              <span>MOQ {siteConfig.moq}</span>
              <span className="meta-divider">·</span>
              <span>Lead time {siteConfig.leadTime}</span>
              <span className="meta-divider">·</span>
              <span>{siteConfig.certifications.join(', ')} certified</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            LAYOUT — product grid + sidebar
        ============================================================ */}
        <section className="category-body">
          <div className="container layout-grid">
            {/* ---------- Sidebar filters ---------- */}
            <aside className="sidebar" aria-label="Product filters">
              {/* Category navigation */}
              <div className="filter-block">
                <h2 className="filter-title">Categories</h2>
                <ul className="category-nav">
                  {allCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${locale}/products/category/${c.slug}`}
                        className={c.slug === category.slug ? 'active' : ''}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price range filter */}
              <div className="filter-block">
                <h2 className="filter-title">Price Range</h2>
                <ul className="filter-list">
                  {PRICE_RANGES.map((range) => (
                    <li key={range.id}>
                      <label className="filter-option">
                        <input
                          type="radio"
                          name="price-range"
                          value={range.id}
                          checked={priceRangeId === range.id}
                          onChange={() => setPriceRangeId(range.id)}
                        />
                        <span>{range.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certification filter */}
              <div className="filter-block">
                <h2 className="filter-title">Certifications</h2>
                <ul className="filter-list">
                  {availableCerts.map((cert) => (
                    <li key={cert}>
                      <label className="filter-option">
                        <input
                          type="checkbox"
                          value={cert}
                          checked={selectedCerts.includes(cert)}
                          onChange={() => toggleCert(cert)}
                        />
                        <span>{cert}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button type="button" className="btn-clear" onClick={clearFilters}>
                  Clear all filters
                </button>
              )}

              {/* CTA card */}
              <div className="sidebar-cta">
                <h3>Need a custom quote?</h3>
                <p>
                  Bulk pricing, OEM/ODM, and full certification documents from a
                  vertically integrated manufacturer.
                </p>
                <Link href={`/${locale}/contact`} className="btn-primary btn-block">
                  Request a Quote
                </Link>
              </div>
            </aside>

            {/* ---------- Main content: sort bar + grid + pagination ---------- */}
            <div className="main-content">
              {/* Sort bar */}
              <div className="sort-bar">
                <label htmlFor="sort-select" className="sort-label">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product grid */}
              {pagedProducts.length > 0 ? (
                <div className="product-grid">
                  {pagedProducts.map((product) => (
                    <article key={product.slug} className="product-card">
                      <Link
                        href={`/${locale}/products/${product.slug}`}
                        className="product-card-link"
                      >
                        <div className="product-image-wrap">
                          <OptimizedImage
                            src={product.image}
                            alt={product.imageAlt}
                            className="product-image"
                            width={400}
                            height={300}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {product.badge && (
                            <span className={`product-badge badge-${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                              {product.badge}
                            </span>
                          )}
                          <span className="product-spec-badge">
                            {product.headlineSpec}
                          </span>
                        </div>
                        <div className="product-body">
                          <h3 className="product-name">{product.name}</h3>
                          <span className="product-model">
                            Model: {product.model}
                          </span>
                          <p className="product-desc">{product.shortDesc}</p>
                          <div className="product-certs">
                            {product.certifications.slice(0, 4).map((cert) => (
                              <span key={cert} className="cert-chip">
                                {cert}
                              </span>
                            ))}
                          </div>
                          <div className="product-footer">
                            <span className="product-price">
                              from <strong>${product.price}</strong>/pc
                            </span>
                            <span className="product-cta">View Details →</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                /* No products match the active filters */
                <div className="no-results">
                  <h3>No products match your filters</h3>
                  <p>Try removing a certification or widening the price range.</p>
                  <button type="button" className="btn-primary" onClick={clearFilters}>
                    Clear all filters
                  </button>
                </div>
              )}

              {/* ============================================================
                  PAGINATION
              ============================================================ */}
              {totalPages > 1 && (
                <nav className="pagination" aria-label="Product pagination">
                  <button
                    type="button"
                    className="page-btn"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                  >
                    ← Prev
                  </button>

                  {getPageRange(safePage, totalPages).map((page, idx) =>
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="page-ellipsis">
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        className={`page-num ${page === safePage ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                        aria-current={page === safePage ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    className="page-btn"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </nav>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            FAQ SECTION — category-specific FAQs + FAQPage schema.
            Targets long-tail question queries (e.g. "wholesale solar
            panels MOQ") and expands SERP real estate.
        ============================================================ */}
        <FAQSection
          title={`${category.name} — Frequently Asked Questions`}
          faqs={category.faqs}
          locale={locale}
        />
      </div>

      {/* ============================================================
          STYLES — styled-jsx, fully responsive
      ============================================================ */}
      <style jsx>{`
        .page-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif;
          color: #1a1a2e;
          background: #ffffff;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* === Category header === */
        .category-header {
          background: linear-gradient(135deg, #1a0a05 0%, #E85D2F 100%);
          color: #fff;
          padding: 32px 20px 40px;
        }

        .category-header h1 {
          font-size: 34px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 14px;
          max-width: 900px;
        }

        .category-description {
          font-size: 16px;
          line-height: 1.7;
          opacity: 0.92;
          max-width: 820px;
          margin: 0 0 18px;
        }

        .category-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          opacity: 0.95;
        }

        .meta-divider {
          opacity: 0.5;
        }

        /* === Layout grid === */
        .category-body {
          padding: 32px 20px 60px;
          background: #f8f9fa;
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          align-items: start;
        }

        /* === Sidebar === */
        .sidebar {
          position: sticky;
          top: 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .filter-block {
          background: #fff;
          border-radius: 10px;
          padding: 18px 20px;
          border: 1px solid #eef0f3;
        }

        .filter-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #1a1a2e;
          margin: 0 0 12px;
          padding-bottom: 10px;
          border-bottom: 2px solid #E85D2F;
        }

        .category-nav,
        .filter-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .category-nav a {
          display: block;
          padding: 7px 10px;
          border-radius: 6px;
          text-decoration: none;
          color: #444;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
        }

        .category-nav a:hover {
          background: #fff3ee;
          color: #E85D2F;
        }

        .category-nav a.active {
          background: #E85D2F;
          color: #fff;
          font-weight: 600;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 6px 4px;
          cursor: pointer;
          font-size: 14px;
          color: #333;
        }

        .filter-option input {
          accent-color: #E85D2F;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .filter-option:hover {
          color: #E85D2F;
        }

        .btn-clear {
          background: none;
          border: 1px solid #f0d8cc;
          color: #666;
          font-size: 13px;
          font-weight: 600;
          padding: 9px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-clear:hover {
          border-color: #E85D2F;
          color: #E85D2F;
        }

        .sidebar-cta {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #fff;
          border-radius: 10px;
          padding: 22px 20px;
          text-align: center;
        }

        .sidebar-cta h3 {
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .sidebar-cta p {
          font-size: 13px;
          color: #c8d0e0;
          line-height: 1.6;
          margin: 0 0 14px;
        }

        /* === Main content === */
        .main-content {
          min-width: 0;
        }

        .sort-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .sort-label {
          font-size: 14px;
          font-weight: 600;
          color: #555;
        }

        .sort-select {
          padding: 9px 14px;
          font-size: 14px;
          border: 1px solid #f0d8cc;
          border-radius: 8px;
          background: #fff;
          color: #1a1a2e;
          cursor: pointer;
          outline: none;
        }

        .sort-select:focus {
          border-color: #E85D2F;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.12);
        }

        /* === Product grid === */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .product-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eef0f3;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }

        .product-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .product-image-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f0f2f5;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }

        .product-card:hover .product-image {
          transform: scale(1.04);
        }

        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 5px;
          color: #fff;
          background: #E85D2F;
        }

        .badge-new {
          background: #3fb950;
        }

        .badge-best-seller {
          background: #f59e0b;
        }

        .badge-hot {
          background: #e63946;
        }

        .badge-eco {
          background: #2a9d8f;
        }

        .product-spec-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(10, 31, 60, 0.82);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 5px;
        }

        .product-body {
          padding: 16px 18px 18px;
        }

        .product-name {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .product-model {
          font-size: 12px;
          color: #888;
          font-family: 'SFMono-Regular', Consolas, monospace;
        }

        .product-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #555;
          margin: 10px 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-certs {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 14px;
        }

        .cert-chip {
          font-size: 10px;
          font-weight: 600;
          color: #E85D2F;
          background: #fff3ee;
          padding: 3px 7px;
          border-radius: 4px;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f0f2f5;
          padding-top: 12px;
        }

        .product-price {
          font-size: 14px;
          color: #555;
        }

        .product-price strong {
          color: #1a1a2e;
          font-size: 17px;
        }

        .product-cta {
          font-size: 14px;
          font-weight: 600;
          color: #E85D2F;
        }

        /* === No results === */
        .no-results {
          text-align: center;
          background: #fff;
          border-radius: 12px;
          padding: 56px 24px;
          border: 1px solid #eef0f3;
        }

        .no-results h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .no-results p {
          font-size: 15px;
          color: #666;
          margin: 0 0 20px;
        }

        /* === Pagination === */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 36px;
        }

        .page-btn,
        .page-num {
          min-width: 40px;
          height: 40px;
          padding: 0 12px;
          border: 1px solid #f0d8cc;
          background: #fff;
          color: #1a1a2e;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .page-btn:hover:not(:disabled),
        .page-num:hover {
          border-color: #E85D2F;
          color: #E85D2F;
        }

        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-num.active {
          background: #E85D2F;
          border-color: #E85D2F;
          color: #fff;
        }

        .page-ellipsis {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          color: #999;
        }

        /* === Buttons === */
        .btn-primary {
          display: inline-block;
          background: #E85D2F;
          color: #fff;
          padding: 12px 26px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: background 0.2s;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #c44a20;
        }

        .btn-block {
          display: block;
          width: 100%;
          text-align: center;
        }

        /* === Responsive === */
        @media (max-width: 900px) {
          .layout-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .sidebar {
            position: static;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .sidebar-cta {
            grid-column: 1 / -1;
          }

          .btn-clear {
            grid-column: 1 / -1;
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .category-header h1 {
            font-size: 28px;
          }
        }

        @media (max-width: 640px) {
          .sidebar {
            grid-template-columns: 1fr;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .category-header h1 {
            font-size: 23px;
          }

          .category-description {
            font-size: 15px;
          }

          .category-meta {
            font-size: 13px;
          }

          .page-btn,
          .page-num {
            min-width: 36px;
            height: 36px;
            padding: 0 8px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}

/*
SEO CHECKLIST:
[x] getStaticPaths + getStaticProps (SSG) — instant load, top Core Web Vitals
[x] CollectionPage Schema (ItemList) via SchemaOrg.CollectionPageSchema
[x] Breadcrumb component + BreadcrumbList schema
[x] HreflangTags for en/es/de/fr/ar + x-default
[x] Keyword-rich H1 + meta description (buyer-intent, <= 160 chars)
[x] Product grid: image, name, model, short desc, view-details CTA
[x] Sidebar: category nav, price range filter, certification filter
[x] Client-side filtering + sort + pagination (hydrated SSG)
[x] Pagination component with accessible aria-current / aria-label
[x] FAQSection with category-specific FAQs + FAQPage schema
[x] Dynamic OG image via /api/og-image (type=category)
[x] Internal linking to detail pages, sibling categories, contact
[x] Responsive design (desktop / tablet / mobile breakpoints)
[x] Descriptive image alt text on every product card
*/

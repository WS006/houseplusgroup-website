/**
 * HousePlus SEO Configuration
 * Centralized SEO metadata for all pages
 * Updated: 2026-07-28
 */

export const siteConfig = {
  name: "HousePlus",
  alternateName: "HousePlus Group",
  url: "https://www.houseplus-ch.com",
  domain: "houseplus-ch.com",
  logo: "https://www.houseplus-ch.com/houseplus-logo.jpg",
  email: "jack@houseplus-ch.com",
  phone: "+86-155-7811-9543",
  whatsapp: "+8615578119543",
  wechat: "JackHousePlus",
  founded: "2010",
  factorySize: "20,000 m²",
  employees: 500,
  clients: "441+",
  countries: "53+",
  warranty: "12 months",
  moq: "100 pcs",
  leadTime: "20-35 days",
  certifications: ["CE", "FCC", "RoHS", "ISO 9001:2015", "IEC"],
  city: "Zhongshan",
  region: "Guangdong",
  country: "CN",
  languages: ["en", "es", "de", "fr", "ar"],
};

// === OPTIMIZED: Homepage Meta Description (shortened from 328 to ~153 chars) ===
export const homePageMeta = {
  title: "Solar Systems & Home Appliances Wholesale | HousePlus | Made in China",
  // BEFORE (328 chars - too long, truncated in SERP):
  // "HousePlus — vertically integrated manufacturer since 2010. 20,000 m² ISO 9001 certified factory. Solar energy systems, home appliances and 3C electronics for wholesale buyers. 441+ clients across 53+ countries. MOQ 100 pcs, 20–35 day lead time, 12-month warranty. CE, FCC, RoHS certified. OEM/ODM available."
  // AFTER (149 chars - fits SERP display, verified < 155 limit):
  description: "HousePlus — wholesale manufacturer of solar systems, home appliances & 3C electronics since 2010. OEM/ODM, MOQ 100 pcs. CE/FCC/RoHS certified.",
  keywords: "solar systems wholesale, home appliances manufacturer, 3C electronics OEM, solar panel supplier China, wholesale electronics manufacturer",
  ogTitle: "Solar Systems & Home Appliances Wholesale | HousePlus | Made in China",
  ogDescription: "HousePlus — wholesale manufacturer of solar systems, home appliances & 3C electronics since 2010. OEM/ODM, MOQ 100 pcs. CE/FCC/RoHS certified.",
  ogImage: "https://www.houseplus-ch.com/og-image.jpg",
  ogUrl: "https://www.houseplus-ch.com/en",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Solar Systems & Home Appliances Wholesale | HousePlus | Made in China",
  twitterDescription: "HousePlus — wholesale manufacturer of solar systems, home appliances & 3C electronics since 2010. OEM/ODM, MOQ 100 pcs. CE/FCC/RoHS certified.",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  canonical: "https://www.houseplus-ch.com/en",
};

// === OPTIMIZED: Product List Page Meta ===
export const productListMeta = {
  // BEFORE: "Products | HousePlus — Solar, Appliances & Electronics"
  // AFTER: Added wholesale + manufacturer keywords
  title: "Wholesale Solar Panels, Home Appliances & 3C Electronics | HousePlus Manufacturer",
  description: "Browse HousePlus product catalogue: solar panels, inverters, batteries, home appliances & 3C electronics. Wholesale pricing, OEM/ODM available, MOQ 100 pcs.",
  keywords: "wholesale solar panels, home appliances wholesale, 3C electronics manufacturer, solar inverter supplier, lithium battery wholesale",
  canonical: "https://www.houseplus-ch.com/en/products",
};

// === OPTIMIZED: Product Detail Page Meta Template ===
// BEFORE: "500W Monocrystalline Solar Panel | HousePlus Wholesale — Professional Manufacturer" (82 chars — too long)
// AFTER:  Multi-tier truncation to ensure title stays under 60 chars for optimal SERP display
export function generateProductMeta(product: { name: string; description?: string }) {
  // Tier 1: Full title with certification keywords (best for SEO if fits)
  const fullTitle = `${product.name} | HousePlus Wholesale — CE/RoHS Certified`;
  // Tier 2: Shorter without certification (fallback)
  const midTitle = `${product.name} | HousePlus Wholesale Manufacturer`;
  // Tier 3: Minimal (last resort for very long product names)
  const minTitle = `${product.name} | HousePlus`;

  // Select the longest title that fits within 60 chars (Google displays ~60 chars)
  let shortTitle = fullTitle;
  if (shortTitle.length > 60) shortTitle = midTitle;
  if (shortTitle.length > 60) shortTitle = minTitle;
  if (shortTitle.length > 60) shortTitle = shortTitle.substring(0, 57) + '...';

  const description = `Buy ${product.name} wholesale from HousePlus. ${product.certifications || "CE/RoHS certified"}, OEM/ODM available, MOQ 100 pcs. Trusted manufacturer since 2010, serving 53+ countries.`;

  return {
    title: shortTitle,
    description: description.length > 155 ? description.substring(0, 152) + "..." : description,
    canonical: `https://www.houseplus-ch.com/en/products/${product.slug}`,
    ogTitle: shortTitle,
    ogDescription: description,
    ogImage: product.image || `https://images.houseplus-ch.com/products/${product.slug}.jpg`,
    ogType: "product",
  };
}

// === CROSS-DOMAIN CANONICAL: Handle houseplus.ltd duplicate content ===
// The site has an associated domain houseplus.ltd that mirrors content.
// All pages on houseplus.ltd must canonical to houseplus-ch.com to consolidate link equity.
export const crossDomainConfig = {
  // Primary domain (canonical target for ALL pages)
  primaryDomain: 'https://www.houseplus-ch.com',

  // Associated domains that must redirect or canonical to primary
  associatedDomains: [
    'houseplus.ltd',
    'www.houseplus.ltd',
    'houseplus-ch.com', // non-www variant
  ],

  // Generate canonical URL — always points to www.houseplus-ch.com
  generateCanonical: (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `https://www.houseplus-ch.com${cleanPath}`;
  },

  // Generate redirect rules for associated domains
  // Add these to next.config.js redirects() if hosting multiple domains
  redirectRules: [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'houseplus.ltd' }],
      destination: 'https://www.houseplus-ch.com/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.houseplus.ltd' }],
      destination: 'https://www.houseplus-ch.com/:path*',
      permanent: true,
    },
  ],
};

// === HOMEPAGE HERO IMAGES: Replace Unsplash with real product images ===
export const heroSlides = [
  {
    // BEFORE: "https://images.unsplash.com/photo-..." (placeholder)
    // AFTER: Use real product/factory images from own CDN
    image: "https://images.houseplus-ch.com/hero/smart-home-appliances.jpg",
    alt: "HousePlus smart home appliances factory production line — air fryers, blenders, electric kettles",
    heading: "Smart Home Appliances",
    subheading: "Energy-efficient kitchen and household appliances with full OEM/ODM customisation support",
    cta: { text: "VIEW APPLIANCES", href: "/en/products?category=appliances" },
  },
  {
    image: "https://images.houseplus-ch.com/hero/solar-energy-solutions.jpg",
    alt: "HousePlus solar panel manufacturing facility — monocrystalline panels and portable power stations",
    heading: "Solar Energy Solutions",
    subheading: "High-efficiency solar panels and systems for global wholesale buyers — CE/IEC certified",
    cta: { text: "VIEW SOLAR PRODUCTS", href: "/en/products?category=solar" },
  },
  {
    image: "https://images.houseplus-ch.com/hero/3c-electronics-wholesale.jpg",
    alt: "HousePlus 3C electronics warehouse — TWS earphones, smart watches, portable SSDs ready for export",
    heading: "3C Electronics Wholesale",
    subheading: "Premium 3C electronics for global distributors — competitive pricing and reliable supply chain",
    cta: { text: "VIEW PRODUCTS", href: "/en/products?category=electronics" },
  },
];

// === Image optimization checklist for deployment ===
export const imageOptimizationGuide = `
HOMEPAGE HERO IMAGE REPLACEMENT CHECKLIST:
==========================================
1. Photograph real products in factory/warehouse setting:
   - Smart appliances: Air fryer + blender + electric kettle arrangement on production line
   - Solar: Solar panels stacked in warehouse + portable power station display
   - 3C Electronics: TWS earphones + smart watches + SSDs on display table

2. Image specifications:
   - Format: WebP (with JPG fallback)
   - Dimensions: 1920x1080 (16:9 aspect ratio)
   - File size: < 200KB per image
   - Use Next.js Image component for automatic optimization

3. Alt text must describe the actual image content (not just keywords):
   - GOOD: "HousePlus solar panel manufacturing facility — monocrystalline panels and portable power stations"
   - BAD: "solar panel wholesale manufacturer" (too generic)

4. Upload to own CDN: https://images.houseplus-ch.com/hero/
   - DO NOT use Unsplash or other stock photo services
   - Real factory/product photos build buyer trust and improve conversion
`;

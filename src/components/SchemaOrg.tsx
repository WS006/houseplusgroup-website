/**
 * Schema.org Structured Data Components
 * Updated: 2026-07-28
 *
 * Generates JSON-LD structured data for:
 * 1. Organization — company info for knowledge panel
 * 2. WebSite — site search box in Google results
 * 3. BreadcrumbList — breadcrumb navigation in SERPs
 * 4. Product — product rich snippets (price, rating)
 * 5. FAQPage — FAQ rich results
 * 6. LocalBusiness — local business info (factory location)
 * 7. ContactPoint — customer service contact info
 *
 * These schemas enable rich snippets in Google search results,
 * improving click-through rates by 20-30%.
 */

import { siteConfig } from '../config/seo-config';

// === Organization Schema ===
// Displays company info in Google Knowledge Panel
export function OrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.logo,
      width: 512,
      height: 512,
    },
    description: `${siteConfig.name} is a vertically integrated manufacturer of solar energy systems, home appliances, and 3C electronics based in ${siteConfig.city}, ${siteConfig.region}, China. Founded in ${siteConfig.founded}, serving ${siteConfig.clients} clients across ${siteConfig.countries} countries.`,
    foundingDate: siteConfig.founded,
    founders: [
      {
        '@type': 'Person',
        name: 'Jack (Founder & CEO)',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: 'sales',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Chinese', 'Spanish', 'German', 'French', 'Arabic'],
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.whatsapp,
        contactType: 'whatsapp',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Chinese'],
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/houseplus-ch',
      'https://www.facebook.com/houseplus.ch',
      'https://www.youtube.com/@houseplus-ch',
      'https://www.instagram.com/houseplus_ch',
      'https://x.com/houseplus_ch',
    ],
    knowsAbout: [
      'Solar panel manufacturing',
      'Home appliance manufacturing',
      '3C electronics',
      'OEM/ODM services',
      'Wholesale electronics',
    ],
    hasCredential: siteConfig.certifications,
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: siteConfig.employees,
    },
  };
}

// === WebSite Schema ===
// Enables Google Sitelinks Search Box
export function WebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.name} — Solar & Home Appliance Manufacturer`,
    alternateName: siteConfig.name,
    description: 'Wholesale solar systems, home appliances, and 3C electronics manufacturer from China',
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/en/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en', 'es', 'de', 'fr', 'ar'],
  };
}

// === BreadcrumbList Schema ===
// Shows breadcrumb navigation in SERPs
// Alias: BreadcrumbListSchema (matches Schema.org @type name for clarity)
export function BreadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// === Product Schema ===
// Enables product rich snippets (price, availability, ratings)
export function ProductSchema(product: {
  name: string;
  slug: string;
  description: string;
  image: string;
  brand?: string;
  model?: string;
  category?: string;
  certifications?: string[];
  minOrderQuantity?: number;
  priceCurrency?: string;
  price?: number;
  availability?: string;
  ratingValue?: number;
  reviewCount?: number;
}) {
  const baseUrl = siteConfig.url;
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${baseUrl}/en/products/${product.slug}`,
    sku: product.model || product.slug,
    mpn: product.model || product.slug,
    brand: {
      '@type': 'Brand',
      name: product.brand || siteConfig.name,
    },
    manufacturer: {
      '@id': `${baseUrl}/#organization`,
    },
    category: product.category || 'Electronics',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Minimum Order Quantity',
        value: `${product.minOrderQuantity || 100} pieces`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Lead Time',
        value: siteConfig.leadTime,
      },
      {
        '@type': 'PropertyValue',
        name: 'Warranty',
        value: siteConfig.warranty,
      },
    ],
    hasCertification: product.certifications || siteConfig.certifications,
  };

  // Add offer if price is available
  if (product.price) {
    schema.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: product.priceCurrency || 'USD',
      lowPrice: product.price,
      highPrice: Math.round(product.price * 1.5),
      offerCount: '1',
      availability: product.availability || 'https://schema.org/InStock',
      seller: {
        '@id': `${baseUrl}/#organization`,
      },
    };
  }

  // Add aggregate rating if available
  if (product.ratingValue && product.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
}

// === FAQPage Schema ===
// Enables FAQ rich results (expandable Q&A in SERPs)
export function FAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// === LocalBusiness Schema ===
// Factory location for Google Maps and local search
export function LocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Manufacturer',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/factory-photo.jpg`,
    logo: siteConfig.logo,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.5176,
      longitude: 113.3927,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:00',
      },
    ],
    parentOrganization: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

// === CollectionPage Schema ===
// For product category/listing pages
export function CollectionPageSchema(category: string, products: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} — Wholesale from ${siteConfig.name}`,
    url: `${siteConfig.url}/en/products?category=${encodeURIComponent(category.toLowerCase())}`,
    description: `Browse our ${category} catalogue for wholesale. OEM/ODM available, MOQ ${siteConfig.moq}.`,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: product.url,
        name: product.name,
      })),
    },
  };
}

// === Re-export alias for naming consistency ===
// BreadcrumbListSchema matches the Schema.org @type name.
// Both names work; BreadcrumbSchema is the original, BreadcrumbListSchema is the alias.
export { BreadcrumbSchema as BreadcrumbListSchema };

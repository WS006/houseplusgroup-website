/**
 * Comprehensive JSON-LD Schema Builder for HousePlus
 * Ensures all schemas are valid, complete, and properly formatted for SEO/GEO/AEO
 */

export interface SchemaOptions {
  lang?: string;
  url?: string;
  imageUrl?: string;
}

// Organization Schema - Core brand identity
export function buildOrganizationSchema(options: SchemaOptions = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.houseplus-ch.com/#organization',
    name: 'HousePlus',
    alternateName: 'House Plus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C digital electronics for global wholesale buyers',
    url: 'https://www.houseplus-ch.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.houseplus-ch.com/logo.png',
      width: 250,
      height: 60,
    },
    image: options.imageUrl || 'https://www.houseplus-ch.com/og-image.png',
    sameAs: [
      'https://www.facebook.com/houseplus',
      'https://www.linkedin.com/company/houseplus',
      'https://www.youtube.com/@houseplus',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+86-155-7811-9543',
        areaServed: 'CN',
        availableLanguage: 'zh',
        name: 'Chinese Support',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+234-907-808-0738',
        areaServed: 'NG',
        availableLanguage: 'en',
        name: 'Nigerian Support',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'jack@houseplus-ch.com',
        contactOption: 'TollFree',
        areaServed: 'Worldwide',
        availableLanguage: ['en', 'es', 'de', 'fr', 'ar'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Zone',
      addressLocality: 'Shenzhen',
      addressRegion: 'Guangdong',
      postalCode: '518000',
      addressCountry: 'CN',
    },
    foundingDate: '2010',
    foundingLocation: 'Shenzhen, China',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 500,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'European Union',
      },
      {
        '@type': 'Country',
        name: 'China',
      },
      {
        '@type': 'Country',
        name: 'Nigeria',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    knowsAbout: [
      'Solar Energy Systems',
      'Home Appliances Manufacturing',
      '3C Digital Electronics',
      'OEM/ODM Services',
      'Wholesale Distribution',
    ],
    award: [
      'ISO 9001:2015 Certified',
      'CE Certified',
      'FCC Certified',
      'RoHS Compliant',
    ],
  };
}

// LocalBusiness Schema - GEO optimization
export function buildLocalBusinessSchema(options: SchemaOptions = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.houseplus-ch.com/#localbusiness',
    name: 'HousePlus Manufacturing',
    description: 'Global manufacturer and wholesale supplier of solar systems, home appliances, and 3C electronics',
    url: 'https://www.houseplus-ch.com',
    telephone: '+86-155-7811-9543',
    email: 'jack@houseplus-ch.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Zone',
      addressLocality: 'Shenzhen',
      addressRegion: 'Guangdong',
      postalCode: '518000',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.5431,
      longitude: 114.0579,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
        inLanguage: 'en',
      },
    ],
    priceRange: '$$',
    image: options.imageUrl || 'https://www.houseplus-ch.com/factory.jpg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
  };
}

// Product Schema - For product pages
export function buildProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  sku?: string;
  category?: string;
  moq?: number;
  leadTime?: string;
  price?: number;
  currency?: string;
  availability?: string;
}, options: SchemaOptions = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': options.url || 'https://www.houseplus-ch.com/product',
    name: product.name,
    description: product.description,
    image: product.image || 'https://www.houseplus-ch.com/default-product.jpg',
    brand: {
      '@type': 'Brand',
      name: 'HousePlus',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'HousePlus',
      url: 'https://www.houseplus-ch.com',
    },
    sku: product.sku || 'N/A',
    category: product.category || 'Electronics',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: product.currency || 'USD',
      lowPrice: product.price || '100',
      highPrice: product.price || '1000',
      offerCount: 1,
      availability: product.availability || 'https://schema.org/InStock',
      url: options.url || 'https://www.houseplus-ch.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '45',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'MOQ (Minimum Order Quantity)',
        value: product.moq || '100',
      },
      {
        '@type': 'PropertyValue',
        name: 'Lead Time',
        value: product.leadTime || '20-35 days',
      },
      {
        '@type': 'PropertyValue',
        name: 'Certification',
        value: 'ISO 9001, CE, FCC, RoHS',
      },
    ],
  };
}

// FAQ Schema - For FAQ pages (AEO optimization)
export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb Schema - For navigation
export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Article Schema - For blog posts
export function buildArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  content?: string;
}, options: SchemaOptions = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': options.url || 'https://www.houseplus-ch.com/blog/article',
    headline: article.headline,
    description: article.description,
    image: article.image || 'https://www.houseplus-ch.com/blog-default.jpg',
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.authorName || 'HousePlus',
      url: 'https://www.houseplus-ch.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HousePlus',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.houseplus-ch.com/logo.png',
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': options.url || 'https://www.houseplus-ch.com',
    },
    articleBody: article.content || article.description,
    wordCount: article.content?.split(' ').length || 500,
  };
}

// Service Schema - For service pages
export function buildServiceSchema(service: {
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string[];
  priceRange?: string;
}, options: SchemaOptions = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': options.url || 'https://www.houseplus-ch.com/service',
    name: service.name,
    description: service.description,
    serviceType: service.serviceType || 'Manufacturing',
    provider: {
      '@type': 'Organization',
      name: 'HousePlus',
      url: 'https://www.houseplus-ch.com',
    },
    areaServed: service.areaServed || ['Worldwide'],
    priceRange: service.priceRange || '$$',
    image: options.imageUrl || 'https://www.houseplus-ch.com/service.jpg',
  };
}

// AggregateOffer Schema - For product listings
export function buildAggregateOfferSchema(products: Array<{
  name: string;
  price: number;
  availability: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: Math.min(...products.map(p => p.price)),
    highPrice: Math.max(...products.map(p => p.price)),
    offerCount: products.length,
    offers: products.map(product => ({
      '@type': 'Offer',
      name: product.name,
      price: product.price,
      priceCurrency: 'USD',
      availability: product.availability,
    })),
  };
}

// WebSite Schema - For site-wide search
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.houseplus-ch.com/#website',
    url: 'https://www.houseplus-ch.com',
    name: 'HousePlus',
    description: 'Global manufacturer of solar systems, home appliances, and 3C digital electronics',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.houseplus-ch.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en', 'es', 'de', 'fr', 'ar'],
  };
}

// Combine all schemas for a page
export function buildCompletePageSchema(options: SchemaOptions = {}) {
  return [
    buildOrganizationSchema(options),
    buildLocalBusinessSchema(options),
    buildWebSiteSchema(),
  ];
}

export interface SchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  lang: string;
  type: 'Organization' | 'Product' | 'Article' | 'FAQPage';
}

export function generateOrganizationSchema(props: SchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HousePlus',
    url: 'https://www.houseplus-ch.com',
    logo: 'https://www.houseplus-ch.com/logo.png',
    description: props.description,
    sameAs: [
      'https://www.facebook.com/houseplus',
      'https://www.linkedin.com/company/houseplus',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+8615578119543',
      email: 'jack@houseplus-ch.com',
      url: 'https://wa.me/8615578119543',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CH',
    },
  };
}

export function generateProductSchema(props: SchemaProps & { price?: string; currency?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.title,
    description: props.description,
    url: props.url,
    image: props.image || 'https://www.houseplus-ch.com/default-product.jpg',
    brand: {
      '@type': 'Brand',
      name: 'HousePlus',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'HousePlus Group',
    },
    ...(props.price && props.currency && {
      offers: {
        '@type': 'Offer',
        price: props.price,
        priceCurrency: props.currency,
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

export function generateArticleSchema(props: SchemaProps & { datePublished?: string; dateModified?: string; author?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    url: props.url,
    image: props.image,
    datePublished: props.datePublished || new Date().toISOString(),
    dateModified: props.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: props.author || 'HousePlus',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HousePlus',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.houseplus-ch.com/logo.png',
      },
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

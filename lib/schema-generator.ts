interface SchemaOptions {
  title: string;
  description: string;
  url: string;
  lang: string;
  type: string;
}

export function generateOrganizationSchema(options: SchemaOptions) {
  const { title, description, url, type } = options;
  
  return {
    '@context': 'https://schema.org',
    '@type': type === 'Organization' ? 'Organization' : 'WebSite',
    name: title,
    description,
    url: url,
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqItems: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
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

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

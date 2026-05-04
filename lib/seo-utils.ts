import { Metadata } from 'next';

interface SEOMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  lang: string;
  type?: string;
}

export function generateMetadata(options: SEOMetadataOptions): Metadata {
  const { title, description, keywords, url, lang } = options;
  
  return {
    title,
    description,
    keywords: keywords?.join(', '),
    metadataBase: new URL('https://www.houseplus-ch.com'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: `https://www.houseplus-ch.com${url}`,
      locale: lang,
      type: 'website',
    },
  };
}

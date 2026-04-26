import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'GoogleBot',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.houseplus-ch.com/sitemap.xml',
    host: 'https://www.houseplus-ch.com',
  };
}

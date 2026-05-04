import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.houseplus-ch.com';
  const bareDomain = 'https://houseplus-ch.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
    ],
    // Primary sitemap (Next.js dynamic sitemap from app/sitemap.ts)
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    // Also declare bare domain sitemap for broader coverage
    // (robots.txt spec supports multiple Sitemap lines)
    // The following will be rendered as additional Sitemap: lines
    host: baseUrl,
  };
}

import { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.houseplus-ch.com';

  // 为每种语言生成 URL
  const langUrls = i18n.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        de: `${baseUrl}/de`,
        fr: `${baseUrl}/fr`,
        ar: `${baseUrl}/ar`,
        'x-default': `${baseUrl}/en`,
      },
    },
  }));

  // 为其他页面生成 URL（如果需要）
  const pageUrls: MetadataRoute.Sitemap = [
    // 可以添加其他页面的 URL，例如：
    // { url: `${baseUrl}/en/about`, lastModified: new Date() },
  ];

  return [
    ...langUrls,
    ...pageUrls,
  ];
}


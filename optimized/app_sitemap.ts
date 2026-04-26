import { MetadataRoute } from 'next';
import { locales } from '../../i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.houseplus-ch.com';

  // 为每种语言生成 URL
  const langUrls = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
      'x-default': `${baseUrl}/${defaultLocale}`,
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


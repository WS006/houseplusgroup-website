import productLocalizations from './products.json';
import articleLocalizations from './articles.json';
import regionCopy from './regions.json';

export type ContentLocale = 'en' | 'es' | 'de' | 'fr' | 'ar';

export function getLocalizedProduct<T extends object>(slug: string, locale: string, fallback: T): T {
  if (locale === 'en') return fallback;
  const localized = (productLocalizations as unknown as Record<string, Record<string, Partial<T>>>)[slug]?.[locale];
  return localized ? ({ ...fallback, ...localized } as T) : fallback;
}

export function getLocalizedArticle<T extends object>(slug: string, locale: string, fallback: T): T {
  if (locale === 'en') return fallback;
  const localized = (articleLocalizations as unknown as Record<string, Record<string, Partial<T>>>)[slug]?.[locale];
  return localized ? ({ ...fallback, ...localized } as T) : fallback;
}

export function getRegionCopy(locale: string): Record<string, string> {
  return (regionCopy as Record<string, Record<string, string>>)[locale] || (regionCopy as Record<string, Record<string, string>>).en || {};
}

export function translateRegionTemplate(value: string, region: string): string {
  return value.replaceAll('{region}', region);
}

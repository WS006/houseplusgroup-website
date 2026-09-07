import { locales, type Locale } from '@/lib/i18n-config';

export const CONTENT_TAGS = {
  homepage: (lang: Locale) => `homepage:${lang}`,
  product: (id: string) => `product:${id}`,
  productSlug: (lang: Locale, slug: string) => `product-slug:${lang}:${slug}`,
  category: (lang: Locale, category: string) => `category:${lang}:${category}`,
  article: (lang: Locale, slug: string) => `article:${lang}:${slug}`,
  navigation: (lang: Locale) => `site-navigation:${lang}`,
} as const;

export type RevalidationEvent =
  | { type: 'product.published' | 'product.updated'; id: string; slug: string; category?: string }
  | { type: 'article.published' | 'article.updated'; slug: string }
  | { type: 'category.updated'; category: string }
  | { type: 'homepage.updated' }
  | { type: 'navigation.updated' };

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function localizedPath(lang: Locale, path: string) {
  return `/${lang}${path}`.replace(/\/+/g, '/');
}

export function pathsForEvent(event: RevalidationEvent): string[] {
  const paths = new Set<string>();
  const addPublicLanguagePaths = (path: string) => {
    for (const lang of locales) paths.add(localizedPath(lang, path));
  };

  switch (event.type) {
    case 'product.published':
    case 'product.updated':
      addPublicLanguagePaths(`/products/${event.slug}/`);
      addPublicLanguagePaths('/products/');
      addPublicLanguagePaths('/');
      break;
    case 'article.published':
    case 'article.updated':
      addPublicLanguagePaths(`/news/${event.slug}/`);
      addPublicLanguagePaths('/news/');
      addPublicLanguagePaths('/');
      break;
    case 'category.updated':
      addPublicLanguagePaths('/products/');
      addPublicLanguagePaths('/');
      break;
    case 'homepage.updated':
      addPublicLanguagePaths('/');
      break;
    case 'navigation.updated':
      addPublicLanguagePaths('/');
      addPublicLanguagePaths('/products/');
      addPublicLanguagePaths('/news/');
      break;
  }

  return [...paths];
}

export function tagsForEvent(event: RevalidationEvent): string[] {
  const tags = new Set<string>();
  tags.add('story-index');
  for (const lang of locales) tags.add(CONTENT_TAGS.homepage(lang));

  switch (event.type) {
    case 'product.published':
    case 'product.updated':
      tags.add(CONTENT_TAGS.product(event.id));
      for (const lang of locales) {
        tags.add(CONTENT_TAGS.productSlug(lang, event.slug));
        tags.add(`story:${lang}:products/${event.slug}`);
        if (event.category) tags.add(CONTENT_TAGS.category(lang, event.category));
      }
      break;
    case 'article.published':
    case 'article.updated':
      for (const lang of locales) {
        tags.add(CONTENT_TAGS.article(lang, event.slug));
        tags.add(`story:${lang}:news/${event.slug}`);
      }
      break;
    case 'category.updated':
      for (const lang of locales) tags.add(CONTENT_TAGS.category(lang, event.category));
      break;
    case 'navigation.updated':
      for (const lang of locales) tags.add(CONTENT_TAGS.navigation(lang));
      break;
    case 'homepage.updated':
      break;
  }

  return [...tags];
}

export function isRevalidationEvent(value: unknown): value is RevalidationEvent {
  if (!value || typeof value !== 'object') return false;
  const event = value as Record<string, unknown>;
  if (typeof event.type !== 'string') return false;
  if (event.type === 'product.published' || event.type === 'product.updated') {
    return typeof event.id === 'string' && typeof event.slug === 'string';
  }
  if (event.type === 'article.published' || event.type === 'article.updated') {
    return typeof event.slug === 'string';
  }
  if (event.type === 'category.updated') return typeof event.category === 'string';
  return event.type === 'homepage.updated' || event.type === 'navigation.updated';
}

export function isValidEventLocale(value: string): value is Locale {
  return isLocale(value);
}

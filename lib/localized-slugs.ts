/**
 * P2-9: localized URL slugs.
 *
 * Every public route used to share one English slug across all five locales.
 * This map is the single source of truth for the localized public slug; the
 * English folder names in app/(site)/[lang]/... remain the INTERNAL routing
 * keys (see the rewrite/redirect pair in next.config.js).
 *
 * The raw map lives in localized-slugs.json so next.config.js (plain JS) and
 * this module (TS) share exactly one definition.
 *
 * Rules:
 *  - A locale whose slug equals the English one needs no redirect/rewrite.
 *  - All slugs are lowercase ASCII. Arabic is transliterated rather than
 *    written in Arabic script: Next.js does not match non-ASCII `source`
 *    values in rewrites, so Arabic-script slugs return 404 even though the
 *    redirect points at them correctly. Transliterated slugs stay
 *    locale-specific while remaining encoding-safe.
 */
import rawSlugs from './localized-slugs.json';

export type Locale = 'en' | 'es' | 'de' | 'fr' | 'ar';

export const locales: Locale[] = ['en', 'es', 'de', 'fr', 'ar'];

/** English slug -> localized slug per locale. */
export const STATIC_SLUG_TRANSLATIONS = rawSlugs as Record<string, Record<Locale, string>>;

/** Translate one path segment. Falls back to the English segment. */
export function localizeSlug(segment: string, lang: string): string {
  if (lang === 'en') return segment;
  const entry = STATIC_SLUG_TRANSLATIONS[segment];
  if (!entry) return segment;
  return entry[lang as Locale] || segment;
}

/**
 * Localize a path that does NOT include the language prefix.
 * e.g. localizePath('products/solar-panel-500w', 'es') -> 'productos/solar-panel-500w'
 */
export function localizePath(pathWithoutLang: string, lang: string): string {
  if (lang === 'en') return pathWithoutLang;
  const segments = pathWithoutLang.split('/').filter(Boolean);
  if (segments.length === 0) return pathWithoutLang;
  return segments.map((segment) => localizeSlug(segment, lang)).join('/');
}

/** Reverse: localized public segment -> English routing key. */
export function englishSlug(segment: string, lang: string): string {
  if (lang === 'en') return segment;
  for (const [en, byLocale] of Object.entries(STATIC_SLUG_TRANSLATIONS)) {
    if (byLocale[lang as Locale] === segment) return en;
  }
  return segment;
}

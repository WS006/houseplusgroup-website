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
import rawEntrySlugs from './localized-entry-slugs.json';

export type Locale = 'en' | 'es' | 'de' | 'fr' | 'ar';

export const locales: Locale[] = ['en', 'es', 'de', 'fr', 'ar'];

/** English slug -> localized slug per locale. */
export const STATIC_SLUG_TRANSLATIONS = rawSlugs as Record<string, Record<Locale, string>>;

/** English section -> English entry slug -> localized entry slug per locale. */
// Entry slugs only carry translations for non-English locales (the English slug
// is the key itself), so the inner map is keyed by plain string.
export const ENTRY_SLUG_TRANSLATIONS = rawEntrySlugs as Record<
  string,
  Record<string, Record<string, string>>
>;

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

  // Entry maps are keyed by the ENGLISH section name, so resolve the map before
  // the section segment itself is translated.
  const entryMap = ENTRY_SLUG_TRANSLATIONS[segments[0]];

  return segments
    .map((segment, index) => {
      if (index === 1 && entryMap) {
        const entry = entryMap[segment];
        if (entry?.[lang as Locale]) return entry[lang as Locale];
      }
      return localizeSlug(segment, lang);
    })
    .join('/');
}

/**
 * Build a localized internal href for a link.
 * e.g. localizedHref('es', '/products') -> '/es/productos'
 *
 * Internal links must use the localized form, otherwise every navigation click
 * bounces through a 308 before reaching the real page.
 */
export function localizedHref(lang: string, path?: string): string {
  const raw = (path || '').trim();
  if (!raw) return `/${lang}`;
  // Only the path portion is localizable; keep any #anchor / ?query intact
  // (nav entries use '/products#solar', and the whole string would otherwise
  // fail the slug lookup and leak the English slug).
  const match = raw.match(/^([^#?]*)([\s\S]*)$/);
  const clean = (match?.[1] || '').replace(/^\/+|\/+$/g, '');
  const suffix = match?.[2] || '';
  return clean ? `/${lang}/${localizePath(clean, lang)}${suffix}` : `/${lang}${suffix}`;
}

/**
 * Convert a path from one locale's form into another's.
 *
 * The language switcher needs this: under the rewrite the path it sees may be
 * either the English internal path or the current locale's localized path, so
 * normalise every segment back to its English key first, then localise forward
 * into the target locale.
 */
export function relocalizePath(path: string, fromLang: string, toLang: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return path;

  const englishSegments = segments.map((segment, index) => {
    if (index === 1) {
      const enSection = englishSlug(segments[0], fromLang);
      const items = ENTRY_SLUG_TRANSLATIONS[enSection];
      if (items) {
        for (const [enKey, byLocale] of Object.entries(items)) {
          if (byLocale[fromLang] === segment) return enKey;
        }
      }
    }
    return englishSlug(segment, fromLang);
  });

  return localizePath(englishSegments.join('/'), toLang);
}

/** Reverse: localized public segment -> English routing key. */
export function englishSlug(segment: string, lang: string): string {
  if (lang === 'en') return segment;
  for (const [en, byLocale] of Object.entries(STATIC_SLUG_TRANSLATIONS)) {
    if (byLocale[lang as Locale] === segment) return en;
  }
  return segment;
}

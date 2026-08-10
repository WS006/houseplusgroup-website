/**
 * HousePlus Internationalization Configuration
 * Updated: 2026-07-28
 *
 * Supports 5 languages targeting key export markets:
 * - en: English (default) — global
 * - es: Spanish — Latin America & Spain
 * - de: German — DACH region
 * - fr: French — France & Francophone Africa
 * - ar: Arabic — MENA region
 */

module.exports = {
  // Default locale used when no locale prefix is in the URL
  defaultLocale: 'en',

  // All supported locales
  locales: ['en', 'es', 'de', 'fr', 'ar'],

  // Locale display names (for language switcher)
  localeNames: {
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    ar: 'العربية',
  },

  // Locale-specific hreflang region targeting
  // Format: locale -> hreflang code (locale-Region)
  localeHreflang: {
    en: 'en-US',  // English (United States) — also serves as x-default
    es: 'es-ES',  // Spanish (Spain) — also matches Latin America
    de: 'de-DE',  // German (Germany)
    fr: 'fr-FR',  // French (France)
    ar: 'ar-SA',  // Arabic (Saudi Arabia) — also matches MENA
  },

  // Detect locale from Accept-Language header
  localeDetection: true,

  // Domains for locale-specific URLs (optional, for future expansion)
  // If set, Next.js will use locale-specific domains instead of path prefixes
  // domains: [
  //   { domain: 'houseplus-ch.com', defaultLocale: 'en' },
  //   { domain: 'houseplus-es.com', defaultLocale: 'es' },
  //   { domain: 'houseplus-de.com', defaultLocale: 'de' },
  // ],
};

export const locales = ['en', 'es', 'de', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as any);
}

export const locales = ['en', 'es', 'de', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
};

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as any);
}

export function getLocaleConfig(lang: Locale): LocaleConfig {
  return localeConfigs[lang];
}

export function getLocaleDirection(lang: Locale): 'ltr' | 'rtl' {
  return localeConfigs[lang].direction;
}

export function getAllLocales(): LocaleConfig[] {
  return locales.map((lang) => localeConfigs[lang]);
}

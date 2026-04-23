/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'es', 'de', 'fr', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};
module.exports = nextConfig;

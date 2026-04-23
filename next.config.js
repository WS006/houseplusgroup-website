/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'es', 'de', 'fr', 'ar'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;

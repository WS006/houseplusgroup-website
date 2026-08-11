import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HousePlus - Global Wholesale Solar & Home Appliances Manufacturer',
    short_name: 'HousePlus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics. Global wholesale and OEM/ODM services.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1d4ed8',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['business', 'shopping', 'productivity'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

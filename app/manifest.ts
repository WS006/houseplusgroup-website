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
        src: 'https://images.houseplus-ch.com/media/houseplus-group-brand-icon/',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: 'https://images.houseplus-ch.com/media/houseplus-apple-touch-icon/',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'https://images.houseplus-ch.com/media/houseplus-android-chrome-192x192/',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://images.houseplus-ch.com/media/houseplus-android-chrome-512x512/',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

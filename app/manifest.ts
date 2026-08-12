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
        src: 'https://images.houseplus-ch.com/media/44b1ac39-b07d-49b8-bb55-f9e7266893a3',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: 'https://images.houseplus-ch.com/media/b159a3a6-85d6-490f-8bbb-a753cf220c8c',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'https://images.houseplus-ch.com/media/c0f1967e-254f-4779-8127-5aa0d4f9a1e1',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://images.houseplus-ch.com/media/4c25ace1-b0fb-48c9-ae3e-3ac3381f78c8',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

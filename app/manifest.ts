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
        type: 'image/webp',
      },
      {
        src: 'https://images.houseplus-ch.com/media/houseplus-apple-touch-icon/',
        sizes: '180x180',
        type: 'image/webp',
      },
      {
        // houseplus-android-chrome-192x192 / -512x512 currently return 404 from
        // the media CDN, which fails Chrome's installability check (it needs at
        // least one icon >= 192px). Fall back to the live 709x709 brand logo so
        // the PWA stays installable until the dedicated icons are restored.
        src: 'https://images.houseplus-ch.com/media/houseplus-group-logo/',
        sizes: '709x709',
        type: 'image/webp',
        purpose: 'maskable',
      },
    ],
  };
}

// P2-9: localized public slugs. Shared with lib/localized-slugs.ts so the
// public URL space and the metadata/canonical output stay in sync.
const localizedSlugs = require('./lib/localized-slugs.json');
const LOCALIZED_LOCALES = ['es', 'de', 'fr', 'ar'];

/**
 * Public localized URL -> internal English route.
 * e.g. /es/productos/solar-panel-500w -> /es/products/solar-panel-500w
 */
function localizedRewrites() {
  const out = [];
  for (const lang of LOCALIZED_LOCALES) {
    for (const [enSlug, byLocale] of Object.entries(localizedSlugs)) {
      const localized = byLocale[lang];
      if (!localized || localized === enSlug) continue;
      out.push({ source: `/${lang}/${localized}`, destination: `/${lang}/${enSlug}` });
      out.push({
        source: `/${lang}/${localized}/:path*`,
        destination: `/${lang}/${enSlug}/:path*`,
      });
      // Non-ASCII slugs (Arabic) arrive percent-encoded. Next matches the raw
      // path, so also register the encoded form or the rewrite never fires and
      // the localized URL 404s.
      const encoded = encodeURIComponent(localized);
      if (encoded !== localized) {
        out.push({ source: `/${lang}/${encoded}`, destination: `/${lang}/${enSlug}` });
        out.push({
          source: `/${lang}/${encoded}/:path*`,
          destination: `/${lang}/${enSlug}/:path*`,
        });
      }
    }
  }
  return out;
}

/**
 * Legacy English slug -> localized public URL (permanent, preserves equity).
 * e.g. /es/products -> /es/productos
 */
function localizedRedirects() {
  const out = [];
  for (const lang of LOCALIZED_LOCALES) {
    for (const [enSlug, byLocale] of Object.entries(localizedSlugs)) {
      const localized = byLocale[lang];
      if (!localized || localized === enSlug) continue;
      // Destination must carry the trailing slash: the site runs with
      // trailingSlash:true, so pointing at /de/ueber-uns (no slash) made this a
      // 2-hop chain - 308 to the slashless URL, then another 308 to add the
      // slash. Emitting the canonical form lands on 200 in one hop.
      out.push({
        source: `/${lang}/${enSlug}`,
        destination: `/${lang}/${localized}/`,
        permanent: true,
      });
      out.push({
        source: `/${lang}/${enSlug}/:path*`,
        destination: `/${lang}/${localized}/:path*`,
        permanent: true,
      });
    }
  }
  return out;
}

// Entry-level slugs (products / regions) are per-item and cannot be handled by a
// wildcard: the internal route resolves the item by its ENGLISH key, so each
// localized entry needs an explicit mapping.
const entrySlugs = require('./lib/localized-entry-slugs.json');
const ENTRY_SECTIONS = {
  products: entrySlugs.products,
  news: entrySlugs.news,
  regions: entrySlugs.regions,
};

/**
 * The historical /regions/eu alias needs a fully-localized destination.
 *
 * Handled by a generated rule rather than the middleware because the middleware
 * only knew the English section name, so /de/regions/eu/ walked a 5-hop chain:
 *   /de/regions/eu/ -> /de/regionen/eu -> /de/regionen/eu/
 *   -> /de/regions/europe -> /de/regions/europe/ -> /de/regionen/europa/
 * Emitting the final localized URL resolves it in a single 301.
 */
function europeAliasRedirects() {
  const out = [];
  const europeEntries = (entrySlugs.regions && entrySlugs.regions.europe) || {};
  for (const lang of LOCALIZED_LOCALES) {
    const section = localizedSlugs.regions && localizedSlugs.regions[lang];
    const entry = europeEntries[lang];
    if (!section || !entry) continue;
    if (section === 'regions' && entry === 'europe') continue; // nothing to translate
    for (const legacy of ['eu', 'europe']) {
      out.push({
        source: `/${lang}/regions/${legacy}`,
        destination: `/${lang}/${section}/${entry}/`,
        permanent: true,
      });
    }
  }
  return out;
}

/**
 * Localized entry URL -> internal English route.
 * e.g. /es/productos/panel-solar-500w -> /es/products/solar-panel-500w
 * MUST be registered before the section-level wildcard rewrites.
 */
function entryRewrites() {
  const out = [];
  for (const lang of LOCALIZED_LOCALES) {
    for (const [section, entries] of Object.entries(ENTRY_SECTIONS)) {
      const locSection = localizedSlugs[section] && localizedSlugs[section][lang];
      if (!locSection) continue;
      for (const [enEntry, byLocale] of Object.entries(entries)) {
        const locEntry = byLocale[lang];
        if (!locEntry || locEntry === enEntry) continue;
        out.push({
          source: `/${lang}/${locSection}/${locEntry}`,
          destination: `/${lang}/${section}/${enEntry}`,
        });
      }
    }
  }
  return out;
}

/**
 * Legacy English entry URL -> localized entry URL.
 * MUST precede the section-level wildcard, otherwise '/:path*' would rewrite
 * the entry slug to the English one and lose the per-item translation.
 */
function entryRedirects() {
  const out = [];
  for (const lang of LOCALIZED_LOCALES) {
    for (const [section, entries] of Object.entries(ENTRY_SECTIONS)) {
      const locSection = localizedSlugs[section] && localizedSlugs[section][lang];
      if (!locSection) continue;
      for (const [enEntry, byLocale] of Object.entries(entries)) {
        const locEntry = byLocale[lang];
        if (!locEntry || locEntry === enEntry) continue;
        out.push({
          source: `/${lang}/${section}/${enEntry}`,
          // Trailing slash for the same reason as localizedRedirects(): without
          // it this resolves to the slashless URL and then needs a second 308.
          destination: `/${lang}/${locSection}/${locEntry}/`,
          permanent: true,
        });
      }
    }
  }
  return out;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  // P0-1: ensure Googlebot and AI/generative crawlers receive the fully-rendered
  // (non-streamed) HTML with metadata in <head> rather than streamed body
  // metadata they may miss. This list covers the major search engines plus the
  // AI crawlers already allow-listed in app/robots.txt/route.ts.
  experimental: {
    htmlLimitedBots:
      /Googlebot|Google-Extended|GoogleOther|Bingbot|Slurp|DuckDuckBot|YandexBot|baiduspider|GPTBot|ChatGPT-User|OAI-SearchBot|CCBot|anthropic-ai|ClaudeBot|Claude-Web|Claude-SearchBot|Claude-User|PerplexityBot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Discordbot|Applebot|Bytespider|DataForSeoBot|PetalBot|SemrushBot|AhrefsBot|MJ12bot|DotBot/i,
  },
    images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'a.storyblok.com', pathname: '/f/**' },
      { protocol: 'https', hostname: '*.storyblok.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.houseplus-ch.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
    dangerouslyAllowSVG: true,
    // Product and editorial images are public visual assets. Keep optimized
    // responses viewable in a new tab rather than forcing an attachment download.
    contentDispositionType: 'inline',
  },
  compress: true,
  // Keep browser source maps available for production error diagnostics.
  // This project ships no server secrets to client bundles.
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  async rewrites() {
    // P2-9: entry-specific rewrites first, then the section-level wildcards.
    return [...entryRewrites(), ...localizedRewrites()];
  },
  async redirects() {
    return [
      // P1-6 / P1-10: normalize the bare/apex host to www with a permanent 301.
      // Vercel's edge historically issued this as a 307; handling it in code
      // guarantees a 301 and keeps the canonical-host signal under our control.
      // This covers asset/feed paths the middleware matcher excludes.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'houseplus-ch.com' }],
        destination: 'https://www.houseplus-ch.com/:path*',
        permanent: true,
      },
      // Consolidate historical page aliases that were previously crawlable with
      // generic or duplicated titles. Keep specific aliases before the generic
      // /products/:slug rule so they resolve to their real canonical pages.
      {
        source: '/products',
        destination: '/en/products/',
        permanent: true,
      },
      {
        source: '/products/products',
        destination: '/en/products/',
        permanent: true,
      },
      {
        source: '/products/factory',
        destination: '/en/factory/',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/en/contact/',
        permanent: true,
      },
      {
        source: '/about-us/contact',
        destination: '/en/contact/',
        permanent: true,
      },
      {
        source: '/about-us/team',
        destination: '/en/team/',
        permanent: true,
      },
      {
        source: '/regions/careers',
        destination: '/en/careers/',
        permanent: true,
      },
      {
        source: '/news/factory',
        destination: '/en/factory/',
        permanent: true,
      },
      {
        source: '/news/2026-appliances-market-update',
        destination: '/en/news/2026-appliances-market-update/',
        permanent: true,
      },
      {
        source: '/products/:slug',
        destination: '/en/products/:slug/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/en/about-us/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact/',
        permanent: true,
      },
      // P2-9: legacy English slugs 301 to their localized equivalents so
      // existing links and rankings carry over. Appended last so the specific
      // aliases above keep priority.
      // Must precede the generic rules: it resolves the legacy Europe alias to
      // its final localized URL in one hop instead of a 5-hop chain.
      ...europeAliasRedirects(),
      ...entryRedirects(),
      ...localizedRedirects(),
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https:; object-src 'none'",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      // Add cache headers for key file
      {
        source: '/084fadfd7e4a435b942858f905846430.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;

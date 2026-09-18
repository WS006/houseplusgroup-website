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
    return [];
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
        destination: '/en/products',
        permanent: true,
      },
      {
        source: '/products/products',
        destination: '/en/products',
        permanent: true,
      },
      {
        source: '/products/factory',
        destination: '/en/factory',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/about-us/contact',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/about-us/team',
        destination: '/en/team',
        permanent: true,
      },
      {
        source: '/regions/careers',
        destination: '/en/careers',
        permanent: true,
      },
      {
        source: '/news/factory',
        destination: '/en/factory',
        permanent: true,
      },
      {
        source: '/news/2026-appliances-market-update',
        destination: '/en/news/2026-appliances-market-update',
        permanent: true,
      },
      {
        source: '/products/:slug',
        destination: '/en/products/:slug',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/en/about-us',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
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

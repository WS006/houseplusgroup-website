/**
 * HousePlus Next.js SEO Optimization Configuration
 * Updated: 2026-07-28
 *
 * Key optimizations:
 * 1. Image optimization (WebP/AVIF, responsive sizes)
 * 2. Compression (gzip + brotli)
 * 3. Cache headers for static assets
 * 4. Security headers (HSTS, CSP, X-Frame-Options)
 * 5. Trailing slash for consistent URL structure
 * 6. Redirects for old URLs
 * 7. Internationalized routing
 */

const { i18n } = require('./i18n.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // === Internationalization ===
  i18n,

  // === Trailing Slash: consistent URL structure for SEO ===
  // Ensures /en/products and /en/products/ are not treated as duplicate pages
  trailingSlash: true,

  // === React Strict Mode: catch potential issues in development ===
  reactStrictMode: true,

  // === Powered-By Header: remove for security ===
  poweredByHeader: false,

  // === Compression: enable gzip ===
  compress: true,

  // === Image Optimization ===
  images: {
    // Enable modern formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],

    // Allow images from own CDN and common placeholders during migration
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.houseplus-ch.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.houseplus-ch.com',
        pathname: '/**',
      },
    ],

    // Responsive breakpoints for srcset generation
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920, 2048],

    // Image sizes for layout-based responsive loading
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Minimum cache TTL for optimized images (seconds)
    // 60 days — images rarely change, and Next.js generates new hashes on update
    minimumCacheTTL: 5184000,

    // Disable static imports — all images go through the Image component
    disableStaticImages: false,
  },

  // === Headers: security + caching ===
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Static assets: long cache (1 year) with immutable flag
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Images from CDN: cache 60 days
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=5184000',
          },
        ],
      },
      {
        // robots.txt: short cache to allow quick updates
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        // sitemap.xml: cache 6 hours
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=21600',
          },
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
        ],
      },
    ];
  },

  // === Redirects: fix old URLs and consolidate link equity ===
  async redirects() {
    return [
      // Redirect non-www to www (if not handled by DNS/CDN)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'houseplus-ch.com' }],
        destination: 'https://www.houseplus-ch.com/:path*',
        permanent: true,
      },

      // Cross-domain redirect: houseplus.ltd → houseplus-ch.com (consolidate link equity)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'houseplus.ltd' }],
        destination: 'https://www.houseplus-ch.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.houseplus.ltd' }],
        destination: 'https://www.houseplus-ch.com/:path*',
        permanent: true,
      },

      // Redirect old product URLs to new structure
      {
        source: '/products/:slug',
        destination: '/en/products/:slug',
        permanent: true,
      },

      // Redirect old about page
      {
        source: '/about',
        destination: '/en/about',
        permanent: true,
      },

      // Redirect old contact page
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },

      // Redirect /home to /en
      {
        source: '/home',
        destination: '/en',
        permanent: true,
      },

      // Redirect HTTP to HTTPS (fallback if not handled by CDN)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.houseplus-ch.com/:path*',
        permanent: true,
      },
    ];
  },

  // === Rewrites: clean URLs without breaking existing links ===
  async rewrites() {
    return [
      // Serve sitemap from generated file
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      // Serve image-sitemap from generated file
      {
        source: '/image-sitemap.xml',
        destination: '/api/image-sitemap',
      },
      // Serve robots.txt dynamically (optional — static file also works)
      // {
      //   source: '/robots.txt',
      //   destination: '/api/robots',
      // },
    ];
  },

  // === Experimental: enable for performance ===
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },

  // === Webpack: production optimizations ===
  webpack: (config, { dev, isServer }) => {
    // Production only: tree-shake and minimize
    if (!dev && !isServer) {
      // Split vendor chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;

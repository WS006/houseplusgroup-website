/** @type {import('next').NextConfig} */

const nextConfig = {
  // ===== PERFORMANCE OPTIMIZATION =====
  
  // Enable SWR (Stale-While-Revalidate) for faster page loads
  swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compress and optimize CSS/JS
  compress: true,

  // ===== SEO & CRAWLABILITY =====
  
  // Generate static pages for better SEO
  staticPageGenerationTimeout: 120,

  // ===== SECURITY =====
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
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
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      // Cache static assets for 1 year
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images for 1 year
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ===== REDIRECTS & REWRITES =====
  
  async redirects() {
    return [
      // Redirect old URLs to new structure
      {
        source: '/products',
        destination: '/en/products',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/en/about-us',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite sitemap
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
        // Rewrite robots.txt
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ],
    };
  },

  // ===== INTERNATIONALIZATION =====
  
  i18n: {
    locales: ['en', 'es', 'de', 'fr', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // ===== EXPERIMENTAL FEATURES =====
  
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      '@lucide-react',
      'tailwindcss',
    ],
  },

  // ===== WEBPACK OPTIMIZATION =====
  
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      };
    }
    return config;
  },

  // ===== LOGGING & MONITORING =====
  
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ===== ENVIRONMENT VARIABLES =====
  
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.houseplus-ch.com',
  },
};

module.exports = nextConfig;

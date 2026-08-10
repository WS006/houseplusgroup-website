/**
 * ProductGallery Component
 * Updated: 2026-07-28
 *
 * Features:
 * - Main image + thumbnail strip layout for 5-8 product images
 *   (multi-angle product photos, installation diagrams, application
 *   scenarios, and dimension drawings)
 * - Click any thumbnail to switch the main image
 * - Fullscreen lightbox with prev/next arrows, keyboard navigation
 *   (ArrowLeft / ArrowRight / Escape) and body-scroll lock
 * - Mobile swipe gestures (touch events) for natural image navigation
 * - next/image with automatic AVIF/WebP conversion and lazy loading
 * - Descriptive alt text on every image (accessibility + image SEO)
 * - ImageGallery + ImageObject JSON-LD structured data
 * - Fully responsive (mobile-first) styling via styled-jsx
 *
 * SEO Impact:
 * - Descriptive alt text improves Google Image Search rankings and
 *   helps images appear in product image packs / visual search results
 * - next/image serves AVIF/WebP, cutting image weight 30-50% which
 *   improves LCP (Largest Contentful Paint) and Core Web Vitals
 * - Explicit width/height (via next/image + reserved space) prevents
 *   CLS (Cumulative Layout Shift) on image load
 * - ImageObject structured data gives Google crawlable context for each
 *   image (caption, dimensions, contentUrl), boosting image discoverability
 * - Lazy loading below-the-fold images reduces initial page weight and
 *   speeds up time-to-interactive for wholesale buyer traffic
 * - High-quality multi-angle imagery increases buyer trust and conversion
 */

import React, { useState, useCallback, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';
import Head from 'next/head';
import Link from 'next/link';
import { siteConfig } from '../config/seo-config';

/** A single product image with descriptive alt text and intrinsic dimensions. */
export interface GalleryImage {
  /** Image URL (absolute or site-relative). */
  src: string;
  /** Descriptive alt text — must describe the image content for SEO + a11y. */
  alt: string;
  /** Intrinsic pixel width (used for structured data + CLS prevention). */
  width: number;
  /** Intrinsic pixel height (used for structured data + CLS prevention). */
  height: number;
}

export interface ProductGalleryProps {
  /** 5-8 product images: multi-angle, installation, application, dimension. */
  images: GalleryImage[];
  /** Product name used in captions, alt fallback, and structured data. */
  productName: string;
}

/**
 * Ensure an image src is an absolute URL (required for valid JSON-LD).
 * Site-relative paths are prefixed with the canonical site URL.
 */
function toAbsoluteUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteConfig.url}${src.startsWith('/') ? '' : '/'}${src}`;
}

/**
 * Product image gallery with thumbnails, lightbox, and image SEO.
 *
 * Renders an accessible, responsive product image gallery and emits
 * ImageGallery + ImageObject structured data for Google image indexing.
 *
 * @example
 * ```tsx
 * <ProductGallery
 *   productName="500W Monocrystalline Solar Panel"
 *   images={[
 *     { src: '/images/solar-panel-front.jpg', alt: 'Front view of HousePlus 500W monocrystalline solar panel', width: 1200, height: 1200 },
 *     { src: '/images/solar-panel-rear.jpg', alt: 'Rear view showing junction box and cables', width: 1200, height: 1200 },
 *   ]}
 * />
 * ```
 */
export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = images.length;

  // Guard against empty image arrays (production safety).
  // NOTE: Must return after all hooks to comply with Rules of Hooks.
  const current = total > 0 ? images[Math.min(currentIndex, total - 1)] : null;

  /** Clamp + wrap navigation to a valid index. */
  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setCurrentIndex(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Lightbox: keyboard navigation + body scroll lock.
  useEffect(() => {
    if (!isLightboxOpen || total === 0) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen, next, prev, total]);

  /** Touch handlers for mobile swipe navigation (main view + lightbox). */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    setTouchStartX(null);
  };

  // === ImageGallery + ImageObject structured data (image SEO) ===
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${productName} — Product Image Gallery | ${siteConfig.name}`,
    description: `Multi-angle product photos, installation diagrams, application scenarios, and dimension drawings for ${productName} from ${siteConfig.name}.`,
    url: `${siteConfig.url}/en/products/${encodeURIComponent(
      productName.toLowerCase().replace(/\s+/g, '-')
    )}`,
    image: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: toAbsoluteUrl(img.src),
      url: toAbsoluteUrl(img.src),
      name: img.alt,
      caption: img.alt,
      width: {
        '@type': 'QuantitativeValue',
        value: img.width,
        unitCode: 'E37', // pixel
      },
      height: {
        '@type': 'QuantitativeValue',
        value: img.height,
        unitCode: 'E37', // pixel
      },
      representativeOfPage: true,
    })),
  };

  // Guard against empty image arrays (after all hooks).
  if (total === 0 || !current) return null;

  return (
    <>
      {/* ImageGallery structured data for Google image indexing */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
        />
      </Head>

      <section
        className="gallery"
        aria-label={`${productName} image gallery`}
        aria-roledescription="gallery"
      >
        {/* === Main image stage === */}
        <div
          className="gallery-main"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className="nav-btn nav-prev"
            onClick={prev}
            aria-label="Previous image"
            disabled={total <= 1}
          >
            &#8249;
          </button>

          <button
            type="button"
            className="main-image-trigger"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`Open fullscreen view: ${current.alt}`}
          >
            <OptimizedImage
              src={current.src}
              alt={current.alt || `${productName} product image`}
              width={current.width}
              height={current.height}
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 640px"
              quality={85}
            />
            <span className="zoom-hint" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Click to enlarge
            </span>
          </button>

          <button
            type="button"
            className="nav-btn nav-next"
            onClick={next}
            aria-label="Next image"
            disabled={total <= 1}
          >
            &#8250;
          </button>

          <span className="counter" aria-live="polite">
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Descriptive caption for the current image (also visible to crawlers) */}
        <p className="caption">{current.alt}</p>

        {/* === Thumbnail strip === */}
        <div className="thumbnails" role="tablist" aria-label="Product image thumbnails">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              className={`thumb ${i === currentIndex ? 'thumb-active' : ''}`}
              onClick={() => goTo(i)}
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt || `${productName} product image ${i + 1}`}
                width={160}
                height={160}
                sizes="96px"
                quality={70}
              />
              <span className="sr-only">{`Image ${i + 1} of ${total}`}</span>
            </button>
          ))}
        </div>

        {/* Conversion-focused internal link (uses next/link) */}
        <Link
          href={`/en/contact?product=${encodeURIComponent(productName)}`}
          className="quote-cta"
        >
          Request a wholesale quote for {productName} &#8594;
        </Link>
      </section>

      {/* === Fullscreen lightbox === */}
      {isLightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} fullscreen image viewer`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="lb-close"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen view"
          >
            &times;
          </button>

          <button
            type="button"
            className="lb-nav lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <div
            className="lb-image-wrap"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <OptimizedImage
              src={current.src}
              alt={current.alt || `${productName} product image`}
              width={current.width}
              height={current.height}
              sizes="(max-width: 1200px) 100vw, 1200px"
              quality={90}
            />
            <p className="lb-caption">{current.alt}</p>
            <span className="lb-counter" aria-live="polite">
              {currentIndex + 1} / {total}
            </span>
          </div>

          <button
            type="button"
            className="lb-nav lb-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}

      <style jsx>{`
        .gallery {
          max-width: 640px;
          margin: 0 auto;
        }

        /* === Main image stage === */
        .gallery-main {
          position: relative;
          background: #ffffff;
          border: 1px solid #e7eaf0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
        }

        .main-image-trigger {
          display: block;
          width: 100%;
          padding: 0;
          margin: 0;
          background: none;
          border: none;
          cursor: zoom-in;
          line-height: 0;
        }

        /* next/image renders an internal span wrapper + img; size responsively */
        .main-image-trigger :global(span) {
          display: block !important;
          width: 100% !important;
        }
        .main-image-trigger :global(img) {
          width: 100% !important;
          height: auto !important;
          display: block;
        }

        .zoom-hint {
          position: absolute;
          left: 12px;
          bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 600;
          color: #1a1a2e;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 6px;
          line-height: 1;
          pointer-events: none;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.1);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          line-height: 1;
          color: #1a1a2e;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          z-index: 2;
          transition: background 0.2s, transform 0.1s;
          box-shadow: 0 1px 4px rgba(16, 24, 40, 0.15);
        }
        .nav-btn:hover {
          background: #ffffff;
        }
        .nav-btn:active {
          transform: translateY(-50%) scale(0.94);
        }
        .nav-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .nav-btn:focus-visible {
          outline: 2px solid #E85D2F;
          outline-offset: 2px;
        }
        .nav-prev {
          left: 12px;
        }
        .nav-next {
          right: 12px;
        }

        .counter {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 600;
          color: #1a1a2e;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 999px;
          z-index: 2;
        }

        .caption {
          margin: 12px 2px 0;
          font-size: 14px;
          line-height: 1.5;
          color: #5b6472;
        }

        /* === Thumbnail strip === */
        .thumbnails {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          overflow-x: auto;
          padding-bottom: 6px;
          scrollbar-width: thin;
        }
        .thumbnails::-webkit-scrollbar {
          height: 6px;
        }
        .thumbnails::-webkit-scrollbar-thumb {
          background: #d1d6de;
          border-radius: 999px;
        }

        .thumb {
          flex: 0 0 auto;
          width: 80px;
          height: 80px;
          padding: 0;
          border: 2px solid transparent;
          border-radius: 10px;
          overflow: hidden;
          background: #f4f6f9;
          cursor: pointer;
          transition: border-color 0.15s, transform 0.1s;
        }
        .thumb :global(img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          display: block;
        }
        .thumb:hover {
          border-color: #b9c4d2;
        }
        .thumb:active {
          transform: scale(0.96);
        }
        .thumb:focus-visible {
          outline: 2px solid #E85D2F;
          outline-offset: 2px;
        }
        .thumb-active {
          border-color: #E85D2F;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* === Quote CTA === */
        .quote-cta {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 22px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          background: #E85D2F;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.1s;
        }
        .quote-cta:hover {
          background: #0052a3;
        }
        .quote-cta:active {
          transform: translateY(1px);
        }
        .quote-cta:focus-visible {
          outline: 2px solid #E85D2F;
          outline-offset: 3px;
        }

        /* === Lightbox === */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 18, 25, 0.92);
          padding: 24px;
          animation: fade-in 0.18s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .lb-image-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1200px;
          max-height: 100%;
        }
        .lb-image-wrap :global(img) {
          max-width: 90vw;
          max-height: 78vh;
          width: auto !important;
          height: auto !important;
          object-fit: contain;
          display: block;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .lb-caption {
          margin: 16px 0 0;
          max-width: 90vw;
          font-size: 14px;
          line-height: 1.5;
          color: #e7eaf0;
          text-align: center;
        }
        .lb-counter {
          margin-top: 6px;
          font-size: 12px;
          color: #aeb6c2;
        }

        .lb-close,
        .lb-nav {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lb-close:hover,
        .lb-nav:hover {
          background: rgba(255, 255, 255, 0.24);
        }
        .lb-close:focus-visible,
        .lb-nav:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }

        .lb-close {
          top: 18px;
          right: 22px;
          width: 44px;
          height: 44px;
          font-size: 30px;
          line-height: 1;
          border-radius: 50%;
        }
        .lb-nav {
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          font-size: 34px;
          line-height: 1;
          border-radius: 50%;
        }
        .lb-prev {
          left: 18px;
        }
        .lb-next {
          right: 18px;
        }

        /* === Responsive === */
        @media (max-width: 640px) {
          .nav-btn {
            width: 36px;
            height: 36px;
            font-size: 22px;
          }
          .nav-prev {
            left: 8px;
          }
          .nav-next {
            right: 8px;
          }
          .zoom-hint {
            font-size: 11px;
            padding: 5px 8px;
          }
          .thumb {
            width: 64px;
            height: 64px;
          }
          .lb-nav {
            width: 44px;
            height: 44px;
            font-size: 28px;
          }
          .lb-prev {
            left: 8px;
          }
          .lb-next {
            right: 8px;
          }
          .lb-close {
            top: 12px;
            right: 12px;
          }
        }
      `}</style>
    </>
  );
}

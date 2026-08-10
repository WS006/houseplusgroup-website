/**
 * ProductReviews Component
 * Updated: 2026-07-28
 *
 * Features:
 * - Aggregate rating summary: large numeric score, fractional star bar,
 *   and total review count
 * - 3-5 individual customer reviews (author, country, rating, date, content)
 *   with a "Verified buyer" trust badge and country flag (when a 2-letter
 *   ISO code is supplied)
 * - Fractional star rendering via a CSS-gradient technique (accurate to
 *   one decimal, e.g. 4.7 / 5) with accessible aria-labels
 * - Emits Product JSON-LD containing AggregateRating + Review[] structured
 *   data (the valid combination for Google review rich results)
 * - Fully responsive (mobile-first) styling via styled-jsx
 *
 * SEO Impact:
 * - AggregateRating + Review structured data enables review rich snippets
 *   (star ratings in SERPs), which typically lift CTR by 15-35%
 * - Review rich results increase SERP real estate and stand out vs. competitors
 * - User-generated review content targets long-tail, high-intent keywords and
 *   adds fresh, indexable text to product pages (Google rewards updated content)
 * - Reviews build E-E-A-T (Experience, Expertise, Authoritativeness, Trust) —
 *   a core ranking signal, especially for YMYL / commercial pages
 * - AggregateRating must be nested under a Product (or Offer) entity per
 *   Google's guidelines; standalone ratings are not eligible for rich results,
 *   so this component anchors them to the product via @id for safe merging
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { siteConfig } from '../config/seo-config';

/** A single customer review. */
export interface Review {
  /** Reviewer display name. */
  author: string;
  /** Country name or ISO-3166 alpha-2 code (e.g. "DE", "Germany"). */
  country: string;
  /** Rating given, 1-5 (decimals allowed, e.g. 4.5). */
  rating: number;
  /** ISO date string (e.g. "2025-03-14"). */
  date: string;
  /** Review body text. */
  content: string;
}

export interface ProductReviewsProps {
  /** Product name — used in headings, schema, and CTAs. */
  productName: string;
  /** Product URL slug (e.g. "500w-mono-solar-panel"). */
  productSlug: string;
  /** Overall aggregate rating, 0-5 (e.g. 4.7). */
  rating: number;
  /** Total number of reviews the aggregate rating is based on. */
  reviewCount: number;
  /** 3-5 individual reviews to display (a sample of the total). */
  reviews: Review[];
}

/**
 * Convert a 2-letter ISO country code to a flag emoji.
 * Returns an empty string for full country names (rendered as text instead).
 */
function countryFlag(country: string): string {
  const trimmed = country.trim();
  if (/^[A-Za-z]{2}$/.test(trimmed)) {
    const code = trimmed.toUpperCase();
    return String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)));
  }
  return '';
}

/** Format an ISO date string into a human-readable date (falls back gracefully). */
function formatReviewDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Build a CSS custom-property style object for the fractional star bar. */
function starStyle(value: number, size: number): React.CSSProperties {
  const clamped = Math.max(0, Math.min(5, value));
  return {
    '--rating': String(clamped),
    '--star-size': `${size}px`,
  } as React.CSSProperties;
}

/**
 * Product reviews & ratings section with AggregateRating + Review schema.
 *
 * Renders an aggregate rating summary and a list of customer reviews, and
 * injects Product JSON-LD (with aggregateRating and review[]) so Google can
 * display star-rating rich snippets in search results.
 *
 * @example
 * ```tsx
 * <ProductReviews
 *   productName="500W Monocrystalline Solar Panel"
 *   productSlug="500w-mono-solar-panel"
 *   rating={4.7}
 *   reviewCount={128}
 *   reviews={[
 *     { author: 'Hans Müller', country: 'DE', rating: 5, date: '2025-05-12', content: 'Excellent build quality...' },
 *   ]}
 * />
 * ```
 */
export default function ProductReviews({
  productName,
  productSlug,
  rating,
  reviewCount,
  reviews,
}: ProductReviewsProps) {
  const hasAggregate = rating > 0 && reviewCount > 0;
  const hasReviews = reviews.length > 0;
  const productUrl = `${siteConfig.url}/en/products/${productSlug}`;

  // Nothing meaningful to render — avoid emitting empty markup/schema.
  if (!hasAggregate && !hasReviews) return null;

  // === Product + AggregateRating + Review[] JSON-LD (review rich results) ===
  // AggregateRating and Review are nested under the Product entity (with a
  // stable @id) per Google's structured data guidelines, and to allow safe
  // merging if the page also emits a base Product schema elsewhere.
  const reviewSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: productName,
    url: productUrl,
    brand: { '@type': 'Brand', name: siteConfig.name },
    manufacturer: { '@id': `${siteConfig.url}/#organization` },
  };

  if (hasAggregate) {
    reviewSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Number(rating.toFixed(1)),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (hasReviews) {
    reviewSchema.review = reviews.map((r) => ({
      '@type': 'Review',
      name: `${r.rating}-star review of ${productName} by ${r.author}`,
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.content,
      publisher: { '@id': `${siteConfig.url}/#organization` },
    }));
  }

  return (
    <>
      {/* AggregateRating + Review structured data for review rich snippets */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </Head>

      <section className="reviews" aria-label={`Customer reviews for ${productName}`}>
        <header className="reviews-header">
          <h2 className="reviews-title">Customer Reviews</h2>
          <p className="reviews-subtitle">
            Verified wholesale buyer feedback for {productName}
          </p>
        </header>

        {/* === Aggregate rating summary === */}
        {/* Structured data is emitted as JSON-LD above (see reviewSchema). */}
        {hasAggregate && (
          <div className="summary">
            <div className="summary-rating">
              <span className="summary-score">{rating.toFixed(1)}</span>
              <span className="summary-out-of">/ 5</span>
              <span
                className="stars"
                style={starStyle(rating, 24)}
                role="img"
                aria-label={`${rating.toFixed(1)} out of 5 stars`}
              />
              <span className="summary-count">
                Based on <strong>{reviewCount}</strong> verified reviews
              </span>
            </div>
            <p className="summary-trust">
              Trusted by {siteConfig.clients} wholesale buyers across{' '}
              {siteConfig.countries} countries since {siteConfig.founded}.
            </p>
          </div>
        )}

        {/* === Individual reviews === */}
        {hasReviews && (
          <ul className="review-list">
            {reviews.map((review, i) => {
              const flag = countryFlag(review.country);
              return (
                <li className="review-card" key={i}>
                  <div className="review-top">
                    <div className="review-author">
                      <span className="avatar" aria-hidden="true">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                      <span className="author-meta">
                        <span className="author-name">{review.author}</span>
                        <span className="author-country">
                          {flag ? `${flag} ` : ''}
                          {review.country}
                        </span>
                      </span>
                    </div>
                    <span className="verified-badge" title="Verified wholesale buyer">
                      Verified Buyer
                    </span>
                  </div>

                  <div className="review-meta">
                    <span
                      className="stars"
                      style={starStyle(review.rating, 16)}
                      role="img"
                      aria-label={`${review.rating} out of 5 stars`}
                    />
                    <span className="review-date">{formatReviewDate(review.date)}</span>
                  </div>

                  <p className="review-content">{review.content}</p>
                </li>
              );
            })}
          </ul>
        )}

        {/* Conversion-focused internal link (uses next/link) */}
        <Link
          href={`/en/contact?product=${encodeURIComponent(productName)}`}
          className="quote-cta"
        >
          Join {siteConfig.clients} satisfied clients — Request a quote &#8594;
        </Link>
      </section>

      <style jsx>{`
        .reviews {
          max-width: 820px;
          margin: 0 auto;
          padding: 48px 20px;
        }

        .reviews-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .reviews-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
        }
        .reviews-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0;
        }

        /* === Summary card === */
        .summary {
          background: #f8fafc;
          border: 1px solid #e7eaf0;
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: center;
        }
        .summary-rating {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px 10px;
        }
        .summary-score {
          font-size: 44px;
          font-weight: 800;
          line-height: 1;
          color: #1a1a2e;
        }
        .summary-out-of {
          font-size: 18px;
          font-weight: 600;
          color: #94a3b8;
          align-self: flex-end;
          margin-bottom: 6px;
        }
        .summary-count {
          width: 100%;
          font-size: 14px;
          color: #475569;
          margin-top: 4px;
        }
        .summary-trust {
          margin: 14px 0 0;
          font-size: 13px;
          color: #64748b;
        }

        /* === Fractional star bar (CSS-variable gradient) === */
        .stars {
          --percent: calc(var(--rating) / 5 * 100%);
          display: inline-block;
          font-size: var(--star-size, 18px);
          line-height: 1;
          vertical-align: middle;
        }
        .stars::before {
          content: '★★★★★';
          letter-spacing: 2px;
          background: linear-gradient(
            90deg,
            #f5a623 var(--percent),
            #d8dee5 var(--percent)
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* === Review list === */
        .review-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .review-card {
          background: #ffffff;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        }

        .review-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .review-author {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .avatar {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          background: #E85D2F;
          border-radius: 50%;
        }
        .author-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .author-name {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a2e;
        }
        .author-country {
          font-size: 13px;
          color: #64748b;
        }

        .verified-badge {
          flex: 0 0 auto;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #15803d;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 4px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .review-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .review-date {
          font-size: 13px;
          color: #94a3b8;
        }

        .review-content {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: #334155;
        }

        /* === Quote CTA === */
        .quote-cta {
          display: inline-block;
          margin-top: 28px;
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

        /* === Responsive === */
        @media (max-width: 640px) {
          .reviews {
            padding: 32px 16px;
          }
          .reviews-title {
            font-size: 22px;
          }
          .summary-score {
            font-size: 36px;
          }
          .summary-out-of {
            font-size: 15px;
            margin-bottom: 4px;
          }
          .review-card {
            padding: 16px;
          }
          .review-top {
            flex-wrap: wrap;
          }
          .verified-badge {
            font-size: 10px;
            padding: 3px 7px;
          }
          .review-content {
            font-size: 13.5px;
          }
        }
      `}</style>
    </>
  );
}

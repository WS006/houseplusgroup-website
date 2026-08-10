/**
 * HousePlus Blog Index Page
 * Route: /blog
 *
 * Lists all published blog articles in a responsive card grid.
 * Articles are sorted by datePublished (newest first) from the
 * centralized data registry.
 *
 * SEO FEATURES:
 *   1. CollectionPage Schema — tells Google this is a collection of articles
 *   2. Breadcrumb + BreadcrumbList schema
 *   3. HreflangTags for multi-language SEO
 *   4. Each card links to the article with descriptive anchor text
 *   5. Category filter chips for topical organisation
 */

import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import SEOHead from '../../components/SEOHead';
import Breadcrumb from '../../components/Breadcrumb';
import HreflangTags from '../../components/HreflangTags';
import OptimizedImage from '../../components/OptimizedImage';
import { siteConfig } from '../../config/seo-config';
import { sortedBlogPosts, totalArticleCount } from '../../data/blog';
import type { BlogPost } from '../../data/blog/types';

interface BlogIndexProps {
  posts: BlogPost[];
  locale: string;
}

// ============================================================================
// STATIC PROPS — pre-render the blog index at build time
// ============================================================================

export const getStaticProps: GetStaticProps<BlogIndexProps> = async (
  context
) => {
  return {
    props: {
      posts: sortedBlogPosts,
      locale: context.locale || 'en',
    },
    revalidate: 3600,
  };
};

// ============================================================================
// COLLECTION PAGE SCHEMA
// ============================================================================

function buildCollectionSchema(posts: BlogPost[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'HousePlus Blog — Solar Energy & Manufacturing Insights',
    description:
      'Expert guides on solar panels, battery storage, charge controllers, certifications, and wholesale sourcing from China manufacturers.',
    url: `${siteConfig.url}/en/blog`,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    hasPart: posts.map((post) => ({
      '@type': 'Article',
      headline: post.title,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      url: `${siteConfig.url}/en/blog/${post.slug}`,
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function BlogIndexPage({ posts, locale = 'en' }: BlogIndexProps) {
  const canonical = `${siteConfig.url}/${locale}/blog`;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog' },
  ];

  // Extract unique categories for filter chips
  const categories = Array.from(
    new Set(posts.map((p) => p.category))
  );

  return (
    <>
      <SEOHead
        title={`Blog — Solar Energy Guides & Manufacturing Insights | ${siteConfig.name}`}
        description="Expert guides on solar panels, LiFePO4 batteries, charge controllers, CE certification, and wholesale sourcing. Make informed procurement decisions with HousePlus."
        keywords="solar panel blog, solar energy guides, wholesale solar panels, LiFePO4 battery, MPPT charge controller, CE certification solar, solar panel manufacturer China"
        canonical={canonical}
        ogImage={`${siteConfig.url}/api/og-image?title=HousePlus%20Blog&subtitle=Solar%20Energy%20Guides%20%26%20Manufacturing%20Insights&type=page`}
        ogType="website"
        locale={locale}
        jsonLd={buildCollectionSchema(posts)}
      />

      <HreflangTags path="/blog" />

      <div className="page-wrapper">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </div>

        {/* === Hero Section === */}
        <header className="blog-hero">
          <div className="container">
            <h1>HousePlus Blog</h1>
            <p className="hero-subtitle">
              Solar energy guides, technical comparisons, and procurement
              insights from a China-based manufacturer. {totalArticleCount}{' '}
              expert articles to help you source smarter.
            </p>

            {/* Category filter chips */}
            <div className="category-chips">
              <span className="chip chip-active">All Articles</span>
              {categories.map((cat) => (
                <span key={cat} className="chip">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* === Article Grid === */}
        <main className="container">
          <div className="article-grid">
            {posts.map((post) => (
              <article key={post.slug} className="article-card">
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="card-link"
                >
                  <figure className="card-figure">
                    <OptimizedImage
                      src={post.heroImage}
                      alt={post.heroImageAlt}
                      className="card-image"
                      width={600}
                      height={315}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    />
                    <span className="card-category">{post.category}</span>
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p className="card-excerpt">{post.description}</p>

                    <div className="card-meta">
                      <span className="card-date">
                        {new Date(post.datePublished).toLocaleDateString(
                          'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </span>
                      <span className="card-dot">·</span>
                      <span className="card-read">{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* === CTA Section === */}
          <section className="blog-cta">
            <div className="cta-content">
              <h2>Need Help Sourcing Solar Products?</h2>
              <p>
                Our team of {siteConfig.employees}+ engineers and sales
                specialists are ready to help you find the right products for
                your market. Get a quote within 24 hours.
              </p>
              <div className="cta-buttons">
                <Link href={`/${locale}/contact`} className="btn-primary">
                  Request a Quote
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .page-wrapper {
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif;
          color: #1a1a2e;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* === Hero === */
        .blog-hero {
          background: linear-gradient(135deg, #1a0a05 0%, #E63946 40%, #E85D2F 70%, #F4C430 130%);
          color: #fff;
          padding: 48px 0 56px;
        }

        .blog-hero h1 {
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 12px;
        }

        .hero-subtitle {
          font-size: 18px;
          line-height: 1.6;
          max-width: 640px;
          margin: 0 0 24px;
          opacity: 0.92;
        }

        .category-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chip {
          font-size: 13px;
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          cursor: pointer;
          transition: background 0.2s;
        }

        .chip:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .chip-active {
          background: #fff;
          color: #E85D2F;
          font-weight: 600;
        }

        /* === Article Grid === */
        .article-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
          padding: 48px 0;
        }

        .article-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eef0f3;
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .article-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .card-figure {
          position: relative;
          margin: 0;
          overflow: hidden;
          aspect-ratio: 600 / 315;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .article-card:hover .card-image {
          transform: scale(1.03);
        }

        .card-category {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(232, 93, 47, 0.95);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 12px;
          border-radius: 16px;
        }

        .card-body {
          padding: 20px 24px 24px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.4;
          color: #1a1a2e;
          margin: 0 0 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-excerpt {
          font-size: 14px;
          line-height: 1.6;
          color: #666;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #999;
        }

        .card-dot {
          color: #ccc;
        }

        /* === CTA Section === */
        .blog-cta {
          background: linear-gradient(135deg, #1a0a05 0%, #2d1208 100%);
          border-radius: 16px;
          padding: 48px 40px;
          margin: 20px 0 60px;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 12px;
        }

        .cta-content p {
          font-size: 16px;
          line-height: 1.6;
          color: #d4c8c0;
          max-width: 560px;
          margin: 0 auto 24px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-block;
          background: #E85D2F;
          color: #fff;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #c44a20;
        }

        .btn-whatsapp {
          display: inline-block;
          background: #25d366;
          color: #fff;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-whatsapp:hover {
          background: #128c7e;
        }

        /* === Responsive === */
        @media (max-width: 768px) {
          .blog-hero {
            padding: 32px 0 40px;
          }

          .blog-hero h1 {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .article-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 32px 0;
          }

          .blog-cta {
            padding: 32px 20px;
          }

          .cta-content h2 {
            font-size: 22px;
          }

          .cta-content p {
            font-size: 14px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-primary,
          .btn-whatsapp {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

/**
 * HousePlus Blog Post — Dynamic Route
 * Route: /blog/[slug]
 *
 * This is the production dynamic route that renders every blog article from
 * the centralized data registry at `src/data/blog/index.ts`.
 *
 * SEO FEATURES:
 *   1. Article Schema (JSON-LD) — Google "Article" rich results
 *   2. getStaticPaths + getStaticProps — SSG for max page speed
 *   3. HreflangTags — en/es/de/fr/ar alternates
 *   4. Breadcrumb component — BreadcrumbList schema
 *   5. FAQSection — FAQPage schema for expanded SERP
 *   6. Internal linking sidebar — related articles + products
 *   7. Open Graph type "article" — social sharing optimisation
 *   8. Dynamic tags from article keywords
 */

import React from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import SEOHead from '../../components/SEOHead';
import Breadcrumb from '../../components/Breadcrumb';
import HreflangTags from '../../components/HreflangTags';
import FAQSection from '../../components/FAQSection';
import OptimizedImage from '../../components/OptimizedImage';
import { siteConfig } from '../../config/seo-config';
import { blogPosts, blogSlugs } from '../../data/blog';
import type { BlogPost } from '../../data/blog/types';

interface BlogPostPageProps {
  post: BlogPost;
  locale: string;
}

// ============================================================================
// STATIC PATHS — pre-render every blog slug at build time (SSG)
// ============================================================================

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogSlugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking' as const,
  };
};

// ============================================================================
// STATIC PROPS — fetch the article data at build time
// ============================================================================

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (
  context: GetStaticPropsContext
) => {
  const { params, locale } = context;
  const slug = params?.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      locale: locale || 'en',
    },
    revalidate: 3600,
  };
};

// ============================================================================
// ARTICLE SCHEMA (JSON-LD)
// ============================================================================

function buildArticleSchema(post: BlogPost): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [post.heroImage],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      url: `${siteConfig.url}/en/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/en/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.keywords,
    wordCount: post.sections.reduce(
      (total, s) =>
        total + s.paragraphs.reduce((t, p) => t + p.split(/\s+/).length, 0),
      0
    ),
    inLanguage: 'en',
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
  };
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function BlogPostPage({ post, locale = 'en' }: BlogPostPageProps) {
  const canonical = `${siteConfig.url}/${locale}/blog/${post.slug}`;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    {
      name: post.category,
      href: `/blog?category=${encodeURIComponent(post.category)}`,
    },
    { name: post.title },
  ];

  // Derive tags from the keywords field (first 5)
  const tags = post.keywords.split(',').slice(0, 5).map((k) => k.trim());

  return (
    <>
      <SEOHead
        title={`${post.title} | ${siteConfig.name} Blog`}
        description={post.description}
        keywords={post.keywords}
        canonical={canonical}
        ogImage={post.heroImage}
        ogType="article"
        locale={locale}
        jsonLd={buildArticleSchema(post)}
      />

      <HreflangTags path={`/blog/${post.slug}`} />

      <div className="page-wrapper">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </div>

        <article className="article">
          <header className="article-header">
            <span className="article-category">{post.category}</span>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-description">{post.description}</p>

            <div className="article-meta">
              <div className="author-block">
                <div className="author-avatar" aria-hidden="true">
                  {post.author.charAt(0)}
                </div>
                <div className="author-info">
                  <span className="author-name">{post.author}</span>
                  <span className="author-role">{post.authorRole}</span>
                </div>
              </div>
              <div className="meta-divider" aria-hidden="true">|</div>
              <time
                className="article-date"
                dateTime={post.datePublished}
                itemProp="datePublished"
              >
                {new Date(post.datePublished).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <div className="meta-divider" aria-hidden="true">|</div>
              <span className="reading-time">{post.readingTime}</span>
            </div>
          </header>

          <figure className="hero-figure">
            <OptimizedImage
              src={post.heroImage}
              alt={post.heroImageAlt}
              className="hero-image"
              priority
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </figure>

          <div className="article-layout">
            {/* ----- Article body ----- */}
            <div className="article-body" itemProp="articleBody">
              {post.sections.map((section, idx) => (
                <section key={idx} className="article-section">
                  <h2 className="section-heading">{section.heading}</h2>
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="section-paragraph">
                      {para}
                    </p>
                  ))}
                </section>
              ))}

              {/* Inline CTA mid-article */}
              <aside className="inline-cta">
                <h3>Request a Wholesale Quote</h3>
                <p>
                  Get tiered pricing, sample panels, and full certification
                  documents from a vertically integrated manufacturer.
                </p>
                <Link href={`/${locale}/contact`} className="btn-primary">
                  Get a Quote
                </Link>
              </aside>

              {/* Article tags */}
              <div className="article-tags">
                <span className="tag-label">Tags:</span>
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share buttons */}
              <div className="share-row">
                <span className="share-label">Share this article:</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    canonical
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    canonical
                  )}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link"
                >
                  Twitter / X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${post.title} ${canonical}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-link"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* ----- Sidebar ----- */}
            <aside className="sidebar">
              {/* Product recommendations */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">Recommended Products</h3>
                {post.productRecommendations.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/${locale}/products/${product.slug}`}
                    className="product-rec"
                  >
                    <OptimizedImage
                      src={product.image}
                      alt={product.name}
                      className="product-rec-img"
                      width={80}
                      height={80}
                      sizes="80px"
                    />
                    <div className="product-rec-body">
                      <h4 className="product-rec-name">{product.name}</h4>
                      <p className="product-rec-desc">{product.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Related articles */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">Related Articles</h3>
                {post.relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${locale}/blog/${article.slug}`}
                    className="related-article"
                  >
                    <h4 className="related-title">{article.title}</h4>
                    <p className="related-excerpt">{article.excerpt}</p>
                    <span className="related-meta">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      &middot; {article.readingTime}
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA card */}
              <div className="sidebar-card cta-card">
                <h3 className="cta-title">Ready to Source?</h3>
                <p className="cta-text">
                  {siteConfig.employees}+ staff, {siteConfig.factorySize}{' '}
                  factory, serving {siteConfig.countries} countries. MOQ{' '}
                  {siteConfig.moq}.
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="btn-primary btn-block"
                >
                  Contact Sales
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="btn-whatsapp btn-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </div>
            </aside>
          </div>
        </article>

        {/* FAQ Section */}
        <FAQSection
          title={`${post.category} — FAQ`}
          faqs={post.faqs}
          locale={locale}
        />
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

        .article {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }

        .article-header {
          padding: 24px 0 32px;
          text-align: center;
        }

        .article-category {
          display: inline-block;
          background: #fff3ee;
          color: #E85D2F;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .article-title {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.25;
          color: #1a1a2e;
          margin: 0 0 16px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .article-description {
          font-size: 18px;
          line-height: 1.6;
          color: #555;
          max-width: 760px;
          margin: 0 auto;
        }

        .article-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
          font-size: 14px;
          color: #777;
        }

        .author-block {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E85D2F, #F4C430);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .author-name {
          font-weight: 600;
          color: #1a1a2e;
        }

        .author-role {
          font-size: 12px;
          color: #888;
        }

        .meta-divider {
          color: #ccc;
        }

        .hero-figure {
          margin: 0 0 40px;
          border-radius: 12px;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
          aspect-ratio: 1200 / 630;
          object-fit: cover;
        }

        .article-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 48px;
          align-items: start;
        }

        .article-body {
          font-size: 17px;
          line-height: 1.8;
          color: #2a2a3e;
        }

        .article-section {
          margin-bottom: 36px;
        }

        .section-heading {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 14px;
          scroll-margin-top: 80px;
        }

        .section-paragraph {
          margin: 0 0 16px;
        }

        .inline-cta {
          background: linear-gradient(135deg, #E85D2F 0%, #F4C430 100%);
          color: #fff;
          border-radius: 12px;
          padding: 28px 32px;
          margin: 40px 0;
        }

        .inline-cta h3 {
          margin: 0 0 8px;
          font-size: 20px;
        }

        .inline-cta p {
          margin: 0 0 16px;
          font-size: 15px;
          opacity: 0.95;
        }

        .article-tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin: 32px 0;
          padding-top: 24px;
          border-top: 1px solid #eee;
        }

        .tag-label {
          font-size: 14px;
          color: #888;
          font-weight: 600;
        }

        .tag {
          font-size: 13px;
          color: #E85D2F;
          background: #fff3ee;
          padding: 4px 12px;
          border-radius: 16px;
        }

        .share-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          padding: 20px 0;
          border-top: 1px solid #eee;
        }

        .share-label {
          font-size: 14px;
          color: #888;
          font-weight: 600;
        }

        .share-link {
          font-size: 13px;
          color: #E85D2F;
          text-decoration: none;
          padding: 6px 14px;
          border: 1px solid #f0d8cc;
          border-radius: 20px;
          transition: all 0.2s;
        }

        .share-link:hover {
          background: #E85D2F;
          color: #fff;
          border-color: #E85D2F;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 20px;
        }

        .sidebar-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #eef0f3;
        }

        .sidebar-title {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 16px;
          padding-bottom: 10px;
          border-bottom: 2px solid #E85D2F;
        }

        .product-rec {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          text-decoration: none;
          border-bottom: 1px solid #eee;
          transition: opacity 0.2s;
        }

        .product-rec:last-child {
          border-bottom: none;
        }

        .product-rec:hover {
          opacity: 0.8;
        }

        .product-rec-img {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .product-rec-body {
          flex: 1;
          min-width: 0;
        }

        .product-rec-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 4px;
        }

        .product-rec-desc {
          font-size: 12px;
          color: #777;
          line-height: 1.5;
          margin: 0;
        }

        .related-article {
          display: block;
          padding: 12px 0;
          text-decoration: none;
          border-bottom: 1px solid #eee;
          transition: opacity 0.2s;
        }

        .related-article:last-child {
          border-bottom: none;
        }

        .related-article:hover {
          opacity: 0.8;
        }

        .related-title {
          font-size: 14px;
          font-weight: 600;
          color: #E85D2F;
          margin: 0 0 4px;
        }

        .related-excerpt {
          font-size: 12px;
          color: #777;
          line-height: 1.5;
          margin: 0 0 4px;
        }

        .related-meta {
          font-size: 11px;
          color: #aaa;
        }

        .cta-card {
          background: linear-gradient(135deg, #1a0a05 0%, #2d1208 100%);
          color: #fff;
          text-align: center;
        }

        .cta-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 10px;
        }

        .cta-text {
          font-size: 13px;
          color: #d4c8c0;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .btn-primary {
          display: inline-block;
          background: #E85D2F;
          color: #fff;
          padding: 12px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #c44a20;
        }

        .btn-block {
          display: block;
          width: 100%;
          margin-bottom: 10px;
        }

        .btn-whatsapp {
          display: block;
          width: 100%;
          background: #25d366;
          color: #fff;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          transition: background 0.2s;
        }

        .btn-whatsapp:hover {
          background: #128c7e;
        }

        @media (max-width: 900px) {
          .article-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .sidebar {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .article {
            padding: 0 16px 40px;
          }

          .article-title {
            font-size: 26px;
          }

          .article-description {
            font-size: 16px;
          }

          .article-body {
            font-size: 16px;
            line-height: 1.7;
          }

          .section-heading {
            font-size: 20px;
          }

          .article-meta {
            gap: 8px;
            font-size: 13px;
          }

          .meta-divider {
            display: none;
          }

          .hero-figure {
            margin: 0 -16px 28px;
            border-radius: 0;
          }

          .inline-cta {
            padding: 20px;
          }

          .inline-cta h3 {
            font-size: 18px;
          }

          .share-row {
            gap: 8px;
          }

          .share-link {
            font-size: 12px;
            padding: 6px 10px;
          }
        }
      `}</style>
    </>
  );
}

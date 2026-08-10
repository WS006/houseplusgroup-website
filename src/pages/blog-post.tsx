/**
 * HousePlus Blog Post Page — SEO-Optimized Template
 * Updated: 2026-07-28
 *
 * IMPROVEMENTS & SEO IMPACT:
 * 1. Article Schema (JSON-LD) — enables Google "Article" rich results, surfaces
 *    author, datePublished, and publisher in SERPs and Google News/Discover.
 * 2. getStaticPaths + getStaticProps — pre-renders every blog post at build time
 *    for maximum page speed and crawlability (SSG beats CSR for SEO).
 * 3. HreflangTags — declares en/es/de/fr/ar alternates so Google serves the
 *    correct language version and avoids duplicate-content penalties.
 * 4. Breadcrumb component — BreadcrumbList schema shows the path in SERPs,
 *    improving CTR and helping Google understand site hierarchy.
 * 5. FAQSection at the bottom — FAQPage schema can expand SERP real estate by
 *    200-300px and targets long-tail question queries with purchase intent.
 * 6. 1,000+ word article body — covers long-tail keywords (wholesale solar
 *    panels, monocrystalline vs polycrystalline, OEM solar panels, MOQ, etc.)
 *    which together drive the majority of organic traffic.
 * 7. Internal linking sidebar (related articles + product recommendations) —
 *    distributes PageRank and keeps buyers inside the conversion funnel.
 * 8. Open Graph type "article" — optimised sharing on Facebook/LinkedIn.
 *
 * ROUTE NOTE:
 * This file is named `blog-post.tsx` and demonstrates the full SSG structure.
 * In production, rename to `src/pages/blog/[slug].tsx` so getStaticPaths can
 * generate one static page per blog slug (e.g. /en/blog/how-to-choose-wholesale-solar-panels).
 */

import React from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import HreflangTags from '../components/HreflangTags';
import FAQSection from '../components/FAQSection';
import OptimizedImage from '../components/OptimizedImage';
import { siteConfig } from '../config/seo-config';

// ============================================================================
// TYPES
// ============================================================================

interface BlogSection {
  heading: string;
  paragraphs: string[];
}

interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

interface ProductRecommendation {
  slug: string;
  name: string;
  desc: string;
  image: string;
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  author: string;
  authorRole: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  category: string;
  heroImage: string;
  heroImageAlt: string;
  sections: BlogSection[];
  faqs: { question: string; answer: string }[];
  relatedArticles: RelatedArticle[];
  productRecommendations: ProductRecommendation[];
}

interface BlogPostPageProps {
  post: BlogPost;
  locale: string;
}

// ============================================================================
// BLOG DATA (Example — replace with CMS / Markdown / database in production)
// ============================================================================

/**
 * Example article: "how-to-choose-wholesale-solar-panels"
 * Body exceeds 1,000 words and deliberately weaves in long-tail buyer keywords:
 *   - wholesale solar panels / buy solar panels in bulk
 *   - monocrystalline vs polycrystalline solar panels
 *   - solar panel efficiency / price per watt
 *   - OEM solar panels / ODM manufacturer China
 *   - solar panel certifications (CE, IEC 61215, IEC 61730)
 *   - MOQ solar panels / solar panel warranty
 */
const blogPosts: Record<string, BlogPost> = {
  'how-to-choose-wholesale-solar-panels': {
    slug: 'how-to-choose-wholesale-solar-panels',
    title:
      'How to Choose Wholesale Solar Panels: A Complete Buyer\u2019s Guide for 2026',
    description:
      'Learn how to choose wholesale solar panels in 2026: cell types, efficiency, certifications (CE/IEC), OEM/ODM options, MOQ, pricing per watt, warranty, and shipping from China manufacturers.',
    keywords:
      'wholesale solar panels, buy solar panels in bulk, monocrystalline vs polycrystalline, solar panel efficiency, OEM solar panels, solar panel manufacturer China, MOQ solar panels, solar panel certifications, solar panel price per watt',
    author: 'Jack (Founder & CEO)',
    authorRole: 'HousePlus Solar Manufacturing',
    datePublished: '2026-07-15',
    dateModified: '2026-07-28',
    readingTime: '9 min read',
    category: 'Solar Energy Systems',
    heroImage:
      'https://images.houseplus-ch.com/blog/how-to-choose-wholesale-solar-panels.jpg',
    heroImageAlt:
      'HousePlus monocrystalline solar panels stacked in warehouse ready for wholesale export',
    sections: [
      {
        heading: 'Why Choosing the Right Wholesale Solar Panel Supplier Matters',
        paragraphs: [
          'Sourcing solar panels at wholesale prices is one of the most consequential procurement decisions a solar distributor, EPC contractor, or renewable energy reseller will make in 2026. With global solar capacity expected to surpass 2 terawatts and panel prices continuing to decline, the opportunity for margin growth has never been greater. However, choosing the wrong wholesale solar panel supplier can lead to certification failures, delayed shipments, underperforming modules, and reputational damage with your end customers.',
          'This comprehensive buyer\u2019s guide walks you through every critical factor to evaluate when selecting a wholesale solar panel manufacturer, from cell technology and efficiency ratings to certifications, OEM/ODM capabilities, minimum order quantities, warranty terms, and international logistics. Whether you are importing your first container or scaling to multi-megawatt annual volume, these evaluation criteria will help you make a confident, data-driven decision.',
        ],
      },
      {
        heading:
          '1. Understand the Three Core Solar Panel Technologies',
        paragraphs: [
          'The first decision when buying wholesale solar panels is choosing the right cell technology. Monocrystalline solar panels dominate the 2026 market because their single-crystal silicon structure delivers the highest efficiency, typically between 20% and 23%. They occupy less space per watt, perform better in high temperatures, and offer a sleeker aesthetic preferred by residential customers.',
          'Polycrystalline panels, made from multiple silicon fragments melted together, are cheaper to produce but achieve lower efficiency of 15% to 18%, making them suitable for budget-sensitive commercial projects with ample mounting space. Thin-film panels, including CdTe and CIGS variants, are lightweight and flexible but generally less efficient, so they are reserved for specialised applications such as curved surfaces or portable solar products. For most wholesale buyers, monocrystalline panels offer the best balance of performance, price per watt, and market demand.',
        ],
      },
      {
        heading: '2. Evaluate Efficiency Ratings and Power Output',
        paragraphs: [
          'Efficiency determines how much electricity a panel generates from a given area of sunlight. Higher efficiency means more watts per square metre, which directly lowers your balance-of-system costs because you need fewer panels, less mounting hardware, and reduced installation labour.',
          'When comparing wholesale solar panel quotes, always request the module efficiency percentage alongside the rated peak power (Pmax). A modern 500W monocrystalline panel with 21.5% efficiency will outperform an older 450W panel at 19% efficiency across the system lifetime. Also examine the temperature coefficient, which measures how much output drops as the panel heats up. A lower coefficient, such as minus 0.35% per degree Celsius, preserves energy harvest in hot climates. Review the PTC (PVUSA Test Conditions) rating as well, since it reflects real-world performance more accurately than the laboratory STC rating.',
        ],
      },
      {
        heading: '3. Verify Certifications and Regulatory Compliance',
        paragraphs: [
          'Certifications are non-negotiable for cross-border solar trade. At minimum, your wholesale solar panels must carry CE marking for the European market, RoHS compliance for restricted hazardous substances, and IEC 61215 design qualification plus IEC 61730 safety qualification. These international standards confirm that the panels have passed thermal cycling, humidity-freeze, mechanical load, and insulation tests.',
          'If you target the United States, confirm UL 1703 or UL 61730 listing; for Australia, look for Clean Energy Council (CEC) approval; and for markets like Brazil or India, verify INMETRO or BIS registration respectively. Always request digital copies of the actual certificate PDFs, not just a supplier\u2019s claim, and cross-check the certificate number against the issuing body\u2019s online database. Buying uncertified panels risks customs seizure, project rejection, and liability for property damage.',
        ],
      },
      {
        heading: '4. Assess Manufacturer Capabilities and OEM/ODM Options',
        paragraphs: [
          'The strength of your wholesale partner\u2019s factory determines product consistency and your ability to offer a private-label brand. Visit or request a virtual tour of the manufacturing facility to confirm vertical integration, meaning the supplier controls PCB design, cell sorting, stringing, lamination, framing, and final testing under one roof.',
          'A vertically integrated manufacturer with 20,000 square metres of factory space and 500 or more employees can maintain tighter quality control and shorter lead times than a trading company that outsources every step. If you plan to build your own brand, confirm OEM and ODM services: logo printing on frames and junction boxes, custom packaging design, specification modifications such as bespoke dimensions or coloured back sheets, and flexible MOQs starting around 500 pieces for customised orders. Request sample panels and a documented quality control process before committing.',
        ],
      },
      {
        heading: '5. Compare Pricing Structures and Minimum Order Quantities',
        paragraphs: [
          'Wholesale solar panel pricing is quoted per watt or per piece and decreases with volume. Always request a tiered price list showing unit cost at 100, 500, 1,000, and full-container quantities so you can forecast margins accurately. The minimum order quantity typically starts at 100 pieces for standard stock panels and rises to 500 pieces for OEM or ODM customisation.',
          'Clarify whether the quoted price is EXW (ex-works), FOB (free on board), or CIF (cost, insurance, and freight), since this materially changes your landed cost. Beware of prices that seem too good to be true; they often indicate B-grade cells, omitted certifications, or substitution of inferior materials after the sample approval stage.',
        ],
      },
      {
        heading: '6. Review Warranty Terms and After-Sales Support',
        paragraphs: [
          'A robust warranty signals manufacturer confidence in product durability. Industry-standard terms include a 12-year product warranty covering manufacturing defects and a 25-year linear power output guarantee ensuring at least 80% to 84% of rated power at year 25. Ask the supplier to provide the actual warranty document and clarify the claims process, including who pays return shipping for defective panels.',
          'For large orders, negotiate extended 18 to 24-month product warranty coverage. Equally important is after-sales responsiveness: confirm the supplier\u2019s average reply time, their RMA (return merchandise authorisation) turnaround, and whether they maintain English-speaking technical support across your time zone. A supplier that responds within 24 hours protects your downstream customer relationships.',
        ],
      },
      {
        heading: '7. Factor In Logistics, Packaging, and Lead Times',
        paragraphs: [
          'International solar shipping requires careful planning to control cost and avoid damage. Standard production lead time ranges from 20 to 35 days from order confirmation, extending to 45 to 60 days for OEM or ODM orders requiring tooling. Panels are packed vertically, typically two per carton with foam corner protectors, and palletised at 26 to 30 panels per pallet.',
          'A 40-foot high-cube container holds roughly 600 to 650 panels, which is the most cost-efficient shipping unit. Choose sea freight for bulk orders and express courier for samples. Confirm the supplier supports both FOB and EXW incoterms and can provide export documentation, including commercial invoices, packing lists, certificates of origin, and bill of lading, to ensure smooth customs clearance.',
        ],
      },
      {
        heading: 'Conclusion: Build a Long-Term Wholesale Partnership',
        paragraphs: [
          'Choosing wholesale solar panels is not a one-time transaction but the foundation of a long-term supply partnership. By systematically evaluating cell technology, efficiency, certifications, manufacturing depth, pricing tiers, warranty strength, and logistics, you reduce procurement risk and build a defensible competitive position in your market.',
          'Start by requesting samples from two or three shortlisted manufacturers, test them under real conditions, and compare the documentation rigorously. The right wholesale solar panel supplier will not only deliver compliant, high-yield modules but also grow with you as the global solar market expands through the rest of this decade. Contact HousePlus today to request samples and a tiered wholesale quotation.',
        ],
      },
    ],
    faqs: [
      {
        question:
          'What is the minimum order quantity (MOQ) for wholesale solar panels?',
        answer:
          'The standard MOQ is 100 pieces for stock monocrystalline panels. For OEM or ODM customisation with your own logo, packaging, or modified specifications, the MOQ rises to 500 pieces. Volume discounts apply at 1,000 pieces and full-container quantities.',
      },
      {
        question: 'Which certifications should wholesale solar panels carry?',
        answer:
          'At minimum, look for CE, RoHS, IEC 61215 (design qualification), and IEC 61730 (safety qualification). For the US market, require UL 61730; for Australia, Clean Energy Council (CEC) listing. Always verify the certificate number against the issuing body\u2019s online database.',
      },
      {
        question: 'Monocrystalline vs polycrystalline: which should I buy wholesale?',
        answer:
          'Monocrystalline panels (20-23% efficiency) are the best choice for most wholesale buyers because they deliver more watts per square metre, perform better in heat, and command stronger resale demand. Polycrystalline (15-18% efficiency) suits budget projects with ample mounting space.',
      },
      {
        question: 'How long does wholesale solar panel production and shipping take?',
        answer:
          'Standard production lead time is 20-35 days from order confirmation; OEM/ODM orders with tooling take 45-60 days. Sea freight to most ports adds 20-35 days. Plan for 6-10 weeks total from order to delivery for a full container.',
      },
      {
        question: 'Can I get OEM solar panels with my own brand from China?',
        answer:
          'Yes. HousePlus offers full OEM/ODM services from MOQ 500 pieces, including logo printing on frames and junction boxes, custom packaging, and specification modifications such as bespoke dimensions or coloured back sheets.',
      },
    ],
    relatedArticles: [
      {
        slug: 'monocrystalline-vs-polycrystalline-solar-panels',
        title: 'Monocrystalline vs Polycrystalline Solar Panels: 2026 Comparison',
        excerpt:
          'A detailed efficiency, cost, and lifespan comparison to help wholesalers pick the right cell technology.',
        date: '2026-06-20',
        readingTime: '7 min read',
      },
      {
        slug: 'solar-panel-certifications-explained',
        title: 'Solar Panel Certifications Explained: CE, IEC, UL, RoHS',
        excerpt:
          'What each certification means, which markets require it, and how to verify a supplier\u2019s documents.',
        date: '2026-06-05',
        readingTime: '6 min read',
      },
      {
        slug: 'how-to-calculate-solar-panel-price-per-watt',
        title: 'How to Calculate Solar Panel Price Per Watt for Wholesale',
        excerpt:
          'A simple formula to compare supplier quotes on a level playing field and protect your margins.',
        date: '2026-05-18',
        readingTime: '5 min read',
      },
    ],
    productRecommendations: [
      {
        slug: 'solar-panel-500w',
        name: '500W Monocrystalline Solar Panel',
        desc: '21.5% efficiency, PERC cells, 25-year linear warranty. MOQ 100 pcs.',
        image:
          'https://images.houseplus-ch.com/products/solar-panel-500w-front.jpg',
      },
      {
        slug: 'solar-inverter-3kw',
        name: '3kW Pure Sine Wave Solar Inverter',
        desc: 'Built-in MPPT charge controller for off-grid solar systems.',
        image:
          'https://images.houseplus-ch.com/products/solar-inverter-3kw.jpg',
      },
      {
        slug: 'lithium-battery-5kwh',
        name: '5kWh LiFePO4 Lithium Battery',
        desc: 'Solar energy storage with 6,000+ cycle life and BMS protection.',
        image:
          'https://images.houseplus-ch.com/products/lithium-battery-5kwh.jpg',
      },
    ],
  },
};

// ============================================================================
// STATIC PATHS — pre-render every blog slug at build time (SSG)
// ============================================================================

/**
 * getStaticPaths defines which slugs are pre-rendered to static HTML.
 * SEO IMPACT: static pages load instantly, achieve high Core Web Vitals
 * scores, and are crawled/indexed faster than client-rendered pages.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // In production, fetch this list from a CMS, database, or markdown file system.
  const paths = Object.keys(blogPosts).map((slug) => ({
    params: { slug },
    // Pre-generate the default locale; other locales reuse the same slug.
    locale: 'en',
  }));

  return {
    paths,
    // fallback: 'blocking' generates new posts on-demand and caches them,
    // so freshly published articles become indexable without a full rebuild.
    fallback: 'blocking' as const,
  };
};

// ============================================================================
// STATIC PROPS — fetch the article data at build time
// ============================================================================

/**
 * getStaticProps delivers fully-resolved article data as props.
 * SEO IMPACT: page is served as static HTML with zero client-side data
 * fetching, maximising crawl efficiency and Time to First Byte (TTFB).
 */
export const getStaticProps: GetStaticProps<BlogPostPageProps> = async (
  context: GetStaticPropsContext
) => {
  const { params, locale } = context;
  const slug = (params?.slug as string) || 'how-to-choose-wholesale-solar-panels';
  const post = blogPosts[slug];

  // Return a 404 if the slug does not match any known article.
  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      locale: locale || 'en',
    },
    // Re-validate every hour so content edits propagate without a rebuild.
    revalidate: 3600,
  };
};

// ============================================================================
// ARTICLE SCHEMA (JSON-LD) — built per post
// ============================================================================

/**
 * Builds the schema.org Article structured data.
 * SEO IMPACT:
 *   - Enables Google "Article" rich result (author, date, publisher logo).
 *   - Required for Google News & Discover inclusion.
 *   - dateModified signals freshness, encouraging re-crawls.
 */
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
        total +
        s.paragraphs.reduce((t, p) => t + p.split(/\s+/).length, 0),
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

  // Breadcrumb items — the last item (current page) has no href.
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
    { name: post.title },
  ];

  return (
    <>
      {/* ============================================================
          SEO HEAD — page-level meta + Article JSON-LD
          Note: Organization & WebSite schemas are injected globally
          by _app.tsx, so only the Article schema is added here.
      ============================================================ */}
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

      {/* Hreflang alternates for multi-language SEO (en/es/de/fr/ar + x-default) */}
      <HreflangTags path={`/blog/${post.slug}`} />

      {/* Breadcrumb navigation (emits BreadcrumbList schema automatically) */}
      <div className="page-wrapper">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </div>

        {/* ============================================================
            ARTICLE HEADER
        ============================================================ */}
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

          {/* Hero image — OptimizedImage for WebP/AVIF + LCP priority */}
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

          {/* ============================================================
              ARTICLE BODY + SIDEBAR LAYOUT
          ============================================================ */}
          <div className="article-layout">
            {/* ----- Article body (1,000+ words) ----- */}
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
                <h3>Request a Wholesale Solar Panel Quote</h3>
                <p>
                  Get tiered pricing, sample panels, and full certification
                  documents from a vertically integrated manufacturer.
                </p>
                <Link href={`/${locale}/contact`} className="btn-primary">
                  Get a Quote
                </Link>
              </aside>

              {/* Article tags for topical relevance */}
              <div className="article-tags">
                <span className="tag-label">Tags:</span>
                {[
                  'wholesale solar panels',
                  'monocrystalline',
                  'OEM solar',
                  'solar certifications',
                  'MOQ',
                ].map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share buttons for social signals */}
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
              {/* Product recommendations — internal linking + cross-sell */}
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

              {/* Related articles — internal linking keeps users on site */}
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
                <h3 className="cta-title">Ready to Source Solar Panels?</h3>
                <p className="cta-text">
                  {siteConfig.employees}+ staff, {siteConfig.factorySize}{' '}
                  factory, serving {siteConfig.countries} countries. MOQ{' '}
                  {siteConfig.moq}.
                </p>
                <Link href={`/${locale}/contact`} className="btn-primary btn-block">
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

        {/* ============================================================
            FAQ SECTION — FAQPage schema expands SERP real estate
            and targets long-tail question queries with purchase intent.
        ============================================================ */}
        <FAQSection
          title="Wholesale Solar Panels — FAQ"
          faqs={post.faqs}
          locale={locale}
        />
      </div>

      {/* ============================================================
          STYLES — styled-jsx, fully responsive
      ============================================================ */}
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

        /* === Article === */
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

        /* === Hero image === */
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

        /* === Layout grid === */
        .article-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 48px;
          align-items: start;
        }

        /* === Article body === */
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

        /* === Inline CTA === */
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

        /* === Tags === */
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

        /* === Share row === */
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

        /* === Sidebar === */
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

        /* === CTA card === */
        .cta-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
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
          color: #c8d0e0;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        /* === Buttons === */
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

        /* === Responsive === */
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

/*
WORD COUNT SUMMARY (article body only):
=======================================
- Intro section: ~210 words
- Section 1 (panel types): ~150 words
- Section 2 (efficiency): ~150 words
- Section 3 (certifications): ~150 words
- Section 4 (manufacturer/OEM): ~160 words
- Section 5 (pricing/MOQ): ~130 words
- Section 6 (warranty): ~130 words
- Section 7 (logistics): ~130 words
- Conclusion: ~110 words
TOTAL: ~1,320 words (exceeds the 800-word minimum)

SEO CHECKLIST:
[x] Article Schema JSON-LD (headline, author, datePublished, dateModified, publisher, wordCount)
[x] Breadcrumb component + BreadcrumbList schema
[x] HreflangTags for en/es/de/fr/ar + x-default
[x] FAQSection with FAQPage schema at the bottom
[x] 1,000+ word body covering long-tail buyer keywords
[x] Internal linking: related articles + product recommendations
[x] og:type = article for social sharing
[x] Canonical URL per slug
[x] Responsive design (desktop / tablet / mobile breakpoints)
[x] Descriptive image alt text
*/

/**
 * HousePlus Homepage — SEO-Optimized
 * Updated: 2026-07-28
 *
 * This is the main entry point for the HousePlus website.
 * It integrates all SEO components for maximum search visibility.
 *
 * Components used:
 * 1. SEOHead            — meta tags + homepage JSON-LD
 * 2. HreflangTags        — multi-language hreflang tags
 * 3. HomeContent         — expanded homepage content (1000+ words)
 * 4. OptimizedImage      — hero image optimization
 * 5. CertificationDisplay — trust badges
 * 6. Link (next/link)   — client-side navigation
 * 7. homePageMeta + siteConfig — centralized SEO config
 *
 * SEO IMPACT:
 * - Title under 60 chars, description under 155 chars for SERP
 * - Organization + WebSite schema injected globally via _app.tsx
 * - LocalBusiness schema for local search visibility
 * - Expanded content (1000+ words) improves topical authority
 * - Hero image preload for LCP optimization
 */

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import SEOHead from '../components/SEOHead';
import HreflangTags from '../components/HreflangTags';
import HomeContent from '../components/HomeContent';
import OptimizedImage from '../components/OptimizedImage';
import CertificationDisplay from '../components/CertificationDisplay';
import { LocalBusinessSchema } from '../components/SchemaOrg';
import { siteConfig, homePageMeta, heroSlides } from '../config/seo-config';

interface HomePageProps {
  locale: string;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  return {
    props: {
      locale: locale || 'en',
    },
  };
};

export default function HomePage({ locale = 'en' }: HomePageProps) {
  // LocalBusiness structured data for local SEO
  const localBusinessSchema = LocalBusinessSchema();

  return (
    <>
      {/* === SEO Head === */}
      <SEOHead
        title={homePageMeta.title}
        description={homePageMeta.description}
        keywords={homePageMeta.keywords}
        canonical={homePageMeta.canonical}
        ogImage={homePageMeta.ogImage}
        ogType="website"
        jsonLd={localBusinessSchema}
        locale={locale}
      />

      {/* === Hreflang tags === */}
      <HreflangTags path="" />

      {/* === Preload hero image for LCP === */}
      <Head>
        <link rel="preload" as="image" href={heroSlides[0].image} />
      </Head>

      <div className="home-page">
        {/* === Hero Slider Section === */}
        <section className="hero-section">
          <div className="hero-slide" style={{ backgroundImage: `url(${heroSlides[0].image})` }}>
            <div className="hero-overlay">
              <div className="hero-content">
                <h1>{heroSlides[0].heading}</h1>
                <p>{heroSlides[0].subheading}</p>
                <div className="hero-cta">
                  <Link href={heroSlides[0].cta.href} className="hero-btn-primary">
                    {heroSlides[0].cta.text}
                  </Link>
                  <Link href="/en/contact" className="hero-btn-secondary">
                    Get Wholesale Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hero stats bar */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">15+</span>
              <span className="hero-stat-label">Years</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">441+</span>
              <span className="hero-stat-label">Clients</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">53+</span>
              <span className="hero-stat-label">Countries</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">20,000</span>
              <span className="hero-stat-label">m² Factory</span>
            </div>
          </div>
        </section>

        {/* === Product Category Quick Links === */}
        <section className="quick-categories">
          <h2>Our Product Categories</h2>
          <div className="category-grid">
            {heroSlides.map((slide, index) => (
              <Link key={index} href={slide.cta.href} className="category-quick-card">
                <OptimizedImage
                  src={slide.image}
                  alt={slide.alt}
                  width={600}
                  height={400}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="category-quick-image"
                />
                <div className="category-quick-body">
                  <h3>{slide.heading}</h3>
                  <p>{slide.subheading}</p>
                  <span className="category-quick-cta">{slide.cta.text} →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* === Expanded Homepage Content (1000+ words for SEO) === */}
        <HomeContent />

        {/* === Certifications === */}
        <section className="certifications-section">
          <h2>Quality You Can Trust</h2>
          <CertificationDisplay />
        </section>

        {/* === Final CTA === */}
        <section className="final-cta">
          <h2>Ready to Start Your Wholesale Order?</h2>
          <p>
            Get wholesale pricing within 24 hours. OEM/ODM customisation available
            from 500 pcs. CE, FCC, RoHS, IEC certified for global markets.
          </p>
          <div className="final-cta-buttons">
            <Link href="/en/contact" className="btn-primary btn-large">
              Request a Quote
            </Link>
            <Link href="/en/products" className="btn-secondary btn-large">
              Browse Products
            </Link>
          </div>
        </section>
      </div>

      {/* ====================================================================
          STYLED-JSX
          ==================================================================== */}
      <style jsx>{`
        .home-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif;
          color: #1a1a2e;
        }

        /* === Hero Section === */
        .hero-section {
          position: relative;
        }

        .hero-slide {
          width: 100%;
          height: 500px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
        }

        .hero-overlay {
          width: 100%;
          background: linear-gradient(135deg, rgba(0, 102, 204, 0.85) 0%, rgba(0, 68, 153, 0.75) 100%);
          padding: 60px 20px;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          color: #ffffff;
        }

        .hero-content h1 {
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 16px;
          line-height: 1.2;
        }

        .hero-content p {
          font-size: 18px;
          line-height: 1.6;
          margin: 0 0 28px;
          max-width: 600px;
          color: rgba(255, 255, 255, 0.92);
        }

        .hero-cta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-btn-primary,
        .hero-btn-secondary {
          display: inline-block;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .hero-btn-primary {
          background: #ffffff;
          color: #E85D2F;
          border: 2px solid #ffffff;
        }

        .hero-btn-primary:hover {
          background: #f0f4f8;
        }

        .hero-btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.6);
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #ffffff;
        }

        /* === Hero Stats Bar === */
        .hero-stats {
          display: flex;
          justify-content: space-around;
          padding: 24px 20px;
          background: #0f172a;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #60a5fa;
        }

        .hero-stat-label {
          font-size: 13px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        /* === Quick Categories === */
        .quick-categories {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 20px;
        }

        .quick-categories h2 {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          margin-bottom: 36px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .category-quick-card {
          display: block;
          background: #ffffff;
          border: 1px solid #e7eaf0;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .category-quick-card:hover {
          box-shadow: 0 12px 32px rgba(16, 24, 40, 0.1);
          transform: translateY(-4px);
        }

        .category-quick-card :global(img) {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .category-quick-body {
          padding: 20px;
        }

        .category-quick-body h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px;
        }

        .category-quick-body p {
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
          margin: 0 0 12px;
        }

        .category-quick-cta {
          font-size: 14px;
          font-weight: 600;
          color: #E85D2F;
        }

        /* === Certifications === */
        .certifications-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px;
          border-top: 1px solid #e7eaf0;
        }

        .certifications-section h2 {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          margin-bottom: 32px;
        }

        /* === Final CTA === */
        .final-cta {
          text-align: center;
          max-width: 1200px;
          margin: 0 auto 48px;
          padding: 64px 20px;
          background: linear-gradient(135deg, #E85D2F 0%, #c1121f 100%);
          border-radius: 20px;
        }

        .final-cta h2 {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 12px;
        }

        .final-cta p {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.88);
          max-width: 600px;
          margin: 0 auto 28px;
        }

        .final-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          display: inline-block;
          padding: 14px 34px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #ffffff;
          color: #E85D2F;
          border: 2px solid #ffffff;
        }

        .btn-primary:hover {
          background: #f0f4f8;
        }

        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.6);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #ffffff;
        }

        .btn-large {
          padding: 14px 34px;
          font-size: 16px;
        }

        /* === Responsive === */
        @media (max-width: 768px) {
          .hero-slide {
            height: 380px;
          }

          .hero-content h1 {
            font-size: 28px;
          }

          .hero-content p {
            font-size: 15px;
          }

          .hero-stats {
            gap: 12px;
          }

          .hero-stat-value {
            font-size: 22px;
          }

          .quick-categories h2 {
            font-size: 22px;
          }

          .final-cta {
            padding: 40px 16px;
            border-radius: 14px;
          }

          .final-cta h2 {
            font-size: 22px;
          }

          .final-cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 24px;
          }

          .hero-cta {
            flex-direction: column;
          }

          .hero-stats {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}

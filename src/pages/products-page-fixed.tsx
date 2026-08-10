/**
 * HousePlus Product List Page — SEO-Optimized (Refactored)
 * Updated: 2026-07-28
 *
 * REFACTOR: Migrated from basic HTML to modular Next.js SEO components.
 *
 * Components used:
 * 1. SEOHead            — meta tags + CollectionPage JSON-LD
 * 2. Breadcrumb          — breadcrumb nav + BreadcrumbList Schema
 * 3. HreflangTags        — multi-language hreflang tags
 * 4. OptimizedImage      — next/image wrapper for image optimization
 * 5. CertificationDisplay — certification badges
 * 6. Link (next/link)   — client-side navigation (replaces raw <a>)
 * 7. siteConfig + productListMeta — centralized SEO config
 *
 * FIX: Previous version had H1 → H3 (skipped H2 level).
 * NOW:  H1 → H2 (categories) → H3 (products) — clean hierarchy.
 *
 * SEO IMPACT:
 * - Proper heading hierarchy helps search engines understand page structure
 * - OptimizedImage reduces image size 30-50% with WebP/AVIF conversion
 * - CollectionPage Schema enables rich product listing in SERPs
 * - Internal links with descriptive anchor text improve topical authority
 */

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import HreflangTags from '../components/HreflangTags';
import OptimizedImage from '../components/OptimizedImage';
import CertificationDisplay from '../components/CertificationDisplay';
import { CollectionPageSchema } from '../components/SchemaOrg';
import { siteConfig, productListMeta } from '../config/seo-config';

// ============================================================================
// PRODUCT DATA
// ============================================================================

interface Product {
  slug: string;
  name: string;
  model: string;
  badge?: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  keySpec: string;
}

interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  products: Product[];
}

const productCategories: ProductCategory[] = [
  {
    id: 'solar-energy-systems',
    name: 'Solar Energy Systems',
    icon: '☀️',
    description:
      'Complete solar energy solutions including panels, inverters, batteries, and accessories for residential, commercial, and off-grid applications worldwide.',
    products: [
      {
        slug: 'solar-panel-500w',
        name: '500W Monocrystalline Solar Panel',
        model: 'HP-SP500',
        badge: 'BEST SELLER',
        description: 'High-efficiency PERC monocrystalline panel with 21.5% conversion rate, 25-year power warranty.',
        image: 'https://images.houseplus-ch.com/products/solar-panel-500w-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '500W · 21.5% efficiency · IEC 61215',
      },
      {
        slug: 'solar-inverter-3kw',
        name: '3kW Pure Sine Wave Solar Inverter',
        model: 'HP-INV3000',
        badge: 'CE CERTIFIED',
        description: 'Pure sine wave inverter with MPPT charge controller, LCD display, and overload protection.',
        image: 'https://images.houseplus-ch.com/products/solar-inverter-3kw-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '3kW · Pure Sine Wave · MPPT',
      },
      {
        slug: 'lithium-battery-5kwh',
        name: '5kWh LiFePO4 Lithium Battery',
        model: 'HP-LFP5K',
        badge: 'NEW',
        description: 'LiFePO4 battery with 6000+ cycle life, BMS protection, and CAN/RS485 communication.',
        image: 'https://images.houseplus-ch.com/products/lithium-battery-5kwh-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '5kWh · 6000+ cycles · LiFePO4',
      },
    ],
  },
  {
    id: 'home-appliances',
    name: 'Home Appliances',
    icon: '🏠',
    description:
      'Energy-efficient kitchen and household appliances engineered for durability, with OEM/ODM customisation and CE/FCC/RoHS certifications for global markets.',
    products: [
      {
        slug: 'air-fryer-5-8l',
        name: '5.8L Digital Air Fryer',
        model: 'HP-AF58',
        description: 'Large-capacity digital air fryer with 8 preset modes, non-stick basket, and rapid air technology.',
        image: 'https://images.houseplus-ch.com/products/air-fryer-5-8l-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '5.8L · 1700W · 8 presets',
      },
      {
        slug: 'induction-cooktop-2000w',
        name: '2000W Induction Cooktop',
        model: 'HP-IC2000',
        description: 'Portable induction cooktop with touch control, 10 power levels, and child safety lock.',
        image: 'https://images.houseplus-ch.com/products/induction-cooktop-2000w-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '2000W · Touch control · 10 levels',
      },
      {
        slug: 'electric-kettle-1-5l',
        name: '1.5L Stainless Steel Electric Kettle',
        model: 'HP-EK15',
        description: 'Food-grade stainless steel kettle with auto shut-off, boil-dry protection, and 1500W fast heating.',
        image: 'https://images.houseplus-ch.com/products/electric-kettle-1-5l-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '1.5L · 1500W · 304 Stainless',
      },
    ],
  },
  {
    id: '3c-electronics',
    name: '3C Electronics & Accessories',
    icon: '📱',
    description:
      'Premium 3C electronics for global distributors — each product undergoes rigorous quality control and supports private-label branding with custom packaging.',
    products: [
      {
        slug: 'bluetooth-earphone-tws',
        name: 'True Wireless Bluetooth Earphones (TWS)',
        model: 'HP-TWS01',
        badge: 'POPULAR',
        description: 'TWS earbuds with Bluetooth 5.3, ANC noise cancellation, 30-hour battery with charging case.',
        image: 'https://images.houseplus-ch.com/products/bluetooth-earphone-tws-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: 'BT 5.3 · ANC · 30hr battery',
      },
      {
        slug: 'smart-watch',
        name: 'Smart Watch with Heart Rate Monitor',
        model: 'HP-SW01',
        description: 'Fitness smart watch with 1.4" AMOLED, SpO2, heart rate, IP68 waterproof, 14-day battery.',
        image: 'https://images.houseplus-ch.com/products/smart-watch-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '1.4" AMOLED · IP68 · 14-day',
      },
      {
        slug: 'portable-ssd-1tb',
        name: '1TB USB-C Portable SSD',
        model: 'HP-SSD1T',
        description: 'High-speed portable SSD with USB 3.2 Gen2, 1050MB/s read, aluminium alloy housing.',
        image: 'https://images.houseplus-ch.com/products/portable-ssd-1tb-thumb.jpg',
        imageWidth: 400,
        imageHeight: 400,
        keySpec: '1TB · 1050MB/s · USB-C',
      },
    ],
  },
];

// Build flat product list for CollectionPage schema
const allProductsForSchema = productCategories.flatMap((cat) =>
  cat.products.map((p) => ({
    name: p.name,
    url: `${siteConfig.url}/en/products/${p.slug}`,
  }))
);

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function ProductListPage() {
  // Build CollectionPage structured data
  const collectionSchema = CollectionPageSchema('All Products', allProductsForSchema);

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Products' },
  ];

  return (
    <>
      {/* === SEO Head === */}
      <SEOHead
        title={productListMeta.title}
        description={productListMeta.description}
        keywords={productListMeta.keywords}
        canonical={productListMeta.canonical}
        ogImage="https://images.houseplus-ch.com/og/products-og.jpg"
        ogType="website"
        jsonLd={collectionSchema}
      />

      {/* === Hreflang tags === */}
      <HreflangTags path="/products" />

      {/* === Preload first product image for LCP === */}
      <Head>
        <link
          rel="preload"
          as="image"
          href={productCategories[0].products[0].image}
        />
      </Head>

      <div className="product-list-page">
        {/* === Breadcrumb === */}
        <div className="breadcrumb-container">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* === Page Header (H1) === */}
        <header className="page-header">
          <h1>HousePlus Complete Product Catalogue</h1>
          <p className="page-intro">
            Browse our full product range — from solar panels to smart watches, all
            available with OEM/ODM support and CE/FCC/RoHS certifications. Wholesale
            pricing, MOQ 100 pcs, 20-35 day lead time.
          </p>
        </header>

        {/* === Category Filter === */}
        <div className="category-filter">
          <a href="#solar-energy-systems" className="filter-btn">
            <span className="filter-icon">☀️</span>
            Solar Energy Systems
          </a>
          <a href="#home-appliances" className="filter-btn">
            <span className="filter-icon">🏠</span>
            Home Appliances
          </a>
          <a href="#3c-electronics" className="filter-btn">
            <span className="filter-icon">📱</span>
            3C Electronics
          </a>
        </div>

        {/* === Product Categories === */}
        {productCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="product-category"
          >
            {/* H2: Category-level heading */}
            <h2 className="category-title">
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </h2>
            <p className="category-desc">{category.description}</p>

            <div className="product-grid">
              {/* H3: Individual product names (correct level under H2) */}
              {category.products.map((product) => (
                <article key={product.slug} className="product-card">
                  <div className="product-image-wrap">
                    <OptimizedImage
                      src={product.image}
                      alt={`${product.name} — model ${product.model}, ${product.keySpec}`}
                      width={product.imageWidth}
                      height={product.imageHeight}
                      loading="lazy"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                      className="product-image"
                    />
                    {product.badge && (
                      <span className="product-badge">{product.badge}</span>
                    )}
                  </div>

                  <div className="product-body">
                    <h3>{product.name}</h3>
                    <span className="product-model">{product.model}</span>
                    <p className="product-desc">{product.description}</p>
                    <span className="product-spec">{product.keySpec}</span>

                    <div className="product-actions">
                      <Link
                        href={`/en/products/${product.slug}`}
                        className="btn-view"
                      >
                        View Details →
                      </Link>
                      <Link
                        href="/en/contact"
                        className="btn-quote"
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* === Certification Display === */}
        <section className="certifications-section">
          <h2>Quality Certifications & Compliance</h2>
          <CertificationDisplay />
        </section>

        {/* === CTA Section === */}
        <section className="cta-section">
          <h2>Need a Custom Product or OEM/ODM Quote?</h2>
          <p>
            Our R&D team can develop custom products from your specifications.
            MOQ starts at 500 pcs for customised orders. Get wholesale pricing
            within 24 hours.
          </p>
          <div className="cta-buttons">
            <Link href="/en/contact" className="btn-primary btn-large">
              Request a Quote
            </Link>
            <Link href="/en/about" className="btn-secondary btn-large">
              About HousePlus
            </Link>
          </div>
        </section>
      </div>

      {/* ====================================================================
          STYLED-JSX
          ==================================================================== */}
      <style jsx>{`
        .product-list-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif;
          color: #1a1a2e;
        }

        /* === Breadcrumb === */
        .breadcrumb-container {
          padding: 12px 0;
          border-bottom: 1px solid #e7eaf0;
          margin-bottom: 32px;
        }

        /* === Page Header === */
        .page-header {
          text-align: center;
          padding: 24px 0 40px;
        }

        .page-header h1 {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 14px;
          line-height: 1.25;
        }

        .page-intro {
          font-size: 16px;
          line-height: 1.7;
          color: #475569;
          max-width: 700px;
          margin: 0 auto;
        }

        /* === Category Filter === */
        .category-filter {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          background: #e8f0fe;
          border-color: #E85D2F;
          color: #E85D2F;
        }

        .filter-icon {
          font-size: 18px;
        }

        /* === Product Category Section === */
        .product-category {
          padding: 48px 0;
          border-top: 1px solid #e7eaf0;
        }

        .category-title {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .category-icon {
          font-size: 28px;
        }

        .category-desc {
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
          margin: 0 0 28px;
          max-width: 800px;
        }

        /* === Product Grid === */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        /* === Product Card === */
        .product-card {
          background: #ffffff;
          border: 1px solid #e7eaf0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
          transition: box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          box-shadow: 0 12px 32px rgba(16, 24, 40, 0.1);
          transform: translateY(-4px);
        }

        /* === Product Image === */
        .product-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background: #f1f5f9;
        }

        .product-image-wrap :global(img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }

        .product-card:hover .product-image-wrap :global(img) {
          transform: scale(1.05);
        }

        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          background: #E85D2F;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.04em;
        }

        /* === Product Body === */
        .product-body {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-body h3 {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 6px;
          line-height: 1.4;
        }

        .product-model {
          font-size: 12px;
          font-family: 'Courier New', monospace;
          color: #E85D2F;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .product-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #64748b;
          margin: 0 0 10px;
          flex: 1;
        }

        .product-spec {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: #15803d;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 14px;
          align-self: flex-start;
        }

        /* === Product Actions === */
        .product-actions {
          display: flex;
          gap: 8px;
        }

        .btn-view,
        .btn-quote {
          display: inline-block;
          flex: 1;
          text-align: center;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }

        .btn-view {
          color: #ffffff;
          background: #E85D2F;
          border: 1px solid #E85D2F;
        }

        .btn-view:hover {
          background: #0052a3;
          border-color: #0052a3;
        }

        .btn-quote {
          color: #E85D2F;
          background: #ffffff;
          border: 1px solid #E85D2F;
        }

        .btn-quote:hover {
          background: #e8f0fe;
        }

        /* === Certifications Section === */
        .certifications-section {
          padding: 48px 0;
          border-top: 1px solid #e7eaf0;
        }

        .certifications-section h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 24px;
          text-align: center;
        }

        /* === CTA Section === */
        .cta-section {
          text-align: center;
          padding: 56px 20px;
          margin: 48px 0;
          background: linear-gradient(135deg, #E85D2F 0%, #c1121f 100%);
          border-radius: 20px;
        }

        .cta-section h2 {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 12px;
        }

        .cta-section p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.88);
          max-width: 600px;
          margin: 0 auto 28px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* === Buttons === */
        .btn-primary,
        .btn-secondary {
          display: inline-block;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }

        .btn-primary {
          color: #E85D2F;
          background: #ffffff;
          border: 2px solid #ffffff;
        }

        .btn-primary:hover {
          background: #f0f4f8;
        }

        .btn-secondary {
          color: #ffffff;
          background: transparent;
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
          .page-header h1 {
            font-size: 24px;
          }

          .page-intro {
            font-size: 14px;
          }

          .category-title {
            font-size: 22px;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .cta-section {
            padding: 40px 16px;
            border-radius: 14px;
          }

          .cta-section h2 {
            font-size: 22px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }
        }

        @media (max-width: 480px) {
          .product-list-page {
            padding: 0 12px;
          }

          .category-filter {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-btn {
            justify-content: center;
          }

          .product-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}

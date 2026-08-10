/**
 * HousePlus Product Detail Page — Optimized Template (Refactored)
 *
 * REFACTOR: Migrated from raw HTML tags to modular Next.js SEO components.
 *
 * Components used:
 * 1. SEOHead            — meta tags + JSON-LD injection
 * 2. Breadcrumb          — breadcrumb nav + BreadcrumbList Schema
 * 3. ProductGallery      — image gallery + Lightbox + ImageGallery Schema
 * 4. ProductReviews      — customer reviews + AggregateRating Schema
 * 5. FAQSection          — FAQ accordion + FAQPage Schema
 * 6. InternalLinking     — related products + cross-category links
 * 7. ProductComparison   — product comparison table
 * 8. HreflangTags        — multi-language hreflang tags
 * 9. OptimizedImage      — next/image wrapper for image optimization
 * 10. ProductSchema       — Product JSON-LD via SchemaOrg
 * 11. next/link <Link>   — client-side navigation (replaces raw <a>)
 * 12. siteConfig + generateProductMeta — centralized SEO config
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import ProductGallery from '../components/ProductGallery';
import ProductReviews from '../components/ProductReviews';
import FAQSection from '../components/FAQSection';
import InternalLinking from '../components/InternalLinking';
import ProductComparison from '../components/ProductComparison';
import HreflangTags from '../components/HreflangTags';
import OptimizedImage from '../components/OptimizedImage';
import { ProductSchema } from '../components/SchemaOrg';
import { siteConfig, generateProductMeta } from '../config/seo-config';

// ============================================================================
// ENHANCED PRODUCT DATA (Example: 500W Solar Panel)
// ============================================================================

const productData = {
  slug: 'solar-panel-500w',
  name: '500W Monocrystalline Solar Panel',
  model: 'HP-SP500',
  category: 'Solar Energy Systems',
  shortDesc:
    'High-efficiency monocrystalline solar panel with 21.5% conversion rate, engineered for residential, commercial and off-grid installations worldwide.',
  // Wholesale pricing (USD per unit) — used for Product Schema offers field
  price: 95,
  priceCurrency: 'USD',

  // === Full technical specifications (20 params) ===
  specs: [
    { label: 'Model', value: 'HP-SP500' },
    { label: 'Peak Power (Pmax)', value: '500W' },
    { label: 'Cell Type', value: 'Monocrystalline PERC' },
    { label: 'Efficiency', value: '21.5%' },
    { label: 'Open Circuit Voltage (Voc)', value: '49.8V' },
    { label: 'Short Circuit Current (Isc)', value: '13.12A' },
    { label: 'Maximum Power Voltage (Vmp)', value: '41.5V' },
    { label: 'Maximum Power Current (Imp)', value: '12.05A' },
    { label: 'Cell Efficiency', value: '22.8%' },
    { label: 'Dimensions (L×W×H)', value: '2278 × 1134 × 35 mm' },
    { label: 'Weight', value: '27.5 kg' },
    { label: 'Temperature Coefficient (Pmax)', value: '-0.35%/°C' },
    { label: 'Temperature Coefficient (Voc)', value: '-0.27%/°C' },
    { label: 'Operating Temperature', value: '-40°C to +85°C' },
    { label: 'Maximum System Voltage', value: '1500V DC (IEC)' },
    { label: 'Junction Box', value: 'IP68 rated, 3 bypass diodes' },
    { label: 'Connector', value: 'MC4 compatible' },
    { label: 'Frame', value: 'Anodised aluminium alloy' },
    { label: 'Front Glass', value: '3.2mm tempered glass, AR coated' },
    { label: 'Certifications', value: 'CE, RoHS, IEC 61215, IEC 61730' },
  ],

  keyFeatures: [
    'Anti-reflective tempered glass surface for maximum light absorption in all weather conditions',
    'Anodised aluminium alloy frame — corrosion-resistant and lightweight, designed for 25+ year outdoor durability',
    'IP68-rated junction box with 3 bypass diodes for superior shading protection and system reliability',
    'PERC (Passivated Emitter Rear Cell) technology boosts energy yield by 3-5% compared to standard mono cells',
    'PID-resistant cell design ensures long-term performance stability in high-humidity environments',
    'Low-temperature coefficient (-0.35%/°C) maintains high output even in hot climates',
    '1500V system voltage rating supports large-scale commercial and utility installations',
    'MC4 compatible connectors for plug-and-play installation with all standard solar equipment',
  ],

  applications: [
    {
      title: 'Residential Rooftop Systems',
      desc: 'Ideal for home solar installations with limited roof space, maximising power output per square metre.',
      image:
        'https://images.houseplus-ch.com/applications/residential-rooftop-solar.jpg',
    },
    {
      title: 'Commercial Solar Farms',
      desc: '1500V system voltage rating makes it suitable for large-scale commercial and utility-scale projects.',
      image:
        'https://images.houseplus-ch.com/applications/commercial-solar-farm.jpg',
    },
    {
      title: 'Off-Grid & Remote Power',
      desc: 'Pairs with charge controllers and batteries for off-grid cabins, telecommunications, and rural electrification.',
      image:
        'https://images.houseplus-ch.com/applications/off-grid-solar-power.jpg',
    },
    {
      title: 'Agricultural & Irrigation',
      desc: 'Powers solar water pumps and agricultural equipment in remote farming locations without grid access.',
      image:
        'https://images.houseplus-ch.com/applications/solar-irrigation-system.jpg',
    },
  ],

  installation: [
    'Ensure roof or mounting structure can support 27.5 kg per panel weight',
    'Use corrosion-resistant mounting brackets compatible with aluminium frame (40mm profile)',
    'Connect panels in series or parallel based on your charge controller/inverter specifications',
    'Maintain minimum 10mm gap between panels for thermal expansion',
    'Use MC4 connectors — do not cut or splice cables to maintain IP68 waterproof rating',
    'Angle panels at local latitude ±15° for optimal year-round energy harvest',
    'Have a certified electrician perform final DC and AC connections',
  ],

  faqs: [
    {
      q: 'What is the MOQ for the 500W solar panel?',
      a: 'The minimum order quantity is 100 pieces. For OEM/ODM customisation (logo printing, custom packaging, modified specs), MOQ is 500 pieces. Volume discounts apply for orders above 1,000 pieces.',
    },
    {
      q: 'What certifications does this solar panel have?',
      a: 'The HP-SP500 is certified to CE, RoHS, IEC 61215 (design qualification), and IEC 61730 (safety qualification) standards. These certifications ensure compliance with European, Middle Eastern, African, and most Asian market requirements. Full certificate PDFs are available upon request.',
    },
    {
      q: 'What is the lead time and warranty?',
      a: 'Standard lead time is 20-35 days from order confirmation. The panel comes with a 12-year product warranty and 25-year linear power output warranty (80% power at year 25).',
    },
    {
      q: 'Can I get OEM/ODM customisation?',
      a: 'Yes. We offer custom logo printing on the frame and junction box, custom packaging with your brand design, and specification modifications (cell efficiency, dimensions, electrical parameters) from MOQ 500 pieces. Our R&D team works with you from concept to mass production.',
    },
    {
      q: 'Do you provide installation support?',
      a: 'While we do not install panels directly, we provide complete installation manuals, wiring diagrams, and technical consultation via WhatsApp/Email. For large orders (1,000+ pieces), we can arrange an on-site technical supervisor at cost.',
    },
    {
      q: 'How are the panels packed for shipping?',
      a: 'Panels are packed in vertical cartons (2 panels per carton for 500W) with foam corner protectors and EPE padding. Each pallet holds 26-30 panels. Full container load (40HQ) accommodates approximately 600-650 panels. Packaging is export-grade and suitable for sea freight.',
    },
  ],

  // === Product images with intrinsic dimensions (required by ProductGallery) ===
  images: [
    {
      src: 'https://images.houseplus-ch.com/products/solar-panel-500w-front.jpg',
      alt: '500W Monocrystalline Solar Panel HP-SP500 front view — full panel with aluminium frame',
      width: 1200,
      height: 1200,
    },
    {
      src: 'https://images.houseplus-ch.com/products/solar-panel-500w-back.jpg',
      alt: '500W Solar Panel rear view — junction box and cable detail',
      width: 1200,
      height: 1200,
    },
    {
      src: 'https://images.houseplus-ch.com/products/solar-panel-500w-cell.jpg',
      alt: '500W Solar Panel close-up — monocrystalline PERC cell detail',
      width: 1200,
      height: 1200,
    },
    {
      src: 'https://images.houseplus-ch.com/products/solar-panel-500w-frame.jpg',
      alt: '500W Solar Panel frame corner — anodised aluminium alloy detail',
      width: 1200,
      height: 1200,
    },
    {
      src: 'https://images.houseplus-ch.com/products/solar-panel-500w-installation.jpg',
      alt: '500W Solar Panel installation on commercial rooftop',
      width: 1200,
      height: 800,
    },
    {
      src: 'https://images.houseplus-ch.com/products/solar-panel-500w-warehouse.jpg',
      alt: 'HousePlus solar panel warehouse — 500W panels ready for export',
      width: 1200,
      height: 800,
    },
  ],
};

// ============================================================================
// CUSTOMER REVIEW DATA (verified wholesale buyers from different countries)
// ============================================================================

const reviewData = [
  {
    author: 'Hans Müller',
    country: 'DE',
    rating: 5,
    date: '2025-05-12',
    content:
      'Excellent build quality and the 21.5% efficiency is confirmed in our field tests. We ordered 800 panels for a commercial rooftop project near Munich and every single one passed our QA inspection. The MC4 connectors and IP68 junction box give us confidence for the 25-year warranty period. HousePlus handled the OEM branding flawlessly.',
  },
  {
    author: 'Carlos Rodríguez',
    country: 'ES',
    rating: 5,
    date: '2025-04-28',
    content:
      'We are a solar distributor in Madrid and have been working with HousePlus for two years. The HP-SP500 is our best-selling panel — the low temperature coefficient is a huge advantage in southern Spain where rooftop temperatures exceed 60°C. Shipping via 40HQ container was well-packed with zero breakage. Lead time was 28 days as promised.',
  },
  {
    author: 'Aisha Al-Rashid',
    country: 'AE',
    rating: 4,
    date: '2025-04-10',
    content:
      'The panels perform exceptionally well in the desert heat of the UAE. The -0.35%/°C temperature coefficient means we lose very little output even at 50°C ambient. Took off one star because the initial sample took 12 days to arrive, but the bulk order production was on schedule. Overall a reliable manufacturer for Middle East projects.',
  },
  {
    author: 'James Thompson',
    country: 'GB',
    rating: 5,
    date: '2025-03-22',
    content:
      'Outstanding OEM/ODM service. HousePlus printed our company logo on the frame, junction box, and custom packaging without any quality issues. The IEC 61215 and 61730 certifications were provided as digital PDFs within 24 hours of request. Our UK customers are very happy with the product. Will definitely reorder for the next container.',
  },
  {
    author: 'Priya Sharma',
    country: 'IN',
    rating: 4,
    date: '2025-02-15',
    content:
      'We imported 1,200 panels for a rural electrification project in Rajasthan. The 1500V system voltage rating allowed us to design longer string configurations, reducing our balance-of-system costs significantly. The PERC cell technology gives 3-4% more yield than the polycrystalline panels we previously used. Customer support via WhatsApp was responsive and helpful.',
  },
];

// ============================================================================
// AGGREGATE RATING SUMMARY
// ============================================================================

const aggregateRating = 4.7;
const totalReviewCount = 23;

// ============================================================================
// PRODUCT DETAIL PAGE COMPONENT
// ============================================================================

export default function ProductDetailPage() {
  const product = productData;

  // --- Generate SEO metadata via centralised config helper ---
  const seoMeta = generateProductMeta({
    name: product.name,
    slug: product.slug,
    certifications: ['CE', 'RoHS', 'IEC 61215', 'IEC 61730'],
    image: product.images[0].src,
  });

  // --- Build keywords from product data for long-tail coverage ---
  const keywords = `${product.name}, ${product.model}, ${product.category.toLowerCase()}, wholesale solar panel, monocrystalline solar panel manufacturer, PERC solar panel, OEM solar panel China, 500W solar panel`;

  // --- Generate Product JSON-LD via SchemaOrg helper ---
  const productJsonLd = ProductSchema({
    name: product.name,
    slug: product.slug,
    description: product.shortDesc,
    image: product.images[0].src,
    brand: siteConfig.name,
    model: product.model,
    category: product.category,
    certifications: ['CE', 'RoHS', 'IEC 61215', 'IEC 61730', 'ISO 9001'],
    minOrderQuantity: 100,
    price: product.price,
    priceCurrency: product.priceCurrency,
    availability: 'https://schema.org/InStock',
    ratingValue: aggregateRating,
    reviewCount: totalReviewCount,
  });

  // --- Map faqs from {q, a} to {question, answer} for FAQSection ---
  const faqItems = product.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }));

  // --- Breadcrumb navigation items ---
  const breadcrumbItems = [
    { name: 'Home', href: '' },
    { name: 'Products', href: '/products' },
    {
      name: product.category,
      href: `/products?category=${product.category
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
    },
    { name: product.name },
  ];

  return (
    <>
      {/* === SEO Head: meta tags, OG, Twitter, canonical, JSON-LD === */}
      <SEOHead
        title={seoMeta.title}
        description={seoMeta.description}
        keywords={keywords}
        canonical={seoMeta.canonical}
        ogImage={seoMeta.ogImage}
        ogType="product"
        jsonLd={productJsonLd}
      />

      {/* === Hreflang tags for multi-language SEO === */}
      <HreflangTags path={`/products/${product.slug}`} />

      {/* === Preload hero image for LCP optimisation === */}
      <Head>
        <link rel="preload" as="image" href={product.images[0].src} />
      </Head>

      <div className="product-detail-page">
        {/* === Breadcrumb navigation === */}
        <div className="breadcrumb-container">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* === Product header: gallery + summary === */}
        <div className="product-layout">
          {/* Image gallery (replaces raw <img> tags) */}
          <div className="product-gallery-wrap">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Product summary */}
          <div className="product-info">
            <span className="product-model">Model: {product.model}</span>
            <h1>{product.name}</h1>
            <p className="product-intro">{product.shortDesc}</p>

            {/* Trust badges */}
            <div className="trust-badges">
              <span className="badge">CE Certified</span>
              <span className="badge">RoHS Compliant</span>
              <span className="badge">ISO 9001</span>
              <span className="badge">IEC 61215/61730</span>
              <span className="badge">OEM/ODM Available</span>
            </div>

            {/* Quick stats */}
            <div className="quick-stats">
              <div className="stat">
                <span className="stat-value">21.5%</span>
                <span className="stat-label">Efficiency</span>
              </div>
              <div className="stat">
                <span className="stat-value">500W</span>
                <span className="stat-label">Peak Power</span>
              </div>
              <div className="stat">
                <span className="stat-value">25 yr</span>
                <span className="stat-label">Power Warranty</span>
              </div>
              <div className="stat">
                <span className="stat-value">100 pcs</span>
                <span className="stat-label">MOQ</span>
              </div>
            </div>

            {/* CTA buttons (using next/link Link instead of raw <a>) */}
            <div className="product-cta">
              <Link href="/en/contact" className="btn-primary">
                Request a Quote
              </Link>
              <Link href="/en/products" className="btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        </div>

        {/* === SECTION 1: Technical Specifications === */}
        <section className="content-section">
          <h2 className="section-title">Technical Specifications</h2>
          <div className="table-wrap">
            <table className="specs-table">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={i}>
                    <th>{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* === SECTION 2: Key Features === */}
        <section className="content-section">
          <h2 className="section-title">Key Features &amp; Technology</h2>
          <ul className="features-list">
            {product.keyFeatures.map((feature, i) => (
              <li key={i}>
                <span className="feature-check" aria-hidden="true">
                  &#10003;
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* === SECTION 3: Applications (uses OptimizedImage) === */}
        <section className="content-section">
          <h2 className="section-title">Applications &amp; Use Cases</h2>
          <div className="applications-grid">
            {product.applications.map((app, i) => (
              <div key={i} className="application-card">
                <div className="application-image">
                  <OptimizedImage
                    src={app.image}
                    alt={`${app.title} — ${product.name} application scenario`}
                    width={400}
                    height={260}
                    loading="lazy"
                    quality={80}
                  />
                </div>
                <div className="application-body">
                  <h3>{app.title}</h3>
                  <p>{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === SECTION 4: Installation Guide === */}
        <section className="content-section">
          <h2 className="section-title">Installation Guide</h2>
          <ol className="installation-steps">
            {product.installation.map((step, i) => (
              <li key={i}>
                <span className="step-number">{i + 1}</span>
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* === SECTION 5: Wholesale & OEM/ODM Information === */}
        <section className="content-section">
          <h2 className="section-title">Wholesale &amp; OEM/ODM Information</h2>
          <div className="order-info">
            <div className="order-card">
              <h3>Minimum Order</h3>
              <p>100 pcs (standard) / 500 pcs (OEM/ODM with custom branding)</p>
            </div>
            <div className="order-card">
              <h3>Lead Time</h3>
              <p>20-35 days from order confirmation</p>
            </div>
            <div className="order-card">
              <h3>Warranty</h3>
              <p>12-year product warranty + 25-year linear power output warranty</p>
            </div>
            <div className="order-card">
              <h3>Packaging</h3>
              <p>
                2 panels per carton, 26-30 panels per pallet, ~600-650 panels per
                40HQ container
              </p>
            </div>
          </div>
        </section>

        {/* === SECTION 6: Product Reviews (AggregateRating + Review Schema) === */}
        <ProductReviews
          productName={product.name}
          productSlug={product.slug}
          rating={aggregateRating}
          reviewCount={totalReviewCount}
          reviews={reviewData}
        />

        {/* === SECTION 7: FAQ (FAQPage Schema) === */}
        <FAQSection
          title="Frequently Asked Questions — 500W Solar Panel"
          faqs={faqItems}
        />

        {/* === SECTION 8: Product Comparison Table === */}
        <ProductComparison />

        {/* === SECTION 9: Internal Linking (related products + cross-links) === */}
        <InternalLinking
          currentProductSlug={product.slug}
          showRelatedProducts={true}
          showCrossLinks={true}
        />

        {/* === Final CTA === */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to Source {product.name}?</h2>
          <p className="cta-desc">
            Get wholesale pricing within 24 hours. OEM/ODM customisation
            available from 500 pcs. CE, RoHS, IEC certified for global markets.
          </p>
          <div className="cta-buttons">
            <Link href="/en/contact" className="btn-primary btn-large">
              Request a Quote
            </Link>
            <Link href="/en/products" className="btn-secondary btn-large">
              &larr; Back to Products
            </Link>
          </div>
        </section>
      </div>

      {/* ====================================================================
          STYLED-JSX — scoped page styles
          ==================================================================== */}
      <style jsx>{`
        .product-detail-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif;
          color: #1a1a2e;
        }

        /* === Breadcrumb container === */
        .breadcrumb-container {
          padding: 12px 0;
          border-bottom: 1px solid #e7eaf0;
          margin-bottom: 32px;
        }

        /* === Product layout: gallery + info side-by-side === */
        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
          margin-bottom: 56px;
        }

        .product-gallery-wrap {
          position: sticky;
          top: 20px;
        }

        /* === Product info column === */
        .product-info {
          padding: 8px 0;
        }

        .product-model {
          display: inline-block;
          font-size: 13px;
          font-family: 'Courier New', monospace;
          color: #E85D2F;
          background: #e8f0fe;
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .product-info h1 {
          font-size: 30px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0 0 14px;
          color: #0f172a;
        }

        .product-intro {
          font-size: 16px;
          line-height: 1.7;
          color: #475569;
          margin: 0 0 24px;
        }

        /* === Trust badges === */
        .trust-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          color: #15803d;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 5px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }

        /* === Quick stats grid === */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 14px 8px;
          background: #f8fafc;
          border: 1px solid #e7eaf0;
          border-radius: 10px;
        }

        .stat-value {
          font-size: 22px;
          font-weight: 800;
          color: #E85D2F;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* === Product CTA === */
        .product-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* === Content sections === */
        .content-section {
          padding: 48px 0;
          border-top: 1px solid #e7eaf0;
        }

        .section-title {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 28px;
        }

        /* === Specs table === */
        .table-wrap {
          overflow-x: auto;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 500px;
        }

        .specs-table th,
        .specs-table td {
          padding: 12px 18px;
          font-size: 14px;
          border-bottom: 1px solid #f1f5f9;
          text-align: left;
        }

        .specs-table th {
          background: #f8fafc;
          font-weight: 600;
          color: #334155;
          white-space: nowrap;
          width: 45%;
        }

        .specs-table td {
          color: #475569;
        }

        .specs-table tr:last-child th,
        .specs-table tr:last-child td {
          border-bottom: none;
        }

        /* === Features list === */
        .features-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .features-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          line-height: 1.6;
          color: #334155;
        }

        .feature-check {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          font-size: 12px;
          font-weight: 700;
          color: #15803d;
          background: #f0fdf4;
          border-radius: 50%;
          margin-top: 1px;
        }

        /* === Applications grid === */
        .applications-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .application-card {
          background: #ffffff;
          border: 1px solid #e7eaf0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .application-card:hover {
          box-shadow: 0 8px 24px rgba(16, 24, 40, 0.1);
          transform: translateY(-2px);
        }

        .application-image {
          width: 100%;
          aspect-ratio: 400 / 260;
          overflow: hidden;
          background: #f1f5f9;
        }

        .application-image :global(img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          display: block;
        }

        .application-body {
          padding: 18px 20px 22px;
        }

        .application-body h3 {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px;
        }

        .application-body p {
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
        }

        /* === Installation steps === */
        .installation-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .installation-steps li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          background: #f8fafc;
          border: 1px solid #e7eaf0;
          border-radius: 10px;
        }

        .step-number {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          background: #E85D2F;
          border-radius: 50%;
        }

        .step-text {
          font-size: 14px;
          line-height: 1.6;
          color: #334155;
          padding-top: 4px;
        }

        /* === Order info cards === */
        .order-info {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .order-card {
          padding: 20px;
          background: #f8fafc;
          border: 1px solid #e7eaf0;
          border-radius: 12px;
        }

        .order-card h3 {
          font-size: 14px;
          font-weight: 700;
          color: #E85D2F;
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .order-card p {
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }

        /* === CTA section === */
        .cta-section {
          text-align: center;
          padding: 64px 20px;
          margin-top: 48px;
          background: linear-gradient(135deg, #E85D2F 0%, #c1121f 100%);
          border-radius: 20px;
        }

        .cta-title {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 12px;
        }

        .cta-desc {
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
        .btn-primary {
          display: inline-block;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          background: #E85D2F;
          border: 2px solid #E85D2F;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.1s;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #0052a3;
          border-color: #0052a3;
        }

        .btn-primary:active {
          transform: translateY(1px);
        }

        .btn-secondary {
          display: inline-block;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          color: #E85D2F;
          background: #ffffff;
          border: 2px solid #E85D2F;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.1s;
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: #e8f0fe;
        }

        .btn-secondary:active {
          transform: translateY(1px);
        }

        .btn-large {
          padding: 14px 34px;
          font-size: 16px;
        }

        /* CTA primary button variant on gradient background */
        .cta-section .btn-primary {
          background: #ffffff;
          color: #E85D2F;
          border-color: #ffffff;
        }

        .cta-section .btn-primary:hover {
          background: #f0f4f8;
        }

        .cta-section .btn-secondary {
          background: transparent;
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.6);
        }

        .cta-section .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #ffffff;
        }

        /* === Responsive === */
        @media (max-width: 1024px) {
          .features-list {
            grid-template-columns: 1fr;
          }

          .order-info {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .product-gallery-wrap {
            position: static;
          }

          .product-info h1 {
            font-size: 24px;
          }

          .quick-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .applications-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 22px;
          }

          .cta-section {
            padding: 40px 16px;
            border-radius: 14px;
          }

          .cta-title {
            font-size: 22px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-buttons :global(a) {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .product-detail-page {
            padding: 0 12px;
          }

          .quick-stats {
            grid-template-columns: 1fr 1fr;
          }

          .stat-value {
            font-size: 18px;
          }

          .order-info {
            grid-template-columns: 1fr;
          }

          .content-section {
            padding: 32px 0;
          }

          .specs-table th,
          .specs-table td {
            padding: 10px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}

/**
 * HousePlus Internal Linking System
 * 
 * ISSUE: Products have no cross-links; homepage 49 links but products are isolated
 * FIX: Automated related-products and cross-category linking component
 */

import React from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';

interface RelatedProduct {
  slug: string;
  name: string;
  model: string;
  category: string;
  image: string;
  reason: string;
}

interface InternalLinkItem {
  href: string;
  label: string;
  description: string;
}

// Related products map — defines which products link to each other
const relatedProductsMap: Record<string, RelatedProduct[]> = {
  'solar-panel-500w': [
    { slug: 'solar-inverter-3kw', name: '3kW Pure Sine Wave Solar Inverter', model: 'HP-INV3000', category: 'solar', image: '/images/products/solar-inverter-3kw-thumb.jpg', reason: 'Required to convert solar panel DC output to AC' },
    { slug: 'lithium-battery-5kwh', name: '5kWh LiFePO4 Lithium Battery', model: 'HP-LFP5K', category: 'solar', image: '/images/products/lithium-battery-5kwh-thumb.jpg', reason: 'Store solar energy for off-grid use' },
    { slug: 'charge-controller-60a', name: 'MPPT Solar Charge Controller 60A', model: 'HP-MPPT60', category: 'solar', image: '/images/products/charge-controller-60a-thumb.jpg', reason: 'Regulate charging between panels and battery' },
    { slug: 'solar-panel-300w', name: '300W Polycrystalline Solar Panel', model: 'HP-SP300', category: 'solar', image: '/images/products/solar-panel-300w-thumb.jpg', reason: 'Alternative panel for smaller installations' },
  ],
  'solar-inverter-3kw': [
    { slug: 'solar-panel-500w', name: '500W Monocrystalline Solar Panel', model: 'HP-SP500', category: 'solar', image: '/images/products/solar-panel-500w-thumb.jpg', reason: 'Pairs with this inverter for 3kW systems' },
    { slug: 'lithium-battery-5kwh', name: '5kWh LiFePO4 Lithium Battery', model: 'HP-LFP5K', category: 'solar', image: '/images/products/lithium-battery-5kwh-thumb.jpg', reason: 'Battery storage for off-grid inverter systems' },
    { slug: 'solar-inverter-5kw', name: '5kW Hybrid Solar Inverter', model: 'HP-INV5000', category: 'solar', image: '/images/products/solar-inverter-5kw-thumb.jpg', reason: 'Higher capacity alternative for larger homes' },
  ],
  'air-fryer-5-8l': [
    { slug: 'induction-cooktop-2000w', name: '2000W Induction Cooktop', model: 'HP-IC2000', category: 'appliances', image: '/images/products/induction-cooktop-2000w-thumb.jpg', reason: 'Complementary kitchen appliance' },
    { slug: 'electric-kettle-1-5l', name: '1.5L Stainless Steel Electric Kettle', model: 'HP-EK15', category: 'appliances', image: '/images/products/electric-kettle-1-5l-thumb.jpg', reason: 'Popular kitchen bundle item' },
    { slug: 'blender-1-5l', name: '1.5L Glass Jar Blender', model: 'HP-BL15', category: 'appliances', image: '/images/products/blender-1-5l-thumb.jpg', reason: 'Complete kitchen appliance set' },
  ],
};

// Cross-category links for SEO topical authority
const crossCategoryLinks: InternalLinkItem[] = [
  { href: '/en/products?category=solar', label: 'Solar Energy Systems', description: 'Panels, inverters, batteries & off-grid kits' },
  { href: '/en/products?category=appliances', label: 'Home Appliances', description: 'Air fryers, cooktops, kettles & more' },
  { href: '/en/products?category=electronics', label: '3C Electronics', description: 'TWS earphones, smart watches & accessories' },
  { href: '/en/about-us', label: 'About HousePlus', description: '15-year manufacturing history since 2010' },
  { href: '/en/factory', label: 'Factory Tour', description: '20,000 m² ISO 9001 certified facility' },
  { href: '/en/contact', label: 'Request a Quote', description: 'Get wholesale pricing within 24 hours' },
  { href: '/en/news', label: 'Industry News', description: 'Solar energy guides and market insights' },
];

interface InternalLinkingProps {
  currentProductSlug?: string;
  showRelatedProducts?: boolean;
  showCrossLinks?: boolean;
}

export default function InternalLinking({
  currentProductSlug,
  showRelatedProducts = true,
  showCrossLinks = true,
}: InternalLinkingProps) {
  const relatedProducts = currentProductSlug
    ? relatedProductsMap[currentProductSlug] || []
    : [];

  return (
    <div className="internal-linking">
      {/* Related Products Section */}
      {showRelatedProducts && relatedProducts.length > 0 && (
        <section className="related-section">
          <h2>Related Products</h2>
          <p className="section-intro">
            Frequently purchased together — build a complete solution:
          </p>
          <div className="related-grid">
            {relatedProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/en/products/${product.slug}`}
                className="related-card"
              >
                <div className="related-image-wrap">
                  <OptimizedImage
                    src={product.image}
                    alt={`${product.name} — ${product.model}`}
                    width={200}
                    height={200}
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                <div className="related-info">
                  <h3>{product.name}</h3>
                  <span className="related-model">{product.model}</span>
                  <p className="related-reason">{product.reason}</p>
                </div>
                <span className="related-cta">View Details →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Cross-Category Navigation */}
      {showCrossLinks && (
        <section className="cross-links-section">
          <h2>Explore More</h2>
          <div className="cross-links-grid">
            {crossCategoryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="cross-link-card">
                <h3>{link.label}</h3>
                <p>{link.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Breadcrumb-style text links for SEO crawlers */}
      <nav className="text-link-nav" aria-label="Site navigation">
        <Link href="/en">Home</Link>
        <span className="separator">›</span>
        <Link href="/en/products">Products</Link>
        {currentProductSlug && (
          <>
            <span className="separator">›</span>
            <Link href={`/en/products/${currentProductSlug}`}>
              {currentProductSlug.replace(/-/g, ' ')}
            </Link>
          </>
        )}
      </nav>

      <style jsx>{`
        .internal-linking {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .related-section, .cross-links-section {
          padding: 40px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .related-section h2, .cross-links-section h2 {
          font-size: 22px;
          color: #1e293b;
          margin-bottom: 12px;
        }
        .section-intro {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        .related-card {
          display: flex;
          flex-direction: column;
          padding: 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .related-card:hover {
          border-color: #0ea5e9;
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.12);
          transform: translateY(-3px);
        }
        .related-image-wrap {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .related-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .related-info h3 {
          font-size: 15px;
          color: #1e293b;
          margin-bottom: 4px;
        }
        .related-model {
          font-size: 12px;
          color: #0ea5e9;
          font-family: monospace;
        }
        .related-reason {
          font-size: 13px;
          color: #64748b;
          margin-top: 8px;
          line-height: 1.5;
        }
        .related-cta {
          display: block;
          margin-top: 12px;
          font-size: 13px;
          font-weight: 600;
          color: #0ea5e9;
        }
        .cross-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .cross-link-card {
          display: block;
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .cross-link-card:hover {
          background: #f0f9ff;
          transform: translateX(4px);
        }
        .cross-link-card h3 {
          font-size: 14px;
          color: #1e293b;
          margin-bottom: 4px;
        }
        .cross-link-card p {
          font-size: 12px;
          color: #64748b;
        }
        .text-link-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 20px 0;
          font-size: 13px;
        }
        .text-link-nav a {
          color: #64748b;
          text-decoration: none;
        }
        .text-link-nav a:hover { color: #0ea5e9; }
        .separator { color: #cbd5e1; }
        @media (max-width: 768px) {
          .related-grid { grid-template-columns: 1fr 1fr; }
          .cross-links-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

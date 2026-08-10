/**
 * HousePlus Custom 404 Page
 * 
 * ISSUE: Site lacks a custom 404 page, hurting UX and crawl efficiency
 * FIX: SEO-optimized 404 page with helpful navigation, search, and proper meta
 */

import React from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/seo-config';

export default function Custom404() {
  return (
    <>
      <SEOHead
        title="Page Not Found | HousePlus — Solar & Home Appliances Manufacturer"
        description="The page you are looking for could not be found. Browse HousePlus solar panels, home appliances, and 3C electronics, or contact us for wholesale inquiries."
        robots="noindex, follow"
        canonical={`${siteConfig.url}/404`}
      />

      <div className="error-page">
        <div className="error-container">
          <div className="error-code">404</div>
          <h1>Oops! This page took a day off.</h1>
          <p className="error-message">
            The page you're looking for doesn't exist or has been moved. 
            Don't worry — let's get you back on track.
          </p>

          {/* Search suggestions */}
          <div className="search-section">
            <h2>Popular Pages</h2>
            <div className="quick-links">
              <Link href="/en" className="quick-link">
                <span className="link-icon">🏠</span>
                <span>Home</span>
              </Link>
              <Link href="/en/products" className="quick-link">
                <span className="link-icon">📦</span>
                <span>All Products</span>
              </Link>
              <Link href="/en/products?category=solar" className="quick-link">
                <span className="link-icon">☀️</span>
                <span>Solar Energy</span>
              </Link>
              <Link href="/en/products?category=appliances" className="quick-link">
                <span className="link-icon">🏠</span>
                <span>Home Appliances</span>
              </Link>
              <Link href="/en/products?category=electronics" className="quick-link">
                <span className="link-icon">📱</span>
                <span>3C Electronics</span>
              </Link>
              <Link href="/en/about-us" className="quick-link">
                <span className="link-icon">ℹ️</span>
                <span>About Us</span>
              </Link>
              <Link href="/en/contact" className="quick-link">
                <span className="link-icon">✉️</span>
                <span>Contact</span>
              </Link>
            </div>
          </div>

          {/* Featured products */}
          <div className="featured-section">
            <h2>Featured Products</h2>
            <div className="featured-grid">
              <Link href="/en/products/solar-panel-500w" className="featured-card">
                <h3>500W Monocrystalline Solar Panel</h3>
                <p>High-efficiency PERC cells, 21.5% conversion rate</p>
              </Link>
              <Link href="/en/products/solar-inverter-3kw" className="featured-card">
                <h3>3kW Pure Sine Wave Inverter</h3>
                <p>Off-grid solar inverter with MPPT charge controller</p>
              </Link>
              <Link href="/en/products/air-fryer-5-8l" className="featured-card">
                <h3>5.8L Digital Air Fryer</h3>
                <p>Healthy cooking, CE/RoHS certified, OEM available</p>
              </Link>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="contact-cta">
            <h2>Need Help Finding Something?</h2>
            <p>Our team is ready to assist you with any product inquiries.</p>
            <div className="cta-buttons">
              <a href={`mailto:${siteConfig.email}`} className="btn-primary">
                Email Us
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        .error-container {
          max-width: 800px;
          width: 100%;
          text-align: center;
        }
        .error-code {
          font-size: 120px;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #0ea5e9, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }
        .error-page h1 {
          font-size: 28px;
          color: #1e293b;
          margin-bottom: 12px;
        }
        .error-message {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 40px;
        }
        .error-page h2 {
          font-size: 18px;
          color: #334155;
          margin-bottom: 16px;
        }
        .quick-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-bottom: 40px;
        }
        .quick-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          text-decoration: none;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .quick-link:hover {
          border-color: #0ea5e9;
          color: #0ea5e9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
        }
        .link-icon { font-size: 18px; }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }
        .featured-card {
          display: block;
          padding: 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none;
          text-align: left;
          transition: all 0.2s;
        }
        .featured-card:hover {
          border-color: #34d399;
          box-shadow: 0 8px 24px rgba(52, 211, 153, 0.1);
          transform: translateY(-4px);
        }
        .featured-card h3 {
          font-size: 15px;
          color: #1e293b;
          margin-bottom: 6px;
        }
        .featured-card p {
          font-size: 13px;
          color: #64748b;
        }
        .contact-cta {
          padding: 32px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .cta-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 16px;
        }
        .btn-primary, .btn-whatsapp {
          padding: 12px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .btn-primary {
          background: #0ea5e9;
          color: white;
        }
        .btn-primary:hover { background: #0284c7; }
        .btn-whatsapp {
          background: #25d366;
          color: white;
        }
        .btn-whatsapp:hover { background: #128c7e; }
        @media (max-width: 600px) {
          .error-code { font-size: 80px; }
          .error-page h1 { font-size: 22px; }
          .cta-buttons { flex-direction: column; }
        }
      `}</style>
    </>
  );
}

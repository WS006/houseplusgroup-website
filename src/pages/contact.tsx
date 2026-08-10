/**
 * HousePlus Contact Page — SEO-Optimized Template
 * Updated: 2026-07-28
 *
 * SEO IMPACT:
 * 1. ContactPoint Schema — tells Google exactly how customers can reach
 *    sales (phone, email, WhatsApp) and which languages are supported.
 *    Feeds the Knowledge Panel "Contact" card and improves local relevance.
 * 2. Breadcrumb component — BreadcrumbList schema for SERP hierarchy.
 * 3. HreflangTags — multi-language alternates for en/es/de/fr/ar.
 * 4. Contact form fields (name, email, company, product category, message)
 *    capture high-intent leads; the form posts to a /api/contact endpoint
 *    (server-side) so lead data never blocks the static HTML crawl.
 * 5. Embedded Google Map + factory address — reinforces LocalBusiness NAP
 *    (Name, Address, Phone) consistency, a key local-SEO ranking factor.
 * 6. Business hours markup keeps expectations clear and reduces bounce.
 * 7. Social media links (sameAs) cross-reference the Organization schema.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import HreflangTags from '../components/HreflangTags';
import { siteConfig } from '../config/seo-config';

// ============================================================================
// TYPES
// ============================================================================

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  href: string;
  note: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

interface ContactPageProps {
  locale: string;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  productCategory: string;
  message: string;
}

// ============================================================================
// PAGE DATA
// ============================================================================

/** All contact channels displayed as clickable cards. */
const contactMethods: ContactMethod[] = [
  {
    icon: '✉',
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    note: 'Replies within 24 hours, Mon-Sat.',
  },
  {
    icon: '☎',
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`,
    note: 'Sales hotline, GMT+8.',
  },
  {
    icon: '✆',
    label: 'WhatsApp',
    value: siteConfig.whatsapp,
    href: `https://wa.me/${siteConfig.whatsapp}`,
    note: 'Fastest response for quotes.',
  },
  {
    icon: '✱',
    label: 'WeChat',
    value: siteConfig.wechat,
    href: '#contact-form',
    note: `Add by ID: ${siteConfig.wechat}`,
  },
];

/** Product categories for the form select. */
const productCategories: string[] = [
  'Solar Panels',
  'Solar Inverters',
  'Solar Batteries',
  'Charge Controllers',
  'Home Appliances',
  '3C Electronics',
  'OEM / ODM Custom',
  'Other',
];

/** Business hours. */
const businessHours: { day: string; hours: string }[] = [
  { day: 'Monday - Friday', hours: '08:30 - 18:00 (GMT+8)' },
  { day: 'Saturday', hours: '09:00 - 12:00 (GMT+8)' },
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Public Holidays (CN)', hours: 'Closed' },
];

/** Social media profiles — must match Organization.sameAs for consistency. */
const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/houseplus-ch', icon: 'in' },
  { name: 'Facebook', href: 'https://www.facebook.com/houseplus.ch', icon: 'f' },
  { name: 'YouTube', href: 'https://www.youtube.com/@houseplus-ch', icon: '▶' },
  { name: 'Instagram', href: 'https://www.instagram.com/houseplus_ch', icon: '◉' },
  { name: 'X (Twitter)', href: 'https://x.com/houseplus_ch', icon: 'X' },
];

// Google Maps embed URL for the factory location (Zhongshan, Guangdong).
const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps?q=Zhongshan%2C%20Guangdong%2C%20China&output=embed';

// ============================================================================
// CONTACTPOINT SCHEMA
// ============================================================================

/**
 * Builds the schema.org ContactPoint structured data.
 * SEO IMPACT:
 *   - Surfaces phone/email/WhatsApp in the Google Knowledge Panel.
 *   - Declares available languages and areas served, improving relevance
 *     for international buyer queries ("solar manufacturer contact").
 */
function buildContactPointSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.name} — Wholesale Solar & Appliance Manufacturer`,
    url: `${siteConfig.url}/en/contact`,
    description: `Contact ${siteConfig.name} for wholesale solar panels, home appliances, and 3C electronics. Email, phone, WhatsApp, and WeChat support in 5 languages.`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: 'sales',
          areaServed: 'Worldwide',
          availableLanguage: ['English', 'Chinese', 'Spanish', 'German', 'French', 'Arabic'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '18:00',
          },
        },
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.whatsapp,
          contactType: 'sales',
          areaServed: 'Worldwide',
          availableLanguage: ['English', 'Chinese'],
        },
      ],
    },
  };
}

// ============================================================================
// STATIC PROPS
// ============================================================================

/**
 * getStaticProps pre-renders the Contact page as static HTML.
 * SEO IMPACT: fast load + crawlable contact info (NAP consistency).
 */
export const getStaticProps: GetStaticProps<ContactPageProps> = async ({
  locale,
}) => {
  return {
    props: {
      locale: locale || 'en',
    },
  };
};

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function ContactPage({ locale = 'en' }: ContactPageProps) {
  const canonical = `${siteConfig.url}/${locale}/contact`;

  // Breadcrumb items — last item (current page) has no href.
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Contact' },
  ];

  // --- Contact form state ---
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    productCategory: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation — protects lead quality before sending to API.
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    try {
      // POST to server-side endpoint (create /api/contact to handle email/CRM).
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({
          name: '',
          email: '',
          company: '',
          productCategory: '',
          message: '',
        });
      } else {
        setError('Something went wrong. Please email us directly.');
      }
    } catch {
      // Network error fallback — guide the user to email/WhatsApp directly.
      setError('Network error. Please email us or message on WhatsApp.');
    }
  };

  return (
    <>
      {/* ============================================================
          SEO HEAD — page meta + ContactPoint schema
      ============================================================ */}
      <SEOHead
        title={`Contact ${siteConfig.name} | Wholesale Solar & Appliance Manufacturer`}
        description={`Contact ${siteConfig.name} for wholesale solar panels, home appliances & 3C electronics. Email ${siteConfig.email}, call ${siteConfig.phone}, or WhatsApp ${siteConfig.whatsapp}. OEM/ODM, MOQ ${siteConfig.moq}.`}
        keywords={`contact solar manufacturer, wholesale solar panels inquiry, OEM ODM contact China, houseplus contact, solar panel supplier email`}
        canonical={canonical}
        ogImage="https://images.houseplus-ch.com/contact/houseplus-contact-og.jpg"
        ogType="website"
        locale={locale}
        jsonLd={buildContactPointSchema()}
      />

      {/* Hreflang alternates for multi-language SEO */}
      <HreflangTags path="/contact" />

      <div className="page-wrapper">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </div>

        {/* ============================================================
            HEADER
        ============================================================ */}
        <section className="contact-header">
          <div className="header-inner">
            <span className="eyebrow">Get in Touch</span>
            <h1>Contact {siteConfig.name}</h1>
            <p className="header-lead">
              Ready to source wholesale solar panels, home appliances, or 3C
              electronics? Our sales team responds to all inquiries within 24
              hours. Reach us by email, phone, WhatsApp, or the form below.
            </p>
          </div>
        </section>

        {/* ============================================================
            CONTACT METHODS GRID
        ============================================================ */}
        <section className="methods-section">
          <div className="methods-grid">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                className={
                  method.href === '#contact-form' ? 'method-card method-card-static' : 'method-card'
                }
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  method.href.startsWith('http') ? 'noopener noreferrer' : undefined
                }
              >
                <span className="method-icon">{method.icon}</span>
                <span className="method-label">{method.label}</span>
                <span className="method-value">{method.value}</span>
                <span className="method-note">{method.note}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ============================================================
            FORM + INFO LAYOUT
        ============================================================ */}
        <section className="contact-main">
          <div className="main-grid">
            {/* ----- Contact form ----- */}
            <div className="form-card">
              <h2>Send Us a Message</h2>
              <p className="form-intro">
                Tell us about your project and a sales engineer will reply
                within 24 hours with pricing and lead time.
              </p>

              {submitted ? (
                <div className="form-success" role="alert">
                  <span className="success-icon">✓</span>
                  <h3>Thank you! Your message has been sent.</h3>
                  <p>
                    We will reply within 24 hours. For urgent inquiries, message
                    us on{' '}
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        Name <span className="required">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productCategory">Product Category</label>
                      <select
                        id="productCategory"
                        name="productCategory"
                        value={form.productCategory}
                        onChange={handleChange}
                      >
                        <option value="">Select a category</option>
                        {productCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your product needs, target quantity, market, and timeline..."
                      rows={6}
                      required
                    />
                  </div>

                  {error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="btn-primary btn-block">
                    Send Message
                  </button>
                  <p className="form-disclaimer">
                    By submitting, you agree to be contacted about your inquiry.
                    We never share your data with third parties.
                  </p>
                </form>
              )}
            </div>

            {/* ----- Info sidebar ----- */}
            <aside className="info-sidebar">
              {/* Factory address + hours */}
              <div className="info-card">
                <h3>Factory Address</h3>
                <address className="address">
                  {siteConfig.name}
                  <br />
                  {siteConfig.city}, {siteConfig.region}
                  <br />
                  China
                </address>
                <p className="address-note">
                  Visits by appointment only. Contact us to arrange a factory
                  tour or virtual walkthrough.
                </p>
              </div>

              <div className="info-card">
                <h3>Business Hours</h3>
                <ul className="hours-list">
                  {businessHours.map((bh) => (
                    <li key={bh.day} className="hours-item">
                      <span className="hours-day">{bh.day}</span>
                      <span className="hours-time">{bh.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="info-card">
                <h3>Quick Facts</h3>
                <ul className="facts-list">
                  <li>
                    <span>MOQ</span>
                    <strong>{siteConfig.moq}</strong>
                  </li>
                  <li>
                    <span>Lead Time</span>
                    <strong>{siteConfig.leadTime}</strong>
                  </li>
                  <li>
                    <span>Warranty</span>
                    <strong>{siteConfig.warranty}</strong>
                  </li>
                  <li>
                    <span>Founded</span>
                    <strong>{siteConfig.founded}</strong>
                  </li>
                  <li>
                    <span>Countries</span>
                    <strong>{siteConfig.countries}</strong>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ============================================================
            GOOGLE MAP EMBED
        ============================================================ */}
        <section className="map-section">
          <div className="section-header">
            <h2>Find Us</h2>
            <p>
              Our factory is located in {siteConfig.city}, {siteConfig.region},
              China — a major manufacturing hub in the Greater Bay Area, with
              convenient access to Shenzhen and Guangzhou ports.
            </p>
          </div>
          <div className="map-embed">
            <iframe
              src={GOOGLE_MAPS_EMBED}
              title={`${siteConfig.name} factory location in ${siteConfig.city}, ${siteConfig.region}, China`}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        {/* ============================================================
            SOCIAL MEDIA LINKS
        ============================================================ */}
        <section className="social-section">
          <div className="social-inner">
            <h2>Follow {siteConfig.name}</h2>
            <p>
              Stay updated on new products, factory news, and industry insights.
            </p>
            <div className="social-grid">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            FINAL CTA
        ============================================================ */}
        <section className="final-cta">
          <div className="cta-inner">
            <h2>Prefer to Talk Directly?</h2>
            <p>
              Our sales engineers are ready to discuss your wholesale or OEM/ODM
              requirements. Average response time: under 24 hours.
            </p>
            <div className="cta-buttons">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-primary">
                Email Sales Team
              </a>
              <Link href={`/${locale}/products`} className="btn-outline">
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================
          STYLES — styled-jsx, fully responsive
      ============================================================ */}
      <style jsx>{`
        .page-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif;
          color: #1a1a2e;
          background: #ffffff;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 40px;
        }

        .section-header h2 {
          font-size: 30px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0 0 12px;
        }

        .section-header p {
          font-size: 16px;
          line-height: 1.7;
          color: #555;
          margin: 0;
        }

        /* === Header === */
        .contact-header {
          background: linear-gradient(135deg, #E85D2F 0%, #F4C430 100%);
          padding: 56px 20px 64px;
          color: #fff;
          text-align: center;
        }

        .header-inner {
          max-width: 760px;
          margin: 0 auto;
        }

        .eyebrow {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.9;
          margin-bottom: 12px;
        }

        .contact-header h1 {
          font-size: 40px;
          font-weight: 800;
          margin: 0 0 16px;
        }

        .header-lead {
          font-size: 17px;
          line-height: 1.7;
          opacity: 0.95;
          margin: 0;
        }

        /* === Contact methods === */
        .methods-section {
          max-width: 1140px;
          margin: -40px auto 0;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .methods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .method-card {
          background: #fff;
          border-radius: 12px;
          padding: 24px 20px;
          text-align: center;
          text-decoration: none;
          color: #1a1a2e;
          border: 1px solid #eef0f3;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .method-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .method-card-static {
          cursor: default;
        }

        .method-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #fff3ee;
          color: #E85D2F;
          font-size: 22px;
          margin-bottom: 14px;
        }

        .method-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #888;
          margin-bottom: 6px;
        }

        .method-value {
          display: block;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          word-break: break-word;
          margin-bottom: 6px;
        }

        .method-note {
          display: block;
          font-size: 12px;
          color: #999;
        }

        /* === Form + info === */
        .contact-main {
          max-width: 1140px;
          margin: 0 auto;
          padding: 64px 20px;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .form-card {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 36px;
          border: 1px solid #eef0f3;
        }

        .form-card h2 {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 8px;
          color: #1a1a2e;
        }

        .form-intro {
          font-size: 15px;
          color: #666;
          margin: 0 0 28px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 8px;
        }

        .required {
          color: #e53935;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px 14px;
          border: 1px solid #f0d8cc;
          border-radius: 8px;
          font-size: 15px;
          font-family: inherit;
          color: #1a1a2e;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #E85D2F;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.12);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-error {
          color: #e53935;
          font-size: 14px;
          margin: 0;
          padding: 10px 14px;
          background: #fdecea;
          border-radius: 8px;
        }

        .form-disclaimer {
          font-size: 12px;
          color: #999;
          margin: 4px 0 0;
          text-align: center;
        }

        .form-success {
          text-align: center;
          padding: 32px 20px;
        }

        .success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #e8f5e9;
          color: #F4C430;
          font-size: 28px;
          margin-bottom: 16px;
        }

        .form-success h3 {
          font-size: 20px;
          margin: 0 0 8px;
          color: #1a1a2e;
        }

        .form-success p {
          font-size: 15px;
          color: #666;
          margin: 0 0 20px;
        }

        .form-success a {
          color: #E85D2F;
          font-weight: 600;
        }

        /* === Info sidebar === */
        .info-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #eef0f3;
        }

        .info-card h3 {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 14px;
          padding-bottom: 10px;
          border-bottom: 2px solid #E85D2F;
        }

        .address {
          font-style: normal;
          font-size: 15px;
          line-height: 1.7;
          color: #1a1a2e;
          margin: 0 0 10px;
        }

        .address-note {
          font-size: 13px;
          color: #888;
          margin: 0;
        }

        .hours-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .hours-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .hours-item:last-child {
          border-bottom: none;
        }

        .hours-day {
          color: #555;
        }

        .hours-time {
          color: #1a1a2e;
          font-weight: 600;
        }

        .facts-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .facts-list li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .facts-list li:last-child {
          border-bottom: none;
        }

        .facts-list span {
          color: #555;
        }

        .facts-list strong {
          color: #1a1a2e;
        }

        /* === Map === */
        .map-section {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px 64px;
        }

        .map-embed {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .map-embed iframe {
          display: block;
          width: 100%;
        }

        /* === Social === */
        .social-section {
          background: #f8f9fa;
          padding: 64px 20px;
        }

        .social-inner {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .social-inner h2 {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0 0 10px;
        }

        .social-inner p {
          font-size: 15px;
          color: #666;
          margin: 0 0 28px;
        }

        .social-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #1a1a2e;
          background: #fff;
          border: 1px solid #eef0f3;
          border-radius: 12px;
          padding: 20px 24px;
          min-width: 120px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .social-link:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #E85D2F;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        }

        .social-name {
          font-size: 13px;
          font-weight: 600;
        }

        /* === Final CTA === */
        .final-cta {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 64px 20px;
          color: #fff;
        }

        .cta-inner {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-inner h2 {
          font-size: 30px;
          font-weight: 800;
          margin: 0 0 12px;
        }

        .cta-inner p {
          font-size: 16px;
          color: #c8d0e0;
          margin: 0 0 28px;
        }

        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
        }

        /* === Buttons === */
        .btn-primary,
        .btn-outline,
        .btn-whatsapp {
          display: inline-block;
          padding: 13px 30px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
          border: 2px solid transparent;
          font-family: inherit;
        }

        .btn-primary {
          background: #E85D2F;
          color: #fff;
        }

        .btn-primary:hover {
          background: #c44a20;
        }

        .btn-outline {
          background: transparent;
          color: #fff;
          border-color: #fff;
        }

        .btn-outline:hover {
          background: #fff;
          color: #1a1a2e;
        }

        /* On light backgrounds the outline is blue */
        .form-card .btn-outline,
        .form-success .btn-outline {
          color: #E85D2F;
          border-color: #E85D2F;
          background: transparent;
        }

        .form-card .btn-outline:hover,
        .form-success .btn-outline:hover {
          background: #E85D2F;
          color: #fff;
        }

        .btn-whatsapp {
          background: #25d366;
          color: #fff;
        }

        .btn-whatsapp:hover {
          background: #128c7e;
        }

        .btn-block {
          display: block;
          width: 100%;
        }

        /* === Responsive === */
        @media (max-width: 900px) {
          .methods-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .main-grid {
            grid-template-columns: 1fr;
          }

          .contact-header h1 {
            font-size: 32px;
          }
        }

        @media (max-width: 640px) {
          .contact-header {
            padding: 40px 20px 56px;
          }

          .contact-header h1 {
            font-size: 26px;
          }

          .header-lead {
            font-size: 15px;
          }

          .methods-grid {
            grid-template-columns: 1fr;
          }

          .form-card {
            padding: 24px 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .section-header h2,
          .social-inner h2,
          .cta-inner h2 {
            font-size: 22px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-outline,
          .btn-whatsapp {
            width: 100%;
          }

          .map-embed iframe {
            height: 300px;
          }
        }
      `}</style>
    </>
  );
}

/*
SEO CHECKLIST:
[x] ContactPoint schema (phone, email, WhatsApp, languages, hours)
[x] Breadcrumb component + BreadcrumbList schema
[x] HreflangTags for en/es/de/fr/ar + x-default
[x] Contact methods: email, phone, WhatsApp, WeChat
[x] Contact form: name, email, company, product category, message
[x] Google Maps embed (factory location)
[x] Factory address + business hours (NAP consistency)
[x] Social media links (sameAs)
[x] Responsive design (desktop / tablet / mobile breakpoints)
[x] Accessible form (labels, required indicators, ARIA alerts)
*/

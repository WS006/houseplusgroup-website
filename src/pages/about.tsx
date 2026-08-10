/**
 * HousePlus About Page — SEO-Optimized Template
 * Updated: 2026-07-28
 *
 * SEO IMPACT:
 * 1. Organization + LocalBusiness Schema — feeds the Google Knowledge Panel
 *    (logo, address, founding date, employee count, opening hours) and
 *    enables Local Pack / Maps visibility for "solar manufacturer near me".
 * 2. Breadcrumb component — BreadcrumbList schema clarifies site hierarchy
 *    and improves SERP CTR.
 * 3. E-E-A-T signals (Experience, Expertise, Authoritativeness, Trust) —
 *    founding year, factory size, certifications, and global client count
 *    directly answer Google's quality-rater trust criteria.
 * 4. Long-form, keyword-rich copy targeting:
 *    "solar panel manufacturer China", "OEM/ODM manufacturer",
 *    "home appliance factory Zhongshan", "ISO 9001 certified manufacturer".
 * 5. Image alt text uses descriptive, keyword-aware captions (not keyword
 *    stuffing) to support Google Images traffic.
 * 6. Responsive layout with strong internal linking to Products & Contact.
 */

import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import HreflangTags from '../components/HreflangTags';
import OptimizedImage from '../components/OptimizedImage';
import { OrganizationSchema, LocalBusinessSchema } from '../components/SchemaOrg';
import { siteConfig } from '../config/seo-config';

// ============================================================================
// TYPES
// ============================================================================

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

interface Capability {
  icon: string;
  title: string;
  desc: string;
}

interface Certification {
  code: string;
  name: string;
  desc: string;
}

interface AboutPageProps {
  locale: string;
}

// ============================================================================
// PAGE DATA
// ============================================================================

/** Company development milestones from 2010 to present. */
const milestones: Milestone[] = [
  {
    year: '2010',
    title: 'Founded in Zhongshan, Guangdong',
    desc: 'HousePlus was established as a small workshop producing home appliances for the domestic Chinese market, starting with electric kettles and blenders.',
  },
  {
    year: '2013',
    title: 'Expanded into 3C Electronics',
    desc: 'Diversified into consumer 3C electronics — TWS earphones, power banks, and portable storage devices — establishing our first export partnerships in Southeast Asia.',
  },
  {
    year: '2016',
    title: 'Entered Solar Energy Manufacturing',
    desc: 'Launched our solar energy division with monocrystalline panel production lines, responding to rising global demand for renewable energy systems.',
  },
  {
    year: '2018',
    title: 'Achieved ISO 9001 Certification',
    desc: 'Earned ISO 9001:2015 quality management certification, formalising our QC processes and unlocking enterprise-grade OEM/ODM partnerships worldwide.',
  },
  {
    year: '2020',
    title: 'Opened 20,000 m\u00b2 Smart Factory',
    desc: 'Inaugurated a vertically integrated smart factory consolidating PCB design, injection moulding, lamination, assembly, and testing under one roof.',
  },
  {
    year: '2022',
    title: 'Surpassed 400 Global Clients',
    desc: 'Crossed 400 active wholesale clients across 50+ countries, with solar products becoming our largest export category.',
  },
  {
    year: '2024',
    title: 'Launched OEM Brand Programme',
    desc: 'Formalised a dedicated OEM/ODM brand programme offering custom logo printing, packaging design, and specification engineering from MOQ 500 pcs.',
  },
  {
    year: '2026',
    title: '53+ Countries, 441+ Clients Today',
    desc: 'Today HousePlus serves 441+ wholesale clients across 53+ countries with a 500-person team and a full solar-appliance-electronics portfolio.',
  },
];

/** Vertical manufacturing capabilities — PCB design through final assembly. */
const capabilities: Capability[] = [
  {
    icon: '01',
    title: 'PCB Design & Engineering',
    desc: 'In-house R&D team designs and prototypes custom PCBs for solar charge controllers, inverters, and smart appliances, reducing OEM lead time.',
  },
  {
    icon: '02',
    title: 'SMT & DIP Assembly',
    desc: 'High-speed surface-mount and through-hole assembly lines with AOI and X-ray inspection ensure consistent solder quality at scale.',
  },
  {
    icon: '03',
    title: 'Plastic Injection Moulding',
    desc: 'Own injection moulding workshop produces housings and components, enabling custom colours and bespoke product shapes for ODM clients.',
  },
  {
    icon: '04',
    title: 'Solar Cell Lamination',
    desc: 'Class-10000 cleanroom lamination lines manufacture monocrystalline and polycrystalline panels with EL testing on every module.',
  },
  {
    icon: '05',
    title: 'Silk-Screen Printing',
    desc: 'In-house silk-screen and pad-printing enables custom logo branding, model labels, and compliance markings on products and packaging.',
  },
  {
    icon: '06',
    title: 'Final Assembly & QC',
    desc: 'Dedicated assembly lines with 100% functional testing, ageing tests, and final QC inspection before packaging and export.',
  },
];

/** Certifications — each map to specific export-market compliance. */
const certifications: Certification[] = [
  {
    code: 'CE',
    name: 'European Conformity',
    desc: 'Mandatory for products sold in the European Economic Area; confirms health, safety, and environmental protection standards.',
  },
  {
    code: 'FCC',
    name: 'Federal Communications Commission',
    desc: 'Required for electronic devices sold in the United States; certifies electromagnetic interference compliance.',
  },
  {
    code: 'RoHS',
    name: 'Restriction of Hazardous Substances',
    desc: 'Restricts lead, mercury, cadmium, and other hazardous materials in electronic and electrical equipment.',
  },
  {
    code: 'ISO 9001',
    name: 'Quality Management System',
    desc: 'ISO 9001:2015 certification validates our quality management processes across design, production, and after-sales.',
  },
];

/** OEM/ODM service workflow steps. */
const oemOdmSteps: { step: string; title: string; desc: string }[] = [
  {
    step: '1',
    title: 'Requirement Consultation',
    desc: 'Share your product specs, target price, certifications, and branding. Our sales engineers respond within 24 hours.',
  },
  {
    step: '2',
    title: 'Design & Prototyping',
    desc: 'Our R&D team creates PCB layouts, 3D models, and a working prototype within 2-4 weeks for your approval.',
  },
  {
    step: '3',
    title: 'Tooling & Sample Approval',
    desc: 'We build moulds and produce pre-production samples (golden samples) for final sign-off before mass production.',
  },
  {
    step: '4',
    title: 'Mass Production & QC',
    desc: 'Full production run with 100% functional testing, EL testing (solar), and a final QC report shipped with every order.',
  },
  {
    step: '5',
    title: 'Packaging & Export',
    desc: 'Custom branded packaging, export documentation, and FOB/EXW shipping via sea freight or express courier.',
  },
];

// ============================================================================
// STATIC PROPS
// ============================================================================

/**
 * getStaticProps pre-renders the About page as static HTML.
 * SEO IMPACT: instant load, high Core Web Vitals, easy to crawl.
 */
export const getStaticProps: GetStaticProps<AboutPageProps> = async ({
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

export default function AboutPage({ locale = 'en' }: AboutPageProps) {
  const canonical = `${siteConfig.url}/${locale}/about`;

  // Breadcrumb items — last item (current page) has no href.
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us' },
  ];

  // Combined Organization + LocalBusiness structured data.
  // SEO IMPACT: powers the Google Knowledge Panel and Local Business listing.
  const jsonLd = [OrganizationSchema(), LocalBusinessSchema()];

  return (
    <>
      {/* ============================================================
          SEO HEAD — page meta + Organization & LocalBusiness schemas
      ============================================================ */}
      <SEOHead
        title={`About ${siteConfig.name} | Solar & Home Appliance Manufacturer Since ${siteConfig.founded}`}
        description={`${siteConfig.name} is a vertically integrated manufacturer in ${siteConfig.city}, China since ${siteConfig.founded}. ${siteConfig.factorySize} factory, ${siteConfig.employees} employees, OEM/ODM, ${siteConfig.countries} countries served.`}
        keywords={`${siteConfig.name.toLowerCase()} manufacturer, solar panel manufacturer China, home appliance factory Zhongshan, OEM ODM manufacturer, ISO 9001 certified manufacturer, electronics manufacturer Guangdong`}
        canonical={canonical}
        ogImage="https://images.houseplus-ch.com/about/houseplus-factory-overview.jpg"
        ogType="website"
        locale={locale}
        jsonLd={jsonLd}
      />

      {/* Hreflang alternates for multi-language SEO */}
      <HreflangTags path="/about" />

      <div className="page-wrapper">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </div>

        {/* ============================================================
            HERO — company intro + key stats
        ============================================================ */}
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">About {siteConfig.name}</span>
            <h1>
              Your Trusted Solar, Appliance &amp; Electronics Manufacturer
              <br />
              Since {siteConfig.founded}
            </h1>
            <p className="hero-lead">
              {siteConfig.name} ({siteConfig.alternateName}) is a vertically
              integrated manufacturer based in {siteConfig.city},{' '}
              {siteConfig.region}, China. From our {siteConfig.factorySize}{' '}
              factory, {siteConfig.employees} engineers and production staff
              deliver solar energy systems, home appliances, and 3C electronics
              to {siteConfig.clients} wholesale clients across{' '}
              {siteConfig.countries} countries.
            </p>
            <div className="hero-cta">
              <Link href={`/${locale}/products`} className="btn-primary">
                View Our Products
              </Link>
              <Link href={`/${locale}/contact`} className="btn-outline">
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Factory image — OptimizedImage for WebP/AVIF + responsive srcset */}
          <div className="hero-image-wrap">
            <OptimizedImage
              src="https://images.houseplus-ch.com/about/houseplus-factory-overview.jpg"
              alt={`${siteConfig.name} ${siteConfig.factorySize} manufacturing facility in ${siteConfig.city}, ${siteConfig.region}, China — solar panel and home appliance production lines`}
              className="hero-image"
              priority
              width={640}
              height={420}
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        </section>

        {/* ============================================================
            KEY STATS — trust signals (E-E-A-T)
        ============================================================ */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{siteConfig.founded}</span>
              <span className="stat-label">Founded</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{siteConfig.factorySize}</span>
              <span className="stat-label">Factory Area</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{siteConfig.employees}+</span>
              <span className="stat-label">Employees</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{siteConfig.countries}</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{siteConfig.clients}</span>
              <span className="stat-label">Wholesale Clients</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            COMPANY STORY / TIMELINE
        ============================================================ */}
        <section className="story-section">
          <div className="section-header">
            <h2>Our Journey: From Workshop to Global Manufacturer</h2>
            <p>
              Founded in {siteConfig.founded} as a small appliance workshop in{' '}
              {siteConfig.city}, {siteConfig.name} has grown into a vertically
              integrated manufacturer serving renewable energy and consumer
              electronics markets worldwide.
            </p>
          </div>

          <div className="timeline">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-marker">
                  <span>{m.year}</span>
                </div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            MANUFACTURING CAPABILITIES
        ============================================================ */}
        <section className="capabilities-section">
          <div className="section-header">
            <h2>Vertically Integrated Manufacturing Capabilities</h2>
            <p>
              Our {siteConfig.factorySize} factory in {siteConfig.city} covers
              the full production chain — from PCB design and SMT assembly to
              solar cell lamination, plastic injection moulding, and final
              quality control. Vertical integration means shorter lead times,
              tighter quality control, and lower costs passed on to you.
            </p>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((cap) => (
              <div key={cap.icon} className="capability-card">
                <span className="capability-icon">{cap.icon}</span>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>

          {/* Factory / team images — OptimizedImage for WebP/AVIF + lazy loading */}
          <div className="factory-gallery">
            <figure className="gallery-item">
              <OptimizedImage
                src="https://images.houseplus-ch.com/about/production-line-smt.jpg"
                alt="HousePlus SMT surface-mount technology assembly line producing solar charge controller PCBs"
                width={400}
                height={300}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <figcaption>SMT assembly line</figcaption>
            </figure>
            <figure className="gallery-item">
              <OptimizedImage
                src="https://images.houseplus-ch.com/about/solar-lamination-cleanroom.jpg"
                alt="HousePlus solar panel lamination cleanroom with EL testing equipment"
                width={400}
                height={300}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <figcaption>Solar lamination cleanroom</figcaption>
            </figure>
            <figure className="gallery-item">
              <OptimizedImage
                src="https://images.houseplus-ch.com/about/team-engineers.jpg"
                alt="HousePlus R&amp;D engineering team reviewing PCB designs in the Zhongshan office"
                width={400}
                height={300}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <figcaption>R&amp;D engineering team</figcaption>
            </figure>
            <figure className="gallery-item">
              <OptimizedImage
                src="https://images.houseplus-ch.com/about/warehouse-export.jpg"
                alt="HousePlus export warehouse with palletised solar panels and home appliances ready for shipping"
                width={400}
                height={300}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <figcaption>Export warehouse</figcaption>
            </figure>
          </div>
        </section>

        {/* ============================================================
            CERTIFICATIONS
        ============================================================ */}
        <section className="cert-section">
          <div className="section-header">
            <h2>Certifications &amp; Compliance</h2>
            <p>
              Every {siteConfig.name} product is tested and certified to
              international standards, ensuring smooth customs clearance and
              market access across Europe, the Americas, the Middle East,
              Africa, and Asia-Pacific.
            </p>
          </div>

          <div className="cert-grid">
            {certifications.map((cert) => (
              <div key={cert.code} className="cert-card">
                <div className="cert-badge">{cert.code}</div>
                <h3>{cert.name}</h3>
                <p>{cert.desc}</p>
              </div>
            ))}
          </div>
          <p className="cert-note">
            Additional certifications available on request: IEC 61215, IEC
            61730, UL, PSE, SAA, INMETRO, BIS. Digital certificate PDFs provided
            with every order.
          </p>
        </section>

        {/* ============================================================
            GLOBAL MARKET COVERAGE
        ============================================================ */}
        <section className="global-section">
          <div className="section-header">
            <h2>Global Market Coverage</h2>
            <p>
              {siteConfig.name} exports to {siteConfig.countries} countries and
              serves {siteConfig.clients} active wholesale clients — from solar
              distributors and EPC contractors to retail chains and online
              brands.
            </p>
          </div>

          <div className="global-grid">
            <div className="global-card">
              <span className="global-number">{siteConfig.countries}</span>
              <span className="global-label">Export Countries</span>
              <p className="global-desc">
                Europe, North &amp; Latin America, MENA, Sub-Saharan Africa,
                South &amp; Southeast Asia, Oceania.
              </p>
            </div>
            <div className="global-card">
              <span className="global-number">{siteConfig.clients}</span>
              <span className="global-label">Wholesale Clients</span>
              <p className="global-desc">
                Distributors, EPC contractors, retailers, and DTC brands trust
                {siteConfig.name} for reliable supply.
              </p>
            </div>
            <div className="global-card">
              <span className="global-number">5</span>
              <span className="global-label">Supported Languages</span>
              <p className="global-desc">
                English, Spanish, German, French, and Arabic sales support
                across major time zones.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            OEM / ODM SERVICES
        ============================================================ */}
        <section className="oem-section">
          <div className="section-header">
            <h2>OEM &amp; ODM Manufacturing Services</h2>
            <p>
              Build your own brand with a manufacturer that controls the full
              production chain. From custom logo printing to bespoke product
              engineering, our OEM/ODM programme turns your concept into a
              market-ready product.
            </p>
          </div>

          <div className="oem-steps">
            {oemOdmSteps.map((s) => (
              <div key={s.step} className="oem-step">
                <span className="oem-step-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="oem-cta">
            <p>
              OEM/ODM MOQ starts at 500 pieces. Talk to our engineering team
              about your customisation requirements.
            </p>
            <Link href={`/${locale}/contact`} className="btn-primary">
              Start an OEM/ODM Project
            </Link>
          </div>
        </section>

        {/* ============================================================
            FINAL CTA
        ============================================================ */}
        <section className="final-cta">
          <div className="cta-inner">
            <h2>Partner with a Manufacturer You Can Trust</h2>
            <p>
              {siteConfig.founded} established. {siteConfig.factorySize}{' '}
              factory. {siteConfig.employees}+ staff. {siteConfig.countries}{' '}
              countries. {siteConfig.certifications.join(', ')} certified.
            </p>
            <div className="cta-buttons">
              <Link href={`/${locale}/products`} className="btn-primary">
                Browse Products
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-outline">
                Email Us
              </a>
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
          margin: 0 auto 48px;
        }

        .section-header h2 {
          font-size: 32px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0 0 14px;
        }

        .section-header p {
          font-size: 17px;
          line-height: 1.7;
          color: #555;
          margin: 0;
        }

        /* === Hero === */
        .hero {
          max-width: 1140px;
          margin: 0 auto;
          padding: 20px 20px 60px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .eyebrow {
          display: inline-block;
          color: #E85D2F;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .hero h1 {
          font-size: 40px;
          font-weight: 800;
          line-height: 1.2;
          color: #1a1a2e;
          margin: 0 0 20px;
        }

        .hero-lead {
          font-size: 17px;
          line-height: 1.8;
          color: #555;
          margin: 0 0 28px;
        }

        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .hero-image-wrap {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
          aspect-ratio: 640 / 420;
          object-fit: cover;
        }

        /* === Stats === */
        .stats-section {
          background: linear-gradient(135deg, #E85D2F 0%, #F4C430 100%);
          padding: 48px 20px;
        }

        .stats-grid {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .stat-card {
          text-align: center;
          color: #fff;
        }

        .stat-number {
          display: block;
          font-size: 36px;
          font-weight: 800;
          line-height: 1.1;
        }

        .stat-label {
          display: block;
          font-size: 14px;
          opacity: 0.9;
          margin-top: 6px;
        }

        /* === Story / Timeline === */
        .story-section {
          max-width: 1140px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e0e6ee;
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          width: 50%;
          padding: 0 40px 40px 0;
          box-sizing: border-box;
        }

        .timeline-item.right {
          margin-left: 50%;
          padding: 0 0 40px 40px;
        }

        .timeline-marker {
          position: absolute;
          right: -16px;
          top: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E85D2F;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          z-index: 1;
        }

        .timeline-item.right .timeline-marker {
          right: auto;
          left: -16px;
        }

        .timeline-content {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px 24px;
          border: 1px solid #eef0f3;
        }

        .timeline-content h3 {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
        }

        .timeline-content p {
          font-size: 14px;
          line-height: 1.7;
          color: #666;
          margin: 0;
        }

        /* === Capabilities === */
        .capabilities-section {
          background: #f8f9fa;
          padding: 80px 20px;
        }

        .capabilities-grid {
          max-width: 1140px;
          margin: 0 auto 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .capability-card {
          background: #fff;
          border-radius: 12px;
          padding: 28px 24px;
          border: 1px solid #eef0f3;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .capability-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .capability-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #fff3ee;
          color: #E85D2F;
          font-weight: 800;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .capability-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px;
        }

        .capability-card p {
          font-size: 14px;
          line-height: 1.7;
          color: #666;
          margin: 0;
        }

        .factory-gallery {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .gallery-item {
          margin: 0;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .gallery-item img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        .gallery-item figcaption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: #fff;
          font-size: 13px;
          padding: 20px 12px 10px;
        }

        /* === Certifications === */
        .cert-section {
          max-width: 1140px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .cert-card {
          text-align: center;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 32px 20px;
          border: 1px solid #eef0f3;
        }

        .cert-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #E85D2F;
          color: #fff;
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 16px;
        }

        .cert-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
        }

        .cert-card p {
          font-size: 13px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        .cert-note {
          text-align: center;
          font-size: 14px;
          color: #888;
          margin-top: 32px;
        }

        /* === Global coverage === */
        .global-section {
          background: #1a1a2e;
          color: #fff;
          padding: 80px 20px;
        }

        .global-section .section-header h2 {
          color: #fff;
        }

        .global-section .section-header p {
          color: #c8d0e0;
        }

        .global-grid {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .global-card {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .global-number {
          display: block;
          font-size: 42px;
          font-weight: 800;
          color: #00d4a0;
        }

        .global-label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          margin: 8px 0 12px;
        }

        .global-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #c8d0e0;
          margin: 0;
        }

        /* === OEM / ODM === */
        .oem-section {
          max-width: 1140px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .oem-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        .oem-step {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 24px 20px;
          border: 1px solid #eef0f3;
        }

        .oem-step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #F4C430;
          color: #fff;
          font-weight: 800;
          font-size: 15px;
          margin-bottom: 14px;
        }

        .oem-step h3 {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px;
        }

        .oem-step p {
          font-size: 13px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        .oem-cta {
          text-align: center;
          background: linear-gradient(135deg, #E85D2F 0%, #F4C430 100%);
          border-radius: 12px;
          padding: 36px;
          color: #fff;
        }

        .oem-cta p {
          font-size: 16px;
          margin: 0 0 20px;
        }

        /* === Final CTA === */
        .final-cta {
          background: #f8f9fa;
          padding: 80px 20px;
        }

        .cta-inner {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-inner h2 {
          font-size: 32px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0 0 14px;
        }

        .cta-inner p {
          font-size: 16px;
          color: #666;
          line-height: 1.7;
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
          color: #E85D2F;
          border: 2px solid #E85D2F;
        }

        .btn-outline:hover {
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

        /* === Responsive === */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 20px 20px 40px;
          }

          .hero h1 {
            font-size: 32px;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }

          .capabilities-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .factory-gallery {
            grid-template-columns: repeat(2, 1fr);
          }

          .cert-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .global-grid {
            grid-template-columns: 1fr;
          }

          .oem-steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-header h2 {
            font-size: 26px;
          }

          /* Timeline becomes single column */
          .timeline::before {
            left: 16px;
          }

          .timeline-item,
          .timeline-item.right {
            width: 100%;
            margin-left: 0;
            padding: 0 0 32px 48px;
          }

          .timeline-marker,
          .timeline-item.right .timeline-marker {
            left: 0;
            right: auto;
          }
        }

        @media (max-width: 640px) {
          .hero h1 {
            font-size: 26px;
          }

          .hero-lead {
            font-size: 16px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-number {
            font-size: 28px;
          }

          .capabilities-grid,
          .cert-grid,
          .oem-steps {
            grid-template-columns: 1fr;
          }

          .factory-gallery {
            grid-template-columns: 1fr;
          }

          .gallery-item img {
            height: 200px;
          }

          .section-header h2 {
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
        }
      `}</style>
    </>
  );
}

/*
SEO CHECKLIST:
[x] Organization + LocalBusiness Schema (Knowledge Panel + Local Pack)
[x] Breadcrumb component + BreadcrumbList schema
[x] HreflangTags for en/es/de/fr/ar + x-default
[x] Company story timeline (2010 -> 2026)
[x] Manufacturing capabilities (PCB design -> assembly full chain)
[x] Certification display (CE / FCC / RoHS / ISO 9001)
[x] Global market coverage (53+ countries, 441+ clients)
[x] OEM/ODM service workflow
[x] Team / factory image placeholders with descriptive alt text
[x] CTA area (final CTA + OEM CTA + hero CTA)
[x] Responsive design (desktop / tablet / mobile breakpoints)
[x] E-E-A-T trust signals (founding year, factory size, employee count)
*/

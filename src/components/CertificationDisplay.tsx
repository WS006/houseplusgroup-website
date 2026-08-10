/**
 * HousePlus Certification Display Component
 * 
 * ISSUE: Certifications mentioned in text only, no downloadable certificates
 * FIX: Visual certification display with downloadable PDF links and Schema
 */

import React from 'react';
import { siteConfig } from '../config/seo-config';

interface Certification {
  name: string;
  code: string;
  scope: string;
  pdfUrl: string;
  icon: string;
  description: string;
}

const certifications: Certification[] = [
  {
    name: 'CE Certification',
    code: 'CE',
    scope: 'European Conformity',
    pdfUrl: '/certificates/houseplus-ce-certificate.pdf',
    icon: '🇪🇺',
    description: 'Confirms compliance with EU health, safety, and environmental protection directives. Required for selling electronics and appliances in the European Economic Area.',
  },
  {
    name: 'FCC Certification',
    code: 'FCC',
    scope: 'Federal Communications Commission',
    pdfUrl: '/certificates/houseplus-fcc-certificate.pdf',
    icon: '🇺🇸',
    description: 'Ensures electromagnetic compatibility for products sold in the United States. All HousePlus wireless electronics products carry FCC ID certification.',
  },
  {
    name: 'RoHS Compliance',
    code: 'RoHS',
    scope: 'Restriction of Hazardous Substances',
    pdfUrl: '/certificates/houseplus-rohs-certificate.pdf',
    icon: '🌱',
    description: 'Certifies that products are free from hazardous materials including lead, mercury, cadmium, and other restricted substances. Mandatory for EU market.',
  },
  {
    name: 'ISO 9001:2015',
    code: 'ISO 9001',
    scope: 'Quality Management System',
    pdfUrl: '/certificates/houseplus-iso9001-certificate.pdf',
    icon: '⭐',
    description: 'Our factory operates under a certified Quality Management System, ensuring consistent product quality, process improvement, and customer satisfaction.',
  },
  {
    name: 'IEC 61215',
    code: 'IEC 61215',
    scope: 'Solar Panel Design Qualification',
    pdfUrl: '/certificates/houseplus-iec61215-certificate.pdf',
    icon: '☀️',
    description: 'International standard for design qualification of crystalline silicon solar panels. Verifies long-term reliability under outdoor weathering conditions.',
  },
  {
    name: 'IEC 61730',
    code: 'IEC 61730',
    scope: 'Solar Panel Safety Qualification',
    pdfUrl: '/certificates/houseplus-iec61730-certificate.pdf',
    icon: '🔒',
    description: 'Safety qualification standard for photovoltaic modules. Confirms electrical safety, fire resistance, and structural integrity of solar panels.',
  },
];

interface CertificationDisplayProps {
  /** Optional title override — if omitted, no h2 is rendered (page controls heading) */
  title?: string;
  /** Show intro paragraph */
  showIntro?: boolean;
}

export default function CertificationDisplay({
  title,
  showIntro = true,
}: CertificationDisplayProps) {
  // Schema.org structured data for certifications
  const certSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "hasCredential": certifications.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      "name": cert.name,
      "credentialCategory": cert.code,
      "description": cert.description,
    })),
  };

  return (
    <div className="certification-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certSchema) }}
      />

      {title && <h2>{title}</h2>}
      {showIntro && (
        <p className="cert-intro">
          Every HousePlus product is backed by internationally recognised certifications.
          Download full certificate documents below — we include printed copies with every shipment
          for smooth customs clearance.
        </p>
      )}

      <div className="cert-grid">
        {certifications.map((cert) => (
          <article key={cert.code} className="cert-card">
            <div className="cert-header">
              <span className="cert-icon">{cert.icon}</span>
              <div>
                <h3>{cert.name}</h3>
                <span className="cert-scope">{cert.scope}</span>
              </div>
            </div>
            <p className="cert-desc">{cert.description}</p>
            <a href={cert.pdfUrl} className="cert-download" download>
              📄 Download Certificate (PDF)
            </a>
          </article>
        ))}
      </div>

      <div className="cert-note">
        <h3>Need a Specific Certificate?</h3>
        <p>
          We provide certificate documents for every product line. If you need a certificate not
          listed here, or require notarised/legalised documents for your market, contact us at{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </div>

      <style jsx>{`
        .certification-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px;
        }
        .certification-section h2 {
          font-size: 24px;
          color: #1e293b;
          margin-bottom: 12px;
        }
        .cert-intro {
          color: #64748b;
          font-size: 15px;
          margin-bottom: 32px;
          max-width: 800px;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .cert-card {
          padding: 24px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .cert-card:hover {
          border-color: #0ea5e9;
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.1);
          transform: translateY(-2px);
        }
        .cert-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .cert-icon { font-size: 32px; }
        .cert-header h3 {
          font-size: 16px;
          color: #1e293b;
          margin-bottom: 2px;
        }
        .cert-scope {
          font-size: 12px;
          color: #64748b;
        }
        .cert-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .cert-download {
          display: inline-block;
          padding: 8px 16px;
          background: #f0f9ff;
          color: #0ea5e9;
          font-size: 13px;
          font-weight: 600;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid #bae6fd;
          transition: all 0.2s;
        }
        .cert-download:hover {
          background: #0ea5e9;
          color: white;
        }
        .cert-note {
          margin-top: 40px;
          padding: 24px;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #0ea5e9;
        }
        .cert-note h3 {
          font-size: 16px;
          color: #1e293b;
          margin-bottom: 8px;
        }
        .cert-note p {
          font-size: 14px;
          color: #64748b;
        }
        .cert-note a {
          color: #0ea5e9;
        }
        @media (max-width: 768px) {
          .cert-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

/**
 * FAQ Section Component
 * Updated: 2026-07-28
 *
 * Features:
 * - Expandable FAQ accordion with smooth animation
 * - FAQPage structured data for Google rich results
 * - Keyword-optimized questions targeting long-tail search queries
 * - Accessible (ARIA attributes, keyboard navigation)
 *
 * SEO Impact:
 * - FAQ rich results can increase SERP real estate by 200-300px
 * - Targets long-tail question keywords with high purchase intent
 * - Featured snippet eligibility for question-based queries
 * - Estimated 15-25% CTR improvement for pages with FAQ rich results
 */

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { siteConfig } from '../config/seo-config';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs?: FAQItem[];
  locale?: string;
}

// Default FAQ content — optimized for wholesale buyer search intent
const defaultFAQs: FAQItem[] = [
  {
    question: 'What is the minimum order quantity (MOQ) for HousePlus products?',
    answer: `Our standard MOQ is ${siteConfig.moq} for most products. For OEM/ODM customised orders, the MOQ may vary depending on the complexity of customisation. Contact our sales team at ${siteConfig.email} for specific MOQ details on any product.`,
  },
  {
    question: 'What is the typical lead time for wholesale orders?',
    answer: `Standard production lead time is ${siteConfig.leadTime} from order confirmation. For OEM/ODM orders requiring tooling or custom PCB design, lead time may extend to 45-60 days. We provide real-time production updates and can arrange expedited shipping via DHL, FedEx, or sea freight.`,
  },
  {
    question: 'What certifications do HousePlus products carry?',
    answer: `All our products carry ${siteConfig.certifications.join(', ')} certifications. We can provide digital copies of certification documents upon request. For markets requiring additional certifications (UL, PSE, SAA), we offer compliance testing services with a typical turnaround of 2-4 weeks.`,
  },
  {
    question: 'Do you offer OEM and ODM manufacturing services?',
    answer: `Yes, we provide both OEM (Original Equipment Manufacturing) and ODM (Original Design Manufacturing) services. Our 20,000 m² factory in Zhongshan, China is equipped for PCB design, plastic injection moulding, silk-screen printing, and custom packaging. We have successfully completed over 500 OEM/ODM projects for clients in 53+ countries.`,
  },
  {
    question: 'What warranty do you provide on your products?',
    answer: `All HousePlus products come with a standard ${siteConfig.warranty} warranty covering manufacturing defects. Extended warranty options (18-24 months) are available for bulk orders. Our RMA (Return Merchandise Authorization) process ensures quick resolution of any quality issues.`,
  },
  {
    question: 'Which countries do you ship to and what are the shipping options?',
    answer: `We ship to ${siteConfig.countries} countries worldwide via DHL, FedEx, UPS, and sea freight. For bulk orders, we recommend sea freight (20-35 days) for cost efficiency. For samples and urgent orders, express shipping (5-8 days) is available. FOB Zhongshan and EXW terms are both supported.`,
  },
  {
    question: 'Can I get product samples before placing a bulk order?',
    answer: `Yes, we provide product samples for evaluation. Sample cost varies by product (typically $30-$150) and is refundable upon bulk order placement. Samples are shipped within 3-5 business days via express courier. Contact ${siteConfig.email} to request samples.`,
  },
  {
    question: 'How can I get a wholesale price quote?',
    answer: `Request a quote by emailing ${siteConfig.email}, calling ${siteConfig.phone}, or messaging us on WhatsApp at ${siteConfig.whatsapp}. Provide the product model, desired quantity, and any customisation requirements. We respond to all quote requests within 24 hours with detailed pricing including unit cost, shipping, and lead time.`,
  },
];

export default function FAQSection({
  title = 'Frequently Asked Questions',
  faqs = defaultFAQs,
  locale = 'en',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generate FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* FAQPage structured data for rich results */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-title">{title}</h2>
          <p className="faq-intro">
            Answers to common questions about ordering from {siteConfig.name}.
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link href={`/${locale}/contact`} className="faq-contact-link">
              Contact our team
            </Link>
            .
          </p>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0',
                  }}
                >
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .faq-section {
          padding: 60px 20px;
          background: #f8f9fa;
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          text-align: center;
          margin-bottom: 12px;
        }

        .faq-intro {
          text-align: center;
          color: #666;
          font-size: 16px;
          margin-bottom: 40px;
        }

        .faq-contact-link {
          color: #E85D2F;
          text-decoration: none;
          font-weight: 600;
        }

        .faq-contact-link:hover {
          text-decoration: underline;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.2s;
        }

        .faq-item-open {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .faq-question {
          width: 100%;
          padding: 18px 24px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          transition: background 0.2s;
        }

        .faq-question:hover {
          background: #f0f4f8;
        }

        .faq-question:focus-visible {
          outline: 2px solid #E85D2F;
          outline-offset: -2px;
        }

        .faq-question-text {
          flex: 1;
          padding-right: 16px;
        }

        .faq-toggle {
          font-size: 24px;
          color: #E85D2F;
          font-weight: 300;
          flex-shrink: 0;
        }

        .faq-answer-wrapper {
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }

        .faq-answer {
          padding: 0 24px 18px;
          color: #444;
          font-size: 15px;
          line-height: 1.7;
        }

        @media (max-width: 640px) {
          .faq-section {
            padding: 40px 16px;
          }

          .faq-title {
            font-size: 22px;
          }

          .faq-question {
            padding: 16px;
            font-size: 14px;
          }

          .faq-answer {
            padding: 0 16px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

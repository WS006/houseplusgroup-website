/**
 * Breadcrumb Component
 * Updated: 2026-07-28
 *
 * Features:
 * - Visual breadcrumb navigation for users
 * - BreadcrumbList structured data for SERPs
 * - Responsive design with truncation for long paths
 * - Last item is non-clickable (current page)
 *
 * SEO Impact:
 * - BreadcrumbList schema shows breadcrumb trail in Google results
 * - Improves user navigation and reduces bounce rate
 * - Helps Google understand site hierarchy
 */

import Link from 'next/link';
import Head from 'next/head';
import { siteConfig } from '../config/seo-config';

interface BreadcrumbItem {
  name: string;
  href?: string; // undefined for last item (current page)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale?: string;
}

export default function Breadcrumb({ items, locale = 'en' }: BreadcrumbProps) {
  // Generate BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `${siteConfig.url}/${locale}${item.href}` : undefined,
    })),
  };

  return (
    <>
      {/* Structured data for SERPs */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      {/* Visual breadcrumb (JSON-LD above handles structured data; microdata
          removed to avoid redundant duplicate schema per Google guidelines) */}
      <nav aria-label="Breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? 'breadcrumb-current' : ''}`}
              >
                {item.href && !isLast ? (
                  <Link href={`/${locale}${item.href}`}>
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <span aria-current="page">
                    {item.name}
                  </span>
                )}
                {!isLast && <span className="breadcrumb-separator" aria-hidden="true">›</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <style jsx>{`
        .breadcrumb-nav {
          padding: 12px 0;
          font-size: 14px;
        }

        .breadcrumb-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 4px;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .breadcrumb-item a {
          color: #E85D2F;
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb-item a:hover {
          color: #c1121f;
          text-decoration: underline;
        }

        .breadcrumb-current {
          color: #666;
          font-weight: 500;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .breadcrumb-separator {
          color: #ccc;
          margin: 0 4px;
          font-size: 16px;
        }

        @media (max-width: 640px) {
          .breadcrumb-nav {
            font-size: 12px;
          }

          .breadcrumb-current {
            max-width: 120px;
          }
        }
      `}</style>
    </>
  );
}

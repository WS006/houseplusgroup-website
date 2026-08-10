/**
 * HousePlus Search Page — SEO-Optimized Template
 * Route: /search  (and /<locale>/search)
 * Updated: 2026-07-28
 *
 * SEO IMPACT & DESIGN DECISIONS:
 * 1. SearchPage Schema (JSON-LD) — declares this page as a SearchResultsPage so
 *    Google understands the page type and can suppress it from thin-content
 *    indexation where appropriate.
 * 2. getStaticProps bundles the full product dataset at build time so the search
 *    runs instantly on the client (zero API round-trips). For larger catalogues,
 *    swap the static dataset for an Algolia/Meilisearch call (see .env.example).
 * 3. The initial query (`q`) is read from the URL so shared/deep-linked searches
 *    render correctly, then refined live as the user types (debounced).
 * 4. Breadcrumb component — BreadcrumbList schema clarifies site hierarchy.
 * 5. noindex for query-bearing URLs — search results pages are thin/duplicate
 *    by nature; we keep the base /search page itself indexable but add a
 *    canonical to avoid query-string duplication. (See SEOHead noindex logic.)
 * 6. Friendly empty state with popular-search suggestions + category links keeps
 *    users in the funnel and improves internal linking.
 * 7. Accessible: form labels, aria-live result count, keyboard-operable input.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import HreflangTags from '../components/HreflangTags';
import OptimizedImage from '../components/OptimizedImage';
import { siteConfig } from '../config/seo-config';

// ============================================================================
// TYPES
// ============================================================================

interface SearchableProduct {
  slug: string;
  name: string;
  model: string;
  category: string;
  categorySlug: string;
  shortDesc: string;
  image: string;
  imageAlt: string;
  /** Wholesale unit price in USD (optional). */
  price?: number;
  certifications: string[];
  keywords: string;
}

interface SearchPageProps {
  products: SearchableProduct[];
  locale: string;
}

// ============================================================================
// PRODUCT DATASET
// In production, source this from a CMS/database. The array below mirrors the
// slugs used across the sitemap and product pages for consistency.
// ============================================================================

const PRODUCTS: SearchableProduct[] = [
  {
    slug: 'monocrystalline-solar-panel-500w',
    name: '500W Monocrystalline Solar Panel',
    model: 'HP-SP500',
    category: 'Solar Panels',
    categorySlug: 'solar-panels',
    shortDesc:
      'High-efficiency 500W mono PERC panel with 21.5% conversion, 25-year linear warranty, and IP68 junction box.',
    image: 'https://images.houseplus-ch.com/products/solar-panel-500w-front.jpg',
    imageAlt: '500W monocrystalline solar panel HP-SP500 front view with aluminium frame',
    price: 95,
    certifications: ['CE', 'RoHS', 'IEC 61215', 'IEC 61730'],
    keywords:
      'solar panel 500w monocrystalline perc residential commercial off-grid wholesale',
  },
  {
    slug: 'monocrystalline-solar-panel-450w',
    name: '450W Monocrystalline Solar Panel',
    model: 'HP-SP450',
    category: 'Solar Panels',
    categorySlug: 'solar-panels',
    shortDesc:
      '450W mono half-cut panel balancing output and footprint, ideal for rooftop installations worldwide.',
    image: 'https://images.houseplus-ch.com/products/solar-panel-450w.jpg',
    imageAlt: '450W monocrystalline half-cut solar panel for rooftop systems',
    price: 88,
    certifications: ['CE', 'RoHS', 'IEC 61215'],
    keywords: 'solar panel 450w monocrystalline half-cut rooftop',
  },
  {
    slug: 'polycrystalline-solar-panel-300w',
    name: '300W Polycrystalline Solar Panel',
    model: 'HP-PP300',
    category: 'Solar Panels',
    categorySlug: 'solar-panels',
    shortDesc:
      'Budget-friendly 300W poly panel for large-scale commercial farms and off-grid lighting.',
    image: 'https://images.houseplus-ch.com/products/solar-panel-300w-poly.jpg',
    imageAlt: '300W polycrystalline solar panel for commercial solar farms',
    price: 60,
    certifications: ['CE', 'RoHS', 'IEC 61215'],
    keywords: 'solar panel 300w polycrystalline budget commercial',
  },
  {
    slug: 'flexible-solar-panel-200w',
    name: '200W Flexible Solar Panel',
    model: 'HP-FP200',
    category: 'Solar Panels',
    categorySlug: 'solar-panels',
    shortDesc:
      'Lightweight bendable 200W ETFE panel for RVs, boats, and curved surfaces — only 2.5kg.',
    image: 'https://images.houseplus-ch.com/products/flexible-solar-panel-200w.jpg',
    imageAlt: '200W flexible ETFE solar panel for RV and marine use',
    price: 55,
    certifications: ['CE', 'RoHS'],
    keywords: 'flexible solar panel 200w etfe rv boat marine bendable',
  },
  {
    slug: 'hybrid-solar-inverter-5kw',
    name: '5kW Hybrid Solar Inverter',
    model: 'HP-INV5000',
    category: 'Solar Inverters',
    categorySlug: 'solar-inverters',
    shortDesc:
      '5kW pure sine wave hybrid inverter with built-in MPPT and battery charging for on/off-grid systems.',
    image: 'https://images.houseplus-ch.com/products/solar-inverter-5kw.jpg',
    imageAlt: '5kW hybrid solar inverter with MPPT charge controller',
    price: 420,
    certifications: ['CE', 'RoHS'],
    keywords: 'hybrid solar inverter 5kw mppt pure sine wave off-grid on-grid',
  },
  {
    slug: 'off-grid-solar-inverter-3kw',
    name: '3kW Pure Sine Wave Solar Inverter',
    model: 'HP-INV3000',
    category: 'Solar Inverters',
    categorySlug: 'solar-inverters',
    shortDesc:
      '3kW off-grid inverter with 99.5% MPPT tracking efficiency and built-in Wi-Fi monitoring.',
    image: 'https://images.houseplus-ch.com/products/solar-inverter-3kw.jpg',
    imageAlt: '3kW pure sine wave off-grid solar inverter with Wi-Fi',
    price: 280,
    certifications: ['CE', 'RoHS'],
    keywords: 'solar inverter 3kw off grid pure sine wave mppt wifi',
  },
  {
    slug: 'mppt-solar-charge-controller-60a',
    name: 'MPPT Solar Charge Controller 60A',
    model: 'HP-MPPT60',
    category: 'Solar Inverters',
    categorySlug: 'solar-inverters',
    shortDesc:
      '60A MPPT controller with 99.5% tracking efficiency, LCD display, and multi-battery support.',
    image: 'https://images.houseplus-ch.com/products/mppt-charge-controller-60a.jpg',
    imageAlt: '60A MPPT solar charge controller with LCD display',
    price: 120,
    certifications: ['CE', 'RoHS'],
    keywords: 'mppt solar charge controller 60a battery lcd',
  },
  {
    slug: 'lifepo4-battery-48v-100ah',
    name: '48V 100Ah LiFePO4 Lithium Battery',
    model: 'HP-LFP48100',
    category: 'Solar Batteries',
    categorySlug: 'solar-batteries',
    shortDesc:
      '48V 100Ah LiFePO4 rack battery with 6,000+ cycles, smart BMS, and RS485/CAN comms.',
    image: 'https://images.houseplus-ch.com/products/lifepo4-battery-48v-100ah.jpg',
    imageAlt: '48V 100Ah LiFePO4 lithium battery with BMS for solar storage',
    price: 980,
    certifications: ['CE', 'RoHS', 'UN38.3'],
    keywords: 'lifepo4 battery 48v 100ah lithium solar storage bms rack',
  },
  {
    slug: 'lifepo4-battery-12v-200ah',
    name: '12V 200Ah LiFePO4 Lithium Battery',
    model: 'HP-LFP12200',
    category: 'Solar Batteries',
    categorySlug: 'solar-batteries',
    shortDesc:
      'Drop-in 12V 200Ah LiFePO4 replacement for lead-acid, 5,000+ cycles, Bluetooth BMS.',
    image: 'https://images.houseplus-ch.com/products/lifepo4-battery-12v-200ah.jpg',
    imageAlt: '12V 200Ah LiFePO4 lithium battery with Bluetooth BMS',
    price: 520,
    certifications: ['CE', 'RoHS', 'UN38.3'],
    keywords: 'lifepo4 battery 12v 200ah lithium drop-in bluetooth lead acid replacement',
  },
  {
    slug: 'portable-power-station-1000w',
    name: '1000W Portable Power Station',
    model: 'HP-PPS1000',
    category: 'Portable Power',
    categorySlug: 'portable-power-stations',
    shortDesc:
      '1000W / 1000Wh portable station with AC/DC/USB-C outputs, ideal for camping and emergencies.',
    image: 'https://images.houseplus-ch.com/products/portable-power-station-1000w.jpg',
    imageAlt: '1000W portable power station with AC USB-C outputs',
    price: 650,
    certifications: ['CE', 'FCC', 'RoHS', 'UN38.3'],
    keywords: 'portable power station 1000w camping emergency solar generator',
  },
  {
    slug: 'air-fryer-6l-digital',
    name: '6L Digital Air Fryer',
    model: 'HP-AF60',
    category: 'Home Appliances',
    categorySlug: 'home-appliances',
    shortDesc:
      '6L digital air fryer with 8 presets, rapid air tech, and dishwasher-safe basket. OEM/ODM ready.',
    image: 'https://images.houseplus-ch.com/products/air-fryer-6l.jpg',
    imageAlt: '6L digital air fryer with touchscreen and 8 presets',
    price: 38,
    certifications: ['CE', 'FCC', 'RoHS'],
    keywords: 'air fryer 6l digital presets rapid air kitchen appliance oem',
  },
  {
    slug: 'electric-kettle-1-7l-stainless',
    name: '1.7L Stainless Steel Electric Kettle',
    model: 'HP-EK17',
    category: 'Home Appliances',
    categorySlug: 'home-appliances',
    shortDesc:
      '1.7L 2200W stainless steel kettle with auto shut-off, boil-dry protection, and cordless design.',
    image: 'https://images.houseplus-ch.com/products/electric-kettle-1.7l.jpg',
    imageAlt: '1.7L stainless steel electric kettle with auto shut-off',
    price: 12,
    certifications: ['CE', 'RoHS'],
    keywords: 'electric kettle 1.7l stainless steel auto shut off',
  },
  {
    slug: 'tws-earphones-bluetooth-5-3',
    name: 'TWS Bluetooth 5.3 Earphones',
    model: 'HP-TWS53',
    category: '3C Electronics',
    categorySlug: '3c-electronics',
    shortDesc:
      'True wireless earphones with Bluetooth 5.3, 30h playtime, ENC mic, and USB-C charging case.',
    image: 'https://images.houseplus-ch.com/products/tws-earphones-bluetooth-5.3.jpg',
    imageAlt: 'TWS true wireless Bluetooth 5.3 earphones with charging case',
    price: 9.5,
    certifications: ['CE', 'FCC', 'RoHS'],
    keywords: 'tws earphones bluetooth 5.3 wireless enc mic earbuds',
  },
  {
    slug: 'smart-watch-fitness-tracker',
    name: 'Smart Watch with Heart Rate Monitor',
    model: 'HP-SW02',
    category: '3C Electronics',
    categorySlug: '3c-electronics',
    shortDesc:
      'Fitness smart watch with heart-rate/SpO2, 1.8" display, IP68 waterproof, and 7-day battery.',
    image: 'https://images.houseplus-ch.com/products/smart-watch-fitness.jpg',
    imageAlt: 'fitness smart watch with heart rate SpO2 and AMOLED display',
    price: 22,
    certifications: ['CE', 'FCC', 'RoHS'],
    keywords: 'smart watch fitness heart rate spo2 ip68 waterproof',
  },
  {
    slug: 'portable-ssd-1tb-usb-c',
    name: '1TB USB-C Portable SSD',
    model: 'HP-SSD1T',
    category: '3C Electronics',
    categorySlug: '3c-electronics',
    shortDesc:
      '1TB USB 3.2 Gen2 portable SSD, 1050MB/s read, aluminum shell, Type-C for PC/Mac/phone.',
    image: 'https://images.houseplus-ch.com/products/portable-ssd-1tb.jpg',
    imageAlt: '1TB USB-C portable SSD with aluminum shell',
    price: 75,
    certifications: ['CE', 'FCC', 'RoHS'],
    keywords: 'portable ssd 1tb usb c type-c external storage 1050mbps',
  },
];

// Popular search suggestions shown in the empty state — also seed internal links.
const POPULAR_SEARCHES = [
  'solar panel',
  'lifepo4 battery',
  'inverter',
  'air fryer',
  'tws earphones',
  'power station',
];

// ============================================================================
// STATIC PROPS
// ============================================================================

/** Bundle the full catalogue so search is instant on the client. */
export const getStaticProps: GetStaticProps<SearchPageProps> = async ({
  locale,
}) => {
  return {
    props: {
      products: PRODUCTS,
      locale: locale || 'en',
    },
    // Re-build the page hourly so new products appear without a manual deploy.
    revalidate: 3600,
  };
};

// ============================================================================
// SEARCH LOGIC
// ============================================================================

/**
 * Score-based fuzzy search across name, model, category, description, and
 * keywords. Returns ranked matches (best first). Case-insensitive, tolerant of
 * partial and multi-word queries.
 */
function searchProducts(
  products: SearchableProduct[],
  query: string
): SearchableProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  return products
    .map((product) => {
      const haystack = [
        product.name,
        product.model,
        product.category,
        product.shortDesc,
        product.keywords,
        ...product.certifications,
      ]
        .join(' ')
        .toLowerCase();

      // How many query terms appear in the haystack.
      const matchedTerms = terms.filter((t) => haystack.includes(t));
      if (matchedTerms.length === 0) return null;

      let score = matchedTerms.length * 10;

      // Boost exact model number matches (e.g. "HP-SP500").
      if (product.model.toLowerCase().includes(q)) score += 50;
      // Boost name matches.
      if (product.name.toLowerCase().includes(q)) score += 30;
      // Boost category matches.
      if (product.category.toLowerCase().includes(q)) score += 15;
      // Penalise slightly for partial term misses.
      score -= (terms.length - matchedTerms.length) * 5;

      return { product, score };
    })
    .filter((x): x is { product: SearchableProduct; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.product);
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function SearchPage({ products, locale = 'en' }: SearchPageProps) {
  const router = useRouter();
  // Seed the input from the `?q=` URL param (deep-linkable searches).
  const initialQuery =
    typeof router.query.q === 'string' ? router.query.q : '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep state in sync if the URL `q` changes (e.g. browser back/forward).
  useEffect(() => {
    const urlQuery =
      typeof router.query.q === 'string' ? router.query.q : '';
    if (urlQuery !== query) {
      setQuery(urlQuery);
      setDebouncedQuery(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q]);

  // Debounce the query so we don't re-filter on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  // Filtered + ranked results.
  const results = useMemo(
    () => searchProducts(products, debouncedQuery),
    [products, debouncedQuery]
  );

  const showResults = debouncedQuery.trim().length > 0;

  // Update the URL `q` param without a full reload (shareable, back-button friendly).
  const updateUrl = (value: string) => {
    const trimmed = value.trim();
    const href = trimmed
      ? { pathname: `/${locale}/search`, query: { q: trimmed } }
      : { pathname: `/${locale}/search` };
    router.replace(href, undefined, { shallow: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedQuery(query);
    setHasSearched(true);
    updateUrl(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setHasSearched(true);
  };

  // Quick-search chips from the empty state.
  const handleQuickSearch = (term: string) => {
    setQuery(term);
    setDebouncedQuery(term);
    setHasSearched(true);
    updateUrl(term);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
    setHasSearched(false);
    updateUrl('');
    inputRef.current?.focus();
  };

  const canonical = `${siteConfig.url}/${locale}/search`;

  // Breadcrumb — last item is the current page (no href).
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Search' },
  ];

  // SearchPage / SearchResultsPage structured data.
  const searchPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Search — ${siteConfig.name}`,
    url: canonical,
    description: `Search the ${siteConfig.name} wholesale catalogue of solar panels, inverters, batteries, home appliances, and 3C electronics.`,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    mainContentOfPage: {
      '@type': 'WebPageElement',
      'isAccessibleForFree': true,
    },
  };

  return (
    <>
      {/* ============================================================
          SEO HEAD — search page meta + SearchResultsPage schema.
          noindex: keep the base search page indexable but canonicalised;
          a query-bearing SERP is inherently thin, so the canonical stays
          pointed at /search to avoid duplicate-content sprawl.
      ============================================================ */}
      <SEOHead
        title={`Search Products | ${siteConfig.name} Wholesale Catalogue`}
        description={`Search ${siteConfig.name}'s wholesale catalogue of solar panels, solar inverters, LiFePO4 batteries, home appliances, and 3C electronics. OEM/ODM available, MOQ 100 pcs.`}
        keywords="search solar panels, search home appliances, wholesale electronics search, find solar inverter, find lithium battery"
        canonical={canonical}
        ogImage={`${siteConfig.url}/api/og-image?title=Search%20Products&subtitle=HousePlus%20Wholesale%20Catalogue&type=page`}
        ogType="website"
        locale={locale}
        jsonLd={searchPageSchema}
      />

      {/* Hreflang alternates for multi-language SEO */}
      <HreflangTags path="/search" />

      <div className="page-wrapper">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} locale={locale} />
        </div>

        {/* ============================================================
            SEARCH HEADER
        ============================================================ */}
        <section className="search-header">
          <div className="container">
            <h1>Search the HousePlus Wholesale Catalogue</h1>
            <p className="search-intro">
              Find solar panels, inverters, batteries, home appliances, and 3C
              electronics. Search by product name, model number (e.g. HP-SP500),
              or category.
            </p>

            {/* Search form */}
            <form className="search-form" role="search" onSubmit={handleSubmit}>
              <div className="search-input-wrap">
                <span className="search-icon" aria-hidden="true">
                  {/* Inline magnifier glyph (no external dependency) */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="search"
                  className="search-input"
                  placeholder="Search products, models, categories…"
                  value={query}
                  onChange={handleInputChange}
                  aria-label="Search products"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    className="search-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
              <button type="submit" className="search-submit">
                Search
              </button>
            </form>

            {/* Live result count for screen readers */}
            <p className="result-count" aria-live="polite">
              {showResults && hasSearched
                ? `${results.length} result${results.length === 1 ? '' : 's'} for “${debouncedQuery}”`
                : `Showing ${products.length} products in the catalogue — start typing to search.`}
            </p>
          </div>
        </section>

        {/* ============================================================
            RESULTS / EMPTY STATE
        ============================================================ */}
        <section className="search-results-section">
          <div className="container">
            {showResults && results.length > 0 ? (
              <>
                <div className="results-grid">
                  {results.map((product) => (
                    <article key={product.slug} className="product-card">
                      <Link
                        href={`/${locale}/products/${product.slug}`}
                        className="product-card-link"
                      >
                        <div className="product-image-wrap">
                          <OptimizedImage
                            src={product.image}
                            alt={product.imageAlt}
                            className="product-image"
                            width={400}
                            height={300}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {product.price && (
                            <span className="product-price-badge">
                              from ${product.price}/pc
                            </span>
                          )}
                        </div>
                        <div className="product-body">
                          <span className="product-category">
                            {product.category}
                          </span>
                          <h2 className="product-name">{product.name}</h2>
                          <span className="product-model">
                            Model: {product.model}
                          </span>
                          <p className="product-desc">{product.shortDesc}</p>
                          <div className="product-certs">
                            {product.certifications.slice(0, 4).map((cert) => (
                              <span key={cert} className="cert-chip">
                                {cert}
                              </span>
                            ))}
                          </div>
                          <span className="product-cta">View Details →</span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                <div className="search-footer">
                  <p>
                    Can&apos;t find what you need? We manufacture{' '}
                    <strong>500+ product models</strong> — many not listed online.
                  </p>
                  <Link href={`/${locale}/contact`} className="btn-primary">
                    Request a Custom Quote
                  </Link>
                </div>
              </>
            ) : showResults && results.length === 0 ? (
              /* === Friendly empty state === */
              <div className="empty-state">
                <div className="empty-icon" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h2>No results for “{debouncedQuery}”</h2>
                <p>
                  We couldn&apos;t find a match. Try a different keyword, or browse
                  these popular searches and categories.
                </p>

                <div className="popular-searches">
                  <span className="popular-label">Popular searches:</span>
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="popular-chip"
                      onClick={() => handleQuickSearch(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="category-links">
                  <span className="popular-label">Browse by category:</span>
                  <Link href={`/${locale}/products/category/solar-panels`}>Solar Panels</Link>
                  <Link href={`/${locale}/products/category/solar-inverters`}>Solar Inverters</Link>
                  <Link href={`/${locale}/products/category/solar-batteries`}>Solar Batteries</Link>
                  <Link href={`/${locale}/products/category/home-appliances`}>Home Appliances</Link>
                  <Link href={`/${locale}/products/category/3c-electronics`}>3C Electronics</Link>
                </div>

                <Link href={`/${locale}/contact`} className="btn-primary">
                  Still stuck? Contact Sales
                </Link>
              </div>
            ) : (
              /* === Default landing state (no query yet) === */
              <div className="landing-state">
                <h2>Popular Searches</h2>
                <div className="popular-searches">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="popular-chip"
                      onClick={() => handleQuickSearch(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <h2 className="landing-cat-title">Browse by Category</h2>
                <div className="category-links">
                  <Link href={`/${locale}/products/category/solar-panels`}>Solar Panels</Link>
                  <Link href={`/${locale}/products/category/solar-inverters`}>Solar Inverters</Link>
                  <Link href={`/${locale}/products/category/solar-batteries`}>Solar Batteries</Link>
                  <Link href={`/${locale}/products/category/portable-power-stations`}>Portable Power</Link>
                  <Link href={`/${locale}/products/category/home-appliances`}>Home Appliances</Link>
                  <Link href={`/${locale}/products/category/3c-electronics`}>3C Electronics</Link>
                </div>
              </div>
            )}
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

        /* === Search header === */
        .search-header {
          background: linear-gradient(135deg, #E85D2F 0%, #3fb950 140%);
          color: #fff;
          padding: 40px 20px 48px;
        }

        .search-header h1 {
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 10px;
        }

        .search-intro {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.92;
          max-width: 680px;
          margin: 0 0 24px;
        }

        .search-form {
          display: flex;
          gap: 12px;
          max-width: 720px;
        }

        .search-input-wrap {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: #999;
          display: flex;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 14px 44px 14px 46px;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          background: #fff;
          color: #1a1a2e;
          outline: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .search-input:focus {
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4);
        }

        .search-clear {
          position: absolute;
          right: 10px;
          border: none;
          background: #eef0f3;
          color: #666;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-clear:hover {
          background: #e0e4ea;
          color: #333;
        }

        .search-submit {
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          background: #1a1a2e;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s;
        }

        .search-submit:hover {
          background: #2a2a4e;
        }

        .result-count {
          margin: 20px 0 0;
          font-size: 14px;
          opacity: 0.95;
        }

        /* === Results section === */
        .search-results-section {
          padding: 40px 20px 80px;
          background: #f8f9fa;
          min-height: 400px;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .product-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eef0f3;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .product-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .product-image-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #f0f2f5;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .product-price-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #E85D2F;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .product-body {
          padding: 18px 20px 22px;
        }

        .product-category {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #3fb950;
          margin-bottom: 6px;
        }

        .product-name {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .product-model {
          font-size: 13px;
          color: #888;
          font-family: 'SFMono-Regular', Consolas, monospace;
        }

        .product-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #555;
          margin: 10px 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-certs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }

        .cert-chip {
          font-size: 11px;
          font-weight: 600;
          color: #E85D2F;
          background: #fff3ee;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .product-cta {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: #E85D2F;
        }

        .search-footer {
          text-align: center;
          margin-top: 48px;
          padding: 28px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #eef0f3;
        }

        .search-footer p {
          font-size: 15px;
          color: #555;
          margin: 0 0 16px;
        }

        /* === Empty / landing states === */
        .empty-state,
        .landing-state {
          text-align: center;
          background: #fff;
          border-radius: 12px;
          padding: 56px 32px;
          border: 1px solid #eef0f3;
          max-width: 720px;
          margin: 0 auto;
        }

        .empty-icon {
          color: #c8d0e0;
          margin-bottom: 16px;
          display: flex;
          justify-content: center;
        }

        .empty-state h2,
        .landing-state h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 12px;
        }

        .empty-state p {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 28px;
        }

        .popular-searches {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin: 0 0 28px;
        }

        .popular-label {
          width: 100%;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #888;
          margin-bottom: 6px;
        }

        .popular-chip {
          background: #fff3ee;
          color: #E85D2F;
          border: none;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .popular-chip:hover {
          background: #E85D2F;
          color: #fff;
        }

        .category-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          justify-content: center;
          margin: 0 0 28px;
        }

        .category-links a {
          color: #E85D2F;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          padding: 6px 0;
        }

        .category-links a:hover {
          text-decoration: underline;
        }

        .landing-cat-title {
          margin-top: 40px;
        }

        /* === Buttons === */
        .btn-primary {
          display: inline-block;
          background: #E85D2F;
          color: #fff;
          padding: 13px 30px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #c44a20;
        }

        /* === Responsive === */
        @media (max-width: 900px) {
          .results-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .search-header {
            padding: 28px 16px 36px;
          }

          .search-header h1 {
            font-size: 24px;
          }

          .search-form {
            flex-direction: column;
          }

          .search-submit {
            width: 100%;
          }

          .results-grid {
            grid-template-columns: 1fr;
          }

          .empty-state,
          .landing-state {
            padding: 36px 20px;
          }

          .empty-state h2,
          .landing-state h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}

/*
SEO CHECKLIST:
[x] SearchResultsPage Schema (JSON-LD) — declares page type for Google
[x] Breadcrumb component + BreadcrumbList schema
[x] Canonical URL pointing to /search (avoids query-string duplication)
[x] Accessible search form (role="search", aria-label, aria-live result count)
[x] Debounced live search + URL-synced `q` param (shareable / back-button)
[x] Score-ranked fuzzy search across name/model/category/desc/keywords
[x] Friendly empty state with popular searches + category internal links
[x] Default landing state (no query) — still useful + internal linking
[x] Responsive design (desktop / tablet / mobile breakpoints)
[x] Descriptive image alt text on every product card
[x] Internal linking to category pages + contact (funnel + PageRank flow)
*/

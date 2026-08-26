/**
 * Blog Article Type Definitions
 * Shared types for all blog article data files.
 *
 * SEO IMPACT:
 *   - Structured data fields (datePublished, dateModified, author) feed directly
 *     into the Article schema JSON-LD, enabling Google rich results.
 *   - The `keywords` field populates meta keywords and Article schema keywords.
 *   - The `faqs` array drives FAQPage schema for expanded SERP real estate.
 */

export interface BlogSection {
  /** H2 heading text — should contain target or LSI keyword where natural */
  heading: string;
  /** Body paragraphs under this heading — 2-3 paragraphs per section */
  paragraphs: string[];
}

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

export interface ProductRecommendation {
  slug: string;
  name: string;
  desc: string;
  image: string;
}

export interface BlogVideo {
  name: string;
  description: string;
  contentUrl: string;
  poster: string;
  duration: string;
  width: number;
  height: number;
  uploadDate: string;
  captionsUrl?: string;
  transcript?: string;
}

export interface BlogPost {
  /** URL slug — kebab-case, contains target keyword */
  slug: string;
  /** H1 title — MUST contain the primary target keyword */
  title: string;
  /** Meta description — 150-155 chars, contains target keyword + CTA */
  description: string;
  /** Comma-separated keywords — primary + LSI keywords */
  keywords: string;
  /** Author name */
  author: string;
  /** Author role/title */
  authorRole: string;
  /** ISO date string — publication date */
  datePublished: string;
  /** ISO date string — last modified date */
  dateModified: string;
  /** Reading time estimate (e.g. "8 min read") */
  readingTime: string;
  /** Article category */
  category: string;
  /** Hero image URL */
  heroImage: string;
  /** Optional vertical focal point when a portrait hero is displayed in a wide article banner */
  heroImageFocus?: 'upper' | 'center';
  /** Alt text for hero image — descriptive, contains keyword */
  heroImageAlt: string;
  /** Article body sections */
  sections: BlogSection[];
  /** FAQ entries — drive FAQPage schema */
  faqs: { question: string; answer: string }[];
  /** Related articles for internal linking sidebar */
  relatedArticles: RelatedArticle[];
  /** Product recommendations for conversion sidebar */
  productRecommendations: ProductRecommendation[];
  /** Optional embedded video with accessible metadata */
  video?: BlogVideo;
}

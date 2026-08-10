/**
 * Barrel re-export for blog type definitions.
 *
 * Blog article data files live in `src/data/blog/` and import types via
 * `../types` (i.e. this file). This barrel re-exports everything from
 * `./blog/types` so that all blog articles resolve a single, shared set
 * of interfaces without coupling every file to the `blog/` subpath.
 */
export type {
  BlogPost,
  BlogSection,
  RelatedArticle,
  ProductRecommendation,
} from './blog/types';

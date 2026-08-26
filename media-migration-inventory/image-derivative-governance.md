# HousePlus R2 Responsive Derivative Governance

## Purpose and boundary

This document defines the **pre-generation contract** for responsive image derivatives. It does not authorize overwriting any production original, changing a public media URL, deleting an R2 object, or altering the old-account rollback assets. A derivative is a delivery variant; the approved original in media-v2 remains the source of record.

Only assets that are `approved`, `seo_indexable = 1`, image MIME types, and have measured dimensions may enter a derivative pilot. QR codes, logos, vector artwork, transparent UI assets, and images with fine readable text remain on their original PNG/SVG delivery path unless a visual QA comparison separately approves a lossless variant.

## R2 key and cache contract

| Field | Contract |
| --- | --- |
| Prefix | `derivatives/` only; never write beneath an original `r2_key` |
| Source identity | SHA-256 `content_hash` of the approved source asset |
| Key pattern | `derivatives/{content_hash}/{width}w-q{quality}.{format}` |
| Initial widths | `480w`, `768w`, `1200w`, `1600w`, plus a source-size ceiling; no upscale |
| Initial photographic format | WebP at quality 72–82 after visual QA; retain JPEG original |
| Cache | Immutable CDN caching with a hash-addressed key; a new source hash creates a new derivative family |
| Public source URL | Existing `/media/{slug}/` URL remains unchanged until a renderer has explicitly opted into a tested derivative `srcset` |
| Rollback | Remove only the renderer’s derivative reference or relation. The original R2 object and its public `/media/{slug}/` route remain available. |

## D1 metadata and relationship contract

Every derivative creates a separate `assets` row with `seo_indexable = 0` and `status = approved` only after visual validation. It must record the original hash and derivation settings in `metadata_json`. The derivative row is connected to its original by an `asset_versions` record using `replaces_asset_id = {original_asset_id}` and `reason = responsive-derivative`; it is not a content replacement and must not supersede the original public slug.

The original asset keeps all `asset_relations`, `asset_translations`, Image Sitemap eligibility and canonical URLs. Derivative rows do not receive page relations or direct Image Sitemap entries. This prevents a single visual from producing duplicate image-search entries while retaining a reversible technical inventory.

## Sharp pilot procedure

1. Select no more than five approved photographic originals above 1 MB that are already rendered by a core template with accurate `sizes`.
2. Generate only the width ladder that is no larger than the source width. Compute the new file content hash and write the derivative beneath `derivatives/`.
3. Compare original and derivative at 1× and 2× rendered sizes, including text, QR codes, logos, product labels and gradients. Reject variants with visible artifacts.
4. Create D1 derivative metadata and an audit event only after the visual comparison passes. Do not modify original assets, their slugs, or existing relations.
5. Enable a renderer on one page template, validate Preview and production headers, then audit actual `srcset`, `sizes`, bytes and layout. The renderer must preserve its original URL fallback.

## Explicit non-goals for the first pilot

The first pilot does not bulk-recompress 195 production images, rename legacy public URLs, introduce automatic deletion, alter the existing Cloudflare media Worker behavior, or replace the portable-power article hero/video media. These are independent changes requiring fresh evidence and a separate approval decision.

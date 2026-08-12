# Article Cover Completeness Review

## Scope and standard

This review applies to all **29** public HousePlus news articles. Every article now has a unique hero image path that is visually matched to its topic. Validation used the actual news-card crop: **16:10 on mobile** and **16:9 on desktop**. The article title is no longer rendered on top of the hero image in the shared and data-driven detail templates, preserving both image clarity and text contrast.

## Corrected image issues

| Category | Scope | Resolution |
| --- | ---: | --- |
| Reused or topic-mismatched article covers | 29 articles | Replaced with unique, topic-matched covers; no news-card cover path is shared. |
| Incorrect household-cleaning image on solar articles | 2 articles | Removed from the news-card and article-cover system; solar procurement and manufacturer topics now use dedicated solar imagery. |
| Comparison images lacking visual contrast | 2 articles | Rebuilt `LiFePO4 vs Lead-Acid` and `Mono vs Poly vs PERC` covers with distinct, side-by-side physical subjects. |
| Wholesale price guide lacking analytical context | 1 article | Rebuilt with procurement review, quoted inventory, solar modules and logistics context. |
| Legacy static article covers reusing product photos | 4 articles | Added individual smart-home, solar-storage, 3C evolution and future-solar covers. |
| Independent static article detail pages | 17 pages | Mapped to corresponding unique article covers and migrated to the responsive feature-image component where applicable. |

## Presentation system

News cards use a restrained visual system with a safe image aspect ratio, a compact category badge, a visible publication date, two-line title limit, three-line summary limit and a consistent action row. Article detail pages use a clear text introduction followed by a standalone responsive feature image with no headline overlay. The result maintains subject visibility on mobile and desktop while keeping image and copy visually separate.

## Verification

The production build completes successfully. The news index and static article detail pages were checked in the final local production preview. Article-card topics, dates, captions and hero images render in the expected hierarchy, and the previously incorrect cleaning-product imagery is no longer used as a solar article cover.

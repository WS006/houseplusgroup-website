# HousePlus Mobile and Localization Check — 2026-08-14

## First visual pass

| Page | Viewport | Result |
| --- | --- | --- |
| `/en/` | 390 × 844 | Header, hero copy, menu button and CTAs fit the viewport without visible horizontal overflow. The right-side service tab remains reachable. |
| `/ar/products/air-fryer-12l-rotisserie/` | 390 × 844 | RTL header, breadcrumbs, image and product labels render in the expected direction. The floating chat button overlaps the lower part of the first-screen product title and requires a mobile position adjustment. |
| `/es/products/air-fryer-12l-rotisserie/` | 390 × 844 | Header, long breadcrumb and localized product labels fit the viewport. The same floating chat button overlaps the lower-right portion of the H1. |
| `/de/news/2026-electronics-market-update/` | 390 × 844 | Long German headline and article introduction wrap inside the viewport without visible horizontal overflow. |
| `/fr/regions/europe/` | 390 × 844 | Long French region heading, CTA labels and contact action fit the viewport without visible horizontal overflow. |

## Final chat-button verification

After the floating-chat mobile positioning update, new 390 × 844 screenshots of the Spanish and Arabic product pages confirmed that the button is smaller and positioned at the lower viewport edge. It no longer obscures either localized product title; Arabic RTL breadcrumbs and H1 remain readable.

## Chat-window verification

The production Arabic chat window was opened in a browser. Its assistant label, online status, welcome message, quick-question prompts, input placeholder and send control are all Arabic, and the window uses RTL direction. The localized answers retain quotation-confirmed commercial guidance rather than fixed MOQ, delivery or warranty promises.

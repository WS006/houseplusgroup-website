# Production Localization Verification — 2026-08-13

## Pages checked

| URL | Result | Key findings |
|---|---|---|
| https://www.houseplus-ch.com/es/products/solar-panel-500w/ | Pass with follow-up issues | Spanish title, product body, specifications headings, feature headings, CTA, quote-confirmation labels, and R2 image alt/title are localized. The page returns the Spanish canonical URL. Footer legal links still display English labels (`Privacy`, `Terms`, `Cookies`), and the support widget exposes a legacy `+2349078080738` call link that conflicts with the confirmed public support number (`+86 155 7811 9543`). |
| https://www.houseplus-ch.com/de/news/how-to-choose-wholesale-solar-panels | Pass with follow-up issues | German title, heading structure, body, FAQs, CTA, sidebar and back link render in German; the article URL is the German locale URL. The source article retains specific market, certification, MOQ, warranty, employee-count, factory-area and logistics claims that require fact-by-fact commercial accuracy review before relying on them as HousePlus-specific statements. |

## Deployment status

- Commit `48f93a1` was pushed to `main`.
- Vercel reported a successful production deployment and aliased it to `https://www.houseplus-ch.com`.
- The published build generated 607 static pages successfully.

## Next verification actions

1. Verify Arabic region route, including RTL presentation and corrected non-local contact data.
2. Inspect rendered document head for canonical, robots and hreflang tags.
3. Audit shared footer and support widget against the no-fake-contact-data requirement.
4. Audit article-level commercial claims and cite or qualify any non-verifiable market statistics, certifications, warranties, MOQ, lead-time and facility statements.

## Final production recheck

| URL | Result | Verified outcome |
|---|---|---|
| https://www.houseplus-ch.com/ar/regions/europe/?v=803137f | Pass | Arabic region name renders as `أوروبا`; all regional sourcing, quotation and contact copy remains Arabic; WhatsApp and call links use the confirmed `+86 155 7811 9543` number; the shared footer brand description, headings and legal links now render in Arabic. |

The legacy `+2349078080738` support number is no longer present in the verified production region page. The online support widget remains English-only in its UI labels, which is a non-blocking future localization enhancement rather than a commercial-accuracy issue.

## Search-engine notification receipt

On 2026-08-13, the live production sitemap submission completed successfully from `/admin/indexnow` after the multilingual release.

| Destination | Receipt |
|---|---|
| IndexNow Network | OK |
| Bing | OK |
| Yandex | `{ "success": true }` |
| Google Search Console | Canonical sitemap submitted: `https://www.houseplus-ch.com/sitemap.xml` |

The submission workflow reported **486 URLs submitted**. The administrative dashboard advertises 551 available pages; the difference reflects the live sitemap’s publication set, not an indexing or ranking guarantee.

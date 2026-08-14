# HousePlus Production Multilingual Baseline — 2026-08-14

## Scope

The production sitemap contained 481 canonical, indexable URLs: 109 English pages and 93 pages each for Spanish, German, French, and Arabic.

## Verified improvements

The Arabic `air-fryer-12l-rotisserie` product page renders with Arabic navigation, RTL layout after hydration, localized support-widget labels, translated technical terms, quotation-confirmed commercial fields, and no visible legacy GEO fact block or fixed MOQ, lead-time, or warranty promise.

## Remaining technical issue

Raw HTML fetched for representative EN, ES, DE, FR, and AR product URLs still reported `<html lang="en" dir="ltr">`. The client-side language layout corrects the DOM after hydration, but the server-rendered document attributes remain incorrect for non-English locales. This must be resolved before the multilingual technical audit can be closed.

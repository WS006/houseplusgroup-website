/**
 * Open Graph Image Generator
 * Route: /api/og-image
 * Runtime: Edge (required by @vercel/og ImageResponse)
 * Updated: 2026-07-28
 *
 * Dynamically renders a 1200×630 social-share image (the Open Graph / Twitter
 * Card image) on the fly using @vercel/og (Satori + resvg). One endpoint
 * serves every page a branded OG image without storing thousands of PNGs.
 *
 * NOTE ON FILE EXTENSION:
 *   The other API routes in this project (sitemap.ts, feed.ts) use the `.ts`
 *   extension and contain no JSX. @vercel/og's ImageResponse requires a React
 *   element tree, which is normally written as JSX — but JSX is not valid in a
 *   `.ts` file. To keep this route consistent with the `.ts` API-route
 *   convention while remaining valid TypeScript, the element tree is built
 *   with React.createElement (aliased to `el`) instead of JSX. The rendered
 *   output is identical to a JSX version.
 *
 * USAGE:
 *   /api/og-image?title=500W%20Solar%20Panel&subtitle=Wholesale%20from%20HousePlus
 *   /api/og-image?title=...&subtitle=...&type=product
 *   /api/og-image?title=...&bg=0d2b4e   (custom solid background hex, no #)
 *
 * QUERY PARAMS:
 *   title    — main headline (defaults to brand name)
 *   subtitle — secondary line (e.g. category or tagline)
 *   type     — "product" | "article" | "category" | "page" (tints the badge)
 *   bg       — override background hex (no #), e.g. "0d2b4e"
 *   url      — page URL shown bottom-right (defaults to site domain)
 *   logo     — override brand logo text (defaults to "HousePlus")
 *
 * SEO IMPACT:
 *   Rich, on-brand OG images measurably improve social CTR (Facebook, LinkedIn,
 *   X/Twitter, WhatsApp), which drives referral traffic and indirect ranking
 *   signals. Dynamic generation guarantees every page has a unique, correct
 *   image without manual design work.
 *
 * BRAND:
 *   Warm gradient (matching HousePlus logo): Red #E63946 → Orange #E85D2F → Gold #F4C430
 */

import React from 'react';
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

// createElement alias so the element tree reads cleanly without JSX.
const el = React.createElement;

// === Brand constants — matched to HousePlus logo warm gradient ===
const BRAND_RED = '#E63946';
const BRAND_ORANGE = '#F4845F';
const BRAND_GOLD = '#F4C430';
const BRAND_GREEN = '#3fb950';
const SITE_DOMAIN = 'www.houseplus-ch.com';

// Badge colour per content type — keeps the image informative at a glance.
const TYPE_STYLES: Record<string, { bg: string; label: string }> = {
  product: { bg: BRAND_GREEN, label: 'PRODUCT' },
  article: { bg: '#6f42c1', label: 'ARTICLE' },
  category: { bg: '#f59e0b', label: 'CATEGORY' },
  page: { bg: BRAND_ORANGE, label: 'HOUSEPLUS' },
};

// Clamp helper so absurd titles cannot overflow the canvas.
const MAX_TITLE_LEN = 90;
const MAX_SUBTITLE_LEN = 140;

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

// Validate a user-supplied hex colour; fall back to null if malformed.
function safeHex(hex: string | null): string | null {
  if (!hex) return null;
  const clean = hex.replace(/^#/, '').toLowerCase();
  return /^[0-9a-f]{6}$/.test(clean) ? `#${clean}` : null;
}

export const config = {
  // @vercel/og must run on the Edge runtime.
  runtime: 'edge',
};

export default async function handler(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);

  // --- Read & sanitise query params ---
  const title = truncate(
    (searchParams.get('title') || 'HousePlus').trim(),
    MAX_TITLE_LEN
  );
  const subtitle = truncate(
    (searchParams.get('subtitle') || '').trim(),
    MAX_SUBTITLE_LEN
  );
  const type = (searchParams.get('type') || 'page').toLowerCase();
  const badge = TYPE_STYLES[type] || TYPE_STYLES.page;
  const url = (searchParams.get('url') || '').trim();
  const logoText =
    (searchParams.get('logo') || process.env.OG_LOGO_TEXT || 'HousePlus').trim() ||
    'HousePlus';
  const customBg = safeHex(searchParams.get('bg')) || safeHex(process.env.OG_DEFAULT_BG || null);

  // --- Build the OG image element tree (Satori supports a flexbox CSS subset) ---

  // Top decorative brand bar — warm gradient matching the logo.
  const brandBar = el('div', {
    style: {
      width: '70px',
      height: '8px',
      borderRadius: '4px',
      background: `linear-gradient(90deg, ${BRAND_RED}, ${BRAND_ORANGE}, ${BRAND_GOLD})`,
    },
  });

  // Rounded "H+" logo mark — warm gradient background.
  const logoMark = el(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: `linear-gradient(135deg, ${BRAND_RED}, ${BRAND_ORANGE}, ${BRAND_GOLD})`,
        color: '#ffffff',
        fontSize: '38px',
        fontWeight: 800,
      },
    },
    'H+'
  );

  // Content-type badge chip.
  const badgeChip = el(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        background: badge.bg,
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 700,
        padding: '4px 14px',
        borderRadius: '20px',
        letterSpacing: '1px',
      },
    },
    badge.label
  );

  // Brand logo text.
  const logoName = el(
    'div',
    { style: { fontSize: '38px', fontWeight: 800, letterSpacing: '-0.5px' } },
    logoText
  );

  // Row holding the logo text + badge.
  const nameRow = el(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: '14px' } },
    logoName,
    badgeChip
  );

  // Sub-tagline under the logo.
  const tagline = el(
    'div',
    {
      style: {
        fontSize: '20px',
        opacity: 0.85,
        marginTop: '2px',
        letterSpacing: '0.5px',
      },
    },
    'Solar · Home Appliances · 3C Electronics'
  );

  // Brand column (logo text + tagline).
  const brandColumn = el(
    'div',
    { style: { display: 'flex', flexDirection: 'column' } },
    nameRow,
    tagline
  );

  // Logo row (mark + brand column).
  const logoRow = el(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        marginTop: '8px',
      },
    },
    logoMark,
    brandColumn
  );

  // Main title (shrinks for long headlines).
  const titleEl = el(
    'div',
    {
      style: {
        fontSize: title.length > 55 ? '62px' : '76px',
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: '-1.5px',
        maxWidth: '1050px',
      },
    },
    title
  );

  // Optional subtitle.
  const subtitleEl = subtitle
    ? el(
        'div',
        {
          style: {
            fontSize: '32px',
            lineHeight: 1.35,
            opacity: 0.92,
            maxWidth: '1000px',
          },
        },
        subtitle
      )
    : null;

  // Title + subtitle block.
  const titleBlock = el(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '20px',
        marginBottom: '20px',
      },
    },
    titleEl,
    subtitleEl
  );

  // Trust signals (footer left).
  const trustSignals = el(
    'div',
    {
      style: {
        display: 'flex',
        gap: '28px',
        fontSize: '24px',
        fontWeight: 600,
      },
    },
    el('span', null, '✓ CE / RoHS'),
    el('span', null, '✓ OEM / ODM'),
    el('span', null, '✓ MOQ 100 pcs')
  );

  // URL column (footer right).
  const urlColumn = el(
    'div',
    { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
    el(
      'div',
      { style: { fontSize: '28px', fontWeight: 700 } },
      SITE_DOMAIN
    ),
    url
      ? el('div', { style: { fontSize: '18px', opacity: 0.8, marginTop: '4px' } }, url)
      : null
  );

  // Footer row.
  const footer = el(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTop: '2px solid rgba(255,255,255,0.18)',
        paddingTop: '26px',
      },
    },
    trustSignals,
    urlColumn
  );

  // Root container.
  const root = el(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: customBg
          ? customBg
          : `linear-gradient(135deg, #1a0a05 0%, ${BRAND_RED} 45%, ${BRAND_ORANGE} 75%, ${BRAND_GOLD} 130%)`,
        padding: '72px',
        fontFamily: 'sans-serif',
        color: '#ffffff',
        position: 'relative',
      },
    },
    el('div', { style: { display: 'flex', marginTop: 0 } }, brandBar),
    logoRow,
    titleBlock,
    footer
  );

  const image = new ImageResponse(root, {
    width: 1200,
    height: 630,
    // Cache aggressively: same title/subtype → identical image.
    headers: {
      'Content-Type': 'image/png',
      // 1 day in the browser, 1 year at the CDN (immutable per query string).
      'Cache-Control':
        'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
    },
  });

  return image;
}

/**
 * WebVitals Performance Monitoring Component
 * Updated: 2026-07-28
 *
 * Reports Core Web Vitals (the metrics Google uses as ranking signals) to a
 * server endpoint for aggregation and alerting.
 *
 * Metrics reported:
 *   - LCP  (Largest Contentful Paint)  — perceived loading speed
 *   - FID  (First Input Delay)         — interactivity (legacy; INP successor)
 *   - CLS  (Cumulative Layout Shift)   — visual stability
 *   - FCP  (First Contentful Paint)    — time to first content render
 *   - TTFB (Time to First Byte)        — server responsiveness
 *
 * SEO IMPACT:
 *   Core Web Vitals are a confirmed Google ranking factor. Continuously
 *   measuring them lets you (a) catch regressions before they hurt rankings,
 *   (b) prioritise optimisation work by real user data, and (c) correlate
 *   ranking changes with performance changes.
 *
 * HOW IT WORKS:
 *   - Uses Next.js' built-in `useReportWebVitals` hook (next/web-vitals), which
 *     works in both Pages and App routers and handles real-user measurement
 *     (RUM) automatically.
 *   - Reporting runs ONLY in production (process.env.NODE_ENV === 'production')
 *     to keep dev builds quiet and avoid polluting analytics.
 *   - Uses navigator.sendBeacon with a fetch() + keepalive fallback so metrics
 *     are delivered reliably even when the user closes the tab mid-load.
 *
 * USAGE (Pages Router — add once in _app.tsx):
 *   import WebVitals from '../components/WebVitals';
 *   ...
 *   <Component {...pageProps} />
 *   <WebVitals />
 *
 * The component renders nothing (returns null) — it is purely a side-effect.
 */

import { useReportWebVitals } from 'next/web-vitals';

// === Metric metadata: human labels + good/needs-improvement/poor thresholds ===
// Thresholds follow the official web-vitals "good" / "needs improvement" / "poor"
// guidance. CLS threshold changed from 0.1 to 0.1 (2020); kept consistent here.
interface MetricMeta {
  label: string;
  /** "good" if value <=, "poor" if value > poor. Between = "needs improvement". */
  good: number;
  poor: number;
  /** Display unit — seconds for time-based metrics, "" for unitless CLS. */
  unit: 'seconds' | 'milliseconds' | 'unitless';
}

const METRIC_META: Record<string, MetricMeta> = {
  LCP: { label: 'Largest Contentful Paint', good: 2.5, poor: 4.0, unit: 'seconds' },
  FID: { label: 'First Input Delay', good: 100, poor: 300, unit: 'milliseconds' },
  CLS: { label: 'Cumulative Layout Shift', good: 0.1, poor: 0.25, unit: 'unitless' },
  FCP: { label: 'First Contentful Paint', good: 1.8, poor: 3.0, unit: 'seconds' },
  TTFB: { label: 'Time to First Byte', good: 800, poor: 1800, unit: 'milliseconds' },
};

// === Shape of the metric object passed by useReportWebVitals ===
interface WebVitalMetric {
  /** Unique id for this measurement within the page load. */
  id: string;
  /** Metric name, e.g. "LCP", "CLS", "FCP", "FID", "TTFB". */
  name: string;
  /** Numeric value (seconds for LCP/FCP, ms for FID/TTFB, unitless for CLS). */
  value: number;
  /** Rating assigned by web-vitals: "good" | "needs-improvement" | "poor". */
  rating: string;
  /** Change since the last report of this metric (for CLS incremental). */
  delta: number;
  /** Navigation type: "navigate" | "reload" | "back-forward" | "prerender". */
  navigationType: string;
  /** Underlying PerformanceEntry objects. */
  entries: PerformanceEntry[];
}

// === Lightweight anonymous session id so multiple metrics from one pageview
//     can be correlated server-side without tracking individual users. ===
const SESSION_STORAGE_KEY = 'hp_vitals_sid';

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  try {
    let sid = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sid) {
      // Random 8-char id; not persisted across sessions (sessionStorage).
      sid = Math.random().toString(36).slice(2, 10);
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
    }
    return sid;
  } catch {
    // sessionStorage may be unavailable (private mode) — degrade gracefully.
    return 'unknown';
  }
}

// === Report a single metric to the /api/web-vitals endpoint ===
function reportMetric(metric: WebVitalMetric): void {
  const meta = METRIC_META[metric.name];

  // Normalise the value into a consistent unit for storage.
  let normalisedValue = metric.value;
  let displayValue = metric.value;
  if (meta) {
    if (meta.unit === 'seconds') {
      // LCP/FCP come in seconds already; keep as-is.
      normalisedValue = Number(metric.value.toFixed(3));
      displayValue = normalisedValue;
    } else if (meta.unit === 'milliseconds') {
      // FID/TTFB come in milliseconds.
      normalisedValue = Math.round(metric.value);
      displayValue = normalisedValue;
    } else {
      // CLS — unitless, round to 3 decimals.
      normalisedValue = Number(metric.value.toFixed(3));
      displayValue = normalisedValue;
    }
  }

  const payload = {
    id: metric.id,
    name: metric.name,
    label: meta?.label ?? metric.name,
    value: normalisedValue,
    displayValue,
    unit: meta?.unit ?? 'unknown',
    rating: metric.rating, // good | needs-improvement | poor
    delta: metric.delta,
    navigationType: metric.navigationType,
    page: typeof window !== 'undefined' ? window.location.pathname : '/',
    href: typeof window !== 'undefined' ? window.location.href : '',
    sessionId: getSessionId(),
    // User agent + locale help segment desktop/mobile and i18n performance.
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    locale:
      typeof document !== 'undefined'
        ? document.documentElement.lang || 'en'
        : 'en',
    timestamp: new Date().toISOString(),
  };

  const endpoint =
    process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT || '/api/web-vitals';
  const body = JSON.stringify(payload);

  // sendBeacon is preferred: it survives page unload and does not block.
  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([body], { type: 'application/json' });
      const queued = navigator.sendBeacon(endpoint, blob);
      if (queued) return;
    } catch {
      // Fall through to fetch() below.
    }
  }

  // Fallback: fetch with keepalive so it survives navigation/unload.
  if (typeof fetch === 'function') {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      // Use 'no-cors' fallback? No — same-origin endpoint, keep credentials.
      credentials: 'same-origin',
    }).catch(() => {
      // Swallow errors silently — analytics must never break the UX.
    });
  }
}

export default function WebVitals(): null {
  useReportWebVitals((metric: WebVitalMetric) => {
    // Only report the five Core Web Vitals we care about; ignore Next.js
    // custom metrics (Next.js-hydration, Next.js-route-change-to-render, etc.)
    // and the newer INP metric to keep the dataset focused. (INP replaced FID
    // in March 2024; FID is still emitted for backwards compatibility.)
    if (!(metric.name in METRIC_META)) {
      return;
    }

    // Dev builds must stay quiet — no beacon noise, no analytics pollution.
    if (process.env.NODE_ENV !== 'production') {
      // Helpful console log during local development (off by default).
      if (process.env.SEO_DEBUG === '1') {
        // eslint-disable-next-line no-console
        console.debug('[WebVitals]', metric.name, metric.value, metric.rating);
      }
      return;
    }

    reportMetric(metric);
  });

  // This component has no visual output.
  return null;
}

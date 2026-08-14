import { readFile } from 'node:fs/promises';

const reportPath = process.argv[2];
if (!reportPath) throw new Error('Usage: node scripts/summarize-lighthouse.mjs <report.json>');

const report = JSON.parse(await readFile(reportPath, 'utf8'));
const value = (id) => report.audits[id]?.numericValue ?? null;
const milliseconds = (id) => value(id) === null ? null : Math.round(value(id));

console.log(JSON.stringify({
  requestedUrl: report.requestedUrl,
  finalUrl: report.finalUrl,
  performanceScore: Math.round((report.categories.performance.score ?? 0) * 100),
  fcpMs: milliseconds('first-contentful-paint'),
  lcpMs: milliseconds('largest-contentful-paint'),
  tbtMs: milliseconds('total-blocking-time'),
  cls: value('cumulative-layout-shift'),
  speedIndexMs: milliseconds('speed-index'),
  ttiMs: milliseconds('interactive'),
}, null, 2));

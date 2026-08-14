import { readFile } from 'node:fs/promises';

const reportPath = process.argv[2];
if (!reportPath) throw new Error('Usage: node scripts/analyze-lighthouse-opportunities.mjs <report.json>');

const report = JSON.parse(await readFile(reportPath, 'utf8'));
const ids = [
  'render-blocking-resources',
  'largest-contentful-paint-element',
  'uses-optimized-images',
  'uses-responsive-images',
  'modern-image-formats',
  'unused-javascript',
  'unused-css-rules',
  'total-byte-weight',
  'mainthread-work-breakdown',
  'bootup-time',
  'network-requests',
];

const summary = ids.flatMap((id) => {
  const audit = report.audits[id];
  if (!audit) return [];
  const details = audit.details;
  return [{
    id,
    title: audit.title,
    score: audit.score,
    displayValue: audit.displayValue,
    savingsMs: details?.overallSavingsMs ? Math.round(details.overallSavingsMs) : undefined,
    savingsBytes: details?.overallSavingsBytes ? Math.round(details.overallSavingsBytes) : undefined,
    items: details?.items?.slice(0, 5).map((item) => ({ url: item.url, totalBytes: item.totalBytes, wastedBytes: item.wastedBytes, wastedMs: item.wastedMs, group: item.group, duration: item.duration, node: item.node?.snippet })) ?? [],
  }];
});

console.log(JSON.stringify({ requestedUrl: report.requestedUrl, opportunities: summary }, null, 2));

import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const args = process.argv.slice(2);
const outIndex = args.indexOf('--out');
const outputDir = outIndex >= 0 ? args[outIndex + 1] : 'audit/web-vitals-production';
const urls = args.filter((_, index) => index !== outIndex && index !== outIndex + 1);
if (!urls.length) throw new Error('Usage: node scripts/audit-real-web-vitals.mjs <url> ... [--out output-dir]');
await mkdir(outputDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const results = [];
for (const url of urls) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.emulateNetworkConditions({ offline: false, latency: 150, download: 1.6 * 1024 * 1024 / 8, upload: 750 * 1024 / 8 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
  const metrics = await page.evaluate(async () => {
    const entries = performance.getEntriesByType('navigation');
    const paints = performance.getEntriesByType('paint');
    const lcp = await new Promise((resolve) => {
      let latest = 0;
      const observer = new PerformanceObserver((list) => { for (const entry of list.getEntries()) latest = Math.max(latest, entry.startTime); });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      setTimeout(() => { observer.disconnect(); resolve(latest || null); }, 100);
    });
    let cls = 0;
    for (const entry of performance.getEntriesByType('layout-shift')) if (!entry.hadRecentInput) cls += entry.value;
    return { lcpMs: lcp, cls, fcpMs: paints.find((x) => x.name === 'first-contentful-paint')?.startTime || null, domContentLoadedMs: entries[0]?.domContentLoadedEventEnd || null, loadMs: entries[0]?.loadEventEnd || null, imageCount: document.images.length, nextImageCount: [...document.images].filter((img) => img.currentSrc.includes('/_next/image')).length };
  });
  results.push({ url, ...metrics });
  await page.close();
}
await browser.close();
const report = { generatedAt: new Date().toISOString(), network: 'mobile-like 150ms latency / 1.6Mbps down', results };
await writeFile(`${outputDir}/summary.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

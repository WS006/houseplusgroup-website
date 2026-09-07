import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'https://www.houseplus-ch.com/en/';
const outDir = process.argv[3] || 'audit/homepage-lcp-breakdown';
await mkdir(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.emulateNetworkConditions({ offline: false, latency: 150, download: 1.6 * 1024 * 1024 / 8, upload: 750 * 1024 / 8 });
const requests = new Map();
page.on('request', request => requests.set(request.url(), { url: request.url(), resourceType: request.resourceType(), requestStart: Date.now() }));
page.on('response', response => {
  const item = requests.get(response.url());
  if (item) { item.status = response.status(); item.responseStart = Date.now(); item.headers = response.headers(); }
});
const navigationStart = Date.now();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
await new Promise(resolve => setTimeout(resolve, 7000));
const result = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const resources = performance.getEntriesByType('resource').map(entry => ({ name: entry.name, initiatorType: entry.initiatorType, startTime: entry.startTime, responseStart: entry.responseStart, responseEnd: entry.responseEnd, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, decodedBodySize: entry.decodedBodySize }));
  const images = [...document.images].map(img => ({ src: img.currentSrc || img.src, alt: img.alt, complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, loading: img.loading, fetchPriority: img.fetchPriority, priority: img.getAttribute('priority'), rect: img.getBoundingClientRect().toJSON() }));
  const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
  return { navigation: { domContentLoaded: nav?.domContentLoadedEventEnd, load: nav?.loadEventEnd, responseStart: nav?.responseStart, requestStart: nav?.requestStart }, lcp: lcpEntries.map(e => ({ startTime: e.startTime, size: e.size, url: e.url, element: e.element?.tagName })), images, resources };
});
const report = { generatedAt: new Date().toISOString(), url, network: 'mobile-like 150ms latency / 1.6Mbps down', wallClockMs: Date.now() - navigationStart, ...result, requestLog: [...requests.values()] };
await writeFile(`${outDir}/summary.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ url, lcp: report.lcp, navigation: report.navigation, images: report.images.map(({ src, naturalWidth, naturalHeight, loading, fetchPriority, rect }) => ({ src, naturalWidth, naturalHeight, loading, fetchPriority, rect })), largestResources: report.resources.filter(r => r.initiatorType === 'img' || r.initiatorType === 'script' || r.initiatorType === 'font').sort((a,b) => b.transferSize - a.transferSize).slice(0, 15) }, null, 2));
await browser.close();

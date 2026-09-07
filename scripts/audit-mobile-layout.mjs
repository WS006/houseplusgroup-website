import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const sitemapUrl = process.argv[2] || 'https://www.houseplus-ch.com/sitemap.xml';
const outputDir = process.argv[3] || '/tmp/houseplus-mobile-layout-audit';
const failOnIssues = process.argv.includes('--fail-on-issues');
const maxUrlsArg = process.argv.find((arg) => arg.startsWith('--max-urls='));
const maxUrls = maxUrlsArg ? Number.parseInt(maxUrlsArg.split('=')[1], 10) : null;
const chromePath = process.env.CHROME_PATH || '/usr/bin/chromium';
const concurrency = 4;

if (maxUrls !== null && (!Number.isInteger(maxUrls) || maxUrls < 1)) {
  throw new Error('--max-urls must be a positive integer');
}

const sitemap = await fetch(sitemapUrl).then((response) => {
  if (!response.ok) throw new Error(`Sitemap request failed: ${response.status}`);
  return response.text();
});
const allUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
// Keep full-sitemap mode for scheduled/manual audits, but use a deterministic
// evenly distributed sample in CI so all locales and route families remain
// represented without loading every page's images on every commit.
const urls = maxUrls && maxUrls < allUrls.length
  ? Array.from({ length: maxUrls }, (_, index) => allUrls[Math.floor(index * allUrls.length / maxUrls)])
  : allUrls;
const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const issues = [];
let cursor = 0;

async function inspect(url) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
    // This audit checks viewport overflow and required mobile metadata, not
    // image quality or Web Vitals. Blocking media keeps CI from turning every
    // production-page check into a Vercel/remote-CDN image download. Image
    // dimensions remain part of the DOM/CSS contract and are audited by the
    // dedicated image and Web Vitals jobs.
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'font', 'media'].includes(request.resourceType())) request.abort();
      else request.continue();
    });
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise((resolve) => setTimeout(resolve, 120));
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      viewportMeta: document.querySelector('meta[name="viewport"]')?.getAttribute('content') || null,
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      title: document.title,
    }));
    if (!response || response.status() >= 400 || metrics.scrollWidth > metrics.clientWidth + 2 || !metrics.viewportMeta) {
      issues.push({ url, status: response?.status() ?? null, ...metrics });
    }
  } catch (error) {
    issues.push({ url, error: error instanceof Error ? error.message : String(error) });
  } finally {
    await page.close();
  }
}

async function worker() {
  while (cursor < urls.length) {
    const index = cursor++;
    await inspect(urls[index]);
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
await browser.close();
await mkdir(outputDir, { recursive: true });
const summary = {
  sitemapUrl,
  viewport: '390x844',
  checked: urls.length,
  available: allUrls.length,
  limited: urls.length < allUrls.length,
  issueCount: issues.length,
  issues,
};
await writeFile(`${outputDir}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ checked: urls.length, available: allUrls.length, issueCount: issues.length, output: `${outputDir}/summary.json` }, null, 2));
if (failOnIssues && issues.length > 0) process.exitCode = 1;

import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const sitemapUrl = process.argv[2] || 'https://www.houseplus-ch.com/sitemap.xml';
const outputDir = process.argv[3] || '/tmp/houseplus-mobile-layout-audit';
const chromePath = process.env.CHROME_PATH || '/usr/bin/chromium';
const concurrency = 4;

const sitemap = await fetch(sitemapUrl).then((response) => {
  if (!response.ok) throw new Error(`Sitemap request failed: ${response.status}`);
  return response.text();
});
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const browser = await puppeteer.launch({ headless: true, executablePath: chromePath, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const issues = [];
let cursor = 0;

async function inspect(url) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise((resolve) => setTimeout(resolve, 120));
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      title: document.title,
    }));
    if (!response || response.status() >= 400 || metrics.scrollWidth > metrics.clientWidth + 2) {
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
const summary = { sitemapUrl, viewport: '390x844', checked: urls.length, issueCount: issues.length, issues };
await writeFile(`${outputDir}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ checked: urls.length, issueCount: issues.length, output: `${outputDir}/summary.json` }, null, 2));

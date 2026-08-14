import { readFile, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const sourcePath = process.argv[2] || '/tmp/houseplus-mobile-layout-audit/summary.json';
const outputPath = process.argv[3] || '/tmp/houseplus-mobile-layout-audit/overflow-elements.json';
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const details = [];

for (const issue of source.issues) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
    await page.goto(issue.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await new Promise((resolve) => setTimeout(resolve, 200));
    const overflowing = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      return [...document.querySelectorAll('body *')]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            tag: element.tagName.toLowerCase(),
            id: element.id || null,
            className: typeof element.className === 'string' ? element.className.slice(0, 180) : null,
            text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 160),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            display: style.display,
            whiteSpace: style.whiteSpace,
            overflowWrap: style.overflowWrap,
            wordBreak: style.wordBreak,
          };
        })
        .filter((element) => element.width > 0 && element.right > viewportWidth + 2)
        .sort((a, b) => b.right - a.right || b.width - a.width)
        .slice(0, 20);
    });
    details.push({ url: issue.url, overflowing });
  } catch (error) {
    details.push({ url: issue.url, error: error instanceof Error ? error.message : String(error) });
  } finally {
    await page.close();
  }
}

await browser.close();
await writeFile(outputPath, JSON.stringify(details, null, 2));
console.log(JSON.stringify({ inspected: details.length, outputPath }, null, 2));

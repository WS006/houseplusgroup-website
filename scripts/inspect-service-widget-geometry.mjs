import { writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'https://www.houseplus-ch.com/de/service';
const outputPath = process.argv[3] || '/tmp/houseplus-mobile-layout-audit/service-widget-geometry.json';
const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

const geometry = await page.evaluate(() => {
  const serialize = (element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return {
      tag: element.tagName.toLowerCase(),
      className: typeof element.className === 'string' ? element.className : null,
      rect: { left: rect.left, right: rect.right, width: rect.width, top: rect.top, bottom: rect.bottom },
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      position: style.position,
      display: style.display,
      flex: style.flex,
      overflow: style.overflow,
      minWidth: style.minWidth,
      width: style.width,
    };
  };
  const root = [...document.querySelectorAll('div')].find((element) => typeof element.className === 'string' && element.className.includes('z-[100]'));
  const main = document.querySelector('main');
  return {
    viewport: { innerWidth: window.innerWidth, visualViewportWidth: window.visualViewport?.width ?? null },
    document: { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth },
    bodyChildren: [...document.body.children].map(serialize),
    mainOverflow: main ? [...main.querySelectorAll('*')]
      .map(serialize)
      .filter((element) => element.position !== 'fixed' && (element.right > document.documentElement.clientWidth + 2 || element.scrollWidth > element.clientWidth + 2))
      .sort((a, b) => (b.scrollWidth - b.clientWidth) - (a.scrollWidth - a.clientWidth) || b.right - a.right)
      .slice(0, 30) : [],
    root: root ? serialize(root) : null,
    children: root ? [...root.children].map(serialize) : [],
  };
});

await browser.close();
await writeFile(outputPath, JSON.stringify(geometry, null, 2));
console.log(JSON.stringify(geometry, null, 2));

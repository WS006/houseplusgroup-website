import { mkdir, writeFile } from 'node:fs/promises';

const sitemapUrl = process.argv[2] || 'https://www.houseplus-ch.com/sitemap.xml';
const outputDir = process.argv[3] || '/tmp/houseplus-visible-localization-audit';
const uiTerms = [
  'Online Support', 'Email Us', 'Call Us', 'Request a Quote', 'Back to Products',
  'Technical Specifications', 'Key Features', 'Frequently Asked Questions',
  'Product Not Found', 'Read More', 'View Details', 'Contact Us', 'Cookie Policy',
  'Privacy Policy', 'Loading...', 'Search Products', 'Send Message', 'Live Chat',
];

const xml = await fetch(sitemapUrl).then((response) => response.text());
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const tasks = urls.map((url) => {
  const locale = new URL(url).pathname.split('/').filter(Boolean)[0];
  return { url, locale };
}).filter(({ locale }) => ['es', 'de', 'fr', 'ar'].includes(locale));

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < tasks.length) {
    const task = tasks[cursor++];
    try {
      const response = await fetch(task.url, { signal: AbortSignal.timeout(20000) });
      const html = await response.text();
      const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
      const lang = htmlTag.match(/\blang="([^"]+)"/i)?.[1] || null;
      const dir = htmlTag.match(/\bdir="([^"]+)"/i)?.[1] || null;
      const terms = uiTerms.filter((term) => html.includes(`>${term}<`) || html.includes(`>${term} `));
      const issues = [];
      if (lang !== task.locale) issues.push(`html_lang:${lang || 'missing'}`);
      if (task.locale === 'ar' && dir !== 'rtl') issues.push(`arabic_dir:${dir || 'missing'}`);
      if (task.locale !== 'ar' && dir !== 'ltr') issues.push(`ltr_dir:${dir || 'missing'}`);
      if (terms.length) issues.push(`english_ui:${terms.join('|')}`);
      results.push({ ...task, status: response.status, lang, dir, terms, issues });
    } catch (error) {
      results.push({ ...task, status: 0, lang: null, dir: null, terms: [], issues: [`fetch:${error.name}`] });
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
results.sort((a, b) => a.url.localeCompare(b.url));
const summary = {};
for (const locale of ['es', 'de', 'fr', 'ar']) {
  const localeResults = results.filter((item) => item.locale === locale);
  const withIssues = localeResults.filter((item) => item.issues.length);
  const issueCounts = {};
  for (const item of withIssues) {
    for (const issue of item.issues) {
      const kind = issue.split(':')[0];
      issueCounts[kind] = (issueCounts[kind] || 0) + 1;
    }
  }
  summary[locale] = { pages: localeResults.length, pagesWithIssues: withIssues.length, issueCounts };
}
await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/summary.json`, JSON.stringify({ sitemapUrl, auditedUrls: results.length, summary }, null, 2));
await writeFile(`${outputDir}/issues.json`, JSON.stringify(results.filter((item) => item.issues.length), null, 2));
console.log(JSON.stringify({ auditedUrls: results.length, summary }, null, 2));

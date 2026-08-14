import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.argv[2] || 'https://www.houseplus-ch.com';
const outputDir = process.argv[3] || path.join(process.cwd(), 'audit', 'primary-page-language-parity');
const locales = ['es', 'de', 'fr', 'ar'];
const slugs = ['about-us', 'brand', 'careers', 'case-studies', 'certifications', 'factory', 'faq', 'news', 'oem-odm', 'products', 'regions', 'service', 'support', 'team'];

function mainText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  return main
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function englishPhrases(text) {
  const words = text.match(/[A-Za-z][A-Za-z'-]*/g) || [];
  const phrases = new Set();
  for (let i = 0; i <= words.length - 5; i += 1) {
    const phrase = words.slice(i, i + 5).join(' ').toLowerCase();
    if (!/houseplus(?:\s|$)/.test(phrase)) phrases.add(phrase);
  }
  return phrases;
}

async function fetchHtml(url) {
  const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
  return { status: response.status, html: await response.text(), finalUrl: response.url };
}

const checks = [];
for (const slug of slugs) {
  let english;
  try {
    english = await fetchHtml(`${baseUrl}/en/${slug}`);
  } catch (error) {
    checks.push({ slug, locale: 'en', pass: false, error: error instanceof Error ? error.message : String(error) });
    continue;
  }
  const englishText = mainText(english.html);
  const referencePhrases = englishPhrases(englishText);
  for (const locale of locales) {
    try {
      const localized = await fetchHtml(`${baseUrl}/${locale}/${slug}`);
      const text = mainText(localized.html);
      const matchedPhrases = [...englishPhrases(text)].filter((phrase) => referencePhrases.has(phrase));
      checks.push({
        slug,
        locale,
        status: localized.status,
        finalUrl: localized.finalUrl,
        mainTextBytes: Buffer.byteLength(text),
        matchingEnglishPhrases: matchedPhrases.slice(0, 12),
        matchingEnglishPhraseCount: matchedPhrases.length,
        pass: localized.status === 200 && matchedPhrases.length < 3,
      });
    } catch (error) {
      checks.push({ slug, locale, pass: false, error: error instanceof Error ? error.message : String(error) });
    }
  }
}

const report = {
  baseUrl,
  checkedAt: new Date().toISOString(),
  expectedChecks: slugs.length * locales.length,
  passed: checks.filter((check) => check.pass).length,
  failed: checks.filter((check) => !check.pass),
  checks,
};
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'primary-page-language-parity.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ expectedChecks: report.expectedChecks, passed: report.passed, failed: report.failed.length }, null, 2));
if (report.failed.length > 0) process.exitCode = 1;

import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('..', import.meta.url).pathname;
const target = `${root}/lib/localized-content/articles.json`;
const reviewed = JSON.parse(await readFile(`${root}/audit/article-translation/reviewed-by-ai.json`, 'utf8'));
const current = JSON.parse(await readFile(target, 'utf8'));
const locales = ['es', 'de', 'fr', 'ar'];
const slugs = Object.keys(reviewed);
for (const slug of slugs) {
  const translations = reviewed[slug]?.translations;
  if (!translations) throw new Error(`Missing translations for ${slug}`);
  current[slug] ||= {};
  for (const locale of locales) {
    if (!translations[locale]) throw new Error(`Missing ${locale} translation for ${slug}`);
    current[slug][locale] = { ...current[slug][locale], ...translations[locale] };
  }
}
await writeFile(target, `${JSON.stringify(current, null, 2)}\n`);
console.log(`Applied ${slugs.length} articles x ${locales.length} locales to ${target}`);

/**
 * Duplicate Content Checker
 *
 * Checks new content against existing blog posts for similarity.
 * Usage: node scripts/check-duplicate.js [--links-only]
 */

const fs = require('fs');
const path = require('path');

const NEWS_DIR = path.join(__dirname, '..', 'app', '[lang]', 'news');
const GENERATED_DIR = path.join(__dirname, '..', 'generated-content');
const SIMILARITY_THRESHOLD = 0.6;

function extractText(content) {
  // Strip Markdown formatting, extract plain words
  return content
    .replace(/[#*`|>\-\[\]()]/g, ' ')
    .split(/\s+/)
    .map(w => w.toLowerCase())
    .filter(w => w.length > 3);
}

function jaccardSimilarity(setA, setB) {
  const a = new Set(setA);
  const b = new Set(setB);
  const intersection = new Set([...a].filter(x => b.has(x)));
  const union = new Set([...a, ...b]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function findExistingArticles() {
  const articles = [];
  if (!fs.existsSync(NEWS_DIR)) return articles;

  // Walk through locale directories
  for (const locale of fs.readdirSync(NEWS_DIR)) {
    const localeDir = path.join(NEWS_DIR, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;

    for (const file of fs.readdirSync(localeDir)) {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const filePath = path.join(localeDir, file);
        articles.push({
          file: `${locale}/${file}`,
          content: fs.readFileSync(filePath, 'utf-8'),
        });
      }
    }
  }
  return articles;
}

function main() {
  const linksOnly = process.argv.includes('--links-only');
  const existingArticles = findExistingArticles();

  console.log(`Found ${existingArticles.length} existing articles`);

  // Check for generated content
  if (fs.existsSync(GENERATED_DIR)) {
    for (const file of fs.readdirSync(GENERATED_DIR)) {
      if (!file.endsWith('.md')) continue;
      const newContent = fs.readFileSync(path.join(GENERATED_DIR, file), 'utf-8');
      const newWords = extractText(newContent);

      for (const article of existingArticles) {
        const existingWords = extractText(article.content);
        const similarity = jaccardSimilarity(newWords, existingWords);

        if (similarity > SIMILARITY_THRESHOLD) {
          console.error(`[DUPLICATE] ${file} is ${Math.round(similarity * 100)}% similar to ${article.file}`);
        }
      }
    }
  }

  if (linksOnly) {
    console.log('Link check complete.');
    return;
  }

  // Check existing articles against each other
  for (let i = 0; i < existingArticles.length; i++) {
    for (let j = i + 1; j < existingArticles.length; j++) {
      const wordsA = extractText(existingArticles[i].content);
      const wordsB = extractText(existingArticles[j].content);
      const similarity = jaccardSimilarity(wordsA, wordsB);

      if (similarity > SIMILARITY_THRESHOLD) {
        console.warn(`[HIGH SIMILARITY] ${existingArticles[i].file} vs ${existingArticles[j].file}: ${Math.round(similarity * 100)}%`);
      }
    }
  }

  console.log('Duplicate check complete.');
}

main();

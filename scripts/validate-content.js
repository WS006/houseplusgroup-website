/**
 * Content Validator
 *
 * Validates AI-generated content for:
 * - Minimum word count (2500 words)
 * - Sensitive word filtering
 * - Required sections (TL;DR, FAQ, specs table)
 *
 * Usage: node scripts/validate-content.js [--file generated-content/article.md]
 */

const fs = require('fs');
const path = require('path');

const MIN_WORDS = 2500;
const MAX_WORDS = 4000;

function loadSensitiveWords() {
  const filePath = path.join(__dirname, '..', '.github', 'sensitive-words.txt');
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(w => w.trim().toLowerCase())
    .filter(w => w && !w.startsWith('#'));
}

function validate(content, filename) {
  const errors = [];
  const warnings = [];

  // Word count
  const words = content.split(/\s+/).length;
  if (words < MIN_WORDS) errors.push(`Word count ${words} is below minimum ${MIN_WORDS}`);
  if (words > MAX_WORDS) warnings.push(`Word count ${words} exceeds recommended maximum ${MAX_WORDS}`);

  // Required sections
  if (!content.includes('TL;DR')) errors.push('Missing TL;DR section');
  if (!content.includes('## FAQ')) warnings.push('Missing FAQ section (recommended at least 5 Q&As)');
  if (!content.match(/\|.+\|.+\|/)) warnings.push('No table found — consider adding a specs comparison table');

  // FAQ count
  const faqMatches = content.match(/(?:^|\n)(?:###\s*\d+\.|Q\d*[.:])\s*/gi);
  if (faqMatches && faqMatches.length < 5) {
    warnings.push(`Only ${faqMatches.length} FAQ items found — recommend at least 5`);
  }

  // Sensitive words
  const sensitiveWords = loadSensitiveWords();
  const contentLower = content.toLowerCase();
  const foundWords = sensitiveWords.filter(w => contentLower.includes(w));
  if (foundWords.length > 0) {
    errors.push(`Sensitive words found: ${foundWords.join(', ')}`);
  }

  return { errors, warnings, wordCount: words };
}

function main() {
  const generatedDir = path.join(__dirname, '..', 'generated-content');
  const args = process.argv.slice(2);
  let targetFile = null;

  if (args.includes('--file')) {
    const idx = args.indexOf('--file');
    targetFile = args[idx + 1];
  }

  if (!targetFile && fs.existsSync(generatedDir)) {
    const files = fs.readdirSync(generatedDir).filter(f => f.endsWith('.md'));
    targetFile = files[0] ? path.join(generatedDir, files[0]) : null;
  }

  if (!targetFile || !fs.existsSync(targetFile)) {
    console.log('No content to validate.');
    process.exit(0);
  }

  const content = fs.readFileSync(targetFile, 'utf-8');
  const result = validate(content, targetFile);

  console.log(`\nValidating: ${path.basename(targetFile)}`);
  console.log(`Word count: ${result.wordCount}`);
  console.log(`\n--- Errors (${result.errors.length}) ---`);
  result.errors.forEach(e => console.log(`  [ERROR] ${e}`));
  console.log(`\n--- Warnings (${result.warnings.length}) ---`);
  result.warnings.forEach(w => console.log(`  [WARN] ${w}`));

  if (result.errors.length > 0) {
    console.error(`\nValidation FAILED with ${result.errors.length} error(s)`);
    process.exit(1);
  }

  console.log('\nValidation PASSED');
}

main();

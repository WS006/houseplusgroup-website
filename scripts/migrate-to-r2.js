const fs = require('fs');
const path = require('path');

const R2_BASE = 'https://images.houseplus-ch.com';
const TARGET_DIRS = [
  'app',
  'lib',
  'components',
];

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

function findFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && item !== 'node_modules' && item !== '.git' && item !== 'scripts') {
      findFiles(fullPath, files);
    } else if (stat.isFile() && EXTENSIONS.includes(path.extname(item))) {
      files.push(fullPath);
    }
  }
  return files;
}

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Pattern 1: "..." or '...' containing /images/ or /products/
  // Match paths that start with /images/ or /products/ inside quotes
  const patterns = [
    // Double quotes
    { regex: /"(\/(?:images|products)\/[^"]+)"/g, quote: '"' },
    // Single quotes
    { regex: /'(\/(?:images|products)\/[^']+)'/g, quote: "'" },
    // Backtick template literals
    { regex: /`(\/(?:images|products)\/[^`]+)`/g, quote: '`' },
  ];

  for (const { regex, quote } of patterns) {
    content = content.replace(regex, (match, imagePath) => {
      // Skip if already contains a domain (full URL)
      if (match.includes('http://') || match.includes('https://')) {
        return match;
      }
      // Skip if it's an import path
      if (content.substring(content.lastIndexOf('\n', content.indexOf(match)), content.indexOf(match)).includes('import ')) {
        return match;
      }
      modified = true;
      return `${quote}${R2_BASE}${imagePath}${quote}`;
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Migrated: ${filePath}`);
    return true;
  }
  return false;
}

// Main
console.log('Migrating local image paths to Cloudflare R2...\n');

let migratedCount = 0;
for (const targetDir of TARGET_DIRS) {
  const dirPath = path.join(__dirname, '..', targetDir);
  if (!fs.existsSync(dirPath)) continue;
  const files = findFiles(dirPath);
  for (const file of files) {
    if (migrateFile(file)) {
      migratedCount++;
    }
  }
}

console.log(`\n🎉 Done! ${migratedCount} files migrated to R2.`);

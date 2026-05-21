#!/usr/bin/env node
/**
 * Auto-translate JSON i18n files using MyMemory API
 * 完全免费，无需注册，无需 API Key
 * 每日免费额度：1000 次请求/天
 * 
 * Usage: node scripts/auto-translate-mymemory.js [target-languages]
 * Example: node scripts/auto-translate-mymemory.js es de fr ar
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es', 'de', 'fr', 'ar'];

// MyMemory language codes mapping
const MYMEMORY_LANG_MAP = {
  'es': 'es',
  'de': 'de',
  'fr': 'fr',
  'ar': 'ar'
};

/**
 * Translate text using MyMemory API (FREE, no API key needed)
 */
async function translateText(text, targetLang) {
  const mymemoryLang = MYMEMORY_LANG_MAP[targetLang];
  if (!mymemoryLang) {
    throw new Error(`Unsupported target language: ${targetLang}`);
  }

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${mymemoryLang}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MyMemory API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (data.responseStatus !== 200) {
    throw new Error(`MyMemory translation failed: ${data.responseDetails}`);
  }
  
  return data.responseData.translatedText;
}

/**
 * Recursively translate an object
 */
async function translateObject(obj, targetLang, originalObj) {
  const result = {};

  for (const [key, value] of Object.entries(originalObj)) {
    if (typeof value === 'string') {
      try {
        // Skip hrefs and URLs
        if (key === 'href' || value.startsWith('http') || value.startsWith('/')) {
          result[key] = value;
        } else {
          result[key] = await translateText(value, targetLang);
          console.log(`  ✓ ${key}: "${value.substring(0, 40)}..." → "${result[key].substring(0, 40)}..."`);
        }
      } catch (error) {
        console.error(`  ✗ Failed to translate ${key}:`, error.message);
        result[key] = value;
      }
    } else if (Array.isArray(value)) {
      result[key] = await Promise.all(
        value.map(async (item, index) => {
          if (typeof item === 'object' && item !== null) {
            console.log(`\nTranslating array item ${index}...`);
            return await translateObject({}, targetLang, item);
          } else if (typeof item === 'string') {
            return await translateText(item, targetLang);
          }
          return item;
        })
      );
    } else if (typeof value === 'object' && value !== null) {
      console.log(`\nTranslating ${key}...`);
      result[key] = await translateObject({}, targetLang, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Load JSON file
 */
function loadJSON(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Save JSON file
 */
function saveJSON(filePath, data) {
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`\n✓ Saved to ${filePath}`);
}

/**
 * Main function
 */
async function main() {
  console.log('🌍 Auto-translation for i18n JSON files (MyMemory - FREE)\n');
  console.log('⚡ Free API: 1000 requests/day, no API key needed!\n');

  // Get target locales from command line or use default
  const args = process.argv.slice(2);
  const targetLocales = args.length > 0 ? args : TARGET_LOCALES;

  // Validate target locales
  const validTargets = targetLocales.filter(lang => TARGET_LOCALES.includes(lang));
  if (validTargets.length === 0) {
    console.error(`Error: No valid target locales specified. Valid locales: ${TARGET_LOCALES.join(', ')}`);
    process.exit(1);
  }

  console.log(`Source locale: ${SOURCE_LOCALE}`);
  console.log(`Target locales: ${validTargets.join(', ')}\n`);

  // Load source dictionary
  const sourcePath = path.join(LOCALES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const sourceDict = loadJSON(sourcePath);

  // Translate to each target locale
  for (const targetLang of validTargets) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Translating to ${targetLang.toUpperCase()} (FREE API)`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    try {
      const translatedDict = await translateObject({}, targetLang, sourceDict);

      // Save the translated file
      const targetPath = path.join(LOCALES_DIR, `${targetLang}.json`);
      saveJSON(targetPath, translatedDict);

      console.log(`\n✅ Successfully translated to ${targetLang.toUpperCase()}!`);
    } catch (error) {
      console.error(`\n❌ Failed to translate to ${targetLang}:`, error.message);
    }
  }

  console.log(`\n✨ Translation process completed!`);
  console.log(`\n💡 Remember to review and verify the translations before committing.`);
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

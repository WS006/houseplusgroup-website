#!/usr/bin/env node
/**
 * Auto-translate JSON i18n files using DeepL API
 * Usage: node scripts/auto-translate-json.js [target-languages]
 * Example: node scripts/auto-translate-json.js es de fr ar
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es', 'de', 'fr', 'ar'];

// DeepL language codes mapping
const DEEPL_LANG_MAP = {
  'es': 'ES',
  'de': 'DE',
  'fr': 'FR',
  'ar': 'AR'
};

/**
 * Translate text using DeepL API
 */
async function translateText(text, targetLang) {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY environment variable is required. Get one from https://www.deepl.com/pro-api');
  }

  const deeplLang = DEEPL_LANG_MAP[targetLang];
  if (!deeplLang) {
    throw new Error(`Unsupported target language: ${targetLang}`);
  }

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: [text],
      target_lang: deeplLang,
      source_lang: 'EN',
      formality: 'default',
      preserve_formatting: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepL API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.translations[0].text;
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
  console.log('🌍 Auto-translation for i18n JSON files\n');

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
    console.log(`Translating to ${targetLang.toUpperCase()}`);
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

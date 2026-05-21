#!/usr/bin/env node
/**
 * Auto-translate JSON i18n files using Google Translate API
 * 
 * 完全免费，无限量，无需注册，无需信用卡
 * 质量同谷歌网页版
 * 
 * Usage: 
 *   node scripts/auto-translate-google.js [target-languages]
 * 
 * Example:
 *   node scripts/auto-translate-google.js es de fr ar
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es', 'de', 'fr', 'ar'];

// Google Translate API endpoint
const GOOGLE_TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single';

// Language codes mapping
const GOOGLE_LANG_MAP = {
  'es': 'es',
  'de': 'de',
  'fr': 'fr',
  'ar': 'ar'
};

/**
 * Translate text using Google Translate API
 */
async function translateText(text, targetLang) {
  const langCode = GOOGLE_LANG_MAP[targetLang];
  if (!langCode) {
    throw new Error(`Unsupported target language: ${targetLang}`);
  }

  const url = `${GOOGLE_TRANSLATE_API}?client=gtx&sl=en&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`Google Translate API error: ${response.status}`);
  }

  const data = await response.json();

  // Google Translate returns nested arrays
  if (data && data[0]) {
    const translatedText = data[0].map(item => item[0]).join('');
    return translatedText;
  }

  throw new Error('Invalid response from Google Translate');
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
            console.log(`\n翻译数组项 ${index}...`);
            return await translateObject({}, targetLang, item);
          } else if (typeof item === 'string') {
            return await translateText(item, targetLang);
          }
          return item;
        })
      );
    } else if (typeof value === 'object' && value !== null) {
      console.log(`\n翻译 ${key}...`);
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
  console.log(`\n✓ 已保存到 ${filePath}`);
}

/**
 * Main function
 */
async function main() {
  console.log('🌍 i18n JSON 文件自动翻译\n');
  console.log('📊 使用 Google Translate API');
  console.log('✅ 完全免费!');
  console.log('✅ 无需注册!');
  console.log('✅ 无需信用卡!');
  console.log('✅ 无限制翻译!\n');
  console.log('🌐 质量同谷歌网页版\n');

  // Get target locales from command line or use default
  const args = process.argv.slice(2);
  const targetLocales = args.length > 0 ? args : TARGET_LOCALES;

  // Validate target locales
  const validTargets = targetLocales.filter(lang => TARGET_LOCALES.includes(lang));
  if (validTargets.length === 0) {
    console.error(`错误: 未指定目标语言。可用语言: ${TARGET_LOCALES.join(', ')}`);
    process.exit(1);
  }

  console.log(`源语言: ${SOURCE_LOCALE}`);
  console.log(`目标语言: ${validTargets.join(', ')}\n`);

  // Load source dictionary
  const sourcePath = path.join(LOCALES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`错误: 找不到源文件: ${sourcePath}`);
    process.exit(1);
  }

  const sourceDict = loadJSON(sourcePath);

  // Translate to each target locale
  for (const targetLang of validTargets) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`翻译为 ${targetLang.toUpperCase()} (Google Translate)`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    try {
      const translatedDict = await translateObject({}, targetLang, sourceDict);

      // Save the translated file
      const targetPath = path.join(LOCALES_DIR, `${targetLang}.json`);
      saveJSON(targetPath, translatedDict);

      console.log(`\n✅ 成功翻译为 ${targetLang.toUpperCase()}!`);
    } catch (error) {
      console.error(`\n❌ 翻译失败 ${targetLang}:`, error.message);
    }
  }

  console.log(`\n✨ 翻译完成!`);
  console.log(`\n💡 请在提交前审核翻译内容。`);
}

// Run the script
main().catch(error => {
  console.error('致命错误:', error);
  process.exit(1);
});

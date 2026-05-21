#!/usr/bin/env node
/**
 * Auto-translate JSON i18n files using completely free translation APIs
 * 
 * 完全免费，无需注册，无需信用卡
 * 国内可访问
 * 
 * Usage: 
 *   node scripts/auto-translate-freecn.js [target-languages]
 * 
 * Example:
 *   node scripts/auto-translate-freecn.js es de fr ar
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es', 'de', 'fr', 'ar'];

// Language codes mapping
const API_LANG_MAP = {
  'es': 'es',
  'de': 'de', 
  'fr': 'fr',
  'ar': 'ar'
};

/**
 * Translate text using Google Sheets formula simulation
 * This uses a workaround that might work
 */
async function translateText(text, targetLang) {
  const langCode = API_LANG_MAP[targetLang];
  if (!langCode) {
    throw new Error(`Unsupported target language: ${targetLang}`);
  }

  // Try appworlds.cn API (completely free)
  try {
    const url = `https://translate.appworlds.cn?text=${encodeURIComponent(text)}&from=en&to=${langCode}`;
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.text();
      if (data && data.trim()) {
        return data.trim();
      }
    }
  } catch (error) {
    console.log(`  ⚠️ appworlds.cn failed`);
  }

  // Try MyMemory as fallback
  try {
    const mymemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${langCode}`;
    const response = await fetch(mymemoryUrl);
    
    if (response.ok) {
      const data = await response.json();
      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      }
    }
  } catch (error) {
    console.log(`  ⚠️ MyMemory failed`);
  }

  throw new Error('All translation APIs failed');
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
  console.log('📊 使用免费翻译 API');
  console.log('✅ 完全免费!');
  console.log('✅ 无需注册!');
  console.log('✅ 无需信用卡!\n');

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
    console.log(`翻译为 ${targetLang.toUpperCase()}`);
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

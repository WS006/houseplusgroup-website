#!/usr/bin/env node
/**
 * Auto-translate JSON i18n files using LibreTranslate API
 * 
 * 完全免费开源，无需 API Key
 * 使用多个公开的 LibreTranslate 服务器
 * 
 * Usage: 
 *   node scripts/auto-translate-libretranslate.js [target-languages]
 * 
 * Example:
 *   node scripts/auto-translate-libretranslate.js es de fr ar
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es', 'de', 'fr', 'ar'];

// LibreTranslate 公开服务器列表（无需 API Key）
const LIBRE_TRANSLATE_SERVERS = [
  'https://translate.terraprint.co',
  'https://trans.zillyhuhn.com',
  'https://translate.lotigara.ru'
];

// LibreTranslate language codes
const LIBRE_LANG_MAP = {
  'es': 'es',
  'de': 'de',
  'fr': 'fr',
  'ar': 'ar'
};

/**
 * Translate text using LibreTranslate API
 */
async function translateText(text, targetLang) {
  const libreLang = LIBRE_LANG_MAP[targetLang];
  if (!libreLang) {
    throw new Error(`Unsupported target language: ${targetLang}`);
  }

  // Try each server until one works
  for (const server of LIBRE_TRANSLATE_SERVERS) {
    try {
      console.log(`  尝试服务器: ${server}`);
      
      const response = await fetch(`${server}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: libreLang,
          format: 'text'
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`  ✅ 成功使用: ${server}`);
        return data.translatedText;
      } else {
        console.log(`  ⚠️ 服务器 ${server} 返回错误: ${response.status}`);
      }
    } catch (error) {
      console.log(`  ⚠️ 服务器 ${server} 连接失败: ${error.message}`);
      continue;
    }
  }

  throw new Error('所有 LibreTranslate 服务器都失败了');
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
        console.error(`  ✗ 翻译失败 ${key}:`, error.message);
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
  console.log('📊 使用 LibreTranslate (免费开源)');
  console.log('✅ 无需 API Key!');
  console.log('✅ 无使用限制!');
  console.log('✅ 使用公开服务器\n');

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
    console.log(`翻译为 ${targetLang.toUpperCase()} (LibreTranslate - 免费)`);
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

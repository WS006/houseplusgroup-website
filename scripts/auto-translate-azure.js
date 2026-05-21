#!/usr/bin/env node
/**
 * Auto-translate JSON i18n files using Microsoft Azure Translator API
 * 
 * 免费额度：每月 200 万字符
 * 注册地址：https://azure.microsoft.com/free/
 * 
 * Usage: 
 *   1. Set environment variable: AZURE_TRANSLATOR_KEY and AZURE_TRANSLATOR_REGION
 *   2. Run: node scripts/auto-translate-azure.js [target-languages]
 * 
 * Example:
 *   AZURE_TRANSLATOR_KEY=xxx AZURE_TRANSLATOR_REGION=westus2 node scripts/auto-translate-azure.js es de fr ar
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es', 'de', 'fr', 'ar'];

// Azure Translator language codes
const AZURE_LANG_MAP = {
  'es': 'es',
  'de': 'de',
  'fr': 'fr',
  'ar': 'ar'
};

/**
 * Translate text using Azure Translator API
 */
async function translateText(text, targetLang) {
  const apiKey = process.env.AZURE_TRANSLATOR_KEY;
  const region = process.env.AZURE_TRANSLATOR_REGION || 'westus2';
  
  if (!apiKey) {
    throw new Error('AZURE_TRANSLATOR_KEY environment variable is required. Get one from https://portal.azure.com');
  }

  const azureLang = AZURE_LANG_MAP[targetLang];
  if (!azureLang) {
    throw new Error(`Unsupported target language: ${targetLang}`);
  }

  const response = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${azureLang}&from=en`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Ocp-Apim-Subscription-Region': region,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{ text: text }])
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Azure Translator API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data[0].translations[0].text;
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
  console.log('📊 Using Microsoft Azure Translator (F0 Free Tier)');
  console.log('✅ Free: 2 million characters/month\n');

  // Check API key
  if (!process.env.AZURE_TRANSLATOR_KEY) {
    console.error('❌ Error: AZURE_TRANSLATOR_KEY environment variable is required');
    console.log('\n📝 Setup instructions:');
    console.log('1. Create free Azure account: https://azure.microsoft.com/free/');
    console.log('2. Create Translator resource: https://portal.azure.com/#create/Microsoft.CognitiveServicesTextTranslation');
    console.log('3. Get your API key from the resource');
    console.log('4. Set environment variable:');
    console.log('   export AZURE_TRANSLATOR_KEY="your-key"');
    console.log('   export AZURE_TRANSLATOR_REGION="westus2"');
    console.log('\n5. Run translation:');
    console.log('   node scripts/auto-translate-azure.js');
    process.exit(1);
  }

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
    console.log(`Translating to ${targetLang.toUpperCase()} (Azure Translator)`);
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

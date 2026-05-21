#!/usr/bin/env node
/**
 * Auto-translation script for i18n dictionary
 * Uses DeepL API for high-quality translations
 */

const fs = require('fs');
const path = require('path');

const DICTIONARY_PATH = path.join(__dirname, '../lib/i18n-config.ts');
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['es', 'de', 'fr', 'ar'];

// Language mapping for DeepL
const DEEPL_LANG_MAP = {
  'es': 'ES',
  'de': 'DE',
  'fr': 'FR',
  'ar': 'AR'
};

/**
 * Translates text using DeepL API
 */
async function translateText(text, targetLang) {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY environment variable is required');
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
      formality: 'default'
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
 * Parses the i18n-config.ts file and extracts dictionaries
 */
function parseDictionaryFile() {
  const content = fs.readFileSync(DICTIONARY_PATH, 'utf-8');
  
  // Extract the dictionaries object (simplified parsing for this specific file structure)
  const dictMatch = content.match(/const dictionaries: Record<Locale, Dictionary> = ({[\s\S]*?});/);
  if (!dictMatch) {
    throw new Error('Could not parse dictionaries from file');
  }
  
  return content;
}

/**
 * Recursively translates an object's values
 */
async function translateObject(obj, targetLang, sourceObj) {
  const result = {};
  
  for (const [key, value] of Object.entries(sourceObj)) {
    if (typeof value === 'string') {
      try {
        result[key] = await translateText(value, targetLang);
        console.log(`  ✅ Translated ${key}: "${value.substring(0, 50)}..."`);
      } catch (error) {
        console.error(`  ❌ Failed to translate ${key}:`, error.message);
        result[key] = value; // Fallback to original
      }
    } else if (Array.isArray(value)) {
      result[key] = await Promise.all(
        value.map(async (item, index) => {
          if (typeof item === 'object' && item !== null) {
            return await translateObject({}, targetLang, item);
          } else if (typeof item === 'string') {
            return await translateText(item, targetLang);
          }
          return item;
        })
      );
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject({}, targetLang, value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Updates the dictionary file with translated content
 */
function updateDictionaryFile(originalContent, lang, translatedDict) {
  // This is a simplified approach - for production you'd want to use a proper AST parser
  // For now, we'll create a backup and warn the user to review
  console.log(`\n⚠️  Manual update required for ${lang}`);
  console.log('Please update the dictionary in lib/i18n-config.ts with the translated content:');
  console.log(JSON.stringify(translatedDict, null, 2));
}

/**
 * Main function
 */
async function main() {
  console.log('🌍 Auto-translation script starting...\n');
  
  try {
    // Read and parse the dictionary
    const content = parseDictionaryFile();
    
    // Re-import the dictionary to get the latest data
    delete require.cache[require.resolve(DICTIONARY_PATH)];
    const { dictionaries } = require(DICTIONARY_PATH);
    
    const sourceDict = dictionaries[SOURCE_LANG];
    
    for (const targetLang of TARGET_LANGS) {
      console.log(`\n📝 Translating to ${targetLang.toUpperCase()}...`);
      
      try {
        const translatedDict = await translateObject({}, targetLang, sourceDict);
        
        console.log(`\n✅ Translation to ${targetLang.toUpperCase()} complete!`);
        console.log('Translated content preview:');
        console.log(JSON.stringify(translatedDict, null, 2).substring(0, 500) + '...');
        
        // In a real implementation, you'd update the file here
        // For now, we just show the output
        console.log(`\n💡 Tip: To use this translation, manually update the ${targetLang} dictionary in lib/i18n-config.ts`);
        
      } catch (error) {
        console.error(`\n❌ Failed to translate to ${targetLang}:`, error.message);
      }
    }
    
    console.log('\n✨ Auto-translation process complete!');
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

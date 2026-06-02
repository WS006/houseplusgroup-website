#!/usr/bin/env tsx

// IndexNow Batch Submission Script
// Submits all main pages to IndexNow

import fetch from 'node-fetch';

const baseUrl = 'https://www.houseplus-ch.com';
const locales = ['en', 'es', 'de', 'fr', 'ar'];
const indexNowKey = '084fadfd7e4a435b942858f905846430';
const indexNowApiUrl = 'https://www.houseplus-ch.com/api/indexnow';

// Main pages (from sitemap)
const staticPages = [
  '', // homepage
  'about-us',
  'products',
  'news',
  'factory',
  'service',
  'faq',
  'contact',
  'team',
  'careers',
  'support',
  'privacy',
  'terms',
  'cookie-policy',
  'sitemap-page',
];

// Products
const productSlugs = [
  'headphone-over-ear',
  'smart-watch',
  'usb-c-cable-2m',
  'solar-power-bank-20000mah',
  'bluetooth-earphone-tws',
  'portable-ssd-1tb',
  'micro-sd-128gb',
  'induction-cooktop-2000w',
  'electric-kettle-1-5l',
  'toaster-2-slice',
  'air-fryer-5-8l',
  'solar-fan-20w',
  'solar-street-light-200w',
  'charge-controller-60a',
  'lead-acid-battery-100ah',
  'lithium-battery-5kwh',
  'solar-inverter-3kw',
  'solar-panel-500w',
];

// News pages (from git history)
const newsSlugs = [
  '2026-solar-market-update',
  '2026-appliances-market-update',
  '2026-electronics-market-update',
  '2026-smart-home-appliances-market-guide',
  'advanced-manufacturing-home-appliances',
  'energy-efficiency-standards-appliances',
  'global-wholesale-guide-home-appliances',
  'oem-odm-manufacturing-guide',
  'smart-home-appliances',
  'solar-energy-storage-industrial-manufacturing',
  'solar-energy-storage-solutions',
  'the-evolution-of-3c-electronics',
  'the-future-of-smart-home-appliances',
  'the-future-of-solar-energy',
];

async function submitUrls(urls: string[]) {
  console.log(`\n📤 Submitting ${urls.length} URLs to IndexNow...`);
  
  try {
    const response = await fetch(indexNowApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    });

    const result = await response.json() as any;
    
    if (result.success) {
      console.log('✅ Success! Submitted URLs to search engines');
      console.log('   Results:', result.results);
    } else {
      console.log('❌ Submission failed:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error during submission:', error);
    throw error;
  }
}

function generateAllUrls() {
  const urls: string[] = [];

  // Generate URLs for static pages (all languages)
  for (const lang of locales) {
    for (const page of staticPages) {
      const url = page ? `${baseUrl}/${lang}/${page}` : `${baseUrl}/${lang}`;
      urls.push(url);
    }

    // Generate product URLs (all languages)
    for (const product of productSlugs) {
      urls.push(`${baseUrl}/${lang}/products/${product}`);
    }

    // Generate news URLs (all languages)
    for (const news of newsSlugs) {
      urls.push(`${baseUrl}/${lang}/news/${news}`);
    }
  }

  // Root homepage (without lang prefix)
  urls.push(baseUrl);

  return urls;
}

async function main() {
  console.log('🚀 Starting IndexNow Batch Submission');
  console.log('=' .repeat(50));
  
  const allUrls = generateAllUrls();
  
  console.log(`\n📋 Total URLs to submit: ${allUrls.length}`);
  console.log('\nSample URLs:');
  allUrls.slice(0, 10).forEach(url => console.log(`  - ${url}`));
  
  if (allUrls.length > 10) {
    console.log(`  ... and ${allUrls.length - 10} more`);
  }

  // Split into batches (IndexNow allows up to 10,000 URLs per submission)
  // We'll do batches of 100 to be safe
  const batchSize = 100;
  const batches: string[][] = [];
  
  for (let i = 0; i < allUrls.length; i += batchSize) {
    batches.push(allUrls.slice(i, i + batchSize));
  }

  console.log(`\n📦 Splitting into ${batches.length} batches of ${batchSize} URLs each`);

  // Submit batches
  for (let i = 0; i < batches.length; i++) {
    console.log(`\n--- Batch ${i + 1}/${batches.length} ---`);
    await submitUrls(batches[i]);
    
    // Add a small delay between batches to avoid rate limits
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n✅ Batch submission complete!');
  console.log('=' .repeat(50));
}

main().catch(console.error);

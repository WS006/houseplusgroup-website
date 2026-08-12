import { appendFile, mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '../..');
const importJournalPath = resolve(repositoryRoot, 'audit/r2-static-media-import.jsonl');
const publishJournalPath = resolve(repositoryRoot, 'audit/r2-media-publication.jsonl');
const apiBase = (process.env.HOUSEPLUS_MEDIA_API_URL || '').replace(/\/$/, '');
const adminToken = process.env.HOUSEPLUS_MEDIA_API_TOKEN || '';
const siteOrigin = 'https://www.houseplus-ch.com';

if (!apiBase || !adminToken) throw new Error('HOUSEPLUS_MEDIA_API_URL and HOUSEPLUS_MEDIA_API_TOKEN are required.');

function titleCase(value) {
  return value
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[._/]+/g, ' ')
    .replace(/[-]+/g, ' ')
    .replace(/\b3c\b/gi, '3C')
    .replace(/\bqc\b/gi, 'QC')
    .replace(/\boem\b/gi, 'OEM')
    .replace(/\bodm\b/gi, 'ODM')
    .replace(/\bfaq\b/gi, 'FAQ')
    .replace(/\b([a-z])/g, (letter) => letter.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

function topicFor(sourcePath) {
  const folder = sourcePath.split('/')[0];
  if (folder === 'products') return 'products';
  if (folder === 'articles' || folder === 'covers') return 'articles';
  if (folder === 'factory') return 'factory';
  if (folder === 'team') return 'team';
  if (sourcePath === '__root__/logo.png') return 'brand';
  return 'site';
}

function localPathFor(sourcePath) {
  return sourcePath.startsWith('__root__/')
    ? `/${sourcePath.replace('__root__/', '')}`
    : `/images/${sourcePath}`;
}

async function readJsonLines(path) {
  const contents = await readFile(path, 'utf8');
  return contents.split('\n').filter(Boolean).map((line) => JSON.parse(line));
}

async function readPublishedAssetIds() {
  try {
    return new Set((await readJsonLines(publishJournalPath)).map((entry) => entry.asset_id));
  } catch (error) {
    if (error.code === 'ENOENT') return new Set();
    throw error;
  }
}

const pause = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

async function request(url, options, label) {
  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (response.ok) return response;
      lastError = new Error(`${label} failed with HTTP ${response.status}: ${await response.text()}`);
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, Math.min(12_000, attempt * attempt * 1_500)));
  }
  throw lastError;
}

function addProductMetadata(records) {
  const productByPath = new Map();
  const content = awaitableProductData;
  const productPattern = /'([^']+)':\s*\{[\s\S]{0,7000}?coverImage:\s*'\/images\/([^']+)'[\s\S]{0,900}?imageAlt:\s*'([^']*)'[\s\S]{0,900}?imageTitle:\s*'([^']*)'/g;
  for (const match of content.matchAll(productPattern)) {
    productByPath.set(match[2], { slug: match[1], alt: match[3], title: match[4] });
  }
  return productByPath;
}

// The text is loaded before processing so metadata comes from the website's existing product source of truth.
const awaitableProductData = await readFile(resolve(repositoryRoot, 'lib/product-data.ts'), 'utf8');
const productByPath = addProductMetadata();

function inferPublication(entry) {
  const sourcePath = entry.source_path;
  const topic = topicFor(sourcePath);
  const fallbackTitle = titleCase(sourcePath.split('/').at(-1) || 'HousePlus media asset');
  const product = productByPath.get(sourcePath);

  if (product) {
    return {
      topic,
      title: product.title || product.alt || fallbackTitle,
      alt: product.alt || `${product.title || fallbackTitle} supplied by HousePlus`,
      description: `Product image for ${product.title || fallbackTitle}, part of HousePlus global B2B wholesale supply.` ,
      entityType: 'product', entityId: product.slug, role: 'product_primary', canonicalUrl: `${siteOrigin}/en/products/${product.slug}`, indexable: true,
    };
  }
  if (sourcePath.startsWith('articles/covers/')) {
    const slug = sourcePath.replace(/^articles\/covers\//, '').replace(/\.[^.]+$/, '');
    return {
      topic, title: fallbackTitle, alt: `${fallbackTitle} article feature image`,
      description: `Editorial feature image for the HousePlus B2B industry article, ${fallbackTitle}.`,
      entityType: 'article', entityId: slug, role: 'article_hero', canonicalUrl: `${siteOrigin}/en/news/${slug}`, indexable: true,
    };
  }
  if (sourcePath.startsWith('articles/')) {
    return {
      topic, title: fallbackTitle, alt: `${fallbackTitle} professional editorial image`,
      description: `Professional editorial image illustrating ${fallbackTitle} for HousePlus B2B buyers.`,
      entityType: 'page', entityId: 'news', role: 'card', canonicalUrl: `${siteOrigin}/en/news`, indexable: true,
    };
  }
  if (sourcePath.startsWith('factory/')) {
    return {
      topic, title: fallbackTitle, alt: `${fallbackTitle} at HousePlus manufacturing facilities`,
      description: `HousePlus factory and quality-control image for global B2B manufacturing operations.`,
      entityType: 'factory', entityId: 'houseplus-factory', role: 'inline', canonicalUrl: `${siteOrigin}/en/factory`, indexable: true,
    };
  }
  if (sourcePath.startsWith('team/')) {
    return {
      topic, title: fallbackTitle, alt: `${fallbackTitle} at HousePlus`,
      description: `HousePlus team and engineering collaboration image for international B2B customers.`,
      entityType: 'page', entityId: 'team', role: 'inline', canonicalUrl: `${siteOrigin}/en/team`, indexable: true,
    };
  }
  if (sourcePath.startsWith('about/')) {
    return {
      topic, title: fallbackTitle, alt: `${fallbackTitle} at HousePlus`,
      description: `HousePlus company, manufacturing and product capability image.`,
      entityType: 'page', entityId: 'about-us', role: 'inline', canonicalUrl: `${siteOrigin}/en/about-us`, indexable: true,
    };
  }
  if (sourcePath.startsWith('carousel/')) {
    return {
      topic, title: fallbackTitle, alt: `${fallbackTitle} for HousePlus global B2B supply`,
      description: `HousePlus homepage category image for global wholesale buyers.`,
      entityType: 'page', entityId: 'home', role: 'page_hero', canonicalUrl: `${siteOrigin}/en`, indexable: true,
    };
  }
  if (sourcePath === '__root__/logo.png') {
    return {
      topic: 'brand', title: 'HousePlus Group Logo', alt: 'HousePlus Group logo',
      description: 'Official HousePlus Group brand logo for the global B2B manufacturer and wholesale supplier.',
      entityType: 'brand', entityId: 'houseplus-group', role: 'open_graph', canonicalUrl: `${siteOrigin}/en/brand`, indexable: true,
    };
  }
  if (sourcePath.startsWith('__root__/')) {
    return {
      topic: 'site', title: fallbackTitle, alt: `${fallbackTitle} HousePlus site icon`,
      description: 'HousePlus website application icon.',
      entityType: 'page', entityId: 'home', role: 'inline', canonicalUrl: `${siteOrigin}/en`, indexable: false,
    };
  }
  const supportPage = /faq|support|service/i.test(sourcePath) ? (sourcePath.includes('faq') ? 'faq' : 'support') : null;
  const canonicalPath = supportPage ? `/en/${supportPage}` : '/en';
  return {
    topic, title: fallbackTitle, alt: `${fallbackTitle} professional HousePlus image`,
    description: `Professional HousePlus visual asset for global B2B products and services.`,
    entityType: 'page', entityId: supportPage || 'home', role: 'inline', canonicalUrl: `${siteOrigin}${canonicalPath}`, indexable: true,
  };
}

async function publishOne(entry) {
  const publication = inferPublication(entry);
  if (process.env.DEBUG_MEDIA_SOURCE === entry.source_path) console.log(JSON.stringify({ debug_source: entry.source_path, publication }));
  const patchPayload = {
    topic: publication.topic,
    status: 'approved',
    seo_indexable: publication.indexable,
    focal_x: 0.5,
    focal_y: 0.5,
    copyright_owner: 'HousePlus Group',
    license_scope: 'HousePlus owned or licensed website media',
    source_url: `${siteOrigin}${localPathFor(entry.source_path)}`,
    metadata_json: {
      migration: 'static-image-copy-to-r2',
      source_path: entry.source_path,
      published_by: 'r2-media-publication-script',
      published_at: new Date().toISOString(),
    },
    translation: {
      locale: 'en', alt_text: publication.alt, title: publication.title,
      caption: publication.description, description: publication.description,
    },
  };
  await request(`${apiBase}/v1/assets/${entry.asset_id}`, {
    method: 'PATCH', headers: { authorization: `Bearer ${adminToken}`, 'content-type': 'application/json' }, body: JSON.stringify(patchPayload),
  }, `Publish ${entry.source_path}`);
  await pause(750);

  if (publication.indexable) {
    await request(`${apiBase}/v1/assets/${entry.asset_id}/relations`, {
      method: 'POST', headers: { authorization: `Bearer ${adminToken}`, 'content-type': 'application/json' },
      body: JSON.stringify({ entity_type: publication.entityType, entity_id: publication.entityId, role: publication.role, canonical_url: publication.canonicalUrl }),
    }, `Relate ${entry.source_path}`);
    await pause(750);
  }

  return { ...entry, public_url: `${apiBase}/media/${entry.asset_id}`, publication };
}

await mkdir(resolve(repositoryRoot, 'audit'), { recursive: true });
const imported = await readJsonLines(importJournalPath);
const completed = await readPublishedAssetIds();
const pending = imported.filter((entry) => !completed.has(entry.asset_id));
let published = 0;

for (const entry of pending) {
  const outcome = await publishOne(entry);
  await appendFile(publishJournalPath, `${JSON.stringify(outcome)}\n`);
  published += 1;
  process.stdout.write(`Published ${published}/${pending.length}: ${entry.source_path}\n`);
}

console.log(JSON.stringify({ imported_assets: imported.length, skipped_from_prior_run: completed.size, published_this_run: published, total_published: completed.size + published, journal: publishJournalPath }, null, 2));

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = process.argv[2] || path.join(root, 'audit', 'change-impact-current');

async function source(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

function quotedValuesFromArray(text, declaration) {
  const match = text.match(new RegExp(`export const ${declaration} = \\[([\\s\\S]*?)\\];`));
  if (!match) return [];
  return [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]);
}

function recordKeys(text, declaration) {
  const match = text.match(new RegExp(`(?:export\\s+)?const ${declaration}[^=]*= \\{([\\s\\S]*?)\\n\\};`));
  if (!match) return [];
  return [...match[1].matchAll(/^\s*'([^']+)':/gm)].map((item) => item[1]);
}

function setDifference(left, right) {
  const rightSet = new Set(right);
  return [...new Set(left)].filter((item) => !rightSet.has(item));
}

function localizationCoverage(localizations, slugs) {
  const result = {};
  for (const locale of ['es', 'de', 'fr', 'ar']) {
    result[locale] = slugs.filter((slug) => !localizations?.[slug]?.[locale]);
  }
  return result;
}

const [urlsSource, blogIndexSource, productsSource, productLocalizationsSource, articleLocalizationsSource, imageSitemapSource, feedSource, staticFeedSource, newsPageSource] = await Promise.all([
  source('lib/urls.ts'),
  source('lib/blog-data/index.ts'),
  source('lib/product-data.ts'),
  source('lib/localized-content/products.json'),
  source('lib/localized-content/articles.json'),
  source('app/image-sitemap.xml/route.ts'),
  source('app/feed.xml/route.ts'),
  source('lib/static-news-feed.ts'),
  source('app/[lang]/news/page.tsx'),
]);

const productSlugs = quotedValuesFromArray(urlsSource, 'productSlugs');
const newsSlugs = quotedValuesFromArray(urlsSource, 'newsSlugs');
const blogSlugs = recordKeys(blogIndexSource, 'blogPosts');
const productDataSlugs = [...productsSource.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((item) => item[1]);
const imageCoverSlugs = recordKeys(imageSitemapSource, 'ARTICLE_COVERS');
const productLocalizations = JSON.parse(productLocalizationsSource);
const articleLocalizations = JSON.parse(articleLocalizationsSource);
const staticNewsRoutes = (await readdir(path.join(root, 'app/[lang]/news'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
  .map((entry) => entry.name)
  .sort();
const knownNewsRoutes = [...new Set([...staticNewsRoutes, ...blogSlugs])];
const staticRoutesInNewsListing = staticNewsRoutes.filter((slug) => newsPageSource.includes(`slug: '${slug}'`));

const report = {
  generatedAt: new Date().toISOString(),
  sources: {
    productSlugs: productSlugs.length,
    productDataSlugs: productDataSlugs.length,
    newsSlugs: newsSlugs.length,
    blogSlugs: blogSlugs.length,
    staticNewsRoutes: staticNewsRoutes.length,
    imageCoverSlugs: imageCoverSlugs.length,
    rssUsesBlogRegistry: /sortedBlogPosts/.test(feedSource),
  },
  product: {
    urlsWithoutProductData: setDifference(productSlugs, productDataSlugs),
    productDataMissingFromUrls: setDifference(productDataSlugs, productSlugs),
    missingLocalizedRecords: localizationCoverage(productLocalizations, productSlugs),
  },
  article: {
    sitemapUrlsWithoutDynamicArticleRegistry: setDifference(newsSlugs, blogSlugs),
    dynamicArticleRegistryMissingFromSitemapUrls: setDifference(blogSlugs, newsSlugs),
    staticRoutesMissingFromUrls: setDifference(staticNewsRoutes, newsSlugs),
    staticRoutesMissingFromDynamicArticleRegistry: setDifference(staticNewsRoutes, blogSlugs),
    newsUrlsWithoutStaticOrDynamicRoute: setDifference(newsSlugs, knownNewsRoutes),
    staticRoutesMissingFromNewsListing: setDifference(staticNewsRoutes, staticRoutesInNewsListing),
    staticRoutesMissingFromImageSitemap: setDifference(staticNewsRoutes, imageCoverSlugs),
    rssMissingStaticArticles: /staticNewsFeedEntries/.test(feedSource)
      ? setDifference(staticNewsRoutes, [...staticFeedSource.matchAll(/slug: '([^']+)'/g)].map((item) => item[1]))
      : staticNewsRoutes,
    missingLocalizedRecords: localizationCoverage(articleLocalizations, blogSlugs),
  },
};

report.article.staticRouteModelNotes = report.article.staticRoutesMissingFromDynamicArticleRegistry.length;

report.summary = {
  blockingIssues: [
    ...report.product.urlsWithoutProductData,
    ...report.product.productDataMissingFromUrls,
    ...report.article.dynamicArticleRegistryMissingFromSitemapUrls,
    ...report.article.staticRoutesMissingFromUrls,
    ...report.article.newsUrlsWithoutStaticOrDynamicRoute,
    ...report.article.staticRoutesMissingFromNewsListing,
    ...report.article.staticRoutesMissingFromImageSitemap,
    ...Object.values(report.product.missingLocalizedRecords).flat(),
    ...Object.values(report.article.missingLocalizedRecords).flat(),
  ].length,
  syncWarnings: [
    ...report.article.rssMissingStaticArticles,
  ].length,
};

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'content-linkage.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.summary, null, 2));

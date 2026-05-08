/**
 * RAG Content Generator
 *
 * Reads product knowledge base → calls Claude API → generates SEO/GEO article
 * Usage: TOPIC=europe-solar-standards node scripts/rag-generator.js
 */

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const TOPIC = process.env.TOPIC || '';
const KB_DIR = path.join(__dirname, '..', 'knowledge-base');
const OUTPUT_DIR = path.join(__dirname, '..', 'app', '[lang]', 'news');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function loadKnowledgeBase() {
  const productsDir = path.join(KB_DIR, 'products');
  const specsDir = path.join(KB_DIR, 'specs');
  const certsDir = path.join(KB_DIR, 'certifications');
  let context = '';

  for (const dir of [productsDir, specsDir, certsDir]) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.md') && file !== 'README.md') {
        context += '\n' + fs.readFileSync(path.join(dir, file), 'utf-8');
      }
    }
  }
  return context;
}

async function generateArticle(topic, knowledgeContext) {
  const prompt = `You are a content writer for HousePlus, a B2B wholesale supplier of home appliances, solar energy systems, and consumer electronics.

Based on the following product knowledge base, write an SEO/GEO optimized article about: "${topic}"

Knowledge Base:
${knowledgeContext}

Requirements:
1. 2500-3000 words
2. Include ## TL;DR summary at the top
3. Include a specs comparison table
4. Include at least 5 FAQ items (question + answer format)
5. Target keywords: wholesale supplier, OEM/ODM, bulk orders, MOQ
6. Professional B2B tone
7. NO absolute claims (best, cheapest, guaranteed)
8. Export as Markdown

Write the article now:`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
  }

  console.log('Loading knowledge base...');
  const knowledgeContext = loadKnowledgeBase();

  if (!knowledgeContext.trim()) {
    console.warn('Warning: Knowledge base is empty. Using generic context.');
  }

  const topic = TOPIC || 'wholesale-solar-solutions-guide';
  console.log(`Generating article for topic: ${topic}`);

  const article = await generateArticle(topic, knowledgeContext);

  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const filename = `${slug}.md`;

  // Save generated content
  const outputPath = path.join(__dirname, '..', 'generated-content');
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(path.join(outputPath, filename), article);

  // Export for workflow
  if (process.env.GITHUB_ENV) {
    fs.appendFileSync(process.env.GITHUB_ENV, `ARTICLE_TITLE=${topic}\n`);
    fs.appendFileSync(process.env.GITHUB_ENV, `ARTICLE_SLUG=${slug}\n`);
    fs.appendFileSync(process.env.GITHUB_ENV, `ARTICLE_FILE=${filename}\n`);
  }

  console.log(`Article generated: ${filename}`);
  console.log(`Title: ${topic}`);
  console.log(`Slug: ${slug}`);
}

main().catch((err) => {
  console.error('Generation failed:', err);
  process.exit(1);
});

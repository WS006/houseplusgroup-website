import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('robots and llms discovery routes are statically cacheable for crawler reliability', () => {
  const robots = read('app/robots.txt/route.ts');
  const llms = read('app/llms.txt/route.ts');
  assert.match(robots, /export const dynamic = 'force-static';/);
  assert.match(robots, /export const revalidate = 86400;/);
  assert.match(robots, /s-maxage=86400/);
  assert.doesNotMatch(robots, /(?:^|\n)(?:Host|IndexNow):/);
  assert.match(llms, /export const dynamic = 'force-static';/);
  assert.match(llms, /export const revalidate = 86400;/);
  assert.match(llms, /s-maxage=86400/);
});

test('service widget controls meet mobile touch and contrast safeguards', () => {
  const serviceWidget = read('components/ServiceWidget.tsx');
  assert.match(serviceWidget, /min-h-11 min-w-11 bg-blue-600/);
  assert.match(serviceWidget, /<button type="button" aria-label=\{`\$\{ui\.wechat\}: \$\{wechat\}`\}/);
  assert.match(serviceWidget, /text-xs text-gray-600/);
  assert.match(serviceWidget, /text-gray-500.*ChevronRight|ChevronRight.*text-gray-500/);
  assert.doesNotMatch(serviceWidget, /cursor-pointer/);
});

test('AI retrieval crawlers receive explicit access to public HousePlus knowledge resources', () => {
  const robots = read('app/robots.txt/route.ts');
  for (const agent of ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'PerplexityBot', 'anthropic-ai', 'Claude-Web', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User']) {
    assert.match(robots, new RegExp(`User-agent: ${agent}`));
  }
  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*?Allow: \/llms\.txt/);
  assert.match(robots, /User-agent: ClaudeBot[\s\S]*?Allow: \/image-sitemap\.xml/);
  assert.match(robots, /User-agent: Claude-SearchBot[\s\S]*?Allow: \/llms\.txt/);
});

test('llms discovery document uses verified commercial boundaries and canonical brand sources', () => {
  const llms = read('app/llms.txt/route.ts');
  assert.match(llms, /Founded in 2010/);
  assert.match(llms, /20,000 m²/);
  assert.match(llms, /441\+ wholesale clients across 53\+ countries/);
  assert.match(llms, /product- and order-specific/);
  assert.match(llms, /https:\/\/www\.houseplus-ch\.com\/en\/brand\//);
  assert.match(llms, /\[HousePlus website\]\(https:\/\/www\.houseplus-ch\.com\/en\/\)/);
  assert.match(llms, /\[Product catalog\]\(https:\/\/www\.houseplus-ch\.com\/en\/products\/\)/);
  for (const locale of ['en', 'es', 'de', 'fr', 'ar']) {
    assert.match(llms, new RegExp(`https:\\/\\/www\\.houseplus-ch\\.com\\/${locale}\\/brand\\/`));
    assert.match(llms, new RegExp(`https:\\/\\/www\\.houseplus-ch\\.com\\/${locale}\\/products\\/`));
  }
  assert.match(llms, /## B2B sourcing workflow/);
  assert.doesNotMatch(llms, /500\+ manufacturing/);
  assert.doesNotMatch(llms, /start at 100 units/);
});

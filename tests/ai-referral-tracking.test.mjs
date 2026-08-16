import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('AI referral tracking is globally enabled without collecting visitor query content', () => {
  const tracker = read('components/AiReferralTracker.tsx');
  const layout = read('app/layout.tsx');
  for (const host of ['chatgpt.com', 'perplexity.ai', 'copilot.microsoft.com', 'claude.ai', 'gemini.google.com']) {
    assert.match(tracker, new RegExp(host.replace('.', '\\.')));
  }
  assert.match(tracker, /track\('ai_referral_landing'/);
  assert.match(tracker, /source,/);
  assert.match(tracker, /path: window\.location\.pathname/);
  assert.doesNotMatch(tracker, /searchParams|document\.cookie|localStorage/);
  assert.match(layout, /<AiReferralTracker \/>/);
});

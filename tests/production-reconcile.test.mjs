import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('production reconciliation samples localized HTML and validates html lang', () => {
  const script = read('scripts/reconcile-production-content.mjs');
  assert.match(script, /sitemapUrl/);
  assert.match(script, /localizedUrlCount/);
  assert.match(script, /htmlLang/);
  assert.match(script, /expectedLang/);
  assert.match(script, /failures/);
});

test('production reconciliation has a scheduled and manually triggerable workflow', () => {
  const workflow = read('.github/workflows/houseplus-production-reconcile.yml');
  assert.match(workflow, /schedule:/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /audit:reconcile-production/);
  assert.match(workflow, /upload-artifact@v4/);
});

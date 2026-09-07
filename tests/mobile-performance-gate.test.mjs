import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const mobile = readFileSync(`${root}/scripts/audit-mobile-layout.mjs`, 'utf8');
const vitals = readFileSync(`${root}/scripts/audit-real-web-vitals.mjs`, 'utf8');
const workflow = readFileSync(`${root}/.github/workflows/houseplus-quality-gate.yml`, 'utf8');

test('mobile usability audit checks viewport metadata and can fail on issues', () => {
  assert.match(mobile, /querySelector\('meta\[name="viewport"\]'\)/);
  assert.match(mobile, /scrollWidth > metrics\.clientWidth/);
  assert.match(mobile, /failOnIssues/);
  assert.match(workflow, /audit:mobile-layout/);
  assert.match(workflow, /--fail-on-issues/);
});

test('Web Vitals audit records thresholds and can fail on LCP, FCP or CLS regressions', () => {
  assert.match(vitals, /MAX_LCP_MS/);
  assert.match(vitals, /MAX_FCP_MS/);
  assert.match(vitals, /MAX_CLS/);
  assert.match(vitals, /failOnThresholds/);
  assert.match(workflow, /--fail-on-thresholds/);
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const schemaSource = readFileSync(new URL('../lib/schema-generator.ts', import.meta.url), 'utf8');
const footerSource = readFileSync(new URL('../components/Footer.tsx', import.meta.url), 'utf8');

test('approved HousePlus ImageObject output includes the four recommended Google image metadata fields', () => {
  for (const field of ['acquireLicensePage', 'creditText', 'copyrightNotice', 'creator']) {
    assert.match(schemaSource, new RegExp(`${field}:`));
  }
  assert.match(schemaSource, /function houseplusImageReference/);
  assert.match(schemaSource, /R2 assets published through this website/);
});

test('footer organization logo has matching Image Metadata fields', () => {
  for (const field of ['acquireLicensePage', 'creditText', 'copyrightNotice', 'creator']) {
    assert.match(footerSource, new RegExp(`${field}:`));
  }
});

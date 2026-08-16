import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const schema = readFileSync(new URL('../lib/schema-generator.ts', import.meta.url), 'utf8');

test('Organization Schema publishes only footer-backed sameAs profiles and connected brand entities', () => {
  assert.match(schema, /const VERIFIED_ORGANIZATION_PROFILES = \[/);
  assert.match(schema, /https:\/\/www\.facebook\.com\/houseplusgroup/);
  assert.match(schema, /https:\/\/www\.linkedin\.com\/company\/houseplus-group/);
  assert.match(schema, /https:\/\/www\.youtube\.com\/@houseplusgroup/);
  assert.doesNotMatch(schema, /https:\/\/twitter\.com\/houseplusglobal/);
  assert.doesNotMatch(schema, /https:\/\/www\.instagram\.com\/houseplusgroup/);
  assert.match(schema, /sameAs: VERIFIED_ORGANIZATION_PROFILES/);
  assert.match(schema, /'@type': 'Brand'/);
  assert.match(schema, /'@id': `\$\{BASE_URL\}\/#brand`/);
});

test('Organization Schema includes verifiable contact, location, primary image and catalog semantics', () => {
  assert.match(schema, /'@id': `\$\{BASE_URL\}\/#sales-contact`/);
  assert.match(schema, /url: `\$\{BASE_URL\}\/en\/contact\/`/);
  assert.match(schema, /hoursAvailable: \[/);
  assert.match(schema, /'@type': 'PostalAddress'/);
  assert.match(schema, /const primaryImage = houseplusImageReference\(DEFAULT_SOCIAL_IMAGE\)/);
  assert.match(schema, /image: primaryImage/);
  assert.match(schema, /hasOfferCatalog: \{/);
  assert.match(schema, /'Solar Energy Systems'/);
  assert.match(schema, /'Home Appliances'/);
  assert.match(schema, /'3C Electronics'/);
});

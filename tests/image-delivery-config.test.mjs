import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { join } from 'node:path';

const root = process.cwd();

test('optimized public images are configured for inline browser display', () => {
  const config = readFileSync(join(root, 'next.config.js'), 'utf8');
  assert.match(config, /contentDispositionType:\s*'inline'/);
  assert.match(config, /hostname:\s*'images\.houseplus-ch\.com'/);
});

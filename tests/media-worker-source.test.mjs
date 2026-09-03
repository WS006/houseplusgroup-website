import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const worker = fs.readFileSync('cloudflare/media-control-plane/worker-v2.mjs', 'utf8');
const deploy = fs.readFileSync('cloudflare/media-control-plane/prepare_worker_deploy_request.py', 'utf8');

test('media Worker source of truth contains the production media and Alt routes', () => {
  assert.match(worker, /houseplus-media-v2/);
  assert.match(worker, /url\.pathname === '\/v1\/upload'/);
  assert.ok(worker.includes('generateAltForAsset'));
  assert.ok(worker.includes('function backfill'));
  assert.match(worker, /alt_generation_started/);
  assert.match(worker, /alt_generation_completed/);
  assert.match(worker, /alt_generation_failed/);
});

test('media deployment preparation targets the new production Worker explicitly', () => {
  assert.match(deploy, /houseplus-media-v2/);
  assert.match(deploy, /worker-v2\.mjs/);
  assert.match(deploy, /HOUSEPLUS_MEDIA_DB_ID/);
  assert.doesNotMatch(deploy, /WORKER_NAME\s*=\s*['\"]houseplus-media-api['\"]|workers\/scripts\/houseplus-media-api/);
  assert.doesNotMatch(deploy, /ACCOUNT_ID\s*=\s*['\"]affca529f7b55b7eb2b3770c954bd36d['\"]|account_id['\"]\s*:\s*['\"]affca529f7b55b7eb2b3770c954bd36d['\"]|workers\/scripts\/houseplus-media-api/);
});

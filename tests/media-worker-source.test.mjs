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
  assert.match(worker, /dry_run/);
  assert.match(worker, /generate_missing_alt_only/);
});

test('v2 media delivery uses explicit edge-cache observability and legacy Worker is archive-only', () => {
  const legacy = fs.readFileSync('cloudflare/media-control-plane/worker.mjs', 'utf8');
  assert.match(worker, /caches\.default\.match/);
  assert.match(worker, /caches\.default\.put/);
  assert.match(worker, /x-houseplus-cache/);
  assert.match(worker, /max-age=31536000, immutable/);
  assert.match(legacy, /ARCHIVE ONLY/);
});

test('media deployment preparation targets the new production Worker explicitly', () => {
  assert.match(deploy, /houseplus-media-v2/);
  assert.match(deploy, /worker-v2\.mjs/);
  assert.match(deploy, /HOUSEPLUS_MEDIA_DB_ID/);
  assert.doesNotMatch(deploy, /WORKER_NAME\s*=\s*['\"]houseplus-media-api['\"]|workers\/scripts\/houseplus-media-api/);
  assert.doesNotMatch(deploy, /ACCOUNT_ID\s*=\s*['\"]affca529f7b55b7eb2b3770c954bd36d['\"]|account_id['\"]\s*:\s*['\"]affca529f7b55b7eb2b3770c954bd36d['\"]|workers\/scripts\/houseplus-media-api/);
});

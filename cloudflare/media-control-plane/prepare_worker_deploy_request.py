#!/usr/bin/env python3
import json
import os
from pathlib import Path

ROOT = Path('/home/ubuntu/houseplusgroup-website/cloudflare/media-control-plane')
WORKER_CODE = (ROOT / 'worker-v2.mjs').read_text()
TOKEN_FILE = Path('/home/ubuntu/.houseplus_media_admin_token')
REQUEST_FILE = ROOT / 'worker_deploy_request.json'
ACCOUNT_ID = os.environ.get('HOUSEPLUS_CF_ACCOUNT_ID', '5cd2f2781f30e866504997ad801d7dbd')
WORKER_NAME = os.environ.get('HOUSEPLUS_MEDIA_WORKER_NAME', 'houseplus-media-v2')
DATABASE_ID = os.environ.get('HOUSEPLUS_MEDIA_DB_ID', '').strip()
BUCKET_NAME = os.environ.get('HOUSEPLUS_MEDIA_BUCKET', 'houseplus-images')

if not DATABASE_ID:
    raise SystemExit('HOUSEPLUS_MEDIA_DB_ID is required; refuse to deploy with an unknown D1 binding')
if not TOKEN_FILE.exists() or not TOKEN_FILE.read_text().strip():
    raise SystemExit(f'{TOKEN_FILE} is required; refuse to generate or guess ADMIN_TOKEN')
admin_token = TOKEN_FILE.read_text().strip()
if ACCOUNT_ID == 'affca529f7b55b7eb2b3770c954bd36d' or WORKER_NAME == 'houseplus-media-api':
    raise SystemExit('Refusing to target the retired Cloudflare account or Worker')

metadata = {
    'main_module': 'worker.mjs',
    'compatibility_date': '2026-08-12',
    'bindings': [
        {'type': 'r2_bucket', 'name': 'MEDIA_BUCKET', 'bucket_name': BUCKET_NAME},
        {'type': 'd1', 'name': 'MEDIA_DB', 'id': DATABASE_ID},
        {'type': 'secret_text', 'name': 'ADMIN_TOKEN', 'text': admin_token},
    ],
}

boundary = '----HousePlusMediaBoundary'
parts = [
    f'--{boundary}',
    'Content-Disposition: form-data; name="metadata"',
    'Content-Type: application/json',
    '',
    json.dumps(metadata),
    f'--{boundary}',
    'Content-Disposition: form-data; name="worker.mjs"; filename="worker.mjs"',
    'Content-Type: application/javascript+module',
    '',
    WORKER_CODE,
    f'--{boundary}--',
    '',
]
body = '\r\n'.join(parts)
request = {
    'account_id': ACCOUNT_ID,
    'code': "async () => cloudflare.request({ method: 'PUT', path: `/accounts/${accountId}/workers/scripts/" + WORKER_NAME + "`, body: " + json.dumps(body) + ", contentType: 'multipart/form-data; boundary=" + boundary + "', rawBody: true })"
}
REQUEST_FILE.write_text(json.dumps(request))
print(json.dumps({'account_id': ACCOUNT_ID, 'worker': WORKER_NAME, 'bucket': BUCKET_NAME, 'database_id': DATABASE_ID, 'request_file': str(REQUEST_FILE)}))

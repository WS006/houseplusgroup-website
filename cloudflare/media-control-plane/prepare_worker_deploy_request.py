#!/usr/bin/env python3
import json
import secrets
from pathlib import Path

ROOT = Path('/home/ubuntu/houseplusgroup-website/cloudflare/media-control-plane')
WORKER_CODE = (ROOT / 'worker.mjs').read_text()
TOKEN_FILE = Path('/home/ubuntu/.houseplus_media_admin_token')
REQUEST_FILE = ROOT / 'worker_deploy_request.json'
ACCOUNT_ID = 'affca529f7b55b7eb2b3770c954bd36d'
DATABASE_ID = 'd62b9de7-c3c4-46de-8931-aba6b38773f1'

if TOKEN_FILE.exists():
    admin_token = TOKEN_FILE.read_text().strip()
else:
    admin_token = secrets.token_urlsafe(32)
    TOKEN_FILE.write_text(admin_token + '\n')
    TOKEN_FILE.chmod(0o600)

metadata = {
    'main_module': 'worker.mjs',
    'compatibility_date': '2026-08-12',
    'bindings': [
        {'type': 'r2_bucket', 'name': 'MEDIA_BUCKET', 'bucket_name': 'houseplus'},
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
    'code': "async () => cloudflare.request({ method: 'PUT', path: `/accounts/${accountId}/workers/scripts/houseplus-media-api`, body: " + json.dumps(body) + ", contentType: 'multipart/form-data; boundary=" + boundary + "', rawBody: true })"
}
REQUEST_FILE.write_text(json.dumps(request))
print(json.dumps({'worker': 'houseplus-media-api', 'request_file': str(REQUEST_FILE), 'admin_token_file': str(TOKEN_FILE)}))

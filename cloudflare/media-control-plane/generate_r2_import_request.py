#!/usr/bin/env python3
import json
from pathlib import Path

SOURCE = Path('/home/ubuntu/.mcp/tool-results/2026-08-12_05-46-30.718320457_cloudflare_execute_c8fc1c54.json')
TARGET = Path('/home/ubuntu/houseplusgroup-website/cloudflare/media-control-plane/d1_import_r2_assets_request.json')
ACCOUNT_ID = 'affca529f7b55b7eb2b3770c954bd36d'
DATABASE_ID = 'd62b9de7-c3c4-46de-8931-aba6b38773f1'

payload = json.loads(SOURCE.read_text())
objects = payload['result']
statements = []
for item in objects:
    key = item['key']
    filename = key.rsplit('/', 1)[-1]
    content_type = item.get('http_metadata', {}).get('contentType', 'application/octet-stream')
    size = int(item.get('size', 0))
    etag = item.get('etag', '')
    topic = key.split('/', 1)[0] if '/' in key else 'uncategorized'
    key_sql = key.replace("'", "''")
    filename_sql = filename.replace("'", "''")
    content_type_sql = content_type.replace("'", "''")
    etag_sql = etag.replace("'", "''")
    topic_sql = topic.replace("'", "''")
    statements.append(
        "INSERT INTO assets (asset_id, r2_key, original_filename, content_type, byte_size, content_hash, asset_type, topic, status, seo_indexable, metadata_json) "
        f"VALUES (lower(hex(randomblob(16))), '{key_sql}', '{filename_sql}', '{content_type_sql}', {size}, '{etag_sql}', 'image', '{topic_sql}', 'needs_review', 0, '{{\"import_source\":\"r2\"}}') "
        "ON CONFLICT(r2_key) DO UPDATE SET original_filename=excluded.original_filename, content_type=excluded.content_type, byte_size=excluded.byte_size, content_hash=excluded.content_hash, updated_at=CURRENT_TIMESTAMP;"
    )

request = {
    'account_id': ACCOUNT_ID,
    'code': (
        "async () => cloudflare.request({ method: 'POST', "
        f"path: `/accounts/${{accountId}}/d1/database/{DATABASE_ID}/raw`, "
        f"body: {{ sql: `{chr(10).join(statements)}` }} }})"
    )
}
TARGET.write_text(json.dumps(request))
print(json.dumps({'objects_prepared': len(objects), 'output': str(TARGET)}))

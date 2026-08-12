const apiBase = (process.env.HOUSEPLUS_MEDIA_API_URL || '').replace(/\/$/, '');
const adminToken = process.env.HOUSEPLUS_MEDIA_API_TOKEN || '';

if (!apiBase || !adminToken) throw new Error('HOUSEPLUS_MEDIA_API_URL and HOUSEPLUS_MEDIA_API_TOKEN are required.');

const listResponse = await fetch(`${apiBase}/v1/assets?status=needs_review&page=1&limit=100`, {
  headers: { authorization: `Bearer ${adminToken}` },
});
if (!listResponse.ok) throw new Error(`Unable to list legacy assets: ${listResponse.status} ${await listResponse.text()}`);
const data = await listResponse.json();

for (const asset of data.assets || []) {
  const response = await fetch(`${apiBase}/v1/assets/${asset.asset_id}`, {
    method: 'PATCH',
    headers: { authorization: `Bearer ${adminToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      status: 'deprecated',
      seo_indexable: false,
      metadata_json: {
        lifecycle: 'deprecated-legacy-r2-copy',
        reason: 'Superseded by reviewed static-source R2 asset during site-wide media migration',
        deprecated_at: new Date().toISOString(),
      },
    }),
  });
  if (!response.ok) throw new Error(`Unable to deprecate ${asset.r2_key}: ${response.status} ${await response.text()}`);
  console.log(`Deprecated ${asset.r2_key}`);
}

console.log(JSON.stringify({ deprecated_assets: (data.assets || []).length }, null, 2));

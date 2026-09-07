import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const apiBase = (process.env.HOUSEPLUS_MEDIA_API_URL || 'https://images.houseplus-ch.com').replace(/\/$/, '');
const token = process.env.HOUSEPLUS_MEDIA_API_TOKEN || '';
if (!token) throw new Error('HOUSEPLUS_MEDIA_API_TOKEN is required');
const root = resolve(import.meta.dirname, '..');
const variants = [
  ['e0fd1e30-2241-4255-bc5f-cf5e8dc55135', 'houseplus-carousel-houseplus-solar-hero.webp'],
  ['b7dbffd2-f52e-42bc-b0c2-43329ca68682', 'houseplus-carousel-houseplus-home-appliances-hero.webp'],
  ['7f712b0f-2530-48e8-866b-d70eb0b3bd75', 'houseplus-carousel-houseplus-3c-electronics-hero.webp'],
];
for (const [assetId, filename] of variants) {
  const body = await readFile(resolve(root, 'audit/homepage-hero-local/webp-1920', filename));
  const response = await fetch(`${apiBase}/v1/assets/${assetId}/variants/webp-1920/`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'image/webp' },
    body,
    signal: AbortSignal.timeout(60_000),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${filename}: HTTP ${response.status} ${text}`);
  console.log(JSON.stringify({ filename, assetId, bytes: body.byteLength, response: JSON.parse(text) }));
}

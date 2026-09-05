#!/usr/bin/env python3
"""Create WebP delivery variants for large approved HousePlus R2 assets.

Original R2 objects, semantic public URLs and UUID legacy URLs are never replaced.
The media Worker chooses each WebP variant only when the visitor sends Accept: image/webp.
"""

from __future__ import annotations

import io
import json
import os
import time
from pathlib import Path

import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
LOG_PATH = ROOT / 'audit' / 'r2-switch' / 'webp_variant_generation.jsonl'
WORKER = os.environ.get('HOUSEPLUS_MEDIA_API_URL', 'https://images.houseplus-ch.com').rstrip('/')
TOKEN_PATH = Path('/home/ubuntu/.houseplus_v2_admin_token')
PUBLIC_ORIGIN = 'https://images.houseplus-ch.com'
MAX_SOURCE_BYTES = 1_000_000
MAX_EDGE = 1920
WEBP_QUALITY = 82
TIMEOUT = 90


def completed_ids() -> set[str]:
    if not LOG_PATH.exists():
        return set()
    return {
        json.loads(line)['asset_id']
        for line in LOG_PATH.read_text().splitlines()
        if line.strip() and json.loads(line).get('status') == 'uploaded'
    }


def list_assets(token: str) -> list[dict]:
    headers = {'Authorization': f'Bearer {token}'}
    assets: list[dict] = []
    page = 1
    while True:
        response = requests.get(f'{WORKER}/v1/assets', params={'status': 'approved', 'page': page, 'limit': 100}, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()
        payload = response.json()
        assets.extend(payload.get('assets', []))
        if not payload.get('has_more'):
            return assets
        page += 1


def make_webp(asset: dict) -> tuple[bytes, int, int]:
    slug = asset.get('public_slug') or asset['asset_id']
    response = requests.get(
        f'{PUBLIC_ORIGIN}/media/{slug}/',
        headers={'Accept': 'image/jpeg,image/png,image/*;q=0.8'},
        timeout=TIMEOUT,
    )
    response.raise_for_status()
    source = Image.open(io.BytesIO(response.content))
    source = ImageOps.exif_transpose(source)
    if source.mode not in ('RGB', 'RGBA'):
        source = source.convert('RGB')
    width, height = source.size
    if max(width, height) > MAX_EDGE:
        scale = MAX_EDGE / max(width, height)
        source = source.resize((round(width * scale), round(height * scale)), Image.Resampling.LANCZOS)
    output = io.BytesIO()
    source.save(output, 'WEBP', quality=WEBP_QUALITY, method=6)
    return output.getvalue(), source.width, source.height


def upload_variant(asset: dict, content: bytes, token: str) -> dict:
    response = requests.post(
        f"{WORKER}/v1/assets/{asset['asset_id']}/variants/webp-1920",
        data=content,
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'image/webp'},
        timeout=TIMEOUT,
    )
    response.raise_for_status()
    return response.json()


def append_log(record: dict) -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open('a') as handle:
        handle.write(json.dumps(record) + '\n')


def main() -> None:
    token = TOKEN_PATH.read_text().strip()
    if not token:
        raise RuntimeError('Missing media API token')
    done = completed_ids()
    assets = [asset for asset in list_assets(token) if int(asset.get('byte_size') or 0) > MAX_SOURCE_BYTES]
    print(json.dumps({'approved_over_1mb': len(assets), 'already_completed': len(done)}, indent=2))
    for index, asset in enumerate(assets, start=1):
        if asset['asset_id'] in done:
            continue
        try:
            webp, width, height = make_webp(asset)
            result = upload_variant(asset, webp, token)
            record = {
                'status': 'uploaded',
                'asset_id': asset['asset_id'],
                'public_slug': asset.get('public_slug'),
                'source_bytes': int(asset['byte_size']),
                'webp_bytes': len(webp),
                'width': width,
                'height': height,
                'worker_result': result,
            }
            append_log(record)
            print(f"[{index}/{len(assets)}] {asset.get('public_slug')} {asset['byte_size']} -> {len(webp)} bytes")
        except Exception as exc:  # keep the batch recoverable
            append_log({'status': 'failed', 'asset_id': asset['asset_id'], 'public_slug': asset.get('public_slug'), 'error': str(exc)})
            print(f"[{index}/{len(assets)}] FAILED {asset.get('public_slug')}: {exc}")
        time.sleep(0.2)


if __name__ == '__main__':
    main()

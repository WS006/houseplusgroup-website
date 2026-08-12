#!/usr/bin/env python3
"""Generate R2 media dimensions for SEO/GEO and D1 backfill batches.

The source journal is the authoritative map from the original public media path to
an approved R2 asset. When an optimized migration copy exists, its dimensions are
used because that is the binary stored in R2.
"""

from __future__ import annotations

import json
import mimetypes
import re
from pathlib import Path
from xml.etree import ElementTree

from PIL import Image

ROOT = Path('/home/ubuntu/houseplusgroup-website')
PUBLIC = ROOT / 'public'
JOURNAL = ROOT / 'audit' / 'r2-media-publication.jsonl'
OPTIMIZED = ROOT / 'audit' / 'r2-optimized-media'
OUTPUT_DIR = ROOT / 'audit' / 'r2-switch'
TYPESCRIPT_OUT = ROOT / 'lib' / 'r2-media-details.ts'
ACCOUNT_ID = 'affca529f7b55b7eb2b3770c954bd36d'
DATABASE_ID = 'd62b9de7-c3c4-46de-8931-aba6b38773f1'
PUBLIC_MEDIA_ORIGIN = 'https://images.houseplus-ch.com'


def source_file(source_path: str) -> Path:
    optimized = OPTIMIZED / source_path
    if optimized.exists():
        return optimized
    if source_path.startswith('__root__/'):
        return PUBLIC / source_path.removeprefix('__root__/')
    return PUBLIC / 'images' / source_path


def svg_dimensions(path: Path) -> tuple[int | None, int | None]:
    try:
        root = ElementTree.parse(path).getroot()
        width = root.attrib.get('width')
        height = root.attrib.get('height')
        view_box = root.attrib.get('viewBox')

        def numeric(value: str | None) -> int | None:
            if not value:
                return None
            match = re.match(r'([0-9.]+)', value)
            return round(float(match.group(1))) if match else None

        parsed_width, parsed_height = numeric(width), numeric(height)
        if parsed_width and parsed_height:
            return parsed_width, parsed_height
        if view_box:
            values = re.split(r'[ ,]+', view_box.strip())
            if len(values) == 4:
                return round(float(values[2])), round(float(values[3]))
    except Exception:
        pass
    return None, None


def dimensions(path: Path) -> tuple[int | None, int | None]:
    if path.suffix.lower() == '.svg':
        return svg_dimensions(path)
    try:
        with Image.open(path) as image:
            return int(image.width), int(image.height)
    except Exception:
        return None, None


def media_type(path: Path) -> str:
    return mimetypes.guess_type(path.name)[0] or 'image/jpeg'


def main() -> None:
    entries = [json.loads(line) for line in JOURNAL.read_text().splitlines() if line.strip()]
    details: dict[str, dict] = {}
    updates: list[dict] = []
    missing: list[dict] = []

    for entry in entries:
        source_path = entry['source_path']
        file_path = source_file(source_path)
        width, height = dimensions(file_path) if file_path.exists() else (None, None)
        publication = entry.get('publication') or {}
        detail = {
            'width': width,
            'height': height,
            'contentType': media_type(file_path) if file_path.exists() else 'image/jpeg',
            'alt': publication.get('alt') or entry.get('original_filename') or source_path,
            'title': publication.get('title') or source_path.rsplit('/', 1)[-1].rsplit('.', 1)[0].replace('-', ' ').title(),
            'description': publication.get('description') or '',
            'topic': publication.get('topic') or 'site',
            'canonicalUrl': publication.get('canonicalUrl') or None,
        }
        details[entry['asset_id']] = detail
        if width and height:
            updates.append({
                'sql': 'UPDATE assets SET width = ?, height = ?, updated_at = CURRENT_TIMESTAMP WHERE asset_id = ?',
                'params': [width, height, entry['asset_id']],
            })
        else:
            missing.append({'asset_id': entry['asset_id'], 'source_path': source_path, 'source_file': str(file_path)})

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    batches = [updates[index:index + 90] for index in range(0, len(updates), 90)]
    for index, batch in enumerate(batches, start=1):
        request = {
            'account_id': ACCOUNT_ID,
            'code': "async () => cloudflare.request({ method: 'POST', path: `/accounts/${accountId}/d1/database/" + DATABASE_ID + "/query`, body: " + json.dumps({'batch': batch}) + " })",
        }
        (OUTPUT_DIR / f'd1_image_dimension_backfill_{index:02d}.json').write_text(json.dumps(request))

    content = '''// Generated from approved R2 publication records. Do not hand-edit.\n\nexport interface R2MediaDetail {\n  width?: number;\n  height?: number;\n  contentType: string;\n  alt: string;\n  title: string;\n  description: string;\n  topic: string;\n  canonicalUrl?: string | null;\n}\n\nexport const R2_MEDIA_DETAILS_BY_ASSET_ID: Record<string, R2MediaDetail> = ''' + json.dumps(details, indent=2) + ''';\n\nexport function r2AssetIdFromUrl(url?: string): string | undefined {\n  const match = url?.match(/\\/media\\/([0-9a-f-]{16,})\\/?$/i);\n  return match?.[1];\n}\n\nexport function getR2MediaDetails(url?: string): R2MediaDetail | undefined {\n  const assetId = r2AssetIdFromUrl(url);\n  return assetId ? R2_MEDIA_DETAILS_BY_ASSET_ID[assetId] : undefined;\n}\n\nexport function r2ImageDimensions(url?: string, fallback = { width: 1200, height: 675 }) {\n  const detail = getR2MediaDetails(url);\n  return { width: detail?.width || fallback.width, height: detail?.height || fallback.height };\n}\n'''
    TYPESCRIPT_OUT.write_text(content)
    report = {
        'published_assets': len(entries),
        'dimension_updates': len(updates),
        'missing_dimensions': missing,
        'batch_files': [str(OUTPUT_DIR / f'd1_image_dimension_backfill_{index:02d}.json') for index in range(1, len(batches) + 1)],
        'typescript_file': str(TYPESCRIPT_OUT),
    }
    (OUTPUT_DIR / 'r2-media-details-report.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()

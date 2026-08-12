#!/usr/bin/env python3
"""Generate stable human-readable public aliases for active HousePlus R2 media.

The publication journal is the authoritative source-to-asset map for all approved
site images. UUID media URLs remain valid as legacy identifiers; semantic aliases
are additive and become the canonical public URL form.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path('/home/ubuntu/houseplusgroup-website')
JOURNAL = ROOT / 'audit' / 'r2-media-publication.jsonl'
OUT_DIR = ROOT / 'audit' / 'r2-switch'
ALIASES_TS = ROOT / 'lib' / 'r2-media-aliases.ts'
ACCOUNT_ID = 'affca529f7b55b7eb2b3770c954bd36d'
DATABASE_ID = 'd62b9de7-c3c4-46de-8931-aba6b38773f1'
ORIGIN = 'https://images.houseplus-ch.com'


def slugify(value: str) -> str:
    value = value.lower().replace('&', ' and ')
    value = re.sub(r'\.[a-z0-9]{2,5}$', '', value)
    value = re.sub(r'[^a-z0-9]+', '-', value)
    return re.sub(r'-{2,}', '-', value).strip('-')


def alias_stem(source_path: str, topic: str) -> str:
    source_path = source_path.removeprefix('__root__/')
    segments = [slugify(part) for part in source_path.split('/') if slugify(part)]
    filename = segments[-1] if segments else 'media'
    folder = segments[0] if len(segments) > 1 else topic or 'media'

    if filename in {'logo', 'logo-png'}:
        return 'houseplus-group-logo'
    if filename in {'favicon', 'icon'}:
        return 'houseplus-group-brand-icon'
    if folder == 'products':
        return f'houseplus-{filename}-wholesale'
    if folder in {'articles', 'covers'}:
        context = '-'.join(segments[:-1])
        return f'houseplus-{context}-{filename}-b2b-guide' if context else f'houseplus-{filename}-b2b-guide'
    if folder in {'factory', 'team', 'about'}:
        return f'houseplus-{folder}-{filename}'
    if len(segments) > 1:
        return f'houseplus-{"-".join(segments)}'
    return f'houseplus-{filename}'


def request_payload(body: dict) -> dict[str, str]:
    code = "async () => cloudflare.request({ method: 'POST', path: `/accounts/${accountId}/d1/database/" + DATABASE_ID + "/query`, body: " + json.dumps(body) + " })"
    return {'account_id': ACCOUNT_ID, 'code': code}


def main() -> None:
    entries = [json.loads(line) for line in JOURNAL.read_text().splitlines() if line.strip()]
    used: dict[str, int] = {}
    aliases: dict[str, str] = {}
    rows: list[dict[str, str]] = []

    for entry in entries:
        source_path = entry['source_path']
        topic = (entry.get('publication') or {}).get('topic') or source_path.split('/')[0] or 'media'
        base = alias_stem(source_path, topic)[:112].strip('-') or 'houseplus-media'
        count = used.get(base, 0) + 1
        used[base] = count
        public_slug = base if count == 1 else f'{base}-{count}'
        asset_id = entry['asset_id']
        aliases[asset_id] = public_slug
        rows.append({
            'asset_id': asset_id,
            'public_slug': public_slug,
            'public_url': f'{ORIGIN}/media/{public_slug}/',
            'source_path': source_path,
            'topic': topic,
        })

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / 'semantic-media-aliases.json').write_text(json.dumps(rows, indent=2) + '\n')
    ALIASES_TS.write_text(
        '// Generated from approved R2 publication records. Do not hand-edit.\n\n'
        'export const R2_MEDIA_PUBLIC_SLUG_BY_ASSET_ID: Record<string, string> = '
        + json.dumps(aliases, indent=2)
        + ';\n\n'
        + 'export function r2PublicMediaSlug(assetId?: string): string | undefined {\n'
        + '  return assetId ? R2_MEDIA_PUBLIC_SLUG_BY_ASSET_ID[assetId] : undefined;\n}\n'
    )

    migration = 'ALTER TABLE assets ADD COLUMN public_slug TEXT; CREATE UNIQUE INDEX IF NOT EXISTS idx_assets_public_slug ON assets(public_slug) WHERE public_slug IS NOT NULL;'
    (OUT_DIR / 'd1_add_public_slug_column.json').write_text(json.dumps(request_payload({'sql': migration})) + '\n')

    batch_files = []
    for offset in range(0, len(rows), 90):
        batch = [{
            'sql': 'UPDATE assets SET public_slug = ?, public_url = ?, updated_at = CURRENT_TIMESTAMP WHERE asset_id = ?',
            'params': [row['public_slug'], row['public_url'], row['asset_id']],
        } for row in rows[offset:offset + 90]]
        file_path = OUT_DIR / f'd1_semantic_media_alias_backfill_{offset // 90 + 1:02d}.json'
        file_path.write_text(json.dumps(request_payload({'batch': batch})) + '\n')
        batch_files.append(str(file_path))

    report = {
        'active_site_assets': len(rows),
        'unique_aliases': len(set(aliases.values())),
        'aliases_file': str(ALIASES_TS),
        'migration_file': str(OUT_DIR / 'd1_add_public_slug_column.json'),
        'backfill_files': batch_files,
        'examples': rows[:8],
    }
    (OUT_DIR / 'semantic-media-alias-report.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()

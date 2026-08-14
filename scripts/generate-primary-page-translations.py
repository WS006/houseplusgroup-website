#!/usr/bin/env python3
"""Generate a reviewable translation map for visible English strings in major TSX pages."""

import argparse
import json
import os
from pathlib import Path

from openai import OpenAI

PAGES = [
    'about-us', 'brand', 'careers', 'case-studies', 'certifications', 'factory',
    'faq', 'news', 'oem-odm', 'products', 'regions', 'service', 'support', 'team',
]

ROOT = Path(__file__).resolve().parents[1]

SCHEMA = {
    'type': 'json_schema',
    'json_schema': {
        'name': 'page_translation_map',
        'strict': True,
        'schema': {
            'type': 'object',
            'properties': {
                'translations': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'source': {'type': 'string'},
                            'es': {'type': 'string'},
                            'de': {'type': 'string'},
                            'fr': {'type': 'string'},
                            'ar': {'type': 'string'},
                        },
                        'required': ['source', 'es', 'de', 'fr', 'ar'],
                        'additionalProperties': False,
                    },
                },
            },
            'required': ['translations'],
            'additionalProperties': False,
        },
    },
}

SYSTEM = '''You are a professional website translator. Extract only user-visible English strings from the supplied Next.js TSX page and translate each into Spanish, German, French and Modern Standard Arabic.

Rules:
1. Translate the exact source string; do not paraphrase, create, remove or strengthen commercial claims.
2. Preserve facts, quantities, units, product names, brand names, technical standards and variables exactly as written. Do not invent facts.
3. Include visible JSX text, headings, paragraphs, list entries, button labels, image alt/title/caption strings and visible values in arrays/objects rendered by the page.
4. Do not include imports, CSS/Tailwind classes, URLs, route slugs, schema boilerplate, metadata-only strings, programming identifiers, dates or code comments.
5. Use natural B2B language. Keep HTML/JSX interpolation out of the translated strings.
6. Output every selected source string exactly as it appears in the file. If a source string is already non-English or only a proper name/unit, omit it.
'''

def translate_page(client: OpenAI, slug: str, model: str) -> dict:
    source_path = ROOT / 'app' / '[lang]' / slug / 'page.tsx'
    source = source_path.read_text(encoding='utf-8')
    response = client.chat.completions.create(
        model=model,
        messages=[
            {'role': 'system', 'content': SYSTEM},
            {'role': 'user', 'content': f'PAGE SLUG: {slug}\n\nTSX SOURCE:\n```tsx\n{source}\n```'},
        ],
        response_format=SCHEMA,
        max_completion_tokens=18000,
    )
    content = response.choices[0].message.content
    if not content:
        raise RuntimeError(f'No translation content returned for {slug}')
    payload = json.loads(content)
    seen = set()
    rows = []
    for row in payload['translations']:
        if row['source'] in seen:
            continue
        seen.add(row['source'])
        rows.append(row)
    return {'slug': slug, 'sourcePath': str(source_path.relative_to(ROOT)), 'translations': rows}

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--slug', action='append', choices=PAGES, help='Repeat to translate selected pages only.')
    parser.add_argument('--model', default='gpt-5-mini')
    parser.add_argument('--output-dir', default=str(ROOT / 'audit' / 'primary-page-translations'))
    args = parser.parse_args()
    slugs = args.slug or PAGES
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'), base_url=os.environ.get('OPENAI_API_BASE'))
    manifest = []
    for slug in slugs:
        result = translate_page(client, slug, args.model)
        target = output_dir / f'{slug}.json'
        target.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
        manifest.append({'slug': slug, 'file': target.name, 'entries': len(result['translations'])})
        print(json.dumps(manifest[-1], ensure_ascii=False))
    (output_dir / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')

if __name__ == '__main__':
    main()

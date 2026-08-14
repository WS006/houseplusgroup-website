#!/usr/bin/env python3
"""Generate a review copy of a fully localized primary-page TSX file."""

import argparse
import os
from pathlib import Path

from openai import OpenAI

ROOT = Path(__file__).resolve().parents[1]

SYSTEM = '''You are a senior Next.js and multilingual content engineer. You will receive one existing TSX page that currently renders much of its visible main content in English even for Spanish, German, French and Arabic routes.

Return a complete replacement TSX file only, without Markdown fences or explanation.

Required result:
1. Preserve the page's route behavior, imports (unless genuinely unused), component hierarchy, images, hrefs, schema calls and SEO behavior.
2. Preserve the full semantic content and section count of the English page. Do not replace it with a generic marketing template or reduce it to a short summary.
3. Add a clearly structured per-language copy map for en, es, de, fr and ar, then render all user-visible headings, paragraphs, lists, buttons, image alt/title/caption, cards and CTA labels from the active lang.
4. Translate to natural business Spanish, German, French and Modern Standard Arabic. Keep facts, quantities, units, product names, technical standards and variables exactly as written. Do not invent, remove or strengthen commercial facts.
5. Do not translate code, Tailwind classes, URLs, route slugs or component names.
6. The return must compile under TypeScript/Next.js. Avoid dynamic HTML, browser-only APIs and unsafe casts.
'''

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('slug')
    parser.add_argument('--output', required=True)
    parser.add_argument('--model', default='gpt-5')
    args = parser.parse_args()
    source_path = ROOT / 'app' / '[lang]' / args.slug / 'page.tsx'
    source = source_path.read_text(encoding='utf-8')
    client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'), base_url=os.environ.get('OPENAI_API_BASE'))
    response = client.chat.completions.create(
        model=args.model,
        messages=[
            {'role': 'system', 'content': SYSTEM},
            {'role': 'user', 'content': f'PAGE SLUG: {args.slug}\n\nCURRENT TSX:\n{source}'},
        ],
        max_completion_tokens=26000,
        extra_body={'reasoning': {'effort': 'medium'}},
    )
    content = response.choices[0].message.content
    if not content:
        raise RuntimeError('Model returned no content')
    cleaned = content.strip()
    if cleaned.startswith('```'):
        cleaned = cleaned.split('\n', 1)[1]
        cleaned = cleaned.rsplit('```', 1)[0]
    Path(args.output).write_text(cleaned, encoding='utf-8')
    print(f'Wrote {args.output} ({len(cleaned)} characters)')

if __name__ == '__main__':
    main()

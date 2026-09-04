#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageOps
import json

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'audit' / 'r2-optimized-media'
MAX_BYTES = 1_000_000
MAX_EDGE = 1920
QUALITY = 82
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}

records = []
for source in sorted((ROOT / 'public').rglob('*')):
    if not source.is_file() or source.suffix.lower() not in EXTENSIONS or source.stat().st_size <= MAX_BYTES:
        continue
    relative = source.relative_to(ROOT / 'public')
    output = OUT / relative.with_suffix('.webp')
    output.parent.mkdir(parents=True, exist_ok=True)
    image = ImageOps.exif_transpose(Image.open(source))
    if image.mode not in ('RGB', 'RGBA'):
        image = image.convert('RGB')
    original_width, original_height = image.size
    if max(image.size) > MAX_EDGE:
        scale = MAX_EDGE / max(image.size)
        image = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    image.save(output, 'WEBP', quality=QUALITY, method=6)
    records.append({
        'source_path': str(relative),
        'source_bytes': source.stat().st_size,
        'optimized_path': str(output.relative_to(ROOT)),
        'optimized_bytes': output.stat().st_size,
        'source_dimensions': [original_width, original_height],
        'optimized_dimensions': list(image.size),
        'reduction_percent': round((1 - output.stat().st_size / source.stat().st_size) * 100, 1),
        'format': 'image/webp',
    })
manifest = OUT / 'manifest.json'
manifest.write_text(json.dumps({'quality': QUALITY, 'max_edge': MAX_EDGE, 'count': len(records), 'records': records}, indent=2) + '\n')
print(json.dumps({'count': len(records), 'source_bytes': sum(x['source_bytes'] for x in records), 'optimized_bytes': sum(x['optimized_bytes'] for x in records), 'manifest': str(manifest)}, indent=2))

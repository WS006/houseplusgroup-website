from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source_dir = root / 'audit/homepage-hero-local/original'
out_dir = root / 'audit/homepage-hero-local/webp-1920'
out_dir.mkdir(parents=True, exist_ok=True)

for source in sorted(source_dir.glob('*.jpg')):
    with Image.open(source) as image:
        image = image.convert('RGB')
        original_size = image.size
        if image.width > 1920:
            height = round(image.height * 1920 / image.width)
            image = image.resize((1920, height), Image.Resampling.LANCZOS)
        target = out_dir / f'{source.stem}.webp'
        image.save(target, 'WEBP', quality=82, method=6)
        print(f'{source.name}: {original_size} -> {image.size}; {source.stat().st_size} -> {target.stat().st_size} bytes')

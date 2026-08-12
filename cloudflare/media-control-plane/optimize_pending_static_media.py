#!/usr/bin/env python3
"""Create compressed R2 import copies for static JPG files not yet recorded in the import journal."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageOps

REPOSITORY_ROOT = Path(__file__).resolve().parents[2]
IMAGE_ROOT = REPOSITORY_ROOT / "public" / "images"
JOURNAL_PATH = REPOSITORY_ROOT / "audit" / "r2-static-media-import.jsonl"
OUTPUT_ROOT = REPOSITORY_ROOT / "audit" / "r2-optimized-media"
MAX_EDGE = 2048
JPEG_QUALITY = 84


def completed_paths() -> set[str]:
    if not JOURNAL_PATH.exists():
        return set()
    return {
        json.loads(line)["source_path"]
        for line in JOURNAL_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
    }


def process_image(source_path: Path) -> tuple[Path, int, int, int, int]:
    relative_path = source_path.relative_to(IMAGE_ROOT)
    output_path = OUTPUT_ROOT / relative_path
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source_path) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        original_size = image.size
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        image.save(
            output_path,
            format="JPEG",
            quality=JPEG_QUALITY,
            optimize=True,
            progressive=True,
        )
        return output_path, original_size[0], original_size[1], image.size[0], image.size[1]


def main() -> None:
    completed = completed_paths()
    candidates = [
        path for path in sorted(IMAGE_ROOT.rglob("*.jpg"))
        if path.relative_to(IMAGE_ROOT).as_posix() not in completed
    ]
    total_original = 0
    total_optimized = 0

    for source_path in candidates:
        output_path, original_width, original_height, optimized_width, optimized_height = process_image(source_path)
        original_bytes = source_path.stat().st_size
        optimized_bytes = output_path.stat().st_size
        total_original += original_bytes
        total_optimized += optimized_bytes
        print(
            f"{source_path.relative_to(IMAGE_ROOT).as_posix()}\t"
            f"{original_bytes}->{optimized_bytes} bytes\t"
            f"{original_width}x{original_height}->{optimized_width}x{optimized_height}"
        )

    print(json.dumps({
        "processed": len(candidates),
        "original_bytes": total_original,
        "optimized_bytes": total_optimized,
        "reduction_percent": round((1 - total_optimized / total_original) * 100, 2) if total_original else 0,
        "output_root": str(OUTPUT_ROOT),
    }, indent=2))


if __name__ == "__main__":
    main()

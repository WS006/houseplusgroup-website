#!/usr/bin/env python3
"""
Generate professional product images using text_to_image API
"""
import urllib.request
import urllib.parse
import os
import sys
import time
import hashlib

API_BASE = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"
IMAGE_SIZE = "landscape_4_3"
MAX_WAIT_SECONDS = 300
POLL_INTERVAL = 10

PRODUCTS = [
    {
        "filename": "lithium-battery-5kwh.jpg",
        "prompt": "Professional product photo of a 5kWh LiFePO4 lithium battery pack, white rectangular residential energy storage battery with digital display screen, clean studio lighting, white background, high quality product photography, e-commerce product image"
    },
    {
        "filename": "lifepo4-battery-12v100ah.jpg",
        "prompt": "Professional product photo of a 12V 100Ah LiFePO4 battery, rectangular deep cycle battery with terminals on top, clean white background, studio lighting, high quality product photography, e-commerce product image"
    },
    {
        "filename": "solar-street-light-200w.jpg",
        "prompt": "Professional product photo of a 200W all-in-one solar street light, modern LED street lamp with solar panel on top, sleek black design, clean white background, studio lighting, high quality product photography, e-commerce product image"
    },
    {
        "filename": "solar-fan-20w.jpg",
        "prompt": "Professional product photo of a 20W DC solar fan with solar panel, portable rechargeable fan with blades, modern design, clean white background, studio lighting, high quality product photography, e-commerce product image"
    },
    {
        "filename": "power-bank-60w-pd.jpg",
        "prompt": "Professional product photo of a 60W PD fast charging power bank, slim aluminum alloy portable charger with USB-C ports, digital display showing battery percentage, clean white background, studio lighting, high quality product photography, e-commerce product image"
    },
    {
        "filename": "home-energy-storage-5000w.jpg",
        "prompt": "Professional product photo of a 5000W home energy storage system, large modular battery pack with touch screen display, modern residential power wall, clean white background, studio lighting, high quality product photography, e-commerce product image"
    },
    {
        "filename": "foldable-solar-panel-200w.jpg",
        "prompt": "Professional product photo of a 200W foldable solar panel, portable ETFE solar charger with carrying handle, unfolded showing multiple solar cells, clean white background, studio lighting, high quality product photography, e-commerce product image"
    },
    {
        "filename": "smart-wifi-plug-meter.jpg",
        "prompt": "Professional product photo of a smart WiFi plug with energy monitoring, white smart socket with LED indicator, compact design, clean white background, studio lighting, high quality product photography, e-commerce product image"
    },
]

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "products")

PLACEHOLDER_MD5 = "d41d8cd98f00b204e9800998ecf8427e"


def is_placeholder(image_data):
    """Check if the image is a generating placeholder"""
    placeholder_texts = [b"The image is generating", b"generating...", b"refresh page"]
    for text in placeholder_texts:
        if text in image_data:
            return True
    return False


def generate_image(prompt, output_path):
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"{API_BASE}?prompt={encoded_prompt}&image_size={IMAGE_SIZE}"
    
    print(f"  Generating: {os.path.basename(output_path)}")
    
    start_time = time.time()
    attempt = 0
    
    while time.time() - start_time < MAX_WAIT_SECONDS:
        attempt += 1
        elapsed = int(time.time() - start_time)
        print(f"  Attempt {attempt} (elapsed: {elapsed}s)...")
        
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=60) as response:
                if response.status == 200:
                    content_type = response.headers.get('Content-Type', '')
                    if 'image' in content_type:
                        data = response.read()
                        
                        if not is_placeholder(data):
                            with open(output_path, 'wb') as f:
                                f.write(data)
                            print(f"  OK - Saved {len(data)} bytes after {elapsed}s")
                            return True
                        else:
                            print(f"  Still generating (placeholder), waiting {POLL_INTERVAL}s...")
                            time.sleep(POLL_INTERVAL)
                    else:
                        print(f"  Content-Type: {content_type}")
                        time.sleep(POLL_INTERVAL)
                else:
                    print(f"  HTTP {response.status}")
                    time.sleep(POLL_INTERVAL)
        except Exception as e:
            print(f"  Error: {e}")
            time.sleep(POLL_INTERVAL)
    
    print(f"  FAIL - Timeout after {MAX_WAIT_SECONDS}s")
    return False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    total = len(PRODUCTS)
    print(f"Generating {total} professional product images...")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Max wait time per image: {MAX_WAIT_SECONDS}s")
    print()
    
    success = 0
    failed = 0
    
    for i, product in enumerate(PRODUCTS, 1):
        print(f"[{i}/{total}] {product['filename']}")
        output_path = os.path.join(OUTPUT_DIR, product['filename'])
        if generate_image(product['prompt'], output_path):
            success += 1
        else:
            failed += 1
        print()
    
    print("=" * 50)
    print(f"Complete: {success} success, {failed} failed")
    print(f"Output: {OUTPUT_DIR}")
    
    return failed == 0


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

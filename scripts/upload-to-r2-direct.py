#!/usr/bin/env python3
import requests
import os

R2_ACCOUNT_ID = os.environ.get("R2_ACCOUNT_ID")
R2_TOKEN = os.environ.get("R2_TOKEN")
BUCKET_NAME = "houseplus-images"
LOCAL_DIR = "/workspace/houseplusgroup-website/public/images/products"

headers = {
    "Authorization": f"Bearer {R2_TOKEN}",
}

products = [
    "solar-panel-500w.jpg", "solar-inverter-3kw.jpg", "lithium-battery-5kwh.jpg",
    "lead-acid-battery-100ah.jpg", "charge-controller-60a.jpg", "solar-street-light-200w.jpg",
    "solar-fan-20w.jpg", "solar-power-bank-20000mah.jpg", "air-fryer-5-8l.jpg",
    "induction-cooktop-2000w.jpg", "electric-kettle-1-5l.jpg", "toaster-2-slice.jpg",
    "headphone-over-ear.jpg", "bluetooth-earphone-tws.jpg", "smart-watch.jpg",
    "portable-ssd-1tb.jpg", "micro-sd-128gb.jpg", "usb-c-cable-2m.jpg",
    "solar-panel-100w.jpg", "portable-power-station-3000w.jpg", "foldable-solar-panel-200w.jpg",
    "home-energy-storage-5000w.jpg", "power-bank-60w-pd.jpg", "lifepo4-battery-12v100ah.jpg",
    "outdoor-power-station-600w.jpg", "mppt-controller-40a.jpg", "magnetic-power-bank-10000mah.jpg",
    "pure-sine-inverter-2000w.jpg", "flexible-solar-panel-400w.jpg", "solar-generator-kit-300w.jpg",
    "smart-wifi-plug-meter.jpg", "usb-c-cable-100w-5a.jpg"
]

success = 0
failed = 0
total = len(products)

print(f"Uploading {total} product images to R2 bucket: {BUCKET_NAME}")
print("-" * 60)

for i, filename in enumerate(products, 1):
    local_path = os.path.join(LOCAL_DIR, filename)
    
    if not os.path.exists(local_path):
        print(f"[{i}/{total}] ✗ {filename}: File not found")
        failed += 1
        continue
    
    file_size = os.path.getsize(local_path)
    object_key = f"products/{filename}"
    
    url = f"https://api.cloudflare.com/client/v4/accounts/{R2_ACCOUNT_ID}/r2/buckets/{BUCKET_NAME}/objects/{object_key}"
    
    with open(local_path, "rb") as f:
        response = requests.put(url, headers=headers, data=f)
    
    if response.status_code == 200:
        print(f"[{i}/{total}] ✓ {filename} ({file_size} bytes)")
        success += 1
    else:
        print(f"[{i}/{total}] ✗ {filename}: {response.status_code}")
        failed += 1

print("-" * 60)
print(f"Results: {success} succeeded, {failed} failed")

# Clean up test file
print("\nCleaning up test file...")
test_url = f"https://api.cloudflare.com/client/v4/accounts/{R2_ACCOUNT_ID}/r2/buckets/{BUCKET_NAME}/objects/test.txt"
response = requests.delete(test_url, headers=headers)
print(f"Deleted test.txt: {response.status_code}")

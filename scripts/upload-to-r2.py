#!/usr/bin/env python3
"""
Cloudflare R2 Upload Script for HousePlus Images
Usage: AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=xxx python3 scripts/upload-to-r2.py
"""
import os
import sys
import boto3
from botocore.config import Config

# R2 Configuration
ACCOUNT_ID = "5cd2f2781f30e866504997ad801d7dbd"
BUCKET_NAME = "houseplus-images"
ENDPOINT_URL = f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com"
PUBLIC_DOMAIN = "https://images.houseplus-ch.com"
LOCAL_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images")

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def get_s3_client():
    access_key = os.environ.get("AWS_ACCESS_KEY_ID")
    secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
    if not access_key or not secret_key:
        print("ERROR: Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY")
        print("  Get them from Cloudflare Dashboard -> R2 -> Manage R2 API Tokens")
        sys.exit(1)
    return boto3.client(
        "s3",
        endpoint_url=ENDPOINT_URL,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name="auto",
        config=Config(signature_version="s3v4"),
    )


def upload_images():
    s3 = get_s3_client()
    local_dir = os.path.abspath(LOCAL_DIR)

    # Collect all image files
    files_to_upload = []
    for root, _, files in os.walk(local_dir):
        for f in files:
            if os.path.splitext(f)[1].lower() in IMAGE_EXTENSIONS:
                files_to_upload.append(os.path.join(root, f))

    total = len(files_to_upload)
    print(f"Found {total} images to upload")
    print(f"Local dir: {local_dir}")
    print(f"Endpoint:  {ENDPOINT_URL}")
    print(f"Bucket:    {BUCKET_NAME}")
    print()

    success = 0
    failed = 0
    for i, filepath in enumerate(files_to_upload, 1):
        # R2 key = relative path from local_dir (e.g., "products/solar-panel-500w.jpg")
        key = os.path.relpath(filepath, local_dir).replace("\\", "/")

        ext = os.path.splitext(filepath)[1].lower()
        content_type = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
        }.get(ext, "application/octet-stream")

        try:
            s3.upload_file(
                filepath,
                BUCKET_NAME,
                key,
                ExtraArgs={
                    "ContentType": content_type,
                    "CacheControl": "public, max-age=31536000, immutable",
                },
            )
            print(f"  [{i}/{total}] OK   {key}")
            success += 1
        except Exception as e:
            print(f"  [{i}/{total}] FAIL {key}: {e}")
            failed += 1

    print()
    print(f"=== Upload Complete ===")
    print(f"Success: {success}")
    print(f"Failed:  {failed}")
    print(f"Total:   {total}")
    if success > 0:
        print(f"\nVerify: curl -I {PUBLIC_DOMAIN}/products/solar-panel-500w.jpg")


if __name__ == "__main__":
    upload_images()

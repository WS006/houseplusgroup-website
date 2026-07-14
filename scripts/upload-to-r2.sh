#!/bin/bash
# Cloudflare R2 Upload Script for HousePlus Images
# Usage: export AWS_ACCESS_KEY_ID=xxx; export AWS_SECRET_ACCESS_KEY=xxx; ./upload-to-r2.sh

BUCKET="houseplus-images"
ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
R2_PUBLIC_DOMAIN="https://images.houseplus-ch.com"
LOCAL_DIR="../public/images"

echo "=========================================="
echo "Cloudflare R2 Upload Script"
echo "=========================================="
echo ""
echo "Prerequisites:"
echo "1. Install AWS CLI: pip install awscli"
echo "2. Configure R2 credentials:"
echo "   export AWS_ACCESS_KEY_ID=<your-r2-access-key>"
echo "   export AWS_SECRET_ACCESS_KEY=<your-r2-secret-key>"
echo ""
echo "Bucket: $BUCKET"
echo "Local directory: $LOCAL_DIR"
echo ""

# Check credentials
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "❌ ERROR: Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"
    echo "   Get them from Cloudflare Dashboard → R2 → Manage R2 API Tokens"
    exit 1
fi

# Count files
FILE_COUNT=$(find "$LOCAL_DIR" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) | wc -l)
echo "📁 Found $FILE_COUNT images to upload"
echo ""

# Upload with AWS CLI
# Using --endpoint-url for R2
aws s3 sync "$LOCAL_DIR" "s3://$BUCKET/images" \
    --endpoint-url "$ENDPOINT" \
    --acl public-read \
    --storage-class STANDARD \
    --cache-control "public, max-age=31536000, immutable"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Upload complete!"
    echo ""
    echo "Verify an image:"
    echo "  curl -I $R2_PUBLIC_DOMAIN/articles/solar/solar-energy-storage-battery-bank.jpg"
else
    echo ""
    echo "❌ Upload failed. Check your credentials and endpoint."
    exit 1
fi

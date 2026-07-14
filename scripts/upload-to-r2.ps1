<#
.SYNOPSIS
Cloudflare R2 Upload Script for HousePlus Images (PowerShell Version)

.DESCRIPTION
Uploads all images from public/images to Cloudflare R2 bucket

.REQUIREMENTS
1. Install AWS CLI: pip install awscli
2. Set R2 credentials before running:
   $env:AWS_ACCESS_KEY_ID = "<your-r2-access-key>"
   $env:AWS_SECRET_ACCESS_KEY = "<your-r2-secret-key>"

.EXAMPLE
PS> $env:AWS_ACCESS_KEY_ID = "your-key"
PS> $env:AWS_SECRET_ACCESS_KEY = "your-secret"
PS> .\upload-to-r2.ps1

.NOTES
Get R2 credentials from: Cloudflare Dashboard → R2 → Manage R2 API Tokens
#>

$BUCKET = "houseplus-images"
$ENDPOINT = "https://<account-id>.r2.cloudflarestorage.com"
$R2_PUBLIC_DOMAIN = "https://images.houseplus-ch.com"
$LOCAL_DIR = Join-Path $PSScriptRoot ".." "public" "images"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Cloudflare R2 Upload Script (PowerShell)" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "1. Install AWS CLI: pip install awscli" -ForegroundColor Yellow
Write-Host "2. Configure R2 credentials:" -ForegroundColor Yellow
Write-Host "   `$env:AWS_ACCESS_KEY_ID = '<your-r2-access-key>'" -ForegroundColor Yellow
Write-Host "   `$env:AWS_SECRET_ACCESS_KEY = '<your-r2-secret-key>'" -ForegroundColor Yellow
Write-Host ""

Write-Host "Bucket: $BUCKET" -ForegroundColor Gray
Write-Host "Local directory: $LOCAL_DIR" -ForegroundColor Gray
Write-Host ""

if (-not $env:AWS_ACCESS_KEY_ID -or -not $env:AWS_SECRET_ACCESS_KEY) {
    Write-Host "ERROR: Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY" -ForegroundColor Red
    Write-Host "Get them from Cloudflare Dashboard → R2 → Manage R2 API Tokens" -ForegroundColor Red
    exit 1
}

$fileCount = (Get-ChildItem -Path $LOCAL_DIR -Recurse -File -Filter "*.jpg").Count + `
             (Get-ChildItem -Path $LOCAL_DIR -Recurse -File -Filter "*.png").Count + `
             (Get-ChildItem -Path $LOCAL_DIR -Recurse -File -Filter "*.webp").Count

Write-Host "Found $fileCount images to upload" -ForegroundColor Green
Write-Host ""

Write-Host "Starting upload..." -ForegroundColor Cyan

aws s3 sync "$LOCAL_DIR" "s3://$BUCKET/images" `
    --endpoint-url "$ENDPOINT" `
    --acl public-read `
    --storage-class STANDARD `
    --cache-control "public, max-age=31536000, immutable"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Upload complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Verify an image:" -ForegroundColor Yellow
    Write-Host "  curl -I $R2_PUBLIC_DOMAIN/articles/solar/solar-energy-storage-battery-bank.jpg"
} else {
    Write-Host ""
    Write-Host "Upload failed. Check your credentials and endpoint." -ForegroundColor Red
    exit 1
}

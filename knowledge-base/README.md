# Knowledge Base

This directory contains reference materials for AI content generation and team operations.

## Directory Structure

```
knowledge-base/
  products/          # Product catalog and specifications (Markdown)
  specs/             # Technical parameters, dimension sheets
  certifications/    # CE, FCC, RoHS, ISO certificates and compliance docs
```

## Usage

- The AI content generation workflow (`scripts/rag-generator.js`) reads from these directories
- Update files when product specs, pricing, or certifications change
- After updating, run `git push` to make changes available to the automated pipeline

## Guidelines

- Each product should have its own Markdown file in `products/`
- Use consistent naming: `product-category-product-name.md`
- Include: description, specs table, MOQ, lead time, certifications, target markets

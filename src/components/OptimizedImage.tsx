/**
 * OptimizedImage Component
 * Wraps Next.js Image with SEO best practices
 * Updated: 2026-07-28
 *
 * Features:
 * - Automatic WebP/AVIF format conversion (via Next.js Image)
 * - Lazy loading with blur placeholder
 * - Responsive srcset for different screen sizes
 * - Required alt text enforcement (SEO + accessibility)
 * - Priority flag for above-the-fold images
 * - Width/height to prevent layout shift (CLS)
 *
 * SEO Impact:
 * - Reduces image file size by 30-50% (WebP vs JPEG)
 * - Improves LCP (Largest Contentful Paint) with priority loading
 * - Eliminates CLS (Cumulative Layout Shift) with explicit dimensions
 * - Better image search rankings with descriptive alt text
 */

import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  src: string;
  alt: string; // Required — no undefined allowed
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'eager' | 'lazy';
}

// Default blur placeholder (tiny 8x8 gray gradient)
const defaultBlurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKgAB//Z';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes,
  quality = 85, // Balance between quality and file size
  placeholder = 'blur',
  blurDataURL = defaultBlurDataURL,
  loading,
  ...rest
}: OptimizedImageProps) {
  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={responsiveSizes}
      quality={quality}
      placeholder={priority ? 'empty' : placeholder}
      blurDataURL={blurDataURL}
      loading={loading || (priority ? 'eager' : 'lazy')}
      // Generate modern formats automatically (configured in next.config.js)
      // AVIF for browsers that support it (Chrome, Firefox 93+)
      // WebP fallback for Safari and older browsers
      {...rest}
    />
  );
}

/**
 * Helper: Generate blur placeholder from image URL
 * Use this for product images that need a custom blur effect
 *
 * Usage:
 * const blur = await generateBlurData('/images/product.jpg');
 * <OptimizedImage src="/images/product.jpg" blurDataURL={blur} />
 */
export async function generateBlurData(imagePath: string): Promise<string> {
  // In production, use a server-side function to generate a tiny base64 placeholder
  // For now, return the default placeholder
  return defaultBlurDataURL;
}

/**
 * Helper: Validate alt text quality
 * Warns if alt text is too short or too generic
 */
export function validateAltText(alt: string): { valid: boolean; warning?: string } {
  if (alt.length < 10) {
    return { valid: false, warning: 'Alt text too short — describe the image in at least 10 characters' };
  }
  if (alt.length > 125) {
    return { valid: false, warning: 'Alt text too long — keep under 125 characters for screen readers' };
  }
  const genericPhrases = ['image', 'photo', 'picture', 'img', 'product'];
  const lowerAlt = alt.toLowerCase();
  for (const phrase of genericPhrases) {
    if (lowerAlt === phrase || lowerAlt === `${phrase}s`) {
      return { valid: false, warning: `Alt text "${alt}" is too generic — describe what's in the image` };
    }
  }
  return { valid: true };
}

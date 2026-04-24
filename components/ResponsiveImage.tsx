'use client';

import Image from 'next/image';
import { getImageAlt, getImageTitle } from '@/lib/image-library';

interface ResponsiveImageProps {
  imageId: string;
  lang: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
}

export default function ResponsiveImage({
  imageId,
  lang,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  objectFit = 'cover',
}: ResponsiveImageProps) {
  const alt = getImageAlt(imageId, lang);
  const title = getImageTitle(imageId, lang);

  // Get image source from library
  const imageSrc = `https://images.unsplash.com/photo-${imageId.split('-').slice(1).join('-')}?w=${width || 800}&h=${height || 600}&fit=crop`;

  if (fill) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={imageSrc}
          alt={alt}
          title={title}
          fill
          priority={priority}
          style={{ objectFit }}
          className="w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      title={title}
      width={width || 800}
      height={height || 600}
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
    />
  );
}

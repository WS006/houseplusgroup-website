/**
 * Unsplash to local image mapping utility.
 * Replaces external images.unsplash.com URLs with locally stored copies
 * to avoid runtime dependency on Unsplash CDN.
 */

const unsplashToLocalMap: Record<string, string> = {
  'photo-1491933382434-500287f9b54b': '/images/carousel/carousel-solar-energy.jpg',
  'photo-1509391366360-2e959784a276': '/images/carousel/carousel-home-appliances.jpg',
  'photo-1556909114-f6e7ad7d3136': '/images/carousel/carousel-electronics.jpg',
};

/**
 * Checks if a URL points to images.unsplash.com and replaces it
 * with the corresponding local file path if a mapping exists.
 * Returns the original URL if no mapping is found.
 */
export function localizeImageUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') return url || '';
  if (!url.includes('images.unsplash.com')) return url;
  for (const [photoId, localPath] of Object.entries(unsplashToLocalMap)) {
    if (url.includes(photoId)) return localPath;
  }
  return url;
}

/**
 * Processes an array of Storyblok carousel items and replaces
 * any Unsplash image URLs with local file paths.
 */
export function localizeCarouselItems(items: any[]): any[] {
  if (!Array.isArray(items)) return items;
  return items.map((item) => ({
    ...item,
    image: {
      ...item?.image,
      filename: item?.image?.filename ? localizeImageUrl(item.image.filename) : item?.image?.filename,
    },
  }));
}

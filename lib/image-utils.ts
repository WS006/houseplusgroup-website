/**
 * Unsplash to local image mapping utility.
 * Replaces external images.unsplash.com URLs with locally stored copies
 * to avoid runtime dependency on Unsplash CDN.
 */

const unsplashToLocalMap: Record<string, string> = {
  'photo-1491933382434-500287f9b54b': 'https://images.houseplus-ch.com/media/97865882-af5c-41fc-9b64-e8ddcc5d3b1c',
  'photo-1509391366360-2e959784a276': 'https://images.houseplus-ch.com/media/daf64118-fa8e-4bf1-bbf3-05795dc72c3d',
  'photo-1556909114-f6e7ad7d3136': 'https://images.houseplus-ch.com/media/53c1ad46-cc96-43d0-aace-a8926f2e55a3',
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

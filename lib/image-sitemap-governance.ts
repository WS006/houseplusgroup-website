/**
 * Application-side contract for assets eligible for image-sitemap publication.
 * The same role values are written to media-v2 D1 `asset_relations`; a media
 * asset is never included based solely on its filename or R2 presence.
 */
export const IMAGE_SITEMAP_RELATION_ROLES = {
  pageHero: 'page_hero',
  pageInline: 'page_inline',
  pageGallery: 'page_gallery',
  articleHero: 'article_hero',
  articleInline: 'article_inline',
  videoPoster: 'video_poster',
} as const;

export type ImageSitemapRelationRole = typeof IMAGE_SITEMAP_RELATION_ROLES[keyof typeof IMAGE_SITEMAP_RELATION_ROLES];

export interface CuratedCorePageImage {
  pageUrl: string;
  role: ImageSitemapRelationRole;
  loc: string;
  title: string;
  caption: string;
}

/**
 * English canonical pages only. Decorative brand marks are intentionally
 * excluded; every entry below is a descriptive image rendered on its page.
 */
export const CURATED_CORE_PAGE_IMAGES: CuratedCorePageImage[] = [
  { pageUrl: '/en', role: IMAGE_SITEMAP_RELATION_ROLES.pageHero, loc: 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-solar-hero/', title: 'HousePlus solar energy solutions', caption: 'Solar panels, inverters and energy storage solutions for global wholesale buyers.' },
  { pageUrl: '/en', role: IMAGE_SITEMAP_RELATION_ROLES.pageHero, loc: 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-home-appliances-hero/', title: 'HousePlus home appliances', caption: 'Home appliances for retail selection and B2B sourcing discussions.' },
  { pageUrl: '/en', role: IMAGE_SITEMAP_RELATION_ROLES.pageHero, loc: 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-3c-electronics-hero/', title: 'HousePlus 3C electronics', caption: '3C electronics and accessories for international B2B distribution.' },
  { pageUrl: '/en/brand', role: IMAGE_SITEMAP_RELATION_ROLES.pageHero, loc: 'https://images.houseplus-ch.com/media/houseplus-factory-production-line/', title: 'HousePlus home appliance production line', caption: 'HousePlus production environment for home appliance manufacturing.' },
  { pageUrl: '/en/factory', role: IMAGE_SITEMAP_RELATION_ROLES.pageHero, loc: 'https://images.houseplus-ch.com/media/houseplus-articles-service-factory-assembly-workers-b2b-guide/', title: 'HousePlus factory operations', caption: 'HousePlus manufacturing operations in Zhongshan, Guangdong, China.' },
  { pageUrl: '/en/factory', role: IMAGE_SITEMAP_RELATION_ROLES.pageGallery, loc: 'https://images.houseplus-ch.com/media/houseplus-factory-production-line/', title: 'Home appliance production line', caption: 'Precision manufacturing line for home appliances.' },
  { pageUrl: '/en/factory', role: IMAGE_SITEMAP_RELATION_ROLES.pageGallery, loc: 'https://images.houseplus-ch.com/media/houseplus-factory-factory-solar-assembly-line/', title: 'Solar energy assembly line', caption: 'Solar energy equipment assembly line at HousePlus.' },
  { pageUrl: '/en/factory', role: IMAGE_SITEMAP_RELATION_ROLES.pageGallery, loc: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/', title: 'Automated home appliance production equipment', caption: 'Automated home appliance production equipment displayed in the factory gallery.' },
  { pageUrl: '/en/factory', role: IMAGE_SITEMAP_RELATION_ROLES.pageInline, loc: 'https://images.houseplus-ch.com/media/houseplus-factory-factory-appliance-qc-lab/', title: 'HousePlus appliance quality laboratory', caption: 'Home appliance quality assurance laboratory in Zhongshan, Guangdong, China.' },
  { pageUrl: '/en/service', role: IMAGE_SITEMAP_RELATION_ROLES.pageInline, loc: 'https://images.houseplus-ch.com/media/houseplus-site-service-technical-consultation/', title: 'HousePlus technical consultation', caption: 'Technical consultation image for product and sourcing discussions.' },
  { pageUrl: '/en/support', role: IMAGE_SITEMAP_RELATION_ROLES.pageInline, loc: 'https://images.houseplus-ch.com/media/houseplus-site-support-customer-service/', title: 'HousePlus customer support', caption: 'Customer service image for HousePlus support resources.' },
  { pageUrl: '/en/regions', role: IMAGE_SITEMAP_RELATION_ROLES.pageHero, loc: 'https://images.houseplus-ch.com/media/houseplus-site-global-world-map-markets/', title: 'HousePlus global market regions', caption: 'World map visual for HousePlus regional market pages.' },
  { pageUrl: '/en/team', role: IMAGE_SITEMAP_RELATION_ROLES.pageGallery, loc: 'https://images.houseplus-ch.com/media/houseplus-team-team-manufacturing-collaboration/', title: 'HousePlus manufacturing collaboration team', caption: 'Manufacturing operations team collaborating in Zhongshan, Guangdong, China.' },
  { pageUrl: '/en/team', role: IMAGE_SITEMAP_RELATION_ROLES.pageGallery, loc: 'https://images.houseplus-ch.com/media/houseplus-team-team-quality-engineering/', title: 'HousePlus quality engineering team', caption: 'Quality engineers conducting product testing for international compliance.' },
  { pageUrl: '/en/team', role: IMAGE_SITEMAP_RELATION_ROLES.pageGallery, loc: 'https://images.houseplus-ch.com/media/houseplus-team-team-innovation-culture/', title: 'HousePlus innovation and R&D culture', caption: 'Research and development team collaborating on product innovation.' },
];

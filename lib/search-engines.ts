export type SearchPlatformMode = 'url_submission' | 'sitemap_submission';

export interface SearchEngine {
  id: string;
  name: string;
  endpoint: string;
  requiresAuth: boolean;
  available: boolean;
  recommended?: boolean;
  mode: SearchPlatformMode;
  description: string;
}

export const searchEngines: SearchEngine[] = [
  {
    id: 'indexnow',
    name: 'IndexNow Network',
    endpoint: 'https://api.indexnow.org/indexnow',
    requiresAuth: false,
    available: true,
    recommended: true,
    mode: 'url_submission',
    description: 'Recommended single protocol submission to participating IndexNow search engines.',
  },
  {
    id: 'bing',
    name: 'Bing',
    endpoint: 'https://www.bing.com/indexnow',
    requiresAuth: false,
    available: true,
    mode: 'url_submission',
    description: 'Direct Bing IndexNow endpoint. Use only when you specifically need a Bing-only submission.',
  },
  {
    id: 'yandex',
    name: 'Yandex',
    endpoint: 'https://yandex.com/indexnow',
    requiresAuth: false,
    available: true,
    mode: 'url_submission',
    description: 'Direct Yandex IndexNow endpoint. Use only when you specifically need a Yandex-only submission.',
  },
  {
    id: 'google_search_console',
    name: 'Google Search Console',
    endpoint: 'https://www.googleapis.com/webmasters/v3/sites',
    requiresAuth: true,
    available: true,
    mode: 'sitemap_submission',
    description: 'Submits and checks the canonical sitemap for ordinary product and article pages; it does not force individual-URL indexing.',
  },
];

export interface WebhookConfig {
  id: string;
  name: string;
  type: 'email' | 'slack' | 'webhook';
  url?: string;
  email?: string;
  active: boolean;
}

export interface SubmissionResult {
  engineId: string;
  engineName: string;
  success: boolean;
  statusCode?: number;
  message?: string;
  timestamp: Date;
}

export interface SubmitOptions {
  urls: string[];
  engines?: string[];
  notifyOnSuccess?: boolean;
  notifyOnFailure?: boolean;
}

export interface SubmitResult {
  success: boolean;
  totalUrls: number;
  results: SubmissionResult[];
  timestamp: Date;
}

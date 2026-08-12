export interface SearchEngine {
  id: string;
  name: string;
  endpoint: string;
  requiresAuth: boolean;
  available: boolean;
  recommended?: boolean;
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
    description: 'Recommended single submission endpoint for participating IndexNow search engines.',
  },
  {
    id: 'bing',
    name: 'Bing direct endpoint',
    endpoint: 'https://www.bing.com/indexnow',
    requiresAuth: false,
    available: false,
    description: 'Not needed when IndexNow Network is selected; kept only as a documented fallback.',
  },
  {
    id: 'yandex',
    name: 'Yandex direct endpoint',
    endpoint: 'https://yandex.com/indexnow',
    requiresAuth: false,
    available: false,
    description: 'Not needed when IndexNow Network is selected; kept only as a documented fallback.',
  },
  {
    id: 'google',
    name: 'Google Indexing API',
    endpoint: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    requiresAuth: true,
    available: false,
    description: 'Disabled for ordinary pages. Google limits this API to supported JobPosting and livestream event pages.',
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

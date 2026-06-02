export interface SearchEngine {
  id: string;
  name: string;
  endpoint: string;
  requiresAuth: boolean;
  description: string;
}

export const searchEngines: SearchEngine[] = [
  {
    id: 'bing',
    name: 'Bing',
    endpoint: 'https://www.bing.com/indexnow',
    requiresAuth: false,
    description: 'Microsoft Bing Search Engine',
  },
  {
    id: 'indexnow',
    name: 'IndexNow',
    endpoint: 'https://api.indexnow.org/indexnow',
    requiresAuth: false,
    description: 'IndexNow Protocol (Bing, Yandex, etc.)',
  },
  {
    id: 'yandex',
    name: 'Yandex',
    endpoint: 'https://yandex.com/indexnow',
    requiresAuth: false,
    description: 'Yandex Search Engine',
  },
  {
    id: 'google',
    name: 'Google',
    endpoint: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    requiresAuth: true,
    description: 'Google Search Console',
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

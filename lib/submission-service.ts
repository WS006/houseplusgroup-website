import jwt from 'jsonwebtoken';
import { searchEngines, SubmissionResult, SubmitResult, WebhookConfig } from './search-engines';
import { baseUrl } from './urls';
import { addSubmissionHistory, isRecentlySubmitted } from './submission-history';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '084fadfd7e4a435b942858f905846430';
const GOOGLE_SITE_URL = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || baseUrl;
const CANONICAL_SITEMAP_URL = `${baseUrl}/sitemap.xml`;

type TriggeredBy = 'manual' | 'auto' | 'scheduled';

interface GoogleServiceAccount {
  client_email: string;
  private_key: string;
  project_id?: string;
  [key: string]: unknown;
}

interface GoogleSitemapStatus {
  configured: boolean;
  available: boolean;
  serviceAccountEmail?: string;
  googleCloudProjectId?: string;
  message: string;
  sitemap?: {
    path?: string;
    lastSubmitted?: string;
    lastDownloaded?: string;
    isPending?: boolean;
    warnings?: number;
    errors?: number;
    type?: string;
  };
}

function engineById(id: string) {
  return searchEngines.find((engine) => engine.id === id);
}

function formatResponseMessage(response: Response, body: string) {
  const detail = body.replace(/\s+/g, ' ').slice(0, 300);
  return detail || response.statusText || `HTTP ${response.status}`;
}

export async function submitToSearchEngines(
  urls: string[],
  engineIds?: string[],
  triggeredBy: TriggeredBy = 'manual',
  force = false
): Promise<SubmitResult> {
  const requestedEngineIds = engineIds?.length ? Array.from(new Set(engineIds)) : ['indexnow'];
  const enginesToSubmit = requestedEngineIds.map(engineById).filter((engine): engine is NonNullable<typeof engine> => Boolean(engine?.available));

  if (!enginesToSubmit.length) {
    return {
      success: false,
      totalUrls: 0,
      results: [{ engineId: 'indexnow', engineName: 'IndexNow Network', success: false, message: 'No supported search platform was selected', timestamp: new Date() }],
      timestamp: new Date(),
    };
  }

  const dedup = force ? { blocked: false, recentlySubmitted: [] as string[] } : await isRecentlySubmitted(urls);
  const urlsToSubmit = dedup.blocked ? urls.filter((url) => !dedup.recentlySubmitted.includes(url)) : urls;

  if (!urlsToSubmit.length && !requestedEngineIds.includes('google_search_console')) {
    return {
      success: true,
      totalUrls: 0,
      results: [{ engineId: 'dedupe', engineName: 'Submission protection', success: true, message: 'All selected URLs were submitted within the last 60 minutes; use force retry only after a material correction.', timestamp: new Date() }],
      timestamp: new Date(),
    };
  }

  const results = await Promise.all(enginesToSubmit.map((engine) => submitToEngine(urlsToSubmit, engine.id)));

  try {
    await addSubmissionHistory(
      urlsToSubmit.length ? urlsToSubmit : urls,
      enginesToSubmit.map((engine) => engine.id),
      results.map((result) => ({
        engine: result.engineId,
        engineName: result.engineName,
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
      })),
      triggeredBy
    );
  } catch (error) {
    console.error('Failed to save persistent submission history:', error);
  }

  return {
    success: results.every((result) => result.success),
    totalUrls: urlsToSubmit.length,
    results,
    timestamp: new Date(),
  };
}

async function submitToEngine(urls: string[], engineId: string): Promise<SubmissionResult> {
  const engine = engineById(engineId)!;
  try {
    const response = engineId === 'google_search_console'
      ? await submitGoogleSitemap()
      : await submitToIndexNow(urls, engine.endpoint);
    return { engineId, engineName: engine.name, ...response, timestamp: new Date() };
  } catch (error) {
    return { engineId, engineName: engine.name, success: false, message: (error as Error).message, timestamp: new Date() };
  }
}

async function submitToIndexNow(urls: string[], endpoint: string): Promise<{ success: boolean; statusCode?: number; message?: string }> {
  if (!urls.length) return { success: true, message: 'No new URLs required submission after duplicate protection.' };
  if (!INDEXNOW_KEY || !/^[A-Za-z0-9-]{8,128}$/.test(INDEXNOW_KEY)) return { success: false, message: 'IndexNow key is not configured or invalid' };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: 'www.houseplus-ch.com', key: INDEXNOW_KEY, keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`, urlList: urls }),
  });
  return { success: response.ok, statusCode: response.status, message: formatResponseMessage(response, await response.text()) };
}

function getGoogleServiceAccount(): GoogleServiceAccount | null {
  try {
    return process.env.GOOGLE_SERVICE_ACCOUNT ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT) as GoogleServiceAccount : null;
  } catch {
    return null;
  }
}

async function getGoogleAccessToken(serviceAccount: GoogleServiceAccount, scope = 'https://www.googleapis.com/auth/webmasters'): Promise<string | null> {
  try {
    const assertion = jwt.sign({
      iss: serviceAccount.client_email,
      scope,
      aud: 'https://oauth2.googleapis.com/token',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    }, serviceAccount.private_key, { algorithm: 'RS256' });
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
    });
    const data = await response.json() as { access_token?: string };
    return data.access_token || null;
  } catch (error) {
    console.error('Failed to create Google Search Console access token:', error);
    return null;
  }
}

export async function enableGoogleSearchConsoleApi(): Promise<{ configured: boolean; enabled: boolean; message: string; statusCode?: number }> {
  const serviceAccount = getGoogleServiceAccount();
  if (!serviceAccount) return { configured: false, enabled: false, message: 'Google Search Console service account is not configured' };
  const accessToken = await getGoogleAccessToken(serviceAccount, 'https://www.googleapis.com/auth/cloud-platform');
  if (!accessToken) return { configured: true, enabled: false, message: 'Google Cloud access token could not be created' };

  const response = await fetch('https://serviceusage.googleapis.com/v1/projects/389088181986/services/searchconsole.googleapis.com:enable', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: '{}',
  });
  const body = await response.text();
  return {
    configured: true,
    enabled: response.ok,
    statusCode: response.status,
    message: response.ok ? 'Google Search Console API enable request accepted; Google may take a short time to activate the service.' : formatResponseMessage(response, body),
  };
}

function googleSitemapEndpoint() {
  return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GOOGLE_SITE_URL)}/sitemaps/${encodeURIComponent(CANONICAL_SITEMAP_URL)}`;
}

async function submitGoogleSitemap(): Promise<{ success: boolean; statusCode?: number; message?: string }> {
  const serviceAccount = getGoogleServiceAccount();
  if (!serviceAccount) return { success: false, message: 'Google Search Console service account is not configured' };
  const accessToken = await getGoogleAccessToken(serviceAccount);
  if (!accessToken) return { success: false, message: 'Google Search Console access token could not be created' };

  const response = await fetch(googleSitemapEndpoint(), { method: 'PUT', headers: { Authorization: `Bearer ${accessToken}` } });
  return {
    success: response.ok,
    statusCode: response.status,
    message: response.ok ? `Canonical sitemap submitted to Google Search Console: ${CANONICAL_SITEMAP_URL}` : formatResponseMessage(response, await response.text()),
  };
}

export async function getGoogleSearchConsoleStatus(): Promise<GoogleSitemapStatus> {
  const serviceAccount = getGoogleServiceAccount();
  if (!serviceAccount) return { configured: false, available: false, message: 'Google Search Console service account is not configured' };
  const identity = { serviceAccountEmail: serviceAccount.client_email, googleCloudProjectId: serviceAccount.project_id };
  const accessToken = await getGoogleAccessToken(serviceAccount);
  if (!accessToken) return { configured: true, available: false, ...identity, message: 'Google Search Console access token could not be created' };

  const response = await fetch(googleSitemapEndpoint(), { headers: { Authorization: `Bearer ${accessToken}` }, cache: 'no-store' });
  if (!response.ok) return { configured: true, available: false, ...identity, message: formatResponseMessage(response, await response.text()) };
  const sitemap = await response.json() as GoogleSitemapStatus['sitemap'];
  return { configured: true, available: true, ...identity, message: 'Google Search Console sitemap connection is available', sitemap };
}

export async function sendWebhookNotification(result: SubmitResult, webhooks: WebhookConfig[]): Promise<void> {
  const activeWebhooks = webhooks.filter((webhook) => webhook.active);
  await Promise.allSettled(activeWebhooks.map(async (webhook) => {
    try {
      if (webhook.type === 'email') await sendEmailNotification(result, webhook.email || '');
      if (webhook.type === 'slack') await sendSlackNotification(result, webhook.url || '');
      if (webhook.type === 'webhook') await sendGenericWebhook(result, webhook.url || '');
    } catch (error) {
      console.error(`Failed to send notification to ${webhook.name}:`, error);
    }
  }));
}

async function sendEmailNotification(result: SubmitResult, email: string): Promise<void> {
  console.log(`Sending IndexNow submission report to ${email}: ${result.success ? 'successful' : 'partial or failed'}`);
}

async function sendSlackNotification(result: SubmitResult, webhookUrl: string): Promise<void> {
  await fetch(webhookUrl, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: `HousePlus search-platform submission: ${result.success ? 'successful' : 'partial or failed'}; URLs: ${result.totalUrls}; ${result.results.map((item) => `${item.engineName}: ${item.message}`).join(' | ')}` }),
  });
}

async function sendGenericWebhook(result: SubmitResult, webhookUrl: string): Promise<void> {
  const { timestamp, ...payload } = result;
  await fetch(webhookUrl, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'search_platform_submission', timestamp: timestamp.toISOString(), ...payload }),
  });
}

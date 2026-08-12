import { searchEngines, SubmissionResult, SubmitResult, WebhookConfig } from './search-engines';
import { baseUrl } from './urls';
import jwt from 'jsonwebtoken';
import { addSubmissionHistory, isRecentlySubmitted } from './submission-history';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '084fadfd7e4a435b942858f905846430';

// Google Service Account shape
interface GoogleServiceAccount {
  client_email: string;
  private_key: string;
  [key: string]: unknown;
}

export async function submitToSearchEngines(
  urls: string[],
  engineIds?: string[],
  triggeredBy: 'manual' | 'auto' | 'scheduled' = 'manual'
): Promise<SubmitResult> {
  // Check for recently submitted URLs
  const dedup = await isRecentlySubmitted(urls);
  if (dedup.blocked) {
    console.log('Skipping recently submitted URLs:', dedup.recentlySubmitted);
  }

  const urlsToSubmit = dedup.blocked
    ? urls.filter(u => !dedup.recentlySubmitted.includes(u))
    : urls;

  if (urlsToSubmit.length === 0) {
    return {
      success: true,
      totalUrls: 0,
      results: [],
      timestamp: new Date(),
    };
  }

  const requestedEngineIds = engineIds?.length ? engineIds : ['indexnow'];
  const enginesToSubmit = searchEngines.filter((engine) => engine.available && requestedEngineIds.includes(engine.id));
  if (!enginesToSubmit.length) {
    return {
      success: false,
      totalUrls: urlsToSubmit.length,
      results: [{
        engineId: 'indexnow',
        engineName: 'IndexNow Network',
        success: false,
        message: 'No supported indexing endpoint was selected',
        timestamp: new Date(),
      }],
      timestamp: new Date(),
    };
  }

  // Submit to all engines in parallel
  const results = await Promise.all(
    enginesToSubmit.map(engine => submitToEngine(urlsToSubmit, engine))
  );

  // Record submission history
  try {
    await addSubmissionHistory(
      urlsToSubmit,
      enginesToSubmit.map(e => e.id),
      results.map(r => ({
        engine: r.engineName,
        success: r.success,
        statusCode: r.statusCode,
        message: r.message,
      })),
      triggeredBy
    );
  } catch (error) {
    console.error('Failed to save submission history:', error);
  }

  return {
    success: results.every(r => r.success),
    totalUrls: urlsToSubmit.length,
    results,
    timestamp: new Date(),
  };
}

async function submitToEngine(urls: string[], engine: typeof searchEngines[0]): Promise<SubmissionResult> {
  try {
    let response;

    if (engine.id === 'google') {
      response = await submitToGoogle(urls);
    } else {
      response = await submitToIndexNow(urls, engine.endpoint);
    }

    return {
      engineId: engine.id,
      engineName: engine.name,
      success: response.success,
      statusCode: response.statusCode,
      message: response.message,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      engineId: engine.id,
      engineName: engine.name,
      success: false,
      message: (error as Error).message,
      timestamp: new Date(),
    };
  }
}

async function submitToIndexNow(
  urls: string[],
  endpoint: string
): Promise<{ success: boolean; statusCode?: number; message?: string }> {
  if (!INDEXNOW_KEY || !/^[A-Za-z0-9-]{8,128}$/.test(INDEXNOW_KEY)) {
    return { success: false, message: 'IndexNow key is not configured or invalid' };
  }

  const payload = {
    host: 'www.houseplus-ch.com',
    key: INDEXNOW_KEY,
    keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return {
    success: response.ok,
    statusCode: response.status,
    message: response.statusText,
  };
}

async function submitToGoogle(urls: string[]): Promise<{ success: boolean; statusCode?: number; message?: string }> {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT;

  if (!serviceAccountJson) {
    return {
      success: false,
      message: 'Google service account not configured',
    };
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson) as GoogleServiceAccount;
    const accessToken = await getGoogleAccessToken(serviceAccount);

    if (!accessToken) {
      return {
        success: false,
        message: 'Failed to get Google access token',
      };
    }

    // Submit all URLs in parallel
    const submissions = await Promise.allSettled(
      urls.map(async (url) => {
        const response = await fetch(
          'https://indexing.googleapis.com/v3/urlNotifications:publish',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              url,
              type: 'URL_UPDATED',
            }),
          }
        );
        return { url, ok: response.ok };
      })
    );

    const successCount = submissions.filter(
      s => s.status === 'fulfilled' && s.value.ok
    ).length;

    return {
      success: successCount === urls.length,
      message: successCount === urls.length
        ? 'All URLs submitted successfully'
        : `${successCount}/${urls.length} URLs submitted`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Invalid Google service account: ${(error as Error).message}`,
    };
  }
}

async function getGoogleAccessToken(serviceAccount: GoogleServiceAccount): Promise<string | null> {
  try {
    const payload = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, serviceAccount.private_key, {
      algorithm: 'RS256',
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
    });

    const data = await response.json() as { access_token?: string };
    return data.access_token || null;
  } catch (error) {
    console.error('Failed to get Google access token:', error);
    return null;
  }
}

export async function sendWebhookNotification(
  result: SubmitResult,
  webhooks: WebhookConfig[]
): Promise<void> {
  const activeWebhooks = webhooks.filter(w => w.active);

  await Promise.allSettled(
    activeWebhooks.map(async (webhook) => {
      try {
        if (webhook.type === 'email') {
          await sendEmailNotification(result, webhook.email || '');
        } else if (webhook.type === 'slack') {
          await sendSlackNotification(result, webhook.url || '');
        } else if (webhook.type === 'webhook') {
          await sendGenericWebhook(result, webhook.url || '');
        }
      } catch (error) {
        console.error(`Failed to send notification to ${webhook.name}:`, error);
      }
    })
  );
}

async function sendEmailNotification(result: SubmitResult, email: string): Promise<void> {
  const successCount = result.results.filter(r => r.success).length;
  const totalCount = result.results.length;

  const subject = result.success
    ? 'IndexNow Submission Successful'
    : 'IndexNow Submission Partially Failed';

  const body = `
    IndexNow Submission Report
    ==========================

    Time: ${result.timestamp.toISOString()}
    URLs Submitted: ${result.totalUrls}
    Status: ${result.success ? 'All successful' : `${successCount}/${totalCount} successful`}

    Results:
    ${result.results.map(r => `  ${r.engineName}: ${r.success ? 'Success' : 'Failed'}`).join('\n')}
  `.trim();

  console.log(`Sending email to ${email}: ${subject}`);
}

async function sendSlackNotification(result: SubmitResult, webhookUrl: string): Promise<void> {
  const successCount = result.results.filter(r => r.success).length;
  const totalCount = result.results.length;

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: result.success ? 'IndexNow Submission Successful' : 'IndexNow Submission Failed',
      },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Time:*\n${result.timestamp.toLocaleString()}` },
        { type: 'mrkdwn', text: `*URLs Submitted:*\n${result.totalUrls}` },
        { type: 'mrkdwn', text: `*Success Rate:*\n${successCount}/${totalCount}` },
      ],
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Results by Engine:*\n' + result.results.map(r =>
          `  ${r.engineName}: ${r.success ? 'Success' : 'Failed'}`
        ).join('\n'),
      },
    },
  ];

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocks }),
  });
}

async function sendGenericWebhook(result: SubmitResult, webhookUrl: string): Promise<void> {
  const { timestamp, ...rest } = result;
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'indexnow_submission',
      timestamp: timestamp.toISOString(),
      ...rest,
    }),
  });
}

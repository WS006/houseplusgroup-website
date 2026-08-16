'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

const AI_REFERRER_HOSTS = [
  'chatgpt.com',
  'chat.openai.com',
  'perplexity.ai',
  'copilot.microsoft.com',
  'claude.ai',
  'gemini.google.com',
];

function getAiReferrerHost(referrer: string) {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return AI_REFERRER_HOSTS.find((candidate) => host === candidate || host.endsWith(`.${candidate}`)) || null;
  } catch {
    return null;
  }
}

/** Records only the AI referrer host and landing path; no visitor identifiers or query content are collected. */
export default function AiReferralTracker() {
  useEffect(() => {
    const source = getAiReferrerHost(document.referrer);
    if (!source) return;

    track('ai_referral_landing', {
      source,
      path: window.location.pathname,
    });
  }, []);

  return null;
}

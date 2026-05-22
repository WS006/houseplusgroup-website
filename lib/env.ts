import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Storyblok
  NEXT_PUBLIC_STORYBLOK_TOKEN: z.string().min(1, 'Storyblok token is required'),
  
  // Resend (optional)
  RESEND_API_KEY: z.string().optional(),
  
  // Site configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://www.houseplus-ch.com'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('HousePlus'),
  
  // Analytics
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
});

// Parse and validate environment variables
const env = envSchema.safeParse({
  NEXT_PUBLIC_STORYBLOK_TOKEN: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
});

// If validation fails, throw an error
if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

// Export the validated environment variables
export default env.data;

// Helper to check if we're in production
export const isProduction = process.env.NODE_ENV === 'production';

// Helper to check if we're in development
export const isDevelopment = process.env.NODE_ENV === 'development';

// Client-side configuration - only public environment variables
import { env } from "../env.js";

export const clientConfig = {
  betterAuthUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL ?? env.BETTER_AUTH_URL,
  imagekitUrlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? env.IMAGEKIT_URL_ENDPOINT,
  imagekitPublicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? env.IMAGEKIT_PUBLIC_KEY,
} as const;

// Validation for client-side environment variables
if (typeof window !== 'undefined') {
  if (!clientConfig.betterAuthUrl) {
    console.error('NEXT_PUBLIC_BETTER_AUTH_URL is required on the client');
  }
  if (!clientConfig.imagekitUrlEndpoint) {
    console.error('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is required on the client');
  }
  if (!clientConfig.imagekitPublicKey) {
    console.error('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is required on the client');
  }
}
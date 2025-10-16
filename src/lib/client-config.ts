// Client-side configuration - only public environment variables
export const clientConfig = {
  betterAuthUrl: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  imagekitUrlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  imagekitPublicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
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
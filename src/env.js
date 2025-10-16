import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Helper: normalize env values by trimming whitespace and removing surrounding single/double quotes
/**
 * Normalize an environment value (trim and strip surrounding quotes).
 * @param {unknown} v
 * @returns {string|undefined}
 */
const normalize = (v) => {
  if (v === undefined || v === null) return undefined;
  let s = String(v).trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s === '' ? undefined : s;
};

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.preprocess((v) => {
      const s = normalize(v);
      if (!s) return s;
      if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(s)) {
        return `https://${s}`;
      }
      return s;
    }, z.string().url()),
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_WEBHOOK_SECRET: z.string(),
    IMAGEKIT_PRIVATE_KEY: z.string(),
    IMAGEKIT_URL_ENDPOINT: z.string().url(),
    IMAGEKIT_PUBLIC_KEY: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  client: {
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string(),
  },

  runtimeEnv: {
    // Server variables
    DATABASE_URL: normalize(process.env.DATABASE_URL),
    NODE_ENV: normalize(process.env.NODE_ENV),
    BETTER_AUTH_SECRET: normalize(process.env.BETTER_AUTH_SECRET),
    BETTER_AUTH_URL: normalize(process.env.BETTER_AUTH_URL),
    POLAR_ACCESS_TOKEN: normalize(process.env.POLAR_ACCESS_TOKEN),
    POLAR_WEBHOOK_SECRET: normalize(process.env.POLAR_WEBHOOK_SECRET),
    IMAGEKIT_PRIVATE_KEY: normalize(process.env.IMAGEKIT_PRIVATE_KEY),
    IMAGEKIT_URL_ENDPOINT: normalize(process.env.IMAGEKIT_URL_ENDPOINT),
    IMAGEKIT_PUBLIC_KEY: normalize(process.env.IMAGEKIT_PUBLIC_KEY),

    // Client variables
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: normalize(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT),
    NEXT_PUBLIC_BETTER_AUTH_URL: normalize(process.env.NEXT_PUBLIC_BETTER_AUTH_URL),
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: normalize(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),
  },
  
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
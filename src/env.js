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

let _env;
try {
  _env = createEnv({
    server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
    // BETTER_AUTH_URL may be provided as a server-only value or as NEXT_PUBLIC_BETTER_AUTH_URL.
    // Make it optional here so deployments that only provide the public variant don't fail validation.
    BETTER_AUTH_URL: z.preprocess((v) => {
      const s = normalize(v);
      if (!s) return s;
      if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(s)) {
        return `https://${s}`;
      }
      return s;
    }, z.string().url().optional()),
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_WEBHOOK_SECRET: z.string(),
  IMAGEKIT_PRIVATE_KEY: z.string().optional(),
  // ImageKit endpoint/public key may be provided either server-side or as NEXT_PUBLIC_ variants.
  // Make optional so builds don't fail if only public keys are provided.
  IMAGEKIT_URL_ENDPOINT: z.string().url().optional(),
  IMAGEKIT_PUBLIC_KEY: z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    },

    client: {
  // Client/public variables are optional here; server-side code will fallback where possible.
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string().url().optional(),
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string().optional(),
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
  // Accept either server or NEXT_PUBLIC variants at build time.
  IMAGEKIT_URL_ENDPOINT: normalize(process.env.IMAGEKIT_URL_ENDPOINT) || normalize(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT),
  IMAGEKIT_PUBLIC_KEY: normalize(process.env.IMAGEKIT_PUBLIC_KEY) || normalize(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),

    // Client variables
  // Mirror fallbacks for client-side variables too so one or the other works.
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: normalize(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) || normalize(process.env.IMAGEKIT_URL_ENDPOINT),
  NEXT_PUBLIC_BETTER_AUTH_URL: normalize(process.env.NEXT_PUBLIC_BETTER_AUTH_URL) || normalize(process.env.BETTER_AUTH_URL),
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: normalize(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY) || normalize(process.env.IMAGEKIT_PUBLIC_KEY),
  },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
  });
} catch (err) {
  const required = [
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "POLAR_ACCESS_TOKEN",
    "POLAR_WEBHOOK_SECRET",
  ];
  console.error("\nEnvironment validation failed. Missing or invalid environment variables:\n");
  required.forEach((r) => console.error(` - ${r}`));
  console.error("\nSee README_ENV.md for the full list and examples.\n");
  throw err;
}

export const env = _env;
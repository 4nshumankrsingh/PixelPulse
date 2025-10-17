// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";

// Create the auth client with polar plugin directly
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3055",
  plugins: [polarClient()],
});

// Extend the type to include polar methods
export type AuthClient = typeof authClient & {
  polar: {
    checkout: (options: {
      body: {
        products: string[];
      };
    }) => Promise<{ url: string; redirect: boolean }>;
  };
};
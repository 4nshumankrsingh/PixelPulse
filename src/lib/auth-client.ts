import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";

const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [polarClient()],
});
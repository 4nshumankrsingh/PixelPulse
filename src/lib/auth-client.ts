import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";
import { env } from "../env.js";

const baseURL = env.NEXT_PUBLIC_BETTER_AUTH_URL || env.BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [polarClient()],
});
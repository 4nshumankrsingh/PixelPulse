/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";

/**
 * Return the list of products from Polar. This uses the Polar SDK where available
 * but casts to `any` for SDK method names to avoid brittle typing.
 */
export async function getPolarProducts(): Promise<unknown[]> {
  if (!env.POLAR_ACCESS_TOKEN) throw new Error("Missing POLAR_ACCESS_TOKEN");

  const client = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: "sandbox",
  }) as unknown;

  try {
    // SDKs may expose different methods; call and normalize responses safely.
    /*
     * Interacting with third-party SDKs may require a small, localized use of `any`.
     * We cast to `any` only inside this helper and perform runtime checks on responses
     * before returning them to the rest of the application.
     */
    const anyClient = client as any;

    if (anyClient.products && typeof anyClient.products.list === "function") {
      const resp = await anyClient.products.list();
      const out: unknown[] = [];
      if (resp && Array.isArray(resp.data)) {
        for (const item of resp.data) out.push(item);
        return out;
      }
      if (Array.isArray(resp)) {
        for (const item of resp) out.push(item);
        return out;
      }
      return out;
    }
    if (anyClient.products && typeof anyClient.products.getAll === "function") {
      const resp = await anyClient.products.getAll();
      const out: unknown[] = [];
      if (resp && Array.isArray(resp.data)) {
        for (const item of resp.data) out.push(item);
        return out;
      }
      if (Array.isArray(resp)) {
        for (const item of resp) out.push(item);
        return out;
      }
      return out;
    }

    return [];
  } catch (err) {
    throw err;
  }
}

export async function testPolarConnection(): Promise<{ connected: boolean; productsCount?: number; products?: unknown[]; error?: string }> {
  try {
    const products = await getPolarProducts();
    return { connected: true, productsCount: products.length, products };
  } catch (err) {
    return { connected: false, error: err instanceof Error ? err.message : String(err) };
  }
}
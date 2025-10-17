// src/app/api/checkout/route.ts - Simplified version
import { auth } from "~/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type PolarAuth = {
  polar?: {
    checkout: (opts: { body: { products: string[] } }) => Promise<{ url?: string }>;
  };
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authWithPolar = auth as unknown as PolarAuth;

    if (!authWithPolar.polar) {
      throw new Error("Polar plugin not initialized");
    }

    const checkoutResult = await authWithPolar.polar.checkout({
      body: {
        products: [
          "08350901-0559-47e6-a007-8b8c6e291198",
          "9666ecc6-e2d0-481c-8c4e-317465269250",
          "f8365395-9620-4667-8d47-1394f91da680",
        ],
      },
    });

    if (!checkoutResult?.url) {
      return NextResponse.json({ error: "Checkout URL not generated" }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutResult.url });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Checkout API error:", msg);
    return NextResponse.json(
      { error: msg || "Internal server error" },
      { status: 500 },
    );
  }
}
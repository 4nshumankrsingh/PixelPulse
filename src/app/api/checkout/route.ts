// src/app/api/checkout/route.ts
import { auth } from "~/lib/auth";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("🏁 Checkout API called");

    // Get session to verify user is authenticated
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.email) {
      console.error("❌ No authenticated user found");
      return NextResponse.json({ 
        error: "Please sign in to purchase credits" 
      }, { status: 401 });
    }

    console.log("✅ User authenticated:", session.user.email);

    // Validate environment variables
    if (!env.POLAR_ACCESS_TOKEN?.startsWith('polar_')) {
      console.error("❌ Invalid Polar access token");
      return NextResponse.json({ 
        error: "Payment configuration error" 
      }, { status: 500 });
    }

    // Initialize Polar client
    const polarClient = new Polar({
      accessToken: env.POLAR_ACCESS_TOKEN,
      server: "sandbox",
    });

    console.log("✅ Polar client initialized");

    // Create checkout session
    const checkoutData = {
      lineItems: [
        {
          price: "08350901-0559-47e6-a007-8b8c6e291198", // Small Pack
          quantity: 1,
        },
        {
          price: "9666ecc6-e2d0-481c-8c4e-317465269250", // Medium Pack  
          quantity: 1,
        },
        {
          price: "f8365395-9620-4667-8d47-1394f91da680", // Large Pack
          quantity: 1,
        },
      ],
      customerEmail: session.user.email,
      successUrl: `${env.BETTER_AUTH_URL}/dashboard?success=true`,
      cancelUrl: `${env.BETTER_AUTH_URL}/dashboard?canceled=true`,
      metadata: {
        source: "pixelpulse-app",
        userId: session.user.id,
      },
    };

    console.log("🛒 Creating checkout with data:", checkoutData);

  // Call Polar SDK; narrow as unknown and safely extract the URL.
  // Allow a small, localized use of `any` and unsafe-member access for SDK interop.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const rawCheckout = await (polarClient as any).checkouts.create(checkoutData) as unknown;

    if (typeof rawCheckout !== 'object' || rawCheckout === null) {
      console.error('❌ Unexpected checkout response:', rawCheckout);
      return NextResponse.json({ error: 'Failed to generate payment link' }, { status: 500 });
    }

  // Access the `url` field via a Record cast and perform a runtime check.
  const maybeUrl = (rawCheckout as Record<string, unknown>).url;
  const url = typeof maybeUrl === 'string' ? maybeUrl : undefined;

    if (!url) {
      console.error('❌ No checkout URL in response:', rawCheckout);
      return NextResponse.json({ error: 'Failed to generate payment link' }, { status: 500 });
    }

    console.log('🔗 Checkout URL:', url);
    return NextResponse.json({ success: true, url });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("💥 Checkout API error:", message);

    const isAuthErr = message.includes("401");
    const errorMessage = isAuthErr
      ? "Invalid payment configuration. Please contact support."
      : "Payment system temporarily unavailable";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
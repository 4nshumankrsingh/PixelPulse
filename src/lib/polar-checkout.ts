// src/app/api/debug-checkout/route.ts
import { auth } from "~/lib/auth";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Debug checkout called");

    // Get session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    console.log("✅ User:", session.user.email);

    // Test Polar client initialization
    const polarClient = new Polar({
      accessToken: env.POLAR_ACCESS_TOKEN,
      server: "sandbox",
    });

    console.log("✅ Polar client created");

    // Try to create a simple checkout
    const checkoutData = {
      lineItems: [
        {
          price: "08350901-0559-47e6-a007-8b8c6e291198",
          quantity: 1,
        },
      ],
      customerEmail: session.user.email,
      successUrl: `${env.BETTER_AUTH_URL}/dashboard?success=true`,
      cancelUrl: `${env.BETTER_AUTH_URL}/dashboard?canceled=true`,
    };

    console.log("🛒 Checkout data:", JSON.stringify(checkoutData, null, 2));

    try {
      const checkoutSession = await (polarClient.checkouts.create as any)(checkoutData);
      console.log("✅ Checkout created:", checkoutSession);
      return NextResponse.json({ success: true, checkout: checkoutSession });
    } catch (polarError: any) {
      console.error("❌ Polar API error:", polarError);
      return NextResponse.json({ 
        error: "Polar API failed",
        message: polarError.message,
        details: polarError.response?.data || polarError
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error("💥 Debug error:", error);
    return NextResponse.json({ 
      error: "Debug failed",
      message: error.message 
    }, { status: 500 });
  }
}
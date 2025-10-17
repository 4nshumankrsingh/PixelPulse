// src/app/api/checkout/route.ts
import { auth } from "~/lib/auth";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { NextRequest, NextResponse } from "next/server";

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
    if (!env.POLAR_ACCESS_TOKEN || !env.POLAR_ACCESS_TOKEN.startsWith('polar_')) {
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

    // Use type assertion to bypass TypeScript issues
    const checkoutSession = await (polarClient.checkouts.create as any)(checkoutData);

    console.log("✅ Checkout session created:", checkoutSession.id);

    if (!checkoutSession?.url) {
      console.error("❌ No checkout URL in response:", checkoutSession);
      return NextResponse.json({ 
        error: "Failed to generate payment link" 
      }, { status: 500 });
    }

    console.log("🔗 Checkout URL:", checkoutSession.url);
    
    return NextResponse.json({ 
      success: true,
      url: checkoutSession.url 
    });

  } catch (error: any) {
    console.error("💥 Checkout API error:", error);
    
    // Log detailed error information
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status,
    });

    // Provide specific error messages
    let errorMessage = "Payment system temporarily unavailable";
    
    if (error.message?.includes("401") || error.response?.status === 401) {
      errorMessage = "Invalid payment configuration. Please contact support.";
    } else if (error.message?.includes("network") || error.message?.includes("fetch")) {
      errorMessage = "Network error. Please check your connection.";
    } else if (error.response?.data) {
      errorMessage = `Payment error: ${JSON.stringify(error.response.data)}`;
    }

    return NextResponse.json({ 
      error: errorMessage 
    }, { status: 500 });
  }
}
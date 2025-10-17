// src/app/api/health/route.ts
import { auth } from "~/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const authWithPolar = auth as unknown as { polar?: { checkout?: unknown } };

  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    polar: {
      initialized: true,
      hasCheckout: !!authWithPolar.polar?.checkout,
      environment: process.env.NODE_ENV,
    },
    auth: {
      baseURL: process.env.BETTER_AUTH_URL,
      hasSecret: !!process.env.BETTER_AUTH_SECRET,
    },
  };

  console.log("🏥 Health check:", health);
  return NextResponse.json(health);
}
// src/app/api/test-polar/route.ts
import { testPolarConnection } from "~/lib/polar-checkout";
import { NextResponse } from "next/server";
import { env } from "~/env";

export async function GET() {
  try {
    const connectionTest = await testPolarConnection();
    
    if (!connectionTest.connected) {
      throw new Error(connectionTest.error);
    }
    
    return NextResponse.json({
      status: "success",
      message: "Polar API is working correctly",
      productsCount: connectionTest.productsCount,
      products: connectionTest.products,
      environment: process.env.NODE_ENV,
      accessTokenPresent: !!env.POLAR_ACCESS_TOKEN,
      accessTokenValid: env.POLAR_ACCESS_TOKEN?.startsWith('polar_'),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("❌ Polar test failed:", msg);

    return NextResponse.json({
      status: "error",
      message: msg,
      accessToken: env.POLAR_ACCESS_TOKEN ? "Present" : "Missing",
      accessTokenStartsWithPolar: env.POLAR_ACCESS_TOKEN?.startsWith('polar_'),
      accessTokenPreview: env.POLAR_ACCESS_TOKEN ? `${env.POLAR_ACCESS_TOKEN.substring(0, 20)}...` : undefined,
    }, { status: 500 });
  }
}
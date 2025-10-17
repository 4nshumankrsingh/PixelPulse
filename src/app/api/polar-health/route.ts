// src/app/api/polar-health/route.ts
import { getPolarProducts } from "~/lib/polar-checkout";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getPolarProducts();
    
    // Use type assertion to handle Polar response types
    const productDetails = products.map((p: any) => ({
      id: p.id,
      name: p.name || 'Unknown Product',
      active: p.active !== false,
    }));
    
    return NextResponse.json({
      status: "healthy",
      polarConnected: true,
      availableProducts: products.length,
      productList: productDetails,
    });
  } catch (error) {
    console.error("❌ Polar health check failed:", error);
    
    return NextResponse.json({
      status: "unhealthy",
      polarConnected: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
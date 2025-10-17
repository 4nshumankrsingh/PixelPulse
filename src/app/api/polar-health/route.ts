// src/app/api/polar-health/route.ts
// No top-level eslint-disable required.
import { getPolarProducts } from "~/lib/polar-checkout";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getPolarProducts();

    const productDetails = (products ?? []).map((p) => {
      const item = p as Record<string, unknown>;
      const id = (typeof item.id === 'string' && item.id) || (typeof item.productId === 'string' && item.productId) || '';
      const name = typeof item.name === 'string' ? item.name : 'Unknown Product';
      const active = item.active !== false;
      return { id, name, active };
    });

    return NextResponse.json({
      status: "healthy",
      polarConnected: true,
      availableProducts: (products ?? []).length,
      productList: productDetails,
    });
  } catch (err) {
    console.error("❌ Polar health check failed:", err);
    return NextResponse.json({
      status: "unhealthy",
      polarConnected: false,
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
// src/app/api/webhooks/polar/route.ts
// Removed eslint-disable for explicit anys
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
  const _signature = request.headers.get('polar-signature');
  void _signature;
  // mark as intentionally unused for now (signature verification not implemented)
  void _signature;

    // In a real implementation, you would verify the webhook signature here
    // For now, we'll process the webhook directly
    
    const event: unknown = JSON.parse(body);
    // Minimal runtime guards for event shape
    function isPolarEvent(v: unknown): v is { type?: string; data?: unknown } {
      return typeof v === 'object' && v !== null && 'type' in v;
    }

    if (!isPolarEvent(event)) {
      console.error('❌ Webhook: unexpected payload', event);
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    const eventType = (event as Record<string, unknown>).type as string | undefined;
    console.log('📩 Polar webhook received:', eventType);

    if (eventType === 'checkout.session.completed') {
      const session = (event as Record<string, unknown>).data as Record<string, unknown> | undefined;
      const customerEmail = session?.customer_email as string | undefined;
      
      console.log("✅ Payment completed for:", customerEmail);

      // Find the user by email
      const user = await db.user.findFirst({
        where: { email: customerEmail },
      });

      if (!user) {
        console.error("❌ User not found for email:", customerEmail);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Calculate credits based on line items
      let totalCredits = 0;
      
      if (session?.line_items && Array.isArray(session.line_items)) {
        for (const rawItem of session.line_items as unknown[]) {
          const item = rawItem as Record<string, unknown> | undefined;
          const priceField = item?.price;
          const priceId = (typeof (priceField as Record<string, unknown>)?.id === 'string' && (priceField as Record<string, unknown>).id) ??
            (typeof priceField === 'string' ? priceField : undefined);
          const qtyRaw = item?.quantity;
          const parsedQty = typeof qtyRaw === 'number' ? qtyRaw : (typeof qtyRaw === 'string' ? Number(qtyRaw) : NaN);
          const qty = Number.isFinite(parsedQty) ? parsedQty : 1;
          switch (priceId) {
            case "08350901-0559-47e6-a007-8b8c6e291198": // Small Pack
              totalCredits += 50 * qty;
              break;
            case "9666ecc6-e2d0-481c-8c4e-317465269250": // Medium Pack
              totalCredits += 200 * qty;
              break;
            case "f8365395-9620-4667-8d47-1394f91da680": // Large Pack
              totalCredits += 400 * qty;
              break;
            default:
              break;
          }
        }
      }

      if (totalCredits > 0) {
        // Update user credits
        await db.user.update({
          where: { id: user.id },
          data: {
            credits: {
              increment: totalCredits,
            },
          },
        });

        console.log(`💰 Added ${totalCredits} credits to user ${user.email}`);
      } else {
        console.warn("⚠️ No credits calculated from line items");
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
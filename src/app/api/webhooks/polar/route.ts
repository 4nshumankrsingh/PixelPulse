// src/app/api/webhooks/polar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('polar-signature');

    // In a real implementation, you would verify the webhook signature here
    // For now, we'll process the webhook directly
    
    const event = JSON.parse(body);
    console.log("📩 Polar webhook received:", event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data;
      const customerEmail = session.customer_email;
      
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
      
      if (session.line_items && Array.isArray(session.line_items)) {
        for (const item of session.line_items) {
          switch (item.price.id) {
            case "08350901-0559-47e6-a007-8b8c6e291198": // Small Pack
              totalCredits += 50 * (item.quantity || 1);
              break;
            case "9666ecc6-e2d0-481c-8c4e-317465269250": // Medium Pack
              totalCredits += 200 * (item.quantity || 1);
              break;
            case "f8365395-9620-4667-8d47-1394f91da680": // Large Pack
              totalCredits += 400 * (item.quantity || 1);
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
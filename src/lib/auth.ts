import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { db } from "~/server/db";

// Initialize Polar client with error handling
let polarClient: Polar | undefined;
let polarEnabled = false;

try {
  if (env.POLAR_ACCESS_TOKEN?.startsWith('polar_')) {
    polarClient = new Polar({
      accessToken: env.POLAR_ACCESS_TOKEN,
      server: "sandbox", // Use "production" when you're ready for live payments
    });
    polarEnabled = true;
    console.log("✅ Polar integration enabled");
  } else {
    console.log("⚠️ Polar disabled - invalid or missing access token");
  }
} catch (err) {
  console.log("⚠️ Polar disabled - initialization failed:", err);
}

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3055",
    "http://localhost:3000",
    "pixelpulse-nine.vercel.app",
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: polarEnabled ? [
    polar({
      client: polarClient!,
      createCustomerOnSignUp: false, // Set to false to prevent signup errors
      use: [
        checkout({
          products: [
            {
              productId: "08350901-0559-47e6-a007-8b8c6e291198",
              slug: "small",
            },
            {
              productId: "9666ecc6-e2d0-481c-8c4e-317465269250", 
              slug: "medium",
            },
            {
              productId: "f8365395-9620-4667-8d47-1394f91da680",
              slug: "large",
            },
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            try {
              const externalCustomerId = order.data.customer.externalId;

              if (!externalCustomerId) {
                console.error("No external customer ID found.");
                return;
              }

              const productId = order.data.productId;
              let creditsToAdd = 0;

              switch (productId) {
                case "08350901-0559-47e6-a007-8b8c6e291198":
                  creditsToAdd = 50;
                  break;
                case "9666ecc6-e2d0-481c-8c4e-317465269250":
                  creditsToAdd = 200;
                  break;
                case "f8365395-9620-4667-8d47-1394f91da680":
                  creditsToAdd = 400;
                  break;
                default:
                  console.warn("Unknown product ID:", productId);
                  return;
              }

              await db.user.update({
                where: { id: externalCustomerId },
                data: {
                  credits: {
                    increment: creditsToAdd,
                  },
                },
              });

              console.log(`✅ Added ${creditsToAdd} credits to user ${externalCustomerId}`);
            } catch (error) {
              console.error("Error processing Polar webhook:", error);
            }
          },
        }),
      ],
    }),
  ] : [],
});
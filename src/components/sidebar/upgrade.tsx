// src/components/sidebar/upgrade.tsx
"use client";

import { Button } from "../ui/button";
import { Crown, Zap } from "lucide-react";
import { useState } from "react";

export default function Upgrade() {
  const [isLoading, setIsLoading] = useState(false);

  const upgrade = async () => {
    setIsLoading(true);
    try {
      console.log("Starting checkout process...");
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sending cookies
        body: JSON.stringify({
          products: [
            "08350901-0559-47e6-a007-8b8c6e291198",
            "9666ecc6-e2d0-481c-8c4e-317465269250",
            "f8365395-9620-4667-8d47-1394f91da680",
          ],
        }),
      });

  // Safely parse and validate the response JSON to avoid assigning `any`.
  const raw: unknown = await response.json();

      function isCheckoutResponse(v: unknown): v is { url?: string; error?: string } {
        return (
          typeof v === "object" &&
          v !== null &&
          ("url" in v || "error" in v)
        );
      }

      if (isCheckoutResponse(raw)) {
        const result = raw;
        if (response.ok && result.url) {
          console.log("Redirecting to checkout:", result.url);
          // Redirect to Polar checkout
          window.location.href = result.url;
        } else {
          console.error("Checkout failed:", result.error);
          alert(result.error ?? "Failed to start checkout process. Please try again.");
        }
      } else {
        console.error("Unexpected response from checkout API", raw);
        alert("Failed to start checkout process. Please try again later.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isLoading}
      className="group relative ml-2 cursor-pointer overflow-hidden border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 text-orange-400 transition-all duration-300 hover:border-orange-500/70 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={upgrade}
    >
      <div className="flex items-center gap-2">
        <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">
          {isLoading ? "Loading..." : "Upgrade"}
        </span>
        <Zap className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  );
}
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
      console.log("🔼 Starting upgrade process...");
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      console.log("📦 API Response:", { status: response.status, result });

      if (response.ok && result.url) {
        console.log("🔗 Redirecting to payment page...");
        window.location.href = result.url;
        return;
      }

      // Handle specific error cases
      if (response.status === 401) {
        alert("🔐 Please sign in to purchase credits.");
        return;
      }

      console.error("❌ Checkout failed:", result.error);
      alert(result.error || "Unable to process payment. Please try again.");

    } catch (error) {
      console.error("💥 Upgrade error:", error);
      alert("🌐 Network error. Please check your connection and try again.");
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
          {isLoading ? "Processing..." : "Upgrade"}
        </span>
        <Zap className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  );
}
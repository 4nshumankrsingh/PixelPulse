"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";
import { Crown, Zap } from "lucide-react";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "08350901-0559-47e6-a007-8b8c6e291198",
        "9666ecc6-e2d0-481c-8c4e-317465269250",
        "f8365395-9620-4667-8d47-1394f91da680",
      ],
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="group relative ml-2 cursor-pointer overflow-hidden border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 text-orange-400 transition-all duration-300 hover:border-orange-500/70 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
      onClick={upgrade}
    >
      <div className="flex items-center gap-2">
        <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">Upgrade</span>
        <Zap className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  );
}
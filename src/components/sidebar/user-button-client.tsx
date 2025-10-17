"use client";

import React from "react";
import { UserButton } from "@daveyplate/better-auth-ui";

export default function UserButtonClient(props: any) {
  // This component is intentionally client-only to avoid SSR/client ID mismatches
  return <UserButton {...props} />;
}

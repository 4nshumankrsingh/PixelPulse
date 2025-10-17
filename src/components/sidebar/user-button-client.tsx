"use client";

import React from "react";
import { UserButton } from "@daveyplate/better-auth-ui";

// Use the prop types from UserButton to avoid explicit any
type UserButtonProps = React.ComponentProps<typeof UserButton>;

export default function UserButtonClient(props: UserButtonProps) {
  // This component is intentionally client-only to avoid SSR/client ID mismatches
  return <UserButton {...props} />;
}

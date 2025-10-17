import { AuthView } from "@daveyplate/better-auth-ui";
import { Suspense } from "react";

interface AuthPageProps {
  params: Promise<{ path: string }>;
}

// Disable SSR for auth pages to prevent hydration issues
export const dynamic = "force-dynamic";

export default async function AuthPage({ params }: AuthPageProps) {
  const { path } = await params;

  return (
    <main className="container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthView path={path} redirectTo="/dashboard" />
      </Suspense>
    </main>
  );
}
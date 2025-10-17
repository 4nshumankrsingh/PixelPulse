import { getUploadAuthParams } from "@imagekit/next/server";
import { env } from "~/env";

export async function GET() {
  try {
    // Ensure ImageKit keys are present at runtime. The env schema allows
    // optional public/server fallbacks, so we must check and provide a
    // clear error if they're missing.
    const privateKey = env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = env.IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      console.error("Missing ImageKit keys: private or public key not set.");
      return Response.json(
        { error: "ImageKit keys not configured on the server" },
        { status: 500 },
      );
    }

    const { token, expire, signature } = getUploadAuthParams({
      privateKey,
      publicKey,
      // expire: 30 * 60, // Optional: 30 minutes expiry (default is 1 hour)
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    });
  } catch (error) {
    console.error("Upload auth error:", error);
    return Response.json(
      { error: "Failed to generate upload credentials" },
      { status: 500 },
    );
  }
}
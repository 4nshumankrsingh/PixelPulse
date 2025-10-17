import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Clear all auth-related cookies
    cookieStore.getAll().forEach(cookie => {
      if (cookie.name.includes('auth') || cookie.name.includes('session')) {
        cookieStore.delete(cookie.name);
      }
    });

    return NextResponse.json({ success: true, message: "Session reset" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Reset failed" }, { status: 500 });
  }
}
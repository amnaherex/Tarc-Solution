import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Get the current response and logged-in user
  const { response, user } = await updateSession(request);

  // Current URL path
  const pathname = request.nextUrl.pathname;

  // -----------------------------
  // Protect Dashboard
  // -----------------------------
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // -----------------------------
  // Protect Tasks
  // -----------------------------
  if (pathname.startsWith("/tasks")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // -----------------------------
  // Logged-in users should not
  // visit Login page
  // -----------------------------
  if (pathname === "/login") {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // -----------------------------
  // Logged-in users should not
  // visit Signup page
  // -----------------------------
  if (pathname === "/signup") {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Allow the request
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
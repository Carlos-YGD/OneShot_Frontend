import { NextResponse } from "next/server";

export function proxy(req) {
  const url = req.nextUrl.pathname;
  const protectedRoutes = ["/dashboard", "/profile", "/menu", "/game"];

  // Only intercept SSR or API requests, skip client-side navigations
  if (protectedRoutes.some((route) => url.startsWith(route))) {
    const headerAuth = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    if (!headerAuth) {
      // No Authorization header, allow frontend to handle login redirect
      console.log(`[proxy] Protected route accessed without token: ${url}`);
      return NextResponse.next();
    }

    console.log(`[proxy] Authorization header found for: ${url}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/menu/:path*", "/game/:path*"],
};

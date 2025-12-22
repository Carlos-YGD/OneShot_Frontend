import { NextResponse } from "next/server";

export function proxy(req) {
  // collect cookies and possible token sources
  const cookieList = typeof req.cookies.getAll === "function" ? req.cookies.getAll() : [];
  const accessTokenCookie = req.cookies.get("access_token")?.value;
  const authCookie = cookieList.find((c) => c.name.endsWith("auth-token"))?.value;
  const headerAuth = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const accessToken = accessTokenCookie || authCookie || headerAuth;

  // diagnostics
  console.log("[proxy] pathname:", req.nextUrl.pathname);
  console.log("[proxy] cookies:", cookieList.map((c) => c.name));
  console.log(
    "[proxy] token:",
    {
      accessTokenCookie: !!accessTokenCookie,
      authCookie: !!authCookie,
      headerAuth: !!headerAuth,
      chosenSource: accessTokenCookie ? "access_token" : authCookie ? "auth-token" : headerAuth ? "authorization" : "none",
    }
  );

  const url = req.nextUrl.pathname;
  const protectedRoutes = ["/dashboard", "/profile", "/menu", "/game"];

  if (protectedRoutes.some((route) => url.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/menu/:path*", "/game/:path*"],
};
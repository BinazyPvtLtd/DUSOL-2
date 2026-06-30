// middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Extract tenant from subdomain
  const tenant = hostname.split(".")[0] || "dusol";

  // Clone request headers so Server Components can access them
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-forwarded-host", hostname);
  requestHeaders.set("x-tenant", tenant);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host");

  const tenant = host?.split(".")[0] || "dusol";

  const response = NextResponse.next();

  response.headers.set("x-tenant", tenant);

  return response;
}

export const config = {
  matcher: "/:path*",
};
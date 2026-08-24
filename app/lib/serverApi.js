// app/lib/serverApi.js
//
// Server-only GET helper for use inside generateMetadata()/page Server
// Components. Uses the Next.js-extended fetch(), which automatically
// dedupes identical requests (same URL + init) made multiple times within
// a single render pass — this is how generateMetadata() and the page
// component end up sharing one network call instead of firing two.
// (React's cache() would be the other way to do this, but this project's
// installed React version — 18.3.1 — doesn't export it; that's a React 19
// API.)
//
// Client components keep using the existing axios-based functions in
// api/index.js — this helper only replaces the server-side calls in the
// four dynamic route page.jsx files.

import { headers } from 'next/headers'
import { getTenantSlugFromHost } from '@/app/lib/studentZone'

const API_BASE = process.env.NEXT_PUBLIC_DEFAULT_API

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0']

// API_BASE points at the shared API host (api.distanceeducationlearning.com),
// which resolves tenant from the X-Tenant header rather than its own
// hostname. Server Components/generateMetadata() run per-request, so the
// *incoming* request's own host tells us which tenant this render is for —
// same source student-zone/[szSlug]/page.jsx already uses, just centralized
// here so every fetchApi() caller gets it automatically.
//
// getTenantSlugFromHost() falls back to deriving a slug from API_BASE's own
// hostname for local requests, which is correct for its original caller but
// would resolve to "api" here (API_BASE isn't a tenant subdomain) — sending
// that as X-Tenant would make the backend look up a nonexistent university
// and 404 every local request. So local hosts are handled here by sending no
// header at all, which is exactly today's behavior: the backend's own
// configured default tenant applies, unchanged.
function resolveTenantSlug () {
  try {
    const headerList = headers()
    const host = headerList.get('x-forwarded-host') || headerList.get('host') || ''
    const hostname = host.split(':')[0]

    if (!hostname || LOCAL_HOSTNAMES.includes(hostname)) return null

    return getTenantSlugFromHost(hostname)
  } catch {
    // headers() is only available inside a request context; fail safe to
    // "no tenant resolved" (no X-Tenant sent) rather than throwing.
    return null
  }
}

export async function fetchApi (path, init = {}) {
  const tenantSlug = resolveTenantSlug()

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Caller-provided headers (e.g. student-zone's own explicit
      // X-Tenant) always win — see the spread order below.
      ...(tenantSlug ? { 'X-Tenant': tenantSlug } : {}),
      ...(init.headers || {})
    }
  })

  if (!res.ok) {
    // Callers that need to tell a real 404 (e.g. a nonexistent slug) apart
    // from a transient failure (network error, 5xx) can check `err.status`.
    // Purely additive — existing callers that only read `err.message` are
    // unaffected.
    const err = new Error(`API request failed (${res.status}): ${path}`)
    err.status = res.status
    throw err
  }

  return res.json()
}

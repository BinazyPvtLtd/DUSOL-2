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

const API_BASE = process.env.NEXT_PUBLIC_DEFAULT_API

export async function fetchApi (path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  })

  if (!res.ok) {
    throw new Error(`API request failed (${res.status}): ${path}`)
  }

  return res.json()
}

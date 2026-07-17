// lib/studentZone.js
//
// Single source of truth for Student Zone pages and their SEO URLs.
// URL pattern: /{tenantSlug}-{pageKey}  e.g. /dusol-admission
// The tenant slug is the subdomain of the current request, the same
// tenant identity already used by middleware.js, app/lib/tenant.js and
// constant/constant.jsx. No tenant names are hardcoded here, so new
// universities work without any frontend change.

export const STUDENT_ZONE_PAGES = [
  { label: 'Admission', key: 'admission' },
  { label: 'Courses & Fees', key: 'courses-fees' },
  { label: 'Hall Ticket', key: 'hall-ticket' },
  { label: 'Study Material', key: 'study-material' },
  { label: 'Result', key: 'result' },
  { label: 'Library Portal', key: 'library-portal' },
  { label: 'Assignment Status', key: 'assignment-status' },
  { label: 'Alternative Universities', key: 'alternative-universities' }
]

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0']

// Works on the server (pass the request "host" header) and on the
// client (pass window.location.hostname). On localhost the tenant is
// derived from NEXT_PUBLIC_DEFAULT_API, mirroring getCurrentSubdomain()
// in constant/constant.jsx.
export const getTenantSlugFromHost = host => {
  const hostname = (host || '').split(':')[0]

  if (!hostname || LOCAL_HOSTNAMES.includes(hostname)) {
    try {
      return (
        new URL(process.env.NEXT_PUBLIC_DEFAULT_API).hostname.split(
          '.'
        )[0] || null
      )
    } catch {
      return null
    }
  }

  const subdomain = hostname.split('.')[0]

  return !subdomain || subdomain === 'www' ? null : subdomain
}

export const buildStudentZoneUrl = (tenantSlug, pageKey) => {
  // Fallback keeps links functional if the tenant slug is not
  // resolvable; the legacy route upgrades them to slug URLs.
  if (!tenantSlug) return `/student-zone?p=${pageKey}`

  return `/${tenantSlug}-${pageKey}`
}

// Maps a path slug like "dusol-courses-fees" back to its Student Zone
// page for the current tenant. Returns null for anything else, so the
// route can 404. Exact-match against the generated URLs avoids any
// ambiguity when tenant slugs or page keys contain hyphens.
export const resolveStudentZonePage = (slug, tenantSlug) => {
  if (!slug || !tenantSlug) return null

  return (
    STUDENT_ZONE_PAGES.find(
      page => slug === `${tenantSlug}-${page.key}`
    ) || null
  )
}

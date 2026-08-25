// lib/studentZone.js

import {
  getAdmissionAPI,
  getCoursesFeesAPI,
  getHallTicketAPI,
  getStudyMaterialAPI,
  getResultAPI,
  getLibraryPortalAPI,
  getAssignmentStatusAPI,
  getAlternativeUniversitiesAPI
} from '@/api'

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

// Function references only — callers invoke the one matching the
// resolved page key. Tenant scoping happens inside each function via
// getBaseUrl(), the same mechanism Course/Specialization/Blog rely on.
export const STUDENT_ZONE_API_MAP = {
  admission: getAdmissionAPI,
  'courses-fees': getCoursesFeesAPI,
  'hall-ticket': getHallTicketAPI,
  'study-material': getStudyMaterialAPI,
  result: getResultAPI,
  'library-portal': getLibraryPortalAPI,
  'assignment-status': getAssignmentStatusAPI,
  'alternative-universities': getAlternativeUniversitiesAPI
}

const LOCAL_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0']

// The base domain this app's own configured API lives under (e.g.
// "distanceeducationlearning.com"), derived from NEXT_PUBLIC_DEFAULT_API's
// own hostname by dropping its leading "api." label. This is the one piece
// of domain identity the app already trusts about itself — reused here as
// an allowlist suffix rather than inventing a new domain config. Computed
// once at module load, same as LOCAL_HOSTNAMES above.
const TRUSTED_BASE_DOMAIN = (() => {
  try {
    const apiHostname = new URL(process.env.NEXT_PUBLIC_DEFAULT_API).hostname
    const labels = apiHostname.split('.')

    return labels.length > 2 ? labels.slice(1).join('.') : apiHostname
  } catch {
    return null
  }
})()

// Request-supplied Host/X-Forwarded-Host headers are not trustworthy by
// default — a caller can set either to an arbitrary value. This validates
// a raw header value against the two hostnames this app actually expects
// to be addressed by: a local dev hostname, or anything under
// TRUSTED_BASE_DOMAIN (any real tenant subdomain matches this; an external
// domain or an unrelated host does not). Returns the original value
// (port included, if present) when trusted, so existing callers that
// expect the raw host string see no change for legitimate requests; returns
// null otherwise, signaling "don't use this for tenant resolution or a
// canonical URL."
export const getTrustedHost = rawHost => {
  const raw = rawHost || ''
  const hostname = raw.split(':')[0]

  if (!hostname) return null
  if (LOCAL_HOSTNAMES.includes(hostname)) return raw

  if (
    TRUSTED_BASE_DOMAIN &&
    (hostname === TRUSTED_BASE_DOMAIN ||
      hostname.endsWith(`.${TRUSTED_BASE_DOMAIN}`))
  ) {
    return raw
  }

  return null
}

// in constant/constant.jsx.
export const getTenantSlugFromHost = host => {
  const trustedHost = getTrustedHost(host)

  // Untrusted host (doesn't match a local dev hostname or this app's own
  // base domain) — resolve no tenant rather than deriving a slug from an
  // attacker-controlled value. Callers already treat null as "send no
  // X-Tenant header", which is the existing, unchanged fallback behavior.
  if (!trustedHost) return null

  const hostname = trustedHost.split(':')[0]

  if (LOCAL_HOSTNAMES.includes(hostname)) {
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

  return `/student-zone/${tenantSlug}-${pageKey}`
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

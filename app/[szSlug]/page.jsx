import { headers } from 'next/headers'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  buildStudentZoneUrl,
  getTenantSlugFromHost,
  resolveStudentZonePage
} from '@/app/lib/studentZone'

// Legacy root-level Student Zone URLs: /{tenantSlug}-{pageKey}
// (e.g. /dusol-admission). These were the previous SEO URLs and may
// still be indexed or bookmarked, so they permanently redirect (308)
// to the current /student-zone/{tenantSlug}-{pageKey} URLs.
// Any other unmatched top-level path 404s, as before.

export default function LegacyStudentZoneSlugPage({ params }) {
  const tenantSlug = getTenantSlugFromHost(headers().get('host') || '')
  const page = resolveStudentZonePage(params.szSlug, tenantSlug)

  if (!page) notFound()

  permanentRedirect(buildStudentZoneUrl(tenantSlug, page.key))
}

import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import {
  buildStudentZoneUrl,
  getTenantSlugFromHost,
  resolveStudentZonePage
} from '@/app/lib/studentZone'
import StudentZoneClient from './StudentZoneClient'

// SEO Student Zone route: /student-zone/{tenantSlug}-{pageKey}
// e.g. dusol.example.com -> /student-zone/dusol-admission
//      cu.example.com    -> /student-zone/cu-admission
// The tenant slug comes from the request host, so any university
// created in the admin panel is served automatically.

const resolveFromRequest = szSlug => {
  const host = headers().get('host') || ''
  const tenantSlug = getTenantSlugFromHost(host)
  const page = resolveStudentZonePage(szSlug, tenantSlug)

  return { host, tenantSlug, page }
}

export function generateMetadata({ params }) {
  const { host, tenantSlug, page } = resolveFromRequest(params.szSlug)

  if (!page) return {}

  return {
    title: page.label,
    alternates: {
      canonical: `https://${host}${buildStudentZoneUrl(tenantSlug, page.key)}`
    }
  }
}

export default function StudentZoneSlugPage({ params }) {
  const { tenantSlug, page } = resolveFromRequest(params.szSlug)

  if (!page) notFound()

  return (
    <StudentZoneClient
      pageKey={page.key}
      tenantSlug={tenantSlug}
    />
  )
}

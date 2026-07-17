import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import {
  getTenantSlugFromHost,
  resolveStudentZonePage
} from '@/app/lib/studentZone'
import StudentZoneClient from './StudentZoneClient'

// SEO Student Zone route: /{tenantSlug}-{pageKey}
// e.g. dusol.example.com -> /dusol-admission
//      cu.example.com    -> /cu-admission
// The tenant slug comes from the request host, so any university
// created in the admin panel is served automatically.

const resolveFromRequest = szSlug => {
  const host = headers().get('host') || ''
  const tenantSlug = getTenantSlugFromHost(host)
  const page = resolveStudentZonePage(szSlug, tenantSlug)

  return { host, tenantSlug, page }
}

export function generateMetadata({ params }) {
  const { host, page } = resolveFromRequest(params.szSlug)

  if (!page) return {}

  return {
    title: page.label,
    alternates: {
      canonical: `https://${host}/${params.szSlug}`
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

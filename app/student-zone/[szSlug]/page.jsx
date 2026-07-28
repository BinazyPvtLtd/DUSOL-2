import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import {
  STUDENT_ZONE_API_MAP,
  buildStudentZoneUrl,
  getTenantSlugFromHost,
  resolveStudentZonePage
} from '@/app/lib/studentZone'
import { generateSEOMetadata } from '@/app/lib/seo'
import JsonLd from '@/components/JsonLd'
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

export async function generateMetadata({ params }) {
  const { host, tenantSlug, page } = resolveFromRequest(params.szSlug)

  if (!page) return {}

  try {
    const api = STUDENT_ZONE_API_MAP[page.key]
    const response = await api({ headers: { 'X-Tenant': tenantSlug } })

    const seo = response?.data?.data?.seo || {}

    return {
      ...generateSEOMetadata(seo),
      alternates: {
        canonical: `https://${host}${buildStudentZoneUrl(tenantSlug, page.key)}`
      }
    }
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function StudentZoneSlugPage({ params }) {
  const { tenantSlug, page } = resolveFromRequest(params.szSlug)

  if (!page) notFound()

  let schema = null

  try {
    const api = STUDENT_ZONE_API_MAP[page.key]
    const response = await api({ headers: { 'X-Tenant': tenantSlug } })

    schema = response?.data?.data?.seo?.schema || null
  } catch (err) {
    schema = null
  }

  return (
    <>
      <JsonLd schema={schema} />
      <StudentZoneClient
        pageKey={page.key}
        tenantSlug={tenantSlug}
      />
    </>
  )
}

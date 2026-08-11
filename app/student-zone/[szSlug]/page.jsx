import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import {
  buildStudentZoneUrl,
  getTenantSlugFromHost,
  resolveStudentZonePage
} from '@/app/lib/studentZone'
import { generateSEOMetadata } from '@/app/lib/seo'
import { fetchApi } from '@/app/lib/serverApi'
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

// Student Zone page keys ('admission', 'courses-fees', ...) are the exact
// API path segments (see STUDENT_ZONE_API_MAP in lib/studentZone.js), so
// the request can be built directly. Wrapped in fetchApi's native fetch()
// so Next.js dedupes the identical call made by generateMetadata() and
// the page component below into a single network request.
const getStudentZoneData = (pageKey, tenantSlug) =>
  fetchApi(`/${pageKey}`, { headers: { 'X-Tenant': tenantSlug } })

export async function generateMetadata({ params }) {
  const { host, tenantSlug, page } = resolveFromRequest(params.szSlug)

  if (!page) return {}

  try {
    const body = await getStudentZoneData(page.key, tenantSlug)
    const seo = body?.data?.seo || {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function StudentZoneSlugPage({ params }) {
  const { tenantSlug, page } = resolveFromRequest(params.szSlug)

  if (!page) notFound()

  let schema = null
  let initialData = null

  try {
    const body = await getStudentZoneData(page.key, tenantSlug)
    schema = body?.data?.seo?.schema || null
    initialData = body || null
  } catch (err) {
    schema = null
    initialData = null
  }

  return (
    <>
      <JsonLd schema={schema} />
      <StudentZoneClient
        pageKey={page.key}
        tenantSlug={tenantSlug}
        initialData={initialData}
      />
    </>
  )
}

import { headers } from 'next/headers'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  buildStudentZoneUrl,
  getTenantSlugFromHost,
  resolveStudentZonePage
} from '@/app/lib/studentZone'


export default function LegacyStudentZoneSlugPage({ params }) {
  const tenantSlug = getTenantSlugFromHost(headers().get('host') || '')
  const page = resolveStudentZonePage(params.szSlug, tenantSlug)

  if (!page) notFound()

  permanentRedirect(buildStudentZoneUrl(tenantSlug, page.key))
}

import { headers } from 'next/headers'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  STUDENT_ZONE_PAGES,
  buildStudentZoneUrl,
  getTenantSlugFromHost
} from '@/app/lib/studentZone'


export default function StudentZoneLegacyPage({ searchParams }) {
  const tenantSlug = getTenantSlugFromHost(headers().get('host'))

  if (!tenantSlug) notFound()

  const pageKey = searchParams?.p || 'admission'
  const page = STUDENT_ZONE_PAGES.find(p => p.key === pageKey)


  if (!page) notFound()

  permanentRedirect(buildStudentZoneUrl(tenantSlug, page.key))
}

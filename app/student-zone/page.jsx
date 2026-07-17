import { headers } from 'next/headers'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  buildStudentZoneUrl,
  getTenantSlugFromHost
} from '@/app/lib/studentZone'

// Legacy route. /student-zone?p={key} permanently redirects to the SEO
// slug URL /{tenantSlug}-{key} for whichever tenant serves the request
// (dusol -> /dusol-admission, cu -> /cu-admission, ...). Unknown keys
// redirect too and 404 on the slug route.
export default function StudentZoneLegacyPage({ searchParams }) {
  const tenantSlug = getTenantSlugFromHost(headers().get('host'))

  if (!tenantSlug) notFound()

  const pageKey = searchParams?.p || 'admission'

  permanentRedirect(buildStudentZoneUrl(tenantSlug, pageKey))
}

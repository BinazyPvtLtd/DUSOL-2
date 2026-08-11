'use client'

import StudentHero from '@/components/student-zone/StudentHero'
import StudentSidebar from '@/components/student-zone/StudentSidebar'
import { applyInfoTableStyling, sanitizeCmsHtml } from '@/helperFunction/Helper'
import { useClientHtml } from '@/hooks/useClientHtml'

export default function StudentContentPage({
  page,
  pageKey,
  tenantSlug,
}) {
  // applyInfoTableStyling is browser-only (DOMParser) and no-ops during
  // SSR. useMemo still runs its factory during render (including the
  // client's hydration-matching first render), so computing it there had
  // the same server/client divergence risk as calling it inline — swapped
  // for useClientHtml, which renders the sanitized-only HTML on the first
  // render and upgrades to the table-styled version right after mount.
  const content = useClientHtml(
    sanitizeCmsHtml(page?.content || ''),
    applyInfoTableStyling
  )

  return (
    <>
      <StudentHero
        title={page?.title}
        description={page?.description}
      />

      <section className='content-page'>
        <div className='wrap'>
          <div className='content-layout'>
            <div className='content-main'>
              {content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )}
            </div>

            <StudentSidebar pageKey={pageKey} tenantSlug={tenantSlug} />
          </div>
        </div>
      </section>
    </>
  )
}
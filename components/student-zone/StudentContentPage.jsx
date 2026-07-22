'use client'

import { useMemo } from 'react'
import StudentHero from '@/components/student-zone/StudentHero'
import StudentSidebar from '@/components/student-zone/StudentSidebar'
import { applyInfoTableStyling } from '@/helperFunction/Helper'

export default function StudentContentPage({
  page,
  pageKey,
  tenantSlug,
}) {
  const content = useMemo(
    () => applyInfoTableStyling(page?.content),
    [page?.content]
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
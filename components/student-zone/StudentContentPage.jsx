'use client'

import StudentHero from '@/components/student-zone/StudentHero'
import StudentSidebar from '@/components/student-zone/StudentSidebar'

export default function StudentContentPage({
  page,
  pageKey,
  tenantSlug,
}) {
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
              {page?.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: page.content?.replace(
                      /<table([^>]*)>/g,
                      '<table class="info-table"$1>'
                    ),
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
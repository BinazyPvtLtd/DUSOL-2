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
            {page?.items?.length > 0 && (
  <table className="info-table">
    <thead>
      <tr>
        <th>Course</th>
        <th>Duration</th>
        <th>Total Fee (approx.)</th>
      </tr>
    </thead>
    <tbody>
      {page.items.map(item => (
        <tr key={item.id}>
          <td>{item.course_name}</td>
          <td>{item.duration}</td>
          <td>{item.total_fee}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

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
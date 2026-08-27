import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/app/lib/seo'
import { fetchApi } from '@/app/lib/serverApi'
import { getTrustedHost } from '@/app/lib/studentZone'
import { sanitizeCmsHtml } from '@/helperFunction/Helper'

// Courses hub / index page. Previously `/courses` had no page.jsx and fell
// through to the root `[szSlug]` catch-all, which 404'd — so the legacy
// `/course` -> `/courses` redirect terminated in a 404, and there was no
// crawlable index of all courses independent of the header menu.
//
// Server Component (no `'use client'`): the listing is static per request,
// so it renders as fully-crawlable HTML with no hydration cost.

// Same endpoint + options as the RootLayout menu fetch, so Next serves both
// from one tenant-scoped Data Cache entry (see fetchApi).
const getCourses = () => fetchApi('/courses', { revalidate: 300, tags: ['menu'] })

// This route's own real public URL — used only as a fallback when a CMS
// canonical isn't configured for it (see generateSEOMetadata).
const getCanonicalFallback = () => {
  const host = getTrustedHost(
    headers().get('x-forwarded-host') || headers().get('host') || ''
  )
  return host ? `https://${host}/courses` : undefined
}

export async function generateMetadata () {
  return generateSEOMetadata(
    {
      meta_title: 'Courses & Programs',
      meta_description:
        'Browse all distance and online undergraduate and postgraduate courses, with eligibility, fees and admission details for each programme.'
    },
    getCanonicalFallback()
  )
}

function CourseCard ({ course }) {
  return (
    <div className='course-card'>
      {course.duration && (
        <span className='yr'>
          {course.duration} {course.duration_type}
        </span>
      )}

      <h3>{course.short_name?.toUpperCase() || course.name}</h3>

      <div className='full'>{course.name}</div>

      {course.short_description && (
        <div
          className='line-clamp-4 text-sm text-justify mb-4 text-gray-600'
          dangerouslySetInnerHTML={{
            __html: sanitizeCmsHtml(course.short_description)
          }}
        />
      )}

      <Link
        href={`/courses/${course.slug}`}
        className='btn btn-purple btn-block'
      >
        Know More
      </Link>
    </div>
  )
}

export default async function CoursesHubPage () {
  let courses = []

  try {
    const body = await getCourses()
    courses = Array.isArray(body?.data) ? body.data : []
  } catch (err) {
    // Unknown tenant -> real 404; any other upstream failure re-throws
    // rather than rendering an empty hub at HTTP 200 (soft 404).
    if (err?.status === 404) notFound()
    throw err
  }

  return (
    <>
      <section className='page-hero'>
        <div className='wrap'>
          <div className='breadcrumb'>
            <Link href='/'>Home</Link>
            <span className='sep'>›</span>
            <span>Courses</span>
          </div>

          <h1>Courses &amp; Programs</h1>

          <p>
            Explore every distance and online programme on offer. Select a
            course to see its eligibility, fees, syllabus and admission
            process.
          </p>
        </div>
      </section>

      <section>
        <div className='wrap'>
          {courses.length > 0 ? (
            <div className='course-grid'>
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p style={{ padding: '40px 0', textAlign: 'center' }}>
              No courses are available right now. Please check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

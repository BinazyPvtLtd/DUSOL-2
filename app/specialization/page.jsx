import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/app/lib/seo'
import { fetchApi } from '@/app/lib/serverApi'
import { getTrustedHost } from '@/app/lib/studentZone'
import { sanitizeCmsHtml } from '@/helperFunction/Helper'

// Specializations hub / index page. Previously `/specialization` had no
// page.jsx and fell through to the root `[szSlug]` catch-all, which 404'd —
// leaving no crawlable index of all specializations.
//
// Server Component (no `'use client'`): static per request, fully crawlable.
//
// NOTE: the backend `/specializations` endpoint paginates at 10. There are
// currently fewer than that, so page 1 covers all. If the count grows past
// the page size this page will need pagination like `/blogs` already has.

// Same endpoint + options as the RootLayout menu fetch, so Next serves both
// from one tenant-scoped Data Cache entry (see fetchApi).
const getSpecializations = () =>
  fetchApi('/specializations', { revalidate: 300, tags: ['menu'] })

const getCanonicalFallback = () => {
  const host = getTrustedHost(
    headers().get('x-forwarded-host') || headers().get('host') || ''
  )
  return host ? `https://${host}/specialization` : undefined
}

export async function generateMetadata () {
  return generateSEOMetadata(
    {
      meta_title: 'Specializations',
      meta_description:
        'Browse all available specializations, with curriculum, career scope and admission details for each.'
    },
    getCanonicalFallback()
  )
}

function SpecializationCard ({ specialization }) {
  return (
    <div className='course-card'>
      {specialization.duration && (
        <span className='yr'>
          {specialization.duration} {specialization.duration_type}
        </span>
      )}

      <h3>{specialization.name}</h3>

      {specialization.course?.name && (
        <div className='full'>{specialization.course.name}</div>
      )}

      {specialization.short_description && (
        <div
          className='line-clamp-4 text-sm text-justify mb-4 text-gray-600'
          dangerouslySetInnerHTML={{
            __html: sanitizeCmsHtml(specialization.short_description)
          }}
        />
      )}

      <Link
        href={`/specialization/${specialization.slug}`}
        className='btn btn-purple btn-block'
      >
        Know More
      </Link>
    </div>
  )
}

export default async function SpecializationHubPage () {
  let specializations = []

  try {
    const body = await getSpecializations()
    specializations = Array.isArray(body?.data) ? body.data : []
  } catch (err) {
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
            <span>Specializations</span>
          </div>

          <h1>Specializations</h1>

          <p>
            Explore every specialization on offer. Select one to see its
            curriculum, career scope and admission process.
          </p>
        </div>
      </section>

      <section>
        <div className='wrap'>
          {specializations.length > 0 ? (
            <div className='course-grid'>
              {specializations.map(specialization => (
                <SpecializationCard
                  key={specialization.id}
                  specialization={specialization}
                />
              ))}
            </div>
          ) : (
            <p style={{ padding: '40px 0', textAlign: 'center' }}>
              No specializations are available right now. Please check back
              soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

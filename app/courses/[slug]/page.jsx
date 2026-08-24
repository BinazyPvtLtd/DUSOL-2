import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/app/lib/seo'
import { fetchApi } from '@/app/lib/serverApi'
import CourseDetailClient from './CourseDetailClient'
import JsonLd from '@/components/JsonLd'

// Request-scoped: Next.js dedupes identical fetch() calls made during the
// same render pass, so generateMetadata() and Page() below share one
// network call instead of firing two.
const getCourse = slug => fetchApi(`/courses/${slug}`)

export async function generateMetadata ({ params }) {
  try {
    const body = await getCourse(params?.slug)

    // API body shape -> { success, data: { seo, course } }
    const seo = body?.data?.seo || {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function Page ({ params }) {
  let schema = null
  let initialData = null

  try {
    const body = await getCourse(params?.slug)
    schema = body?.data?.seo?.schema || null
    initialData = body || null
  } catch (err) {
    // A confirmed 404 from the API means no course exists at this slug —
    // return a real 404 instead of rendering an empty shell at HTTP 200.
    // Any other failure (network error, 5xx) falls through to the existing
    // behavior (render with no data) rather than risk showing a false 404
    // for a real course during a transient upstream issue.
    if (err?.status === 404) {
      notFound()
    }

    schema = null
    initialData = null
  }

  return (
    <>
      <JsonLd schema={schema} />
      <CourseDetailClient slug={params?.slug} initialData={initialData} />
    </>
  )
}

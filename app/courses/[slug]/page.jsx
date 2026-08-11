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

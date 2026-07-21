import { generateSEOMetadata } from '@/app/lib/seo'
import { getOneCourseDataAPI } from '@/api'
import CourseDetailClient from './CourseDetailClient'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata ({ params }) {
  try {
    const response = await getOneCourseDataAPI(params?.slug)

    // axios response -> { data: { success, data: { seo, course } } }
    const seo = response?.data?.data?.seo || {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function Page ({ params }) {
  let schema = null

  try {
    const response = await getOneCourseDataAPI(params?.slug)
    schema = response?.data?.data?.seo?.schema || null
  } catch (err) {
    schema = null
  }

  return (
    <>
      <JsonLd schema={schema} />
      <CourseDetailClient slug={params?.slug} />
    </>
  )
}

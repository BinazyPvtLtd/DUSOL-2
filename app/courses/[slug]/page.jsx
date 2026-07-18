import { generateSEOMetadata } from '@/app/lib/seo'
import { getOneCourseDataAPI } from '@/api'
import CourseDetailClient from './CourseDetailClient'

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

export default function Page ({ params }) {
  return <CourseDetailClient slug={params?.slug} />
}

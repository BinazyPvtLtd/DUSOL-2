import { generateSEOMetadata } from '@/app/lib/seo'
import { getOneSpecializationAPI } from '@/api'
import SpecializationClient from './SpecializationClient'

export async function generateMetadata ({ params }) {
  try {
    const slug = params?.slug
    const response = await getOneSpecializationAPI(slug)

    const seo =
      response?.data?.seo ||
      response?.data?.data?.seo ||
      response?.data?.data?.university?.seo ||
      {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default function Page ({ params }) {
  return <SpecializationClient slug={params?.slug} />
}


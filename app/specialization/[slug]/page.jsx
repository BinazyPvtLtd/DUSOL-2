import { generateSEOMetadata } from '@/app/lib/seo'
import { getOneSpecializationAPI } from '@/api'
import SpecializationClient from './SpecializationClient'
import JsonLd from '@/components/JsonLd'

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

export default async function Page ({ params }) {
  let schema = null

  try {
    const slug = params?.slug
    const response = await getOneSpecializationAPI(slug)

    schema =
      response?.data?.seo?.schema ||
      response?.data?.data?.seo?.schema ||
      response?.data?.data?.university?.seo?.schema ||
      null
  } catch (err) {
    schema = null
  }

  return (
    <>
      <JsonLd schema={schema} />
      <SpecializationClient slug={params?.slug} />
    </>
  )
}


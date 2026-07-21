import { generateSEOMetadata } from '@/app/lib/seo'
import { getOneBlogDataApi } from '@/api'
import BlogClient from './BlogClient'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata ({ params }) {
  try {
    const slug = params?.slug
    const blogData = await getOneBlogDataApi(slug)

    // axios response -> { data: { success, message, data: { seo, blog } } }
    const seo = blogData?.data?.data?.seo || {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function Page ({ params }) {
  let schema = null

  try {
    const slug = params?.slug
    const blogData = await getOneBlogDataApi(slug)

    schema = blogData?.data?.data?.seo?.schema || null
  } catch (err) {
    schema = null
  }

  return (
    <>
      <JsonLd schema={schema} />
      <BlogClient slug={params?.slug} />
    </>
  )
}


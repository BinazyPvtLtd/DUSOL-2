import { generateSEOMetadata } from '@/app/lib/seo'
import { getOneBlogDataApi } from '@/api'
import BlogClient from './BlogClient'

export async function generateMetadata ({ params }) {
  try {
    const slug = params?.slug
    const blogData = await getOneBlogDataApi(slug)

    const seo =
      blogData?.seo ||
      blogData?.data?.seo ||
      blogData?.data?.university?.seo ||
      {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default function Page ({ params }) {
  return <BlogClient slug={params?.slug} />
}


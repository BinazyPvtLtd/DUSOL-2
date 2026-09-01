import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/app/lib/seo'
import { fetchApi } from '@/app/lib/serverApi'
import { getTrustedHost } from '@/app/lib/studentZone'
import BlogsClient from './BlogsClient'

const getBlogs = page =>
  fetchApi(`/blogs?page=${page}`, { revalidate: 300, tags: ['blogs'] })

// Non-numeric / zero / negative `?page=` values all collapse to page 1
// (matching the previous behavior), so those URL variants resolve to the
// same content — and, via generateMetadata below, the same canonical.
const normalizePage = searchParams => {
  const raw = Number(searchParams?.page)
  return Number.isInteger(raw) && raw > 0 ? raw : 1
}

const getCanonicalFallback = page => {
  const host = getTrustedHost(
    headers().get('x-forwarded-host') || headers().get('host') || ''
  )
  if (!host) return undefined
  return page > 1
    ? `https://${host}/blogs?page=${page}`
    : `https://${host}/blogs`
}

export async function generateMetadata ({ searchParams }) {
  const page = normalizePage(searchParams)

  return generateSEOMetadata(
    {
      meta_title:
        page > 1
          ? `DU SOL Blogs 2026: Admission, Courses, Fees & Latest Updates`
          : 'DU SOL Blogs 2026: Admission, Courses, Fees & Latest Updates',

      meta_description:
        'Explore the latest DU SOL blogs on admission, courses, fees, eligibility, exams, results, study material and distance education updates for 2026.'
    },
    getCanonicalFallback(page)
  )
}

export default async function Page ({ searchParams }) {
  const page = normalizePage(searchParams)

  let initialData = null

  try {
    initialData = await getBlogs(page)
  } catch (err) {
    // Keep the existing resilience behavior: on a transient failure leave
    // initialData null so BlogsClient falls back to a client-side fetch.
    initialData = null
  }

  // Clamp out-of-range pages: an explicit `?page=N` beyond the last page
  // previously returned an empty listing at HTTP 200 (a thin/soft-404
  // page). Only enforce this when we actually have pagination data.
  const lastPage = initialData?.pagination?.last_page
  if (page > 1 && Number.isInteger(lastPage) && page > lastPage) {
    notFound()
  }

  return <BlogsClient initialData={initialData} initialPage={page} />
}

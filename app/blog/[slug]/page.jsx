import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/app/lib/seo'
import { fetchApi } from '@/app/lib/serverApi'
import BlogClient from './BlogClient'
import JsonLd from '@/components/JsonLd'

// Request-scoped: Next.js dedupes identical fetch() calls made during the
// same render pass, so generateMetadata() and Page() below share one
// network call instead of firing two.
const getBlog = slug => fetchApi(`/blogs/${slug}`)
const getBlogFaqs = blogId => fetchApi(`/blogs/${blogId}/faqs`)

// This route's own real public URL — used only as a fallback when the CMS
// canonical_url field is empty (see generateSEOMetadata in app/lib/seo.js).
// Note: the real route is singular /blog/{slug} (this file's own path),
// not /blogs/{slug} — the latter 404s.
const getCanonicalFallback = slug => {
  const host = headers().get('x-forwarded-host') || headers().get('host') || ''
  return host ? `https://${host}/blog/${slug}` : undefined
}

export async function generateMetadata ({ params }) {
  try {
    const slug = params?.slug
    const blogData = await getBlog(slug)

    // API body shape -> { success, message, data: { seo, blog } }
    const seo = blogData?.data?.seo || {}

    return generateSEOMetadata(seo, getCanonicalFallback(slug))
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function Page ({ params }) {
  const slug = params?.slug
  let schema = null
  let initialData = null
  let initialFaqs = null

  try {
    const blogData = await getBlog(slug)
    schema = blogData?.data?.seo?.schema || null
    initialData = blogData || null

    const blogId = blogData?.data?.blog?.id

    if (blogId) {
      try {
        initialFaqs = await getBlogFaqs(blogId)
      } catch (faqErr) {
        // FAQs are non-critical; let BlogClient fall back to a client fetch.
        initialFaqs = null
      }
    }
  } catch (err) {
    // A confirmed 404 from the API means no blog post exists at this slug —
    // return a real 404 instead of rendering an empty shell at HTTP 200.
    // Any other failure (network error, 5xx) falls through to the existing
    // behavior (render with no data) rather than risk showing a false 404
    // for a real post during a transient upstream issue.
    if (err?.status === 404) {
      notFound()
    }

    schema = null
    initialData = null
  }

  return (
    <>
      <JsonLd schema={schema} />
      <BlogClient slug={slug} initialData={initialData} initialFaqs={initialFaqs} />
    </>
  )
}


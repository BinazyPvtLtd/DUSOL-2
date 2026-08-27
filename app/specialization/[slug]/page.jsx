import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { generateSEOMetadata } from '@/app/lib/seo'
import { fetchApi } from '@/app/lib/serverApi'
import { getTrustedHost } from '@/app/lib/studentZone'
import SpecializationClient from './SpecializationClient'
import JsonLd from '@/components/JsonLd'

// Request-scoped: Next.js dedupes identical fetch() calls made during the
// same render pass, so generateMetadata() and Page() below share one
// network call instead of firing two.
const getSpecialization = slug => fetchApi(`/specializations/${slug}`)

// This route's own real public URL — used only as a fallback when the CMS
// canonical_url field is empty (see generateSEOMetadata in app/lib/seo.js).
const getCanonicalFallback = slug => {
  const host = getTrustedHost(
    headers().get('x-forwarded-host') || headers().get('host') || ''
  )
  return host ? `https://${host}/specialization/${slug}` : undefined
}

export async function generateMetadata ({ params }) {
  try {
    const slug = params?.slug
    const body = await getSpecialization(slug)

    const seo =
      body?.seo ||
      body?.data?.seo ||
      body?.data?.university?.seo ||
      {}

    return generateSEOMetadata(seo, getCanonicalFallback(slug))
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function Page ({ params }) {
  const slug = params?.slug
  let schema = null
  let initialData = null

  try {
    const body = await getSpecialization(slug)

    schema =
      body?.seo?.schema ||
      body?.data?.seo?.schema ||
      body?.data?.university?.seo?.schema ||
      null

    initialData = body || null
  } catch (err) {
    // A confirmed 404 from the API means no specialization exists at this
    // slug — return a real 404.
    if (err?.status === 404) {
      notFound()
    }

    // Any other failure (network error, 5xx, timeout) must not render a
    // contentless page at HTTP 200 — that is a soft 404 and risks the URL
    // being deindexed. Re-throw so Next.js returns a 5xx instead.
    throw err
  }

  return (
    <>
      <JsonLd schema={schema} />
      <SpecializationClient slug={slug} initialData={initialData} />
    </>
  )
}


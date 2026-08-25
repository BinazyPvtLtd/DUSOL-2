import HomeClient from './HomeClient'
import { generateSEOMetadata } from './lib/seo'
import { headers } from 'next/headers'
import axios from 'axios'
import JsonLd from '@/components/JsonLd'

async function fetchHomePageData() {
  let baseUrl = process.env.NEXT_PUBLIC_DEFAULT_API

  try {
    const headerList = await headers()

    const host = (
      headerList.get('x-forwarded-host') ||
      headerList.get('host') ||
      ''
    ).split(':')[0]

    const isLocal = ['localhost', '127.0.0.1', '0.0.0.0'].includes(host)

    if (!isLocal && host) {
      baseUrl = `https://${host}/api/v1`
    }
  } catch {
    // During static build or if headers() isn't available,
    // fallback to NEXT_PUBLIC_DEFAULT_API
  }

  return axios.get(`${baseUrl}/home`)
}

// The homepage's own real public URL — used only as a fallback when the
// CMS canonical_url field is empty (see generateSEOMetadata in
// app/lib/seo.js).
async function getCanonicalFallback() {
  try {
    const headerList = await headers()
    const host = (
      headerList.get('x-forwarded-host') || headerList.get('host') || ''
    ).split(':')[0]

    return host ? `https://${host}` : undefined
  } catch {
    return undefined
  }
}

export async function generateMetadata() {
  try {
    const response = await fetchHomePageData()

    const payload = response?.data
    const seo = payload?.seo || payload?.data?.seo || {}

    return generateSEOMetadata(seo, await getCanonicalFallback())
  } catch (err) {
    console.error('Metadata API Error:', err)

    return generateSEOMetadata({})
  }
}

export default async function HomePage() {
  try {
    const response = await fetchHomePageData()

    const payload = response?.data
    const schema = payload?.seo?.schema || payload?.data?.seo?.schema || null

    return (
      <>
        <JsonLd schema={schema} />
        <HomeClient initialData={response?.data || null} />
      </>
    )
  } catch (err) {
    console.error('Home Page API Error:', err)

    return <HomeClient initialData={null} />
  }
}
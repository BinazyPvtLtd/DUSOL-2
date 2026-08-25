import HomeClient from './HomeClient'
import { generateSEOMetadata } from './lib/seo'
import { headers } from 'next/headers'
import JsonLd from '@/components/JsonLd'
import { getTrustedHost } from '@/app/lib/studentZone'
import { fetchApi } from '@/app/lib/serverApi'

// Was previously a hand-rolled axios call whose destination was built from
// the request's own Host/X-Forwarded-Host header — a host-header-injection
// / SSRF vector (a spoofed header could make the server issue an outbound
// request to an attacker-chosen origin). fetchApi() is the same
// tenant-aware helper every other route (course/specialization/blog/
// student-zone/layout menu fetch) already uses: a fixed API origin
// (NEXT_PUBLIC_DEFAULT_API) plus a validated X-Tenant header derived via
// getTrustedHost(), never a dynamic request destination.
const fetchHomePageData = () => fetchApi('/home')

// The homepage's own real public URL — used only as a fallback when the
// CMS canonical_url field is empty (see generateSEOMetadata in
// app/lib/seo.js).
async function getCanonicalFallback() {
  try {
    const headerList = await headers()
    const trustedHost = getTrustedHost(
      headerList.get('x-forwarded-host') || headerList.get('host') || ''
    )
    const host = trustedHost?.split(':')[0]

    return host ? `https://${host}` : undefined
  } catch {
    return undefined
  }
}

export async function generateMetadata() {
  try {
    // fetchApi() already returns the parsed JSON body — unlike the previous
    // axios call, there is no outer { data: ... } response wrapper to
    // unwrap here. The API's own envelope ({ success, data: { seo, ... } })
    // is unchanged, so payload?.data?.seo still resolves the same value it
    // always did; payload?.seo is kept as the same defensive fallback used
    // elsewhere in this codebase, though the live /home response doesn't
    // currently use that shape.
    const payload = await fetchHomePageData()
    const seo = payload?.seo || payload?.data?.seo || {}

    return generateSEOMetadata(seo, await getCanonicalFallback())
  } catch (err) {
    console.error('Metadata API Error:', err)

    return generateSEOMetadata({})
  }
}

export default async function HomePage() {
  try {
    const payload = await fetchHomePageData()
    const schema = payload?.seo?.schema || payload?.data?.seo?.schema || null

    return (
      <>
        <JsonLd schema={schema} />
        <HomeClient initialData={payload || null} />
      </>
    )
  } catch (err) {
    console.error('Home Page API Error:', err)

    return <HomeClient initialData={null} />
  }
}
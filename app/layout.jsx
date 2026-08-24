import './globals.css'
import { headers } from 'next/headers'
import { Poppins, Mulish } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadModal from '@/components/LeadModal'
import { TenantProvider } from '@/context/TenantContext'
import { MenuDataProvider } from '@/context/MenuDataContext'
import { generateSEOMetadata } from './lib/seo'
import { fetchApi } from './lib/serverApi'
import { getTenantSlugFromHost } from './lib/studentZone'
import Script from 'next/script'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mulish',
  display: 'swap',
})

// Next.js App Router SEO:
// Provide server-rendered defaults that don't depend on client globals.
// (Your HomeClient can still overwrite via generateMetaData on the home page if needed.)
// export const metadata = generateSEOMetadata({})

export const metadata = {
  ...generateSEOMetadata({}),
  verification: {
    google: 'yMVa7f3jsnOyx1OgypjOO-8ceU-Yjng_gJiNSliSWU8',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Server-fetched once per request (RootLayout wraps every route) so Header
// has real course/specialization links in the initial server HTML instead
// of waiting on MenuDataContext's client-only fetch. fetchApi() already
// resolves and forwards the correct X-Tenant header for the incoming
// request's own host — see app/lib/serverApi.js. `null` on failure (rather
// than `[]`) tells MenuDataProvider its own client-side fetch still needs
// to run, same convention used for initialData elsewhere in this codebase.
async function loadMenuData () {
  try {
    const [coursesBody, specializationsBody] = await Promise.all([
      fetchApi('/courses'),
      fetchApi('/specializations')
    ])

    return {
      courses: coursesBody?.data || [],
      specializations: specializationsBody?.data || []
    }
  } catch (err) {
    return { courses: null, specializations: null }
  }
}

export default async function RootLayout ({ children }) {
  const { courses, specializations } = await loadMenuData()
  const tenantSlug = getTenantSlugFromHost(headers().get('host') || '')

  return (
    <html lang='en' className={`${poppins.variable} ${mulish.variable}`}>
      <body>
        <TenantProvider>
          <MenuDataProvider
            initialCourses={courses}
            initialSpecializations={specializations}
          >
            <Header tenantSlug={tenantSlug} />
            <main>{children}</main>
            <Footer />
            <LeadModal />
          </MenuDataProvider>
        </TenantProvider>

        <Script
  src='https://www.googletagmanager.com/gtag/js?id=G-VQL7QHMD33'
  strategy='afterInteractive'
/>

<Script id='google-analytics' strategy='afterInteractive'>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-VQL7QHMD33');
  `}
</Script>
      </body>
    </html>
  )
}






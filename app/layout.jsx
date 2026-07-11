import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadModal from '@/components/LeadModal'
import { TenantProvider } from '@/context/TenantContext'
import { generateSEOMetadata } from './lib/seo'
import Script from 'next/script'

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

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <TenantProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <LeadModal />
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






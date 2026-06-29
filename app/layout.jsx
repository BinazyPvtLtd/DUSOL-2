import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadModal from '@/components/LeadModal'
import { TenantProvider } from '@/context/TenantContext'
import { generateSEOMetadata } from './lib/seo'

// Next.js App Router SEO:
// Provide server-rendered defaults that don't depend on client globals.
// (Your HomeClient can still overwrite via generateMetaData on the home page if needed.)
export const metadata = generateSEOMetadata({})

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
      </body>
    </html>
  )
}






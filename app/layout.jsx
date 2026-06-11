import './globals.css'
// import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadModal from '@/components/LeadModal'

export const metadata = {
  title: 'DU SOL Admission 2026 | Online & Distance Courses — Information by College Drishti',
  description: 'DU SOL UG & PG admission 2026. Explore online and distance courses, fees, eligibility and admission updates. Information by College Drishti.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <TopBar /> */}
        <Header />
        <main>{children}</main>
        <Footer />
        <LeadModal />
      </body>
    </html>
  )
}

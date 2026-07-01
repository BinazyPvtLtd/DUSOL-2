'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getHomePageDataAPI } from '@/api'
import LeadModal from './LeadModal'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'
const mbaSpecializations = [
  ['Information Technology', 'information-technology'],
  ['Business Analytics', 'business-analytics'],
  ['Hospital Administration', 'hospital-administration-management'],
  ['International Trade', 'international-trade-management'],
  ['Rural Management', 'rural-management'],
  ['Retail Management', 'retail-management'],
  ['Business Management', 'business-management'],
  ['Project Management', 'project-management'],
  ['Marketing Management', 'marketing-management']
]

export default function Footer () {
  const [footerCTA, setFooterCTA] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [homeData, setHomeData] = useState(null)

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      const response = await getHomePageDataAPI()
      // Adjust this path if your API response is different
      setHomeData(response?.data?.data)
      setFooterCTA(response?.data?.data?.footer_cta)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(homeData, 'homeData')

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenItem(null)
  }

  return (
    <>
      <footer className='site-footer'>
        <div className='wrap'>
          <div className='footer-grid'>
            {/* Dynamic CTA */}
            <div className='footer-cta'>
              <h3>{footerCTA?.title}</h3>

              {footerCTA?.subtitle && (
                <span className='footer-subtitle'>{footerCTA.subtitle}</span>
              )}

              <p>{footerCTA?.description}</p>

              <button
                type='button'
                className='btn btn-gold'
                onClick={() => {
                  closeMobile()
                  setLeadModalOpen(true)
                }}
              >
                {footerCTA?.button_text || 'Apply Now'}
              </button>
            </div>

            {/* UG & PG Programs */}
            <div className='footer-col'>
              <h4>UG Programs</h4>

              <ul>
                <li>
                  <Link href='/courses?c=distance-ba'>Distance BA</Link>
                </li>
                <li>
                  <Link href='/courses?c=distance-bba'>Distance BBA</Link>
                </li>
                <li>
                  <Link href='/courses?c=distance-bms'>Distance BMS</Link>
                </li>
                <li>
                  <Link href='/courses?c=distance-bcom'>Distance BCom</Link>
                </li>
                <li>
                  <Link href='/courses?c=online-ba'>Online BA</Link>
                </li>
                <li>
                  <Link href='/courses?c=online-bcom'>Online BCom</Link>
                </li>
              </ul>

              <h4 style={{ marginTop: '24px' }}>PG Programs</h4>

              <ul>
                <li>
                  <Link href='/courses?c=distance-ma'>Distance MA</Link>
                </li>
                <li>
                  <Link href='/courses?c=distance-mba'>Distance MBA</Link>
                </li>
                <li>
                  <Link href='/courses?c=distance-mcom'>Distance MCom</Link>
                </li>
                <li>
                  <Link href='/courses?c=distance-mlis'>Distance MLIS</Link>
                </li>
              </ul>
            </div>

            {/* MBA Specializations */}
            <div className='footer-col'>
              <h4>MBA Specialisations</h4>

              <ul className='two-col'>
                {mbaSpecializations.map(([label, slug]) => (
                  <li key={slug}>
                    <Link href={`/courses?c=online-mba&s=${slug}`}>
                      {label} Management
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className='footer-disclaimer'>
            College Drishti acts as an information & counselling service. All
            university names, logos and trademarks mentioned are used for
            informational purposes only. We are not a university or an admission
            authority. Users are encouraged to verify information on the
            official website before making any admission decision.
          </p>
        </div>

        <div className='footer-bottom'>
          <div className='fb-links'>
            <Link href='/'>Disclaimer</Link>
            <span>|</span>
            <Link href='/'>Privacy Policy</Link>
            <span>|</span>
            <Link href='/'>Terms & Conditions</Link>
          </div>

          <div className='p-4'>
            © {new Date().getFullYear()} DOSOLCOLLEGEDRISHTI · Powered by
            College Drishti. All Rights Reserved.
          </div>
        </div>
      </footer>

      <div className='float-cta'>
        <a
          className='float-wa'
          href='https://wa.me/910123456789'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='WhatsApp'
        >
          <FaWhatsapp />
        </a>

        <a className='float-call' href='tel:01234567890' aria-label='Call'>
          <FaPhoneAlt />
        </a>
      </div>

      <LeadModal
        open={leadModalOpen}
        setOpen={setLeadModalOpen}
        pageType='home'
        pageId={homeData?.id}
      />
    </>
  )
}

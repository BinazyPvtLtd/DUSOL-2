  'use client'

  import { useState } from 'react'
  import Link from 'next/link'
  import Image from 'next/image'
  import { useMenuData } from '@/context/MenuDataContext'
  import { useTenant } from '@/context/TenantContext'
  import LeadModal from './LeadModal'
  import LegalModal from './legal/LegalModal'
  import DisclaimerContent from './legal/DisclaimerContent'
  import PrivacyPolicyContent from './legal/PrivacyPolicyContent'
  import TermsConditionsContent from './legal/TermsConditionsContent'
  import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'
  import footerLogo from '../public/assets/images/footer-logo.png'

  export default function Footer () {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openItem, setOpenItem] = useState(null)
    const [leadModalOpen, setLeadModalOpen] = useState(false)
    const [activeLegal, setActiveLegal] = useState(null)
    const { courses, specializations } = useMenuData()
    // /home is fetched once by TenantContext (shared source of truth) —
    // Footer used to fetch it again independently.
    const { homeData } = useTenant()
    const footerCTA = homeData?.footer_cta


    const closeMobile = () => {
      setMobileOpen(false)
      setOpenItem(null)
    }

    const ugCourses = courses.filter(
      c => c.course_level === 'UG'
    )

    const pgCourses = courses.filter(
      c => c.course_level === 'PG'
    )

    // Matches by course content ("mba" + "distance" in the course's own
    // name/slug) rather than a specific tenant's course slug/name, so
    // this works for any tenant's own Distance MBA course. study_mode
    // isn't available on the course object nested under /specializations,
    // so this relies on the same "distance"/"online" naming convention
    // course slugs/names already use everywhere else in this app.
    const mbaSpecializations = specializations.filter(s => {
      const courseText = `${s.course?.name ?? ''} ${s.course?.slug ?? ''}`.toLowerCase()

      return courseText.includes('mba') && courseText.includes('distance')
    })

    return (
      <>
        <footer className='site-footer'>
          <div className='wrap'>
            <div className='footer-grid '>
              {/* Dynamic CTA */}
              <div className='footer-cta'>
                <div className='mb-4 bg-white p-4 rounded-lg shadow-md w-[220px] h-[100px] '>
                  <Image src={footerLogo} alt="Footer Logo"  className='w-full h-full'/>
                </div>
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
              <div className='footer-col md:mx-auto'>
                <h4>UG Programs</h4>

                <ul>
                  {ugCourses.map(course => (
                    <li key={course.id}>
                      <Link href={`/courses/${course.slug}`}>
                        {course.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <h4 style={{ marginTop: '24px' }}>PG Programs</h4>

                <ul>
                  {pgCourses.map(course => (
                    <li key={course.id}>
                      <Link href={`/courses/${course.slug}`}>
                        {course.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MBA Specializations */}
              <div className='footer-col'>
                <h4>MBA Specialisations</h4>

                <ul className='two-col'>
                  {mbaSpecializations.map(item => (
                    <li key={item.id}>
                      <Link href={`/specialization/${item.slug}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className='footer-disclaimer'>
              distanceeducationlearning.com acts as an information & counselling service. All
              university names, logos and trademarks mentioned are used for
              informational purposes only. We are not a university or an admission
              authority. Users are encouraged to verify information on the
              official website before making any admission decision.
            </p>
          </div>

          <div className='footer-bottom'>
            <div className='fb-links'>
              <button type='button' onClick={() => setActiveLegal('disclaimer')}>
                Disclaimer
              </button>
              <span>|</span>
              <button type='button' onClick={() => setActiveLegal('privacy')}>
                Privacy Policy
              </button>
              <span>|</span>
              <button type='button' onClick={() => setActiveLegal('terms')}>
                Terms & Conditions
              </button>
            </div>

            <div className='p-4'>
              © {new Date().getFullYear()} Powered by
              distanceeducationlearning.com. All Rights Reserved.
            </div>
          </div>
        </footer>

        <div className='float-cta'>
          <a
            className='float-wa'
            href='https://wa.me/919217310430'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='WhatsApp'
          >
            <FaWhatsapp />
          </a>

          <a className='float-call' href='tel:9217310430' aria-label='Call'>
            <FaPhoneAlt />
          </a>
        </div>

        <LeadModal
          open={leadModalOpen}
          setOpen={setLeadModalOpen}
          pageType='home'
          pageId={homeData?.id}
        />

        <LegalModal
          open={activeLegal === 'disclaimer'}
          onClose={() => setActiveLegal(null)}
          title='Disclaimer'
          viewFullPageHref='/disclaimer'
        >
          <DisclaimerContent />
        </LegalModal>

        <LegalModal
          open={activeLegal === 'privacy'}
          onClose={() => setActiveLegal(null)}
          title='Privacy Policy'
          viewFullPageHref='/privacy-policy'
        >
          <PrivacyPolicyContent />
        </LegalModal>

        <LegalModal
          open={activeLegal === 'terms'}
          onClose={() => setActiveLegal(null)}
          title='Terms & Conditions'
          viewFullPageHref='/terms-and-conditions'
        >
          <TermsConditionsContent />
        </LegalModal>
      </>
    )
  }

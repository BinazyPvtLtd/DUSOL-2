'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getHomePageDataAPI,
  getCourseDataAPI,
  getSpecializationsAPI
} from '@/api'
import LeadModal from './LeadModal'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

export default function Footer () {
  const [footerCTA, setFooterCTA] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [homeData, setHomeData] = useState(null)
  const [courses, setCourses] = useState([])
  const [specializations, setSpecializations] = useState([])

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      const [homeRes, courseRes, specializationRes] = await Promise.all([
        getHomePageDataAPI(),
        getCourseDataAPI(),
        getSpecializationsAPI()
      ])

      // Adjust this path if your API response is different
      setHomeData(homeRes?.data?.data)
      setFooterCTA(homeRes?.data?.data?.footer_cta)
      setCourses(courseRes?.data?.data || [])
      setSpecializations(specializationRes?.data?.data || [])
    } catch (error) {
      console.error(error)
    }
  }

  console.log(homeData, 'homeData')

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

  const mbaSpecializations = specializations.filter(
    s =>
      s.course?.slug === 'distance-mba' ||
      s.course?.name === 'Distance MBA'
  )

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
            <Link href='/'>Disclaimer</Link>
            <span>|</span>
            <Link href='/'>Privacy Policy</Link>
            <span>|</span>
            <Link href='/'>Terms & Conditions</Link>
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

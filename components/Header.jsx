'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LeadModal from './LeadModal'
import { useTenant } from '@/context/TenantContext'
import { getStorageBaseUrl } from '@/constant/constant'
import Image from 'next/image'
import {
  getCourseDataAPI,
  getSpecializationsAPI
} from '@/api'
import {
  STUDENT_ZONE_PAGES,
  buildStudentZoneUrl,
  getTenantSlugFromHost
} from '@/app/lib/studentZone'

function DesktopDropdown({ item }) {
  if ('link' in item) return null

  return (
    <div className='dropdown single'>
      {item.items.map((it, ii) => (
        <Link key={ii} className='dd-link' href={it.href}>
          {it.label}
        </Link>
      ))}
    </div>
  )
}

function MobileSubMenu({ item, onClose }) {
  if ('link' in item) return null

  return (
    <>
      {item.items.map((it, ii) => (
        <Link key={ii} href={it.href} onClick={onClose}>
          {it.label}
        </Link>
      ))}
    </>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [specializations, setSpecializations] = useState([])
  const { tenant, loading } = useTenant()

  useEffect(() => {
    loadMenu()
  }, [])

  const loadMenu = async () => {
    try {
      const [courseRes, specializationRes] = await Promise.all([
        getCourseDataAPI(),
        getSpecializationsAPI()
      ])

      setCourses(courseRes.data.data)
      setSpecializations(specializationRes.data.data)
    } catch (error) {
      console.error('Header Menu Error', error)
    }
  }

  if (loading) return null

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenItem(null)
  }

  const ugCourses = courses.filter(course => course.course_level === 'UG')

  const pgCourses = courses.filter(course => course.course_level === 'PG')

  const mbaSpecializations = specializations.filter(
    item =>
      item.course?.slug === 'distance-mba' ||
      item.course?.name === 'Distance MBA'
  )

  const tenantSlug =
    typeof window !== 'undefined'
      ? getTenantSlugFromHost(window.location.hostname)
      : null

  const MENU = [
    {
      label: 'Bachelor Programs',
      items: ugCourses.map(course => ({
        label: course.name,
        href: `/courses/${course.slug}`
      }))
    },
    {
      label: 'Master Programs',
      items: pgCourses.map(course => ({
        label: course.name,
        href: `/courses/${course.slug}`
      }))
    },
    {
      label: 'MBA Specialization',
      items: mbaSpecializations.map(item => ({
        label: item.name,
        href: `/specialization/${item.slug}`
      }))
    },
    {
      label: 'Student Zone',
      items: STUDENT_ZONE_PAGES.map(page => ({
        label: page.label,
        href: buildStudentZoneUrl(tenantSlug, page.key)
      }))
    },
    { label: 'Blogs', link: '/blogs' }
  ]

  return (
    <>
      <header className='site-header'>
        <div className='wrap'>
          <nav className='nav'>
            <Link className='logo' href='/'>
              {tenant?.logo && (
                <img
                  src={`${getStorageBaseUrl()}/${tenant.logo}`}
                  alt='logo'
                  width={55}
                  height={55}
                />
              )}
              <span className='logo-divider'></span>
              <span className='logo-text'>
                <strong
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 800,
                    fontSize: '20px',
                    color: 'var(--purple-dark)',
                    letterSpacing: '.5px'
                  }}
                >
                  {tenant?.short_name || tenant?.name}
                </strong>

                {tenant?.tagline && (
                  <span className="logo-sub">
                    {tenant.tagline}
                  </span>
                )}
              </span>
            </Link>
            <ul className='menu'>
              {MENU.map((m, i) => (
                <li key={i}>
                  {'link' in m ? (
                    <Link href={m.link}>{m.label}</Link>
                  ) : (
                    <>
                      <a href='javascript:void(0)'>
                        {m.label} <span className='caret'>▾</span>
                      </a>
                      <DesktopDropdown item={m} />
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div className='nav-actions'>
              <button
                type='button'
                className='btn btn-gold'
                onClick={() => setLeadModalOpen(true)}
              >
                ENQUIRY{' '}
                <svg
                  viewBox='0 0 24 24'
                  width='16'
                  height='16'
                  fill='currentColor'
                >
                  <path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
                </svg>
              </button>
              <button
                className='burger'
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label='Menu'
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={`mm-overlay${mobileOpen ? ' open' : ''}`}
        onClick={closeMobile}
      />

      <aside className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <button className='mm-close' onClick={closeMobile}>
          &times;
        </button>
        <div className="mm-logo">
          {tenant?.short_name || tenant?.name}
        </div>
        {MENU.map((m, i) => (
          <div key={i} className={`mm-item${openItem === i ? ' open' : ''}`}>
            {'link' in m ? (
              <div className='mm-link'>
                <Link
                  href={m.link}
                  style={{ color: 'inherit' }}
                  onClick={closeMobile}
                >
                  {m.label}
                </Link>
              </div>
            ) : (
              <>
                <div
                  className='mm-link'
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                >
                  {m.label}
                  <span className='mc'>▾</span>
                </div>
                <div
                  className='mm-sub'
                  style={{ maxHeight: openItem === i ? '600px' : '0' }}
                >
                  <MobileSubMenu item={m} onClose={closeMobile} />
                </div>
              </>
            )}
          </div>
        ))}
        <button
          type='button'
          className='btn btn-gold'
          onClick={() => {
            closeMobile()
            setLeadModalOpen(true)
          }}
        >
          ENQUIRY{' '}
          <svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor'>
            <path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
          </svg>
        </button>
      </aside>
      <LeadModal open={leadModalOpen} setOpen={setLeadModalOpen} />
    </>
  )
}

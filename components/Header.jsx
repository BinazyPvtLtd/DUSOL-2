'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LeadModal from './LeadModal'
import { useTenant } from '@/context/TenantContext'
import { useMenuData } from '@/context/MenuDataContext'
import { getStorageBaseUrl } from '@/constant/constant'
import Image from 'next/image'
import {
  STUDENT_ZONE_PAGES,
  buildStudentZoneUrl
} from '@/app/lib/studentZone'


// Groups courses by the API's study_mode (Online | Distance).
// Unknown modes land in "other" so no course disappears from the menu.
function groupCoursesByMode(courses) {
  const groups = {
    online: [],
    distance: [],
    other: []
  }

  courses.forEach(course => {
    const mode = (course.study_mode ?? '').trim().toLowerCase()

    switch (mode) {
      case 'online':
        groups.online.push(course)
        break
      case 'distance':
        groups.distance.push(course)
        break
      default:
        groups.other.push(course)
    }
  })

  return groups
}

const toCourseLink = course => ({
  label: course.name,
  href: `/courses/${course.slug}`
})

function buildProgramMenuItems(courses) {
  const { online, distance, other } = groupCoursesByMode(courses)

  const items = []

  if (online.length) {
    items.push({ label: 'Online', children: online.map(toCourseLink) })
  }

  if (distance.length) {
    items.push({ label: 'Distance', children: distance.map(toCourseLink) })
  }

  return [...items, ...other.map(toCourseLink)]
}

function DesktopDropdown({ item }) {
  if ('link' in item) return null

  return (
    <div className='dropdown single'>
      {item.items.map((it, ii) =>
        it.children ? (
          <div key={ii}>
            <div className='dd-group-title'>{it.label}</div>
            {it.children.map((child, ci) => (
              <Link key={ci} className='dd-link' href={child.href}>
                {child.label}
              </Link>
            ))}
          </div>
        ) : (
          <Link key={ii} className='dd-link' href={it.href}>
            {it.label}
          </Link>
        )
      )}
    </div>
  )
}

function MobileSubMenu({ item, onClose }) {
  if ('link' in item) return null

  return (
    <>
      {item.items.map((it, ii) =>
        it.children ? (
          <div key={ii}>
            <div className='mm-gt'>{it.label}</div>
            {it.children.map((child, ci) => (
              <Link key={ci} href={child.href} onClick={onClose} className='mm-sub-link'>
                {child.label}
              </Link>
            ))}
          </div>
        ) : (
          <Link key={ii} href={it.href} onClick={onClose}>
            {it.label}
          </Link>
        )
      )}
    </>
  )
}

export default function Header({ tenantSlug = null }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const { courses, specializations } = useMenuData()
  const { tenant } = useTenant()

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenItem(null)
  }

  const ugCourses = courses.filter(course => course.course_level === 'UG')

  const pgCourses = courses.filter(course => course.course_level === 'PG')

  // Matches by course content ("mba" + "distance" in the course's own
  // name/slug) rather than a specific tenant's course slug/name, so this
  // works for any tenant's own Distance MBA course. study_mode isn't
  // available on the course object nested under /specializations, so this
  // relies on the same "distance"/"online" naming convention course
  // slugs/names already use everywhere else in this app.
  const mbaSpecializations = specializations.filter(item => {
    const courseText = `${item.course?.name ?? ''} ${item.course?.slug ?? ''}`.toLowerCase()

    return courseText.includes('mba') && courseText.includes('distance')
  })


  const MENU = [
    {
      label: 'Bachelor Programs',
      items: buildProgramMenuItems(ugCourses)
    },
    {
      label: 'Master Programs',
      items: buildProgramMenuItems(pgCourses)
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
                    fontSize: '18px',
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
                  style={{ maxHeight: openItem === i ? '1000px' : '0' }}
                >
                  <MobileSubMenu item={m} onClose={closeMobile} />
                </div>
              </>
            )}
          </div>
        ))}
        <button
          type='button'
          className='btn btn-gold mt-4'
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

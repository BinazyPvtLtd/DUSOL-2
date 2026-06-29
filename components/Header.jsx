'use client'

import { useState } from 'react'
import Link from 'next/link'
import LeadModal from './LeadModal'
import { useTenant } from '@/context/TenantContext'
import { getStorageBaseUrl } from '@/constant/constant'
import Image from 'next/image'
const MENU = [
  {
    label: 'Distance Course',
    type: 'cols',
    groups: [
      {
        title: 'Bachelor Programs',
        items: [
          ['Distance BA from DU SOL', '/courses?c=distance-ba'],
          ['Distance BBA from DU SOL', '/courses?c=distance-bba'],
          ['Distance BMS from DU SOL', '/courses?c=distance-bms'],
          ['Distance BCom from DU SOL', '/courses?c=distance-bcom']
        ]
      },
      {
        title: 'Master Programs',
        items: [
          ['Distance MA from DU SOL', '/courses?c=distance-ma'],
          ['Distance MBA from DU SOL', '/courses?c=distance-mba'],
          ['Distance MCOM from DU SOL', '/courses?c=distance-mcom'],
          ['Distance MLIS from DU SOL', '/courses?c=distance-mlis']
        ]
      }
    ]
  },
  {
    label: 'Online Course',
    type: 'cols',
    groups: [
      {
        title: 'Bachelor Programs',
        items: [
          ['Online BA from DU SOL', '/courses?c=online-ba'],
          ['Online BBA from DU SOL', '/courses?c=online-bba'],
          ['Online BCom from DU SOL', '/courses?c=online-bcom']
        ]
      },
      {
        title: 'Master Programs',
        items: [
          ['Online MA from DU SOL', '/courses?c=online-ma'],
          ['Online MBA from DU SOL', '/courses?c=online-mba'],
          ['Online MCA from DU SOL', '/courses?c=online-mca'],
          ['Online MCOM from DU SOL', '/courses?c=online-mcom'],
          ['Online MSC from DU SOL', '/courses?c=online-msc'],
          ['Online MJMC from DU SOL', '/courses?c=online-mjmc'],
          ['Online MLIS from DU SOL', '/courses?c=online-mlis'],
          ['Online MTech from DU SOL', '/courses?c=online-mtech']
        ]
      }
    ]
  },
  {
    label: 'MBA Specialization',
    type: 'single',
    items: [
      [
        'MBA in Information Technology',
        '/courses?c=online-mba&s=information-technology'
      ],
      [
        'MBA in Business Analytics',
        '/courses?c=online-mba&s=business-analytics'
      ],
      [
        'MBA in Hospital Administration Management',
        '/courses?c=online-mba&s=hospital-administration-management'
      ],
      [
        'MBA in International Trade Management',
        '/courses?c=online-mba&s=international-trade-management'
      ],
      ['MBA in Rural Management', '/courses?c=online-mba&s=rural-management'],
      ['MBA in Retail Management', '/courses?c=online-mba&s=retail-management'],
      [
        'MBA in Business Management',
        '/courses?c=online-mba&s=business-management'
      ],
      [
        'MBA in Project Management',
        '/courses?c=online-mba&s=project-management'
      ],
      [
        'MBA in Marketing Management',
        '/courses?c=online-mba&s=marketing-management'
      ]
    ]
  },
  {
    label: 'Student Zone',
    type: 'single',
    items: [
      ['DUSOL Admission', '/student-zone?p=dusol-admission'],
      ['DUSOL Courses Fees', '/student-zone?p=dusol-courses-fees'],
      ['DUSOL Hall Ticket', '/student-zone?p=dusol-hall-ticket'],
      ['DU SOL Study Material', '/student-zone?p=du-sol-study-material'],
      ['DUSOL Result', '/student-zone?p=dusol-result'],
      ['DU SOL Library Portal', '/student-zone?p=du-sol-library-portal'],
      ['DU SOL Assignment Status', '/student-zone?p=du-sol-assignment-status'],
      [
        'DUSOL Alternative Universities',
        '/student-zone?p=dusol-alternative-universities'
      ]
    ]
  },
  { label: 'Blogs', link: '/blogs' }
]

function DesktopDropdown ({ item }) {
  if ('link' in item) return null

  if (item.type === 'cols') {
    return (
      <div className='dropdown cols'>
        {item.groups.map((g, gi) => (
          <div key={gi}>
            <div className='dd-group-title'>{g.title}</div>
            {g.items.map((it, ii) => (
              <Link key={ii} className='dd-link' href={it[1]}>
                {it[0]}
              </Link>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='dropdown single'>
      {item.items.map((it, ii) => (
        <Link key={ii} className='dd-link' href={it[1]}>
          {it[0]}
        </Link>
      ))}
    </div>
  )
}

function MobileSubMenu ({ item, onClose }) {
  if ('link' in item) return null

  if (item.type === 'cols') {
    return (
      <>
        {item.groups.map((g, gi) => (
          <div key={gi}>
            <div className='mm-gt'>{g.title}</div>
            {g.items.map((it, ii) => (
              <Link key={ii} href={it[1]} onClick={onClose}>
                {it[0]}
              </Link>
            ))}
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {item.items.map((it, ii) => (
        <Link key={ii} href={it[1]} onClick={onClose}>
          {it[0]}
        </Link>
      ))}
    </>
  )
}

export default function Header () {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const { tenant, loading } = useTenant()

  if (loading) return null

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenItem(null)
  }
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
                  DU SOL
                </strong>
                <span className='logo-sub'>Information by College Drishti</span>
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
        <div className='mm-logo'>DU SOL</div>
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

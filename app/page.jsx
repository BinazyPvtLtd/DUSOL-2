'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import img1 from '../public/assets/accreditationsImg/NAAC.png'
import img2 from '../public/assets/accreditationsImg/UGC.png'
import img3 from '../public/assets/accreditationsImg/AICTE.png'

const COURSES_DATA = {
  'online-ba': {
    tag: 'BA',
    title: 'Online BA (DU SOL Bachelor of Arts)',
    dur: '3 Years',
    intro:
      'The Online BA program offers flexible, accessible humanities education from the University of Delhi School of Open Learning. Study at your own pace with online study material, recorded lectures and academic support.',
    href: '/courses?c=online-ba'
  },
  'online-bba': {
    tag: 'BBA',
    title: 'Online BBA (DU SOL Bachelor of Business Administration)',
    dur: '3 Years',
    intro:
      'It is the Online BBA program offered by the University of Delhi School of Open Learning (DU SOL), specifically designed for students looking to pursue a career in management and business with a flexible learning approach.',
    href: '/courses?c=online-bba'
  },
  'online-bcom': {
    tag: 'BCom',
    title: 'Online BCom (DU SOL Bachelor of Commerce)',
    dur: '3 Years',
    intro:
      'The Online BCom program from DU SOL is perfect for online learners seeking a quality commerce education at home — covering accounting, finance, taxation and business studies.',
    href: '/courses?c=online-bcom'
  },
  'distance-bms': {
    tag: 'BMS',
    title: 'Distance BMS (DU SOL Bachelor of Management Studies)',
    dur: '3 Years',
    intro:
      'The Distance BMS program focuses on management studies, leadership and strategy — preparing students for management careers with a practical, career-oriented curriculum.',
    href: '/courses?c=distance-bms'
  },
  'online-ma': {
    tag: 'MA',
    title: 'Online MA (DU SOL Master of Arts)',
    dur: '2 Years',
    intro:
      'The Online MA program at DU SOL is offered in various disciplines through online education mode, helping graduates pursue advanced study flexibly while managing personal and professional commitments.',
    href: '/courses?c=online-ma'
  },
  'online-mba': {
    tag: 'MBA',
    title: 'Online MBA (DU SOL Master of Business Administration)',
    dur: '2 Years',
    intro:
      'The Online MBA program is designed to provide management education through online learning, with specializations and live sessions. Ideal for professionals seeking leadership roles without pausing their careers.',
    href: '/courses?c=online-mba'
  },
  'online-mcom': {
    tag: 'MCom',
    title: 'Online MCom (DU SOL Master of Commerce)',
    dur: '2 Years',
    intro:
      'The Online MCom program provides advanced commerce education through online mode, suited to commerce graduates aiming to strengthen their expertise for academic, banking and corporate careers.',
    href: '/courses?c=online-mcom'
  },
  'online-mca': {
    tag: 'MCA',
    title: 'Online MCA (DU SOL Master of Computer Applications)',
    dur: '2 Years',
    intro:
      'The Online MCA program is designed for working professionals and graduates who want to build advanced skills in computer applications, programming and software development.',
    href: '/courses?c=online-mca'
  }
}

const HOME_FAQ = [
  [
    'What is DU SOL?',
    'DU SOL (School of Open Learning) is a distance and online education institution under the University of Delhi offering UG and PG programs.'
  ],
  [
    'How can I apply for DU SOL admission?',
    'Apply online by filling the application form, uploading documents and completing the process through the official portal — with free guidance from College Drishti.'
  ],
  [
    'Is DU SOL recognized by UGC?',
    'Yes, DU SOL is recognized by the UGC and approved for distance learning education.'
  ],
  [
    'Does DU SOL provide study material?',
    'Yes, DU SOL provides study materials and academic support through online and offline resources.'
  ],
  [
    'What courses are offered by DU SOL?',
    'BA, BCom, BBA, BMS, MA, MCom, MBA, MCA and more across UG and PG levels.'
  ],
  [
    'Are DU SOL degrees valid for jobs?',
    'Yes, DU SOL degrees are valid for government jobs, private employment and higher education.'
  ],
  [
    'Who can apply for DU SOL admission?',
    'Students who completed 10+2 (for UG) or graduation (for PG) from a recognized board or university.'
  ],
  [
    'Can working professionals apply?',
    'Yes, DU SOL programs are well-suited to working professionals due to their flexible learning structure.'
  ],
  [
    'What is the mode of study at DU SOL?',
    'DU SOL provides education through online and distance learning modes, allowing flexible study.'
  ],
  [
    'Where can students get DU SOL updates?',
    'Get the latest admission updates, eligibility details and guidance through COLLEGEDRISHTI.'
  ]
]

function CourseCard ({ c }) {
  const years = c.dur.split(' ')[0]
  const fullName =
    c.title
      .split('(')
      .pop()
      ?.replace(')', '')
      .replace(/^DU SOL /, '') || ''
  const shortDesc = c.intro.split('.')[0] + '.'
  return (
    <div className='course-card'>
      <span className='yr'>{years} Year</span>
      <h3>{c.tag.toUpperCase()}</h3>
      <div className='full'>{fullName}</div>
      <p>{shortDesc}</p>
      <Link href={c.href} className='btn btn-purple btn-block'>
        Know More
      </Link>
    </div>
  )
}

function FaqItem ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <div className='faq-q' onClick={() => setOpen(!open)}>
        {q}
        <span className='ic'>+</span>
      </div>
      <div className='faq-a' style={{ maxHeight: open ? '200px' : '0' }}>
        <div>{a}</div>
      </div>
    </div>
  )
}

export default function HomePage () {
  const [activeTab, setActiveTab] = useState('bachelor')

  const bachelorCards = [
    'online-ba',
    'online-bba',
    'online-bcom',
    'distance-bms'
  ].map(k => COURSES_DATA[k])
  const masterCards = [
    'online-ma',
    'online-mba',
    'online-mcom',
    'online-mca'
  ].map(k => COURSES_DATA[k])

  return (
    <>
      {/* HERO */}
      <section className='hero'>
        <div className='wrap'>
          <div className='hero-copy'>
            <span className='hero-eyebrow'>Admission Open · 2026 Session</span>
            <h1>
              DU SOL Admission Open For
              <br />
              2026 Session: <span className='y'>Apply Now!</span>
            </h1>
            <p className='lead'>
              The School of Open Learning (SOL), University of Delhi offers UG
              &amp; PG distance and online programmes. The last date to apply
              for DU SOL distance courses is generally <b>31st May 2026</b>.
            </p>
            <div className='hero-badges'>
              <div className='acc-logo'>
                <Image
                  src={img1}
                  alt='NAAC Accredited'
                  width={60}
                  height={60}
                />
                <div
                  style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-head)',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'var(--purple-dark)',
                    lineHeight: 1.2
                  }}
                >
                  NAAC Accredited
                  <br />
                  Grade A++
                </div>
              </div>

              <div className='acc-logo'>
                <Image
                  src={img2}
                  alt='UGC + DEB Approved'
                  width={60}
                  height={60}
                />
                <div
                  style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-head)',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'var(--purple-dark)',
                    lineHeight: 1.2
                  }}
                >
                  UGC + DEB
                  <br />
                  Approved
                </div>
              </div>

              <div className='acc-logo'>
                <Image src={img3} alt='AICTE Approved' width={60} height={60} />
                <div
                  style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-head)',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'var(--purple-dark)',
                    lineHeight: 1.2
                  }}
                >
                  AICTE
                  <br />
                  Approved
                </div>
              </div>
            </div>
            <div className='hero-actions'>
              <Link href='/blogs' className='btn btn-gold'>
                Get 100% Free Guidance
              </Link>
              <a href='#' className='btn btn-outline-white hero-podcast'>
                <span className='mic'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11z' />
                  </svg>
                </span>{' '}
                Listen Podcast
              </a>
            </div>
          </div>
          <div className='hero-visual'>
            <div className='video-card'>
              <span className='vc-du'>🎓 Delhi University</span>
              <div className='vc-left'>
                <span className='vc-small'>All About</span>
                <span className='vc-big'>
                  DU<span>SOL</span>
                </span>
                <span className='vc-tag'>Online &amp; Distance Courses</span>
                <span className='vc-sub'>Complete Details</span>
              </div>
              <svg
                className='vc-figure'
                viewBox='0 0 120 150'
                xmlns='http://www.w3.org/2000/svg'
              >
                <ellipse
                  cx='60'
                  cy='145'
                  rx='44'
                  ry='8'
                  fill='rgba(0,0,0,.25)'
                />
                <path
                  d='M22 150 C22 110 40 96 60 96 C80 96 98 110 98 150 Z'
                  fill='#f7c615'
                />
                <path d='M44 100 h32 v18 a16 16 0 01-32 0 z' fill='#f3b9a0' />
                <circle cx='60' cy='74' r='24' fill='#f7c6a8' />
                <path
                  d='M36 70 c0 -22 48 -22 48 0 c4 -2 4 -16 -8 -24 c-10 -8 -26 -6 -34 4 c-8 8 -8 16 -6 20z'
                  fill='#3a2218'
                />
                <circle cx='51' cy='74' r='3' fill='#3a2218' />
                <circle cx='69' cy='74' r='3' fill='#3a2218' />
                <path
                  d='M53 84 q7 5 14 0'
                  stroke='#c98b6b'
                  strokeWidth='2'
                  fill='none'
                />
              </svg>
              <a className='vc-play' href='#' aria-label='Play'>
                <svg viewBox='0 0 24 24'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              </a>
              <span className='vc-watch'>Watch On YouTube</span>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS + ABOUT */}
      <section className='news-about'>
        <div className='wrap'>
          <div className='grid'>
            <div className='card news-card'>
              <h3>📰 Latest News</h3>
              <div className='news-item'>
                <div className='news-date'>
                  <b>15</b>
                  <span>May</span>
                </div>
                <div>
                  <h4>CUET UG 2025 Admit Card Released</h4>
                  <Link href='/blogs'>Read More →</Link>
                </div>
              </div>
              <div className='news-item'>
                <div className='news-date'>
                  <b>12</b>
                  <span>May</span>
                </div>
                <div>
                  <h4>Bihar DElEd 2025 Result Declared</h4>
                  <Link href='/blogs'>Read More →</Link>
                </div>
              </div>
              <div className='news-item'>
                <div className='news-date'>
                  <b>10</b>
                  <span>May</span>
                </div>
                <div>
                  <h4>UP Scholarship 2025 Last Date Extended</h4>
                  <Link href='/blogs'>Read More →</Link>
                </div>
              </div>
              <div className='news-item'>
                <div className='news-date'>
                  <b>08</b>
                  <span>May</span>
                </div>
                <div>
                  <h4>NEET UG 2025 Exam City Intimation Released</h4>
                  <Link href='/blogs'>Read More →</Link>
                </div>
              </div>
              <div className='news-item'>
                <div className='news-date'>
                  <b>05</b>
                  <span>May</span>
                </div>
                <div>
                  <h4>New Government College Approved in Bihar</h4>
                  <Link href='/blogs'>Read More →</Link>
                </div>
              </div>
              <Link
                href='/blogs'
                className='btn btn-purple btn-block'
                style={{ marginTop: '16px' }}
              >
                VIEW ALL NEWS
              </Link>
            </div>
            <div className='about-block'>
              <h2>About Us – Welcome to DU SOL COLLEGEDRISHTI</h2>
              <p>
                DU SOL has become one of the top options for students who want
                inexpensive and flexible college education across India. Since
                it is a member of the University of Delhi, the school allows
                students to pursue approved degree programs without the
                restrictions of traditional classroom instruction.
              </p>
              <p>
                Through the years, DU SOL has helped thousands of students
                continue their education through its distance-learning and
                online learning approach. The university offers numerous
                undergraduate and postgraduate classes designed specifically to
                address the needs of students who are just starting out,
                professionals in the workforce, as well as those who wish to
                upgrade their skills.
              </p>
              <p>
                One of the main benefits of pursuing a degree at DU SOL is the
                opportunity to obtain an academic degree from the University of
                Delhi while maintaining the flexibility of learning. Students
                can access study material, academic support, exam updates and
                other resources via a standardized digital environment.
              </p>
              <p>
                If you&apos;re looking for an alternative to continue your
                education while balancing professional or personal demands, DU
                SOL offers an efficient and reliable path to reaching your
                academic and professional objectives.
              </p>
              <Link href='/blogs' className='btn btn-gold'>
                FREE Guidance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROGRAMS */}
      <section className='courses-sec'>
        <div className='wrap'>
          <div className='sec-head'>
            <h2 className='sec-title underline'>Our Programs</h2>
          </div>
          <div className='intro-text'>
            <p>
              DU SOL provides a diverse selection of academic programs for
              students looking for flexibility in their higher education — a
              great option for working professionals, exam aspirants and those
              with personal commitments.
            </p>
            <p>
              The school offers undergraduate and postgraduate programs across
              disciplines. Popular UG programs include BA, BCom, BBA and BMS; PG
              options include MA, MCom, MBA and other specialized courses.
            </p>
          </div>
          <div className='tabs'>
            <button
              className={`tab-btn${activeTab === 'bachelor' ? ' active' : ''}`}
              onClick={() => setActiveTab('bachelor')}
            >
              Bachelor Courses
            </button>
            <button
              className={`tab-btn${activeTab === 'master' ? ' active' : ''}`}
              onClick={() => setActiveTab('master')}
            >
              Master Courses
            </button>
          </div>
          <div className='course-grid'>
            {(activeTab === 'bachelor' ? bachelorCards : masterCards).map(
              (c, i) => (
                <CourseCard key={i} c={c} />
              )
            )}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className='eligibility'>
        <div className='wrap'>
          <div className='grid'>
            <div>
              <h2>Eligibility Criteria for DU SOL Admission in 2026</h2>
              <div className='elig-group'>
                <h4>Educational Qualification</h4>
                <div className='eitem'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
                  </svg>
                  <span>
                    Undergraduate (UG): Candidates must have completed their
                    10+2 examination from a recognized board or institution.
                  </span>
                </div>
                <div className='eitem'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
                  </svg>
                  <span>
                    Postgraduate (PG): Applicants must complete a
                    bachelor&apos;s degree from a recognized university for PG
                    programs at DU SOL.
                  </span>
                </div>
              </div>
              <div className='elig-group'>
                <h4>Minimum Qualification Marks</h4>
                <div className='eitem'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
                  </svg>
                  <span>
                    UG Programs: Students must secure the minimum qualifying
                    marks in 10+2 as per DU SOL guidelines.
                  </span>
                </div>
                <div className='eitem'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
                  </svg>
                  <span>
                    PG Programs: Candidates must meet the minimum percentage
                    criteria in their graduation degree.
                  </span>
                </div>
              </div>
              <div className='elig-group'>
                <h4>Additional Requirements</h4>
                <div className='eitem'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
                  </svg>
                  <span>
                    Reserved category students may receive relaxation in marks
                    as per university norms.
                  </span>
                </div>
                <div className='eitem'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z' />
                  </svg>
                  <span>
                    International applicants must provide equivalent
                    qualifications recognized by authorized bodies.
                  </span>
                </div>
              </div>
            </div>
            <div className='degree-card'>
              <div className='degree-frame'>
                <div className='sample-mark'>SAMPLE</div>
                <svg viewBox='0 0 300 360' style={{ width: '100%' }}>
                  <rect
                    x='10'
                    y='10'
                    width='280'
                    height='340'
                    rx='6'
                    fill='#fff'
                    stroke='#5b2a86'
                    strokeWidth='3'
                  />
                  <circle
                    cx='150'
                    cy='58'
                    r='26'
                    fill='#f4eefa'
                    stroke='#5b2a86'
                    strokeWidth='2'
                  />
                  <path
                    d='M150 42 l16 9 v18 l-16 9 -16-9 v-18z'
                    fill='#5b2a86'
                  />
                  <text
                    x='150'
                    y='108'
                    textAnchor='middle'
                    fontFamily='Poppins'
                    fontSize='15'
                    fontWeight='700'
                    fill='#43205f'
                  >
                    University of Delhi
                  </text>
                  <text
                    x='150'
                    y='128'
                    textAnchor='middle'
                    fontFamily='Mulish'
                    fontSize='10'
                    fill='#6b6577'
                  >
                    School of Open Learning
                  </text>
                  <rect
                    x='40'
                    y='150'
                    width='220'
                    height='7'
                    rx='3'
                    fill='#e9e4ef'
                  />
                  <rect
                    x='40'
                    y='168'
                    width='220'
                    height='7'
                    rx='3'
                    fill='#e9e4ef'
                  />
                  <rect
                    x='40'
                    y='186'
                    width='160'
                    height='7'
                    rx='3'
                    fill='#e9e4ef'
                  />
                  <text
                    x='150'
                    y='232'
                    textAnchor='middle'
                    fontFamily='Poppins'
                    fontSize='13'
                    fontWeight='700'
                    fill='#5b2a86'
                  >
                    Bachelor of Commerce
                  </text>
                  <rect
                    x='40'
                    y='252'
                    width='220'
                    height='6'
                    rx='3'
                    fill='#f0eaf6'
                  />
                  <rect
                    x='40'
                    y='266'
                    width='220'
                    height='6'
                    rx='3'
                    fill='#f0eaf6'
                  />
                  <circle
                    cx='70'
                    cy='312'
                    r='22'
                    fill='none'
                    stroke='#f7c615'
                    strokeWidth='3'
                  />
                  <rect
                    x='180'
                    y='300'
                    width='80'
                    height='6'
                    rx='3'
                    fill='#e9e4ef'
                  />
                  <rect
                    x='180'
                    y='316'
                    width='60'
                    height='6'
                    rx='3'
                    fill='#e9e4ef'
                  />
                </svg>
              </div>
              <Link href='/blogs' className='btn btn-gold'>
                Get FREE Consultation ✓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className='why'>
        <div className='wrap'>
          <div className='grid'>
            <div className='why-illus'>
              <svg viewBox='0 0 360 280' style={{ width: '100%' }}>
                <rect
                  x='20'
                  y='60'
                  width='320'
                  height='180'
                  rx='12'
                  fill='#f4eefa'
                />
                <rect
                  x='50'
                  y='95'
                  width='120'
                  height='80'
                  rx='8'
                  fill='#5b2a86'
                />
                <path d='M70 135 l60 -22 l60 22 l-60 22z' fill='#f7c615' />
                <circle cx='240' cy='120' r='26' fill='#7b48a8' />
                <path
                  d='M232 120 l6 6 l12 -12'
                  stroke='#fff'
                  strokeWidth='3'
                  fill='none'
                />
                <rect
                  x='200'
                  y='160'
                  width='110'
                  height='14'
                  rx='7'
                  fill='#d9c7ec'
                />
                <rect
                  x='200'
                  y='184'
                  width='80'
                  height='12'
                  rx='6'
                  fill='#e9e4ef'
                />
              </svg>
            </div>
            <div>
              <span className='eyebrow'>About Us</span>
              <h2>Why Choose DU SOL?</h2>
              <p>
                DU SOL has become the preferred option for students looking for
                an accessible and flexible higher education. The learning
                experience is designed to help students from diverse
                backgrounds, such as:
              </p>
              <ul className='why-list'>
                <li>
                  <svg viewBox='0 0 24 24'>
                    <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                  </svg>
                  Professionals in the workforce
                </li>
                <li>
                  <svg viewBox='0 0 24 24'>
                    <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                  </svg>
                  Fresh graduates
                </li>
                <li>
                  <svg viewBox='0 0 24 24'>
                    <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                  </svg>
                  Entrepreneurs
                </li>
                <li>
                  <svg viewBox='0 0 24 24'>
                    <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                  </svg>
                  People with a variety of responsibilities
                </li>
              </ul>
              <p>
                One of the main advantages of DU SOL is its focus on making
                higher education easily accessible and cost-effective, with a
                solid foundation of online and distance studying.
              </p>
              <Link href='/blogs' className='btn btn-purple'>
                KNOW MORE ABOUT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO APPLY */}
      <section className='how'>
        <div className='wrap'>
          <div className='sec-head how-head'>
            <h2 className='sec-title underline'>How To Apply</h2>
          </div>
          <div className='steps'>
            <div className='step'>
              <div className='s-ico'>
                <svg viewBox='0 0 24 24'>
                  <path d='M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 6h-2.9a15.7 15.7 0 00-1.3-3.4A8 8 0 0118.9 8zM12 4c.8 1.1 1.4 2.5 1.8 4h-3.6c.4-1.5 1-2.9 1.8-4zM4.3 14a7.8 7.8 0 010-4h3.3a16.6 16.6 0 000 4zm.8 2h2.9a15.7 15.7 0 001.3 3.4A8 8 0 015.1 16zM8 8H5.1a8 8 0 014.2-3.4A15.7 15.7 0 008 8zm6.2 6H9.8a14.7 14.7 0 010-4h4.4a14.7 14.7 0 010 4zm.3 5.4c.6-1 1-2.2 1.3-3.4h2.9a8 8 0 01-4.2 3.4zM16 12c0-.7-.1-1.3-.2-2h3.5a7.8 7.8 0 010 4h-3.3c.1-.7.2-1.3.2-2z' />
                </svg>
              </div>
              <h4>Visit the Official Website</h4>
              <p>
                Students can visit the official website to check admission
                updates.
              </p>
            </div>
            <div className='step'>
              <div className='s-ico'>
                <svg viewBox='0 0 24 24'>
                  <path d='M12 3L1 9l11 6 9-4.9V17h2V9L12 3zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.8z' />
                </svg>
              </div>
              <h4>Select Course &amp; College</h4>
              <p>
                Browse and choose the program and college that best fit your
                educational goals and interests.
              </p>
            </div>
            <div className='step'>
              <div className='s-ico'>
                <svg viewBox='0 0 24 24'>
                  <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zm-1 14H8v-2h5zm3-4H8v-2h8zm-2-5V3.5L18.5 8z' />
                </svg>
              </div>
              <h4>Complete the Application Form</h4>
              <p>
                Fill in all the required personal and academic details carefully
                in the online form.
              </p>
            </div>
            <div className='step'>
              <div className='s-ico'>
                <svg viewBox='0 0 24 24'>
                  <path d='M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' />
                </svg>
              </div>
              <h4>Submit Documents</h4>
              <p>
                Upload the required documents and certificates as per the
                admission guidelines.
              </p>
            </div>
            <div className='step'>
              <div className='s-ico'>
                <svg viewBox='0 0 24 24'>
                  <path d='M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 6H4V6h16z' />
                </svg>
              </div>
              <h4>Make the Application Payment</h4>
              <p>
                Complete the application fee payment securely through the
                available online payment methods.
              </p>
            </div>
            <div className='step'>
              <div className='s-ico'>
                <svg viewBox='0 0 24 24'>
                  <path d='M12 1l2.4 1.8 3-.2 1 2.8 2.6 1.6-1 2.8 1 2.8-2.6 1.6-1 2.8-3-.2L12 23l-2.4-1.8-3 .2-1-2.8L3 15.4l1-2.8-1-2.8 2.6-1.6 1-2.8 3 .2L12 1zm-1.2 13.9l4.9-4.9-1.4-1.4-3.5 3.5-1.6-1.6-1.4 1.4z' />
                </svg>
              </div>
              <h4>Final Submission &amp; Confirmation</h4>
              <p>
                Submit your application successfully and track further admission
                updates and confirmation details.
              </p>
            </div>
          </div>
          <div className='center-btn'>
            <Link href='/blogs' className='btn btn-gold'>
              Get 100% Free Counseling
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='faq'>
        <div className='wrap'>
          <div className='sec-head'>
            <h2 className='sec-title underline'>Frequently Asked Questions</h2>
          </div>
          <div className='faq-grid'>
            {HOME_FAQ.map(([q, a], i) => (
              <FaqItem key={i} q={q} a={a} />
            ))}
          </div>
          <div className='center-btn'>
            <Link href='/blogs' className='btn btn-purple'>
              VIEW ALL FAQS
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

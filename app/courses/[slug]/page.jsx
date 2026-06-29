'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { useRef } from 'react'
import img1 from '../../../public/assets/accreditationsImg/NAAC.png'
import img2 from '../../../public/assets/accreditationsImg/UGC.png'
import img3 from '../../../public/assets/accreditationsImg/AICTE.png'
import img4 from '../../../public/assets/accreditationsImg/DEB.jpg'
import img5 from '../../../public/assets/accreditationsImg/NIRF.png'
import Image from 'next/image'
import { getCourseDataAPI, getOneCourseDataAPI } from '@/api'

const DEF_SYLLABUS = [
  {
    sem: 'Semester 1',
    subjects: [
      ['Principles of the Discipline', '20 Hours'],
      ['Foundation Course', '18 Hours'],
      ['Communication Skills', '18 Hours']
    ]
  },
  {
    sem: 'Semester 2',
    subjects: [
      ['Core Subject I', '20 Hours'],
      ['Core Subject II', '18 Hours'],
      ['Environmental Studies', '16 Hours']
    ]
  },
  {
    sem: 'Semester 3',
    subjects: [
      ['Specialization Paper I', '20 Hours'],
      ['Specialization Paper II', '18 Hours'],
      ['Skill Enhancement', '16 Hours']
    ]
  }
]

const DEF_FAQ = [
  [
    'What is DU SOL?',
    'DU SOL (School of Open Learning) is a distance and online education institution under the University of Delhi that offers UG and PG programs.'
  ],
  [
    'What are the eligibility criteria?',
    "Eligibility depends on the program — generally 10+2 for UG courses and a bachelor's degree for PG courses from a recognized board or university."
  ],
  [
    'How can I apply for DU SOL programs?',
    'You can apply online by filling out the application form, uploading documents and completing the admission process through the official portal, with free guidance from College Drishti.'
  ]
]

const COURSES = {
  'distance-ba': {
    tag: 'BA',
    title: 'Distance BA (DU SOL Bachelor of Arts)',
    mode: 'Distance',
    level: 'Undergraduate',
    dur: '3 Years',
    sems: 6,
    fees: ['1,000', '27,999', '2,000'],
    elig: '10+2 from recognized board',
    intro:
      'The Distance BA program from DU SOL is designed for students who want a flexible humanities degree from the University of Delhi. The course covers subjects across literature, political science, history and economics, and is ideal for working professionals and students who cannot attend regular classes. Recognized and valid for higher education and government jobs as per UGC-DEB norms.'
  },
  'distance-bba': {
    tag: 'BBA',
    title: 'Distance BBA (DU SOL Bachelor of Business Administration)',
    mode: 'Distance',
    level: 'Undergraduate',
    dur: '3 Years',
    sems: 6,
    fees: ['1,000', '49,999', '2,000'],
    elig: '10+2 from recognized board',
    intro:
      'The Distance BBA program builds a strong foundation in business, management and leadership. Perfect for aspiring managers and entrepreneurs who need a flexible study mode while gaining industry-relevant skills in marketing, HR, finance and operations.'
  },
  'distance-bms': {
    tag: 'BMS',
    title: 'Distance BMS (DU SOL Bachelor of Management Studies)',
    mode: 'Distance',
    level: 'Undergraduate',
    dur: '3 Years',
    sems: 6,
    fees: ['1,000', '44,999', '2,000'],
    elig: '10+2 from recognized board',
    intro:
      'The Distance BMS program focuses on management studies, leadership and strategy — preparing students for management careers with a practical, career-oriented curriculum delivered through flexible distance learning.'
  },
  'distance-bcom': {
    tag: 'BCom',
    title: 'Distance BCom (DU SOL Bachelor of Commerce)',
    mode: 'Distance',
    level: 'Undergraduate',
    dur: '3 Years',
    sems: 6,
    fees: ['1,000', '29,999', '2,000'],
    elig: '10+2 from recognized board',
    intro:
      'The Distance BCom program provides comprehensive knowledge in commerce, finance, accounting and business operations. A recognized commerce degree from the University of Delhi suited to students balancing study with work.'
  },
  'distance-ma': {
    tag: 'MA',
    title: 'Distance MA (DU SOL Master of Arts)',
    mode: 'Distance',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,000', '19,999', '2,000'],
    elig: "Bachelor's degree",
    intro:
      'The Distance MA program offers postgraduate study across humanities disciplines through DU SOL, enabling graduates to deepen their subject expertise with a flexible learning schedule.'
  },
  'distance-mba': {
    tag: 'MBA',
    title: 'Distance MBA (DU SOL Master of Business Administration)',
    mode: 'Distance',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,500', '89,999', '2,500'],
    elig: "Bachelor's degree",
    intro:
      'The Distance MBA program delivers management education through distance learning, covering core management areas and electives. Designed for working professionals seeking career growth and leadership roles.'
  },
  'distance-mcom': {
    tag: 'MCom',
    title: 'Distance MCom (DU SOL Master of Commerce)',
    mode: 'Distance',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,000', '24,999', '2,000'],
    elig: 'B.Com',
    intro:
      'The Distance MCom program provides advanced education in commerce and related fields through flexible distance learning — ideal for commerce graduates aiming for academic or professional advancement.'
  },
  'distance-mlis': {
    tag: 'MLIS',
    title: 'Distance MLIS (DU SOL Master of Library & Information Science)',
    mode: 'Distance',
    level: 'Postgraduate',
    dur: '1 Year',
    sems: 2,
    fees: ['1,000', '17,999', '2,000'],
    elig: "Bachelor's degree",
    intro:
      'The Distance MLIS program covers library and information science, preparing students for careers in modern libraries, information centres and digital archives through distance mode.'
  },
  'online-ba': {
    tag: 'BA',
    title: 'Online BA (DU SOL Bachelor of Arts)',
    mode: 'Online / Offline',
    level: 'Undergraduate',
    dur: '3 Years',
    sems: 6,
    fees: ['1,000', '27,999', '2,000'],
    elig: '10+2 from recognized board',
    intro:
      'The Online BA program offers flexible, accessible humanities education from the University of Delhi School of Open Learning. Study at your own pace with online study material, recorded lectures and academic support. Recognized and valid for higher education and employment as per UGC-DEB norms.'
  },
  'online-bba': {
    tag: 'BBA',
    title: 'Online BBA (DU SOL Bachelor of Business Administration)',
    mode: 'Online / Offline',
    level: 'Undergraduate',
    dur: '3 Years',
    sems: 6,
    fees: ['1,000', '49,999', '2,000'],
    elig: '10+2 from recognized board',
    intro:
      'It is the Online BBA program offered by the University of Delhi School of Open Learning (DU SOL), specifically designed for students looking to pursue a career in the field of management and business with a flexible learning approach. This is an excellent choice for professionals working as well as competitive exam candidates and students unable to take regular classes on campus. The curriculum is focused on important management and business topics such as Marketing, Finance, Accounting, Human Resource Management, and Business Communication.'
  },
  'online-bcom': {
    tag: 'BCom',
    title: 'Online BCom (DU SOL Bachelor of Commerce)',
    mode: 'Online / Offline',
    level: 'Undergraduate',
    dur: '3 Years',
    sems: 6,
    fees: ['1,000', '29,999', '2,000'],
    elig: '10+2 from recognized board',
    intro:
      'The Online BCom program from DU SOL is perfect for online learners seeking a quality commerce education at home — covering accounting, finance, taxation and business studies with full online learning support.'
  },
  'online-ma': {
    tag: 'MA',
    title: 'Online MA (DU SOL Master of Arts)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,000', '19,999', '2,000'],
    elig: "Bachelor's degree",
    intro:
      'The Online MA program at DU SOL is offered in various disciplines through online education mode, helping graduates pursue advanced study flexibly while managing personal and professional commitments.'
  },
  'online-mba': {
    tag: 'MBA',
    title: 'Online MBA (DU SOL Master of Business Administration)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,500', '89,999', '2,500'],
    elig: "Bachelor's degree",
    intro:
      'The Online MBA program is designed to provide management education through online learning, with specializations and live sessions. Ideal for professionals seeking leadership roles without pausing their careers. DU SOL degrees are UGC-DEB recognized.'
  },
  'online-mca': {
    tag: 'MCA',
    title: 'Online MCA (DU SOL Master of Computer Applications)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,500', '79,999', '2,500'],
    elig: 'BCA/BSc (CS)',
    intro:
      'The Online MCA program is designed for working professionals and graduates who want to build advanced skills in computer applications, programming and software development through flexible online learning.'
  },
  'online-mcom': {
    tag: 'MCom',
    title: 'Online MCom (DU SOL Master of Commerce)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,000', '24,999', '2,000'],
    elig: 'B.Com',
    intro:
      'The Online MCom program provides advanced commerce education through online mode, suited to commerce graduates aiming to strengthen their expertise for academic, banking and corporate careers.'
  },
  'online-msc': {
    tag: 'MSc',
    title: 'Online MSC (DU SOL Master of Science)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,000', '34,999', '2,000'],
    elig: 'BSc',
    intro:
      'The Online MSc program at DU SOL offers affordable postgraduate science education in distance/online mode across multiple specializations, with practical and theory-based learning.'
  },
  'online-mjmc': {
    tag: 'MJMC',
    title: 'Online MJMC (Master of Journalism & Mass Communication)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['1,000', '39,999', '2,000'],
    elig: "Bachelor's degree",
    intro:
      'The Online MJMC program covers journalism, mass communication and media studies, preparing students for careers in print, broadcast and digital media through flexible online learning.'
  },
  'online-mlis': {
    tag: 'MLIS',
    title: 'Online MLIS (Master of Library & Information Science)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '1 Year',
    sems: 2,
    fees: ['1,000', '17,999', '2,000'],
    elig: "Bachelor's degree",
    intro:
      'The Online MLIS program includes subjects related to library and information science, digital libraries and information management, delivered fully online for working professionals.'
  },
  'online-mtech': {
    tag: 'MTech',
    title: 'Online MTech (DU SOL Master of Technology)',
    mode: 'Online / Offline',
    level: 'Postgraduate',
    dur: '2 Years',
    sems: 4,
    fees: ['2,000', '99,999', '3,000'],
    elig: 'B.Tech/BE',
    intro:
      'The Online MTech program offers affordable advanced technology education in online mode for engineering graduates seeking specialization and career progression.'
  }
}

const MBA_SPECS = [
  { name: 'Information Technology', ico: '💻' },
  { name: 'Business Analytics', ico: '📊' },
  { name: 'Hospital Administration', ico: '🏥' },
  { name: 'International Trade', ico: '🌐' },
  { name: 'Rural Management', ico: '🌾' },
  { name: 'Retail Management', ico: '🛒' },
  { name: 'Business Management', ico: '💼' },
  { name: 'Project Management', ico: '🚀' },
  { name: 'Marketing Management', ico: '📈' }
]

function SemItem ({ sem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`sem${open ? ' open' : ''}`}>
      <div className='sem-head' onClick={() => setOpen(!open)}>
        <span>{sem.sem}</span>
        <span className='ar'>▾</span>
      </div>
      <div className='sem-body' style={{ maxHeight: open ? '400px' : '0' }}>
        {sem.subjects.map(([subj, hrs], si) => (
          <div key={si} className='subj'>
            <span>{subj}</span>
            <span>{hrs}</span>
          </div>
        ))}
      </div>
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

function CoursesContent () {
  const [activeTab, setActiveTab] = useState('overview')
  const [courseData, setCoursedata] = useState(null)
  // const searchParams = useSearchParams()
  const { slug } = useParams()
  // const slug = searchParams.get('c') || 'online-bba'
  const course = COURSES[slug] || COURSES['online-bba']
  // refs for each panel
  const overviewRef = useRef(null)
  const curriculumRef = useRef(null)
  const specRef = useRef(null)
  const instructorRef = useRef(null)
  const faqRef = useRef(null)

  const scrollTo = ref => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (slug) {
      fetchCourseData(slug)
    }
  }, [slug])

  const fetchCourseData = async slug => {
    try {
      const response = await getOneCourseDataAPI(slug)

      setCoursedata(response.data.data?.course)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(courseData, 'DATA OF COURSE DATA')

  return (
    <>
      {/* PAGE HERO */}
      <section className='page-hero course-hero'>
        <div className='hero-inner'>
          {/* LEFT — Course Info */}
          <div className='wrap'>
            <div className='breadcrumb'>
              <Link href='/'>Home</Link>
              <span className='sep'>›</span>
              <Link href='/courses'>Courses</Link>
              <span className='sep'>›</span>
              <span>{courseData?.short_name}</span>{' '}
            </div>
            <span className='tag'> {courseData?.short_name}</span>
            <h1>
              {' '}
              {courseData?.name}{' '}
              {courseData?.short_name && `(${courseData.short_name})`}
            </h1>
            <p className='mb-8'>{courseData?.short_description}</p>{' '}
            <div className='meta-row'>
              <div className='cmeta'>
                {/* <svg viewBox='0 0 24 24'>
                  <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5h-2V11h2zm0-8.5h-2V6h2z' />
                </svg> */}
                {/* <div>
                  <small>Duration</small>
                  <strong>
                    {courseData?.duration} {courseData?.duration_type}
                  </strong>
                </div>
              </div>
              <div className='cmeta'>
                <svg viewBox='0 0 24 24'>
                  <path d='M12 3L1 9l11 6 9-4.9V17h2V9zm0 13.2L4.5 12 12 7.8l7.5 4.2z' />
                </svg>
                <div>
                  <small>Level</small>
                  <strong>{courseData?.course_level}</strong>
                </div>
              </div>
              <div className='cmeta'>
                <svg viewBox='0 0 24 24'>
                  <path d='M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z' />
                </svg>
                <div>
                  <small>Mode</small>
                  <strong>{courseData?.study_mode}</strong>
                </div> */}
              </div>
            </div>
            <div className='hero-badges mt-5'>
              <div className='acc-logo'>
                <Image
                  src={img1}
                  alt='NAAC Accredited'
                  width={60}
                  height={60}
                />
                <div className='acc-text'>
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
                <div className='acc-text'>
                  UGC + DEB
                  <br />
                  Approved
                </div>
              </div>

              <div className='acc-logo'>
                <Image src={img3} alt='AICTE Approved' width={60} height={60} />
                <div className='acc-text'>
                  AICTE
                  <br />
                  Approved
                </div>
              </div>
            </div>
            <div className='hero-actions'>
              <Link href='#' className='btn btn-gold'>
                GET FREE COUNSELLING
              </Link>
              <Link href='#' className='btn btn-outline-white'>
                DOWNLOAD BROCHURE
              </Link>
            </div>
          </div>

          {/* RIGHT — Counseling Form */}
          <div className='counsel-card'>
            <div className='counsel-head'>
              <h3>Book 100% Free Counseling</h3>
              <p>Get 1 to 1 Expert Guidance from DU SOL</p>
            </div>
            <div className='counsel-body'>
              <input type='text' placeholder='Enter Your Name' />
              <input type='email' placeholder='Enter Your Email' />
              <input type='tel' placeholder='🇮🇳 Enter Your Number' />
              <select>
                <option>Select Course</option>
                <option>BA</option>
                <option>BCom</option>
                <option>BBA</option>
                <option>MBA</option>
                <option>MA</option>
              </select>
              <select>
                <option>Select State</option>
                <option>Delhi</option>
                <option>Bihar</option>
                <option>Haryana</option>
                <option>Uttar Pradesh</option>
              </select>
              <div className='consent'>
                I authorise DU SOL to contact me with updates via
                SMS/Email/WhatsApp.
              </div>
              <button
                className='btn btn-purple btn-block'
                onClick={() =>
                  alert('Thank you! Our counsellor will contact you soon.')
                }
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* BODY */}
      <section className='course-body'>
        <div className='wrap'>
          <div className='course-layout'>
            <div>
              <div className='ctabs-sticky'>
                <div className='ctabs'>
                  <button
                    className={`ctab ${
                      activeTab === 'overview' ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveTab('overview')
                      scrollTo(overviewRef)
                    }}
                  >
                    Overview
                  </button>

                  <button
                    className={`ctab ${
                      activeTab === 'curriculum' ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveTab('curriculum')
                      scrollTo(curriculumRef)
                    }}
                  >
                    Curriculum
                  </button>

                  <button
                    className={`ctab ${
                      activeTab === 'specializations' ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveTab('specializations')
                      scrollTo(specRef)
                    }}
                  >
                    Specializations
                  </button>

                  <button
                    className={`ctab ${
                      activeTab === 'instructor' ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveTab('instructor')
                      scrollTo(instructorRef)
                    }}
                  >
                    Instructor
                  </button>

                  <button
                    className={`ctab ${activeTab === 'faq' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('faq')
                      scrollTo(faqRef)
                    }}
                  >
                    FAQ
                  </button>
                </div>
              </div>
              <div className='cpanel' id='p-overview' ref={overviewRef}>
                <h2>Course Overview</h2>
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: courseData?.overview || ''
                    }}
                  />
                </p>
                <ul className='feature-list'>
                  <li>
                    <svg viewBox='0 0 24 24'>
                      <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                    </svg>{' '}
                    Industry-relevant curriculum
                  </li>
                  <li>
                    <svg viewBox='0 0 24 24'>
                      <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                    </svg>{' '}
                    Experienced faculty &amp; mentors
                  </li>
                  <li>
                    <svg viewBox='0 0 24 24'>
                      <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                    </svg>{' '}
                    Live projects &amp; case studies
                  </li>
                  <li>
                    <svg viewBox='0 0 24 24'>
                      <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                    </svg>{' '}
                    Internship &amp; placement support
                  </li>
                </ul>
                <div className='divider'></div>
                <div className='syllabus-head'>
                  <h2 style={{ margin: 0 }}>Curriculum / Syllabus</h2>
                  <span className='dur'>
                    {courseData?.duration * 2} Semesters
                  </span>{' '}
                </div>
                {DEF_SYLLABUS.slice(0, 3).map((sem, i) => (
                  <SemItem key={i} sem={sem} />
                ))}
              </div>

              <div className='cpanel' id='p-curriculum' ref={curriculumRef}>
                <h2>Detailed Syllabus</h2>
                <div className='syllabus-head'>
                  <p style={{ margin: 0, color: 'var(--muted)' }}>
                    Semester-wise breakdown of subjects and learning hours.
                  </p>
                  <span className='dur'>
                    {courseData?.duration * 2} Semesters
                  </span>{' '}
                </div>
                {DEF_SYLLABUS.map((sem, i) => (
                  <SemItem key={i} sem={sem} />
                ))}
              </div>

              <div className='cpanel' id='p-spec' ref={specRef}>
                <h2>Specializations</h2>
                <p>
                  Choose a specialization in your final year to build domain
                  expertise.
                </p>

                <div className='spec-grid'>
                  {MBA_SPECS.map((sp, i) => (
                    <div key={i} className='spec-card'>
                      <div className='sp-ico'>
                        <svg viewBox='0 0 24 24'>
                          <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2z' />
                        </svg>
                      </div>
                      <span>{sp.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='cpanel' id='p-instructor' ref={instructorRef}>
                <h2>Instructor</h2>
                <div className='inst-grid'>
                  <div className='inst-profile'>
                    <div className='inst-avatar'>RK</div>
                    <div>
                      <h3>Dr. Rajesh Kumar</h3>
                      <div className='role'>
                        Professor &amp; Head of Management Studies
                      </div>
                      <div className='exp'>
                        15+ Years of Teaching Experience
                      </div>
                      <p>
                        Dr. Rajesh Kumar is an expert in Business Strategy and
                        Marketing Management. He has authored 8+ books and
                        published numerous research papers in international
                        journals.
                      </p>
                      {/* <div className='inst-social'>
                        <a href='#'>in</a>
                        <a href='#'>𝕏</a>
                        <a href='#'>@</a>
                      </div> */}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>
                      Key Qualifications
                    </h3>
                    <ul className='qual-list'>
                      <li>
                        Ph.D. in Business Administration, Delhi University
                      </li>
                      <li>MBA, Indian Institute of Management (IIM)</li>
                      <li>Certified Management Consultant (CMC)</li>
                      <li>Researcher &amp; Published Author</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='cpanel' id='p-faq' ref={faqRef}>
                <h2>Frequently Asked Questions</h2>
                <div style={{ marginTop: '14px' }}>
                  {DEF_FAQ.map(([q, a], i) => (
                    <FaqItem key={i} q={q} a={a} />
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside>
              <div className='side-card'>
                <h3>Fee Structure</h3>
                <div className='fee-row'>
                  <div className='f-ico'>
                    <svg viewBox='0 0 24 24'>
                      <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zm-1 10H8v-2h5z' />
                    </svg>
                  </div>
                  <div>
                    <small>Application Fee</small>
                    <b>₹{course.fees[0]}</b>
                  </div>
                </div>
                <div className='fee-row'>
                  <div className='f-ico'>
                    <svg viewBox='0 0 24 24'>
                      <path d='M13.7 5H17V3H7v2h3c1.4 0 2.6.8 3.1 2H7v2h6.1c-.5 1.2-1.7 2-3.1 2H7v2.3L12.7 21h2.8L9.8 15c2.4-.3 4.3-2 4.7-4H17V9z' />
                    </svg>
                  </div>
                  <div>
                    <small>Course Fee (Total)</small>
                    <b>₹{course.fees[1]}</b>
                  </div>
                </div>
                <div className='fee-row'>
                  <div className='f-ico'>
                    <svg viewBox='0 0 24 24'>
                      <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
                    </svg>
                  </div>
                  <div>
                    <small>Examination Fee (Per Year)</small>
                    <b>₹{course.fees[2]}</b>
                  </div>
                </div>
                <Link
                  href='#'
                  className='btn btn-gold btn-block'
                  style={{ marginTop: '16px' }}
                >
                  GET FREE COUNSELLING
                </Link>
              </div>
              <div className='side-card'>
                <h3>Course Details</h3>
                {/* <div className='detail-row'>
                  <span>Duration</span>
                  <span>{course.dur}</span>
                </div>
                <div className='detail-row'>
                  <span>Level</span>
                  <span>{course.level}</span>
                </div>
                <div className='detail-row'>
                  <span>Mode</span>
                  <span>{course.mode}</span>
                </div>
                <div className='detail-row'>
                  <span>Language</span>
                  <span>English</span>
                </div>
                <div className='detail-row'>
                  <span>Eligibility</span>
                  <span>{course.elig}</span>
                </div>
                <div className='detail-row'>
                  <span>Difficulty</span>
                  <span>Beginner</span>
                </div> */}
                <div className='detail-row'>
                  <span>Duration</span>
                  <span>
                    {courseData?.duration} {courseData?.duration_type}
                  </span>
                </div>

                <div className='detail-row'>
                  <span>Level</span>
                  <span>{courseData?.course_level}</span>
                </div>

                <div className='detail-row'>
                  <span>Mode</span>
                  <span>{courseData?.study_mode}</span>
                </div>

                <div className='detail-row'>
                  <span>Language</span>
                  <span>{courseData?.language}</span>
                </div>

                <div className='detail-row'>
                  <span>Eligibility</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: courseData?.eligibility || ''
                    }}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section className='accred'>
        <div className='wrap'>
          <div className='box'>
            <h3>Accreditations &amp; Approvals</h3>
            <div className='accred-row'>
              <div className='acc-item'>
                <div className='a-logo'>
                  <Image src={img1} alt='UGC Logo' width={50} height={50} />
                </div>
                <div>
                  <strong>UGC</strong>
                  <small className='acc-text'>
                    University Grants Commission
                  </small>
                </div>
              </div>

              <div className='acc-item'>
                <div className='a-logo'>
                  <Image src={img2} alt='AICTE Logo' width={50} height={50} />
                </div>
                <div>
                  <strong>AICTE</strong>
                  <small className='acc-text'>
                    All India Council for Technical Education
                  </small>
                </div>
              </div>

              <div className='acc-item'>
                <div className='a-logo'>
                  <Image src={img3} alt='DEB Logo' width={50} height={50} />
                </div>
                <div>
                  <strong>DEB</strong>
                  <small className='acc-text'>Distance Education Bureau</small>
                </div>
              </div>

              <div className='acc-item'>
                <div className='a-logo'>
                  <Image src={img4} alt='NAAC Logo' width={50} height={50} />
                </div>
                <div>
                  <strong>NAAC</strong>
                  <small className='acc-text'>
                    Quality Education Recognized
                  </small>
                </div>
              </div>

              <div className='acc-item'>
                <div className='a-logo'>
                  <Image src={img5} alt='NIRF Logo' width={50} height={50} />
                </div>
                <div>
                  <strong>NIRF</strong>
                  <small className='acc-text'>
                    National Institutional Ranking
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='cta-banner'>
        <div className='wrap'>
          <div className='cta-box'>
            <div className='cta-left'>
              <svg viewBox='0 0 24 24' fill='#f7c615'>
                <path d='M12 3L1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z' />
              </svg>
              <div>
                <h2>Ready to Start Your Journey?</h2>
                <p>
                  Join thousands of students who are building their future with
                  DOSOLCOLLEGEDRISHTI.
                </p>
              </div>
            </div>
            <Link href='#' className='btn btn-gold'>
              GET FREE COUNSELLING →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function CoursesPage () {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>
      }
    >
      <CoursesContent />
    </Suspense>
  )
}

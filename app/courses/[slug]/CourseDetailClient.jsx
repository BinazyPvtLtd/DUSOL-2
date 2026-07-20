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
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadSubmit } from '@/hooks/useLeadSubmit'
import { useCourseOptions } from '@/hooks/useCourseOptions'
import { INDIAN_STATES } from '@/constant/indianStates'
import LeadModal from '@/components/LeadModal'
import BrochureButton from '@/components/BrochureButton'

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
    'You can apply online by filling out the application form, uploading documents and completing the admission process through the official portal, with free guidance from Distance Education Learning.'
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

const SemItem = ({ sem }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`sem${open ? ' open' : ''}`}>
      <div className='sem-head' onClick={() => setOpen(!open)}>
        <span>{sem?.sem}</span>
        <span className='ar'>▾</span>
      </div>

      <div className='sem-body' style={{ maxHeight: open ? '500px' : '0' }}>
        {sem.description && (
          <p style={{ marginBottom: 12 }}>{sem.description}</p>
        )}

        {sem.subjects?.length > 0 ? (
          sem.subjects.map((subject, index) => (
            <div key={index} className='subj'>
              <span>{subject[0]}</span>
              <span>{subject[1]}</span>
            </div>
          ))
        ) : (
          <div className='subj'>
            <span>No subjects available</span>
          </div>
        )}
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <div className='faq-q' onClick={() => setOpen(!open)}>
        {q}
        <span className='ic'>{open ? '−' : '+'}</span>
      </div>

      <div
        className='faq-a'
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight || 0}px` : '0px'
        }}
      >
        <div ref={contentRef} dangerouslySetInnerHTML={{ __html: a || '' }} />
      </div>
    </div>
  )
}

function CoursesContent() {
  const [activeTab, setActiveTab] = useState('overview')
  const [courseData, setCoursedata] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showEligibility, setShowEligibility] = useState(false)
  const [showAllSemesters, setShowAllSemesters] = useState(false)
  const submitLead = useLeadSubmit()
  const courseOptions = useCourseOptions()
  const [leadModalOpen, setLeadModalOpen] = useState(false)
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    remarks: '',
    consent: false
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const buildLeadPayload = values => ({
    name: values.name,
    email: values.email,
    phone: values.phone,
    state: values.state,
    remarks: values.remarks || '',
    source: 'Course Page',
    page_url: window.location.href
  })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData.consent) {
      alert('Please provide your consent.')
      return
    }

    setLoading(true)

    try {
      const payload = buildLeadPayload(formData)

      await submitLead(payload, { onSuccess: resetForm })
    } finally {
      setLoading(false)
    }
  }
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      state: '',
      remarks: '',
      consent: false
    })
  }

  const syllabusData =
    courseData?.curricula?.[0]?.semesters?.map(semester => ({
      sem: semester.title,
      subjects:
        semester.subjects?.map(subject => [
          `${subject.subject_code} - ${subject.subject_name}`,
          `${subject.credits} Credits`
        ]) || []
    })) || []

  const displayedSemesters = showAllSemesters
    ? syllabusData
    : syllabusData.slice(0, 3)

  const feeItems = courseData?.fee_structures?.[0]?.items || []

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
              <button
                type='button'
                className='btn btn-gold'
                onClick={() => setLeadModalOpen(true)}
              >
                GET FREE COUNSELLING
              </button>
              <BrochureButton url={courseData?.brochure} />
            </div>
          </div>

          {/* RIGHT — Counseling Form */}
          <div className='counsel-card'>
            <div className='counsel-head'>
              <h3>Book 100% Free Counseling</h3>
              <p>Get 1 to 1 Expert Guidance from DU SOL</p>
            </div>
            <form className='counsel-body' onSubmit={handleSubmit}>
              <input
                type='text'
                name='name'
                placeholder='Enter Your Name'
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type='email'
                name='email'
                placeholder='Enter Your Email'
                value={formData.email}
                onChange={handleChange}
                required
              />

              <PhoneInputField
                value={formData.phone}
                onChange={phone => setFormData(prev => ({ ...prev, phone }))}
              />

              <select
                name='course'
                value={formData.course}
                onChange={handleChange}
              >
                <option value=''>Select Course</option>
                {courseOptions.map(c => (
                  <option key={c.id} value={c.short_name || c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                name='state'
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value=''>Select State</option>
                {INDIAN_STATES.map(state => (
                  <option key={state}>{state}</option>
                ))}
              </select>

              <label className='consent'>
                <input
                  type='checkbox'
                  name='consent'
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
                <span>
                  I authorise DU SOL to contact me with updates via
                  SMS/Email/WhatsApp.
                </span>
              </label>

              <button
                type='submit'
                className='btn btn-purple btn-block'
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'SUBMIT'}
              </button>
            </form>
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
                    className={`ctab ${activeTab === 'overview' ? 'active' : ''
                      }`}
                    onClick={() => {
                      setActiveTab('overview')
                      scrollTo(overviewRef)
                    }}
                  >
                    Overview
                  </button>

                  <button
                    className={`ctab ${activeTab === 'curriculum' ? 'active' : ''
                      }`}
                    onClick={() => {
                      setActiveTab('curriculum')
                      scrollTo(curriculumRef)
                    }}
                  >
                    Curriculum
                  </button>

                  <button
                    className={`ctab ${activeTab === 'specializations' ? 'active' : ''
                      }`}
                    onClick={() => {
                      setActiveTab('specializations')
                      scrollTo(specRef)
                    }}
                  >
                    Specializations
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
                
              </div>
              <div className='cpanel' id='p-curriculum' ref={curriculumRef}>
                <div className='syllabus-head'>
                  <h2 style={{ margin: 0 }}>Curriculum / Syllabus</h2>

                  <span className='dur'>{syllabusData.length} Semesters</span>
                </div>

                {displayedSemesters.map((sem, index) => (
                  <SemItem key={index} sem={sem} />
                ))}

                {syllabusData.length > 3 && (
                  <div style={{ textAlign: 'center', marginTop: '18px' }}>
                    <button
                      type='button'
                      className='btn btn-gold'
                      onClick={() => setShowAllSemesters(!showAllSemesters)}
                    >
                      {showAllSemesters ? 'View Less' : 'View More'}
                    </button>
                  </div>
                )}
              </div>

              <div className='cpanel' id='p-spec' ref={specRef}>
                <h2>Specializations</h2>
                <p>
                  Choose a specialization in your final year to build domain
                  expertise.
                </p>

                <div className='spec-grid'>
                  {courseData?.specializations?.map(sp => (
                    <Link
                      key={sp.id}
                      href={`/specialization/${sp.slug}`}
                      className='spec-card'
                    >
                      <div className='sp-ico'>
                        <svg viewBox='0 0 24 24'>
                          <path d='M12 2a10 10 0 1010 10A10 10 0012 2z' />
                        </svg>
                      </div>
                      <span>{sp.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className='cpanel' id='p-faq' ref={faqRef}>
                <h2>Frequently Asked Questions</h2>
                <div style={{ marginTop: '14px' }}>
                  <div className='faq-list'>
                    {courseData?.faqs?.map(faq => (
                      <FaqItem key={faq.id} q={faq.question} a={faq.answer} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside>
              <div className='side-card'>
                <h3>Fee Structure</h3>
                {feeItems.length === 0 && <span>Fee details not available</span>}
                {feeItems.map(item => (
                  <div className='fee-row' key={item.id}>
                    <div className='f-ico'>
                      <svg viewBox='0 0 24 24'>
                        <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zm-1 10H8v-2h5z' />
                      </svg>
                    </div>
                    <div>
                      <small>{item.title}</small>
                      <b>₹{Number(item.amount || 0).toLocaleString('en-IN')}</b>
                    </div>
                  </div>
                ))}

                <button
                   onClick={() => {
                  closeMobile()
                  setLeadModalOpen(true)
                }}
                  className='btn btn-gold btn-block'
                  style={{ marginTop: '16px' }}
                >
                  GET FREE COUNSELLING
                </button>
              </div>
              <div className='side-card'>
                <h3>Course Details</h3>
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
                  <span>Eligibility</span>

                  <div className='eligibility-content'>
                    <div
                      className={`eligibility-text ${showEligibility ? '' : 'eligibility-clamp'
                        }`}
                      dangerouslySetInnerHTML={{
                        __html: courseData?.eligibility || ''
                      }}
                    />

                    {courseData?.eligibility && (
                      <button
                        type='button'
                        className='read-more-btn'
                        onClick={() => setShowEligibility(!showEligibility)}
                      >
                        {showEligibility ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </div>
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
                  Distance Education Learning.
                </p>
              </div>
            </div>
            <button
              type='button'
              className='btn btn-gold'
              onClick={() => setLeadModalOpen(true)}
            >
              GET FREE COUNSELLING →
            </button>
          </div>
        </div>
      </section>

      <LeadModal open={leadModalOpen} setOpen={setLeadModalOpen} />
    </>
  )
}

export default function CoursesPage() {
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

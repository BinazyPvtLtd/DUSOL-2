'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import img1 from '../../../public/assets/accreditationsImg/NAAC.png'
import img2 from '../../../public/assets/accreditationsImg/UGC.png'
import img3 from '../../../public/assets/accreditationsImg/AICTE.png'
import img4 from '../../../public/assets/accreditationsImg/DEB.jpg'
import img5 from '../../../public/assets/accreditationsImg/NIRF.png'
import Image from 'next/image'
import { getOneSpecializationAPI } from '@/api'
import { generateSEOMetadata } from '@/app/lib/seo'
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadSubmit } from '@/hooks/useLeadSubmit'
import { useCourseOptions } from '@/hooks/useCourseOptions'
import { INDIAN_STATES } from '@/constant/indianStates'
import LeadModal from '@/components/LeadModal'
import BrochureButton from '@/components/BrochureButton'
import { applyInfoTableStyling } from '@/helperFunction/Helper'



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

function FaqItem ({ q, a }) {
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

function applySeoToDocument (seo = {}) {
  if (typeof document === 'undefined') return

  const { title, description } = seo

  if (title) document.title = title

  if (description) {
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
    else {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      m.setAttribute('content', description)
      document.head.appendChild(m)
    }
  }

  // canonical
  const canonicalUrl = seo?.alternates?.canonical
  if (canonicalUrl) {
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonicalUrl)
  }
}

function SpecializationContent ({ slug: slugProp }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [courseData, setCoursedata] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showEligibility, setShowEligibility] = useState(false)
  const [showAllSemesters, setShowAllSemesters] = useState(false)
  const submitLead = useLeadSubmit()
  const courseOptions = useCourseOptions()
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)

  const params = useParams()
  const slug = slugProp || params?.slug

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
    if (!slug) return
    ;(async () => {
      try {
        const response = await getOneSpecializationAPI(slug)
        const payloadCourse = response?.data?.data?.specialization

        console.log('Specialization API Response:', response)
        setCoursedata(payloadCourse)

        // Apply SEO client-side using same helper
        const seoSource =
          payloadCourse?.seo ||
          response?.data?.seo ||
          response?.data?.data?.seo ||
          response?.data?.data?.university?.seo ||
          {}

        const seo = generateSEOMetadata(seoSource)
        applySeoToDocument(seo)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [slug])

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
    source: 'Specialization Page',
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

  if (!courseData) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>
    )
  }

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenItem(null)
  }

  return (
    <>
      {/* PAGE HERO */}
      <section className='page-hero course-hero'>
        <div className='hero-inner'>
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
                onClick={() => {
                  closeMobile()
                  setLeadModalOpen(true)
                }}
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
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: applyInfoTableStyling(courseData?.overview || '')
                    }}
                  />
                </div>
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
                  {(courseData?.course?.specializations || []).map(sp => (
                    <Link
                      key={sp.id}
                      href={`/specialization/${sp.slug}`}
                      className='spec-card'
                    >
                      <div className='sp-ico'>
                        <svg viewBox='0 0 24 24'>
                          <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2z' />
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
                    {(courseData?.faqs || []).map(faq => (
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

                {feeItems.length === 0 && (
                  <span>Fee details not available</span>
                )}
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
                  type='button'
                  className='btn btn-gold'
                  onClick={() => {
                    closeMobile()
                    setLeadModalOpen(true)
                  }}
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
                      className={`eligibility-text ${showEligibility ? '' : 'eligibility-clamp'}`}
                      dangerouslySetInnerHTML={{ __html: courseData?.eligibility || '' }}
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

      <LeadModal
        open={leadModalOpen}
        setOpen={setLeadModalOpen}
        pageType='specialization'
        pageId={courseData?.id}
      />
    </>
  )
}

export default function SpecializationClient ({ slug }) {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>
      }
    >
      <SpecializationContent slug={slug} />
    </Suspense>
  )
}

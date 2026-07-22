'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import img1 from '../public/assets/accreditationsImg/NAAC.png'
import img2 from '../public/assets/accreditationsImg/UGC.png'
import img3 from '../public/assets/accreditationsImg/AICTE.png'
import PodcastUI from '../components/modal/PodcastUI'

import { getCoursesByLevelAPI } from '@/api'
import LeadModal from '@/components/LeadModal'
import { getYoutubeThumbnail } from '@/helperFunction/Helper'
import HowToApply from '@/components/HowToApply'

async function fetchHomeData() {
  let baseUrl = process.env.NEXT_PUBLIC_DEFAULT_API

  try {
    // Next.js 15
    const headerList = await headers()

    const host =
      headerList.get('x-forwarded-host') || headerList.get('host') || ''

    const hostname = host.split(':')[0]

    const isLocal = ['localhost', '127.0.0.1', '0.0.0.0'].includes(hostname)

    if (!isLocal && hostname) {
      baseUrl = `https://${hostname}/api/v1`
    }
  } catch (err) {
    console.log('Using default API:', baseUrl)
  }

  const response = await axios.get(`${baseUrl}/home`)

  return response.data
}

export async function generateMetadata() {
  try {
    const homeData = await fetchHomeData()

    const seo =
      homeData?.seo ||
      homeData?.data?.seo ||
      homeData?.data?.university?.seo ||
      {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

function CourseCard({ c }) {
  const [leadModalOpen, setLeadModalOpen] = useState(false)

  const years = c.duration

  return (
    <div className='course-card'>
      <span className='yr'>
        {years} {c.duration_type}
      </span>

      <h3>{c.short_name?.toUpperCase()}</h3>

      <div className='full'>{c.name}</div>

      <p>{c.short_description}</p>

      <Link href={`/courses/${c.slug}`} className='btn btn-purple btn-block'>
        Know More
      </Link>
    </div>
  )
}

function FaqItem({ q, a }) {
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



// Extract YouTube video ID from both youtube.com and youtu.be URLs
function getYoutubeEmbedId(url) {
  if (!url) return null
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
  const match = url.match(regExp)
  return match ? match[1] : null
}




export default function HomeClient({ initialData }) {
  const [activeTab, setActiveTab] = useState('bachelor')
  const [showModal, setShowModal] = useState(false)
  const homeData = initialData || null

  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showAllCourses, setShowAllCourses] = useState(false)

  useEffect(() => {
    fetchCourses('UG')
  }, [])

const fetchCourses = async level => {
  try {
    setLoading(true)

    const response = await getCoursesByLevelAPI(level)

    setCourseData(response.data?.data || [])
  } catch (error) {
    console.log(error)
    setCourseData([])
  } finally {
    setLoading(false)
  }
}

  const BannerData = homeData?.data?.hero
  const AboutUs = homeData?.data?.about
  const Eligibility = homeData?.data?.eligibilities?.[0]
  const WhyChooseData = homeData?.data?.why_choose_us?.[0]
  const NewsData = homeData?.data?.news || []
  const FaqData = homeData?.data?.faqs || []
  const Program = homeData?.data?.program || []


  const handleTabChange = tab => {
    setActiveTab(tab)
     setShowAllCourses(false)

    if (tab === 'bachelor') {
      fetchCourses('UG')
    } else {
      fetchCourses('PG')
    }
  }

  const displayedCourses = showAllCourses
  ? courseData
  : courseData.slice(0, 8)

  // SSR-safety: guard any browser-only APIs
  const safeWindowOpen = url => {
    if (typeof window !== 'undefined') window.open(url, '_blank')
  }

  const thumbnail = getYoutubeThumbnail(BannerData?.video_url)

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenItem(null)
  }

  return (
    <>
      <section className='hero'>
        <div className='wrap'>
          <div className='hero-copy'>
            <span className='hero-eyebrow'>{BannerData?.badge_text}</span>

            <h1>{BannerData?.title}</h1>

            <p className='lead'>{BannerData?.description}</p>

            <div className='hero-badges'>
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
                {BannerData?.primary_button_text || 'Apply Now'}
              </button>

              <button
                type='button'
                className='btn btn-outline-white hero-podcast'
                onClick={() => setShowModal(true)}
              >
                <span className='mic'>
                  <svg viewBox='0 0 24 24'>
                    <path d='M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11z' />
                  </svg>
                </span>

                {BannerData?.secondary_button_text || 'Listen Podcast'}
              </button>
            </div>
          </div>

          <div className='hero-visual'>
            {/* <div className='video-card'>
            <span className='vc-du'>🎓 Delhi University</span>

              <div className='vc-left'>
                <span className='vc-small'>All About</span>
                <span className='vc-big'>
                  DU<span>SOL</span>
                </span>
                <span className='vc-tag'>Online &amp; Distance Courses</span>
                <span className='vc-sub'>Complete Details</span>
              </div> 

               {BannerData?.hero_image ? (
                  <img
                    className="vc-figure"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${BannerData.hero_image}`}
                    alt={BannerData?.title}
                  />
                ) : (
                  <svg
                    className="vc-figure"
                    viewBox="0 0 120 150"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Existing SVG */}
            {/* </svg>
                )} 

              <a
                className='vc-play'
                href={BannerData?.video_url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Play Video'
              >
                <svg viewBox='0 0 24 24'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              </a>

              <a
                href={BannerData?.video_url}
                target='_blank'
                rel='noopener noreferrer'
                className='vc-watch'
              >
                Watch On YouTube
              </a>
            </div> */}
            <div className='video-card'>
              {videoPlaying && getYoutubeEmbedId(BannerData?.video_url) ? (
                <iframe
                  className='video-iframe'
                  src={`https://www.youtube.com/embed/${getYoutubeEmbedId(BannerData.video_url)}?autoplay=1&rel=0`}
                  title='Video'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={thumbnail}
                    alt='Video Thumbnail'
                    className='video-thumbnail'
                  />

                  {getYoutubeEmbedId(BannerData?.video_url) && (
                    <>
                      <button
                        type='button'
                        className='vc-play'
                        aria-label='Play Video'
                        onClick={() => setVideoPlaying(true)}
                      >
                        <svg viewBox='0 0 24 24'>
                          <path d='M8 5v14l11-7z' />
                        </svg>
                      </button>

                      <button
                        type='button'
                        className='vc-watch'
                        onClick={() => setVideoPlaying(true)}
                      >
                        Watch Video
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='news-about'>
        <div className='wrap'>
          <div className='grid'>
            <div className='card news-card'>
              <h3>Latest News</h3>

              <div className='news-scroll'>
                {NewsData.map(item => {
                  const date = new Date(item.publish_date)

                  const day = date.toLocaleDateString('en-IN', {
                    day: '2-digit'
                  })
                  const month = date.toLocaleDateString('en-IN', {
                    month: 'short'
                  })

                  return (
                    <div className='news-item' key={item.id}>
                      <div className='news-date'>
                        <b>{day}</b>
                        <span>{month}</span>
                      </div>

                      <div>
                        <h4>{item.excerpt}</h4>
                        <a
                          href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.pdf_file}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          download
                        >
                          Read More →
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* <Link
                href='/news'
                className='btn btn-purple btn-block'
                style={{ marginTop: '16px' }}
              >
                VIEW ALL NEWS
              </Link> */}
            </div>

            <div className='about-block'>
              {(AboutUs?.subtitle || AboutUs?.title) && (
                <h2>
                  {AboutUs?.subtitle}
                  {AboutUs?.subtitle && AboutUs?.title ? '-' : ''}
                  {AboutUs?.title}
                </h2>
              )}

              {/* {AboutUs?.subtitle && (
                <h2 className='about-subtitle'></h2>
              )} */}

              {AboutUs?.description && (
                <div
                  className='about-description'
                  dangerouslySetInnerHTML={{ __html: AboutUs.description }}
                />
              )}

              <button
                type='button'
                className='btn btn-gold'
                onClick={() => {
                  closeMobile()
                  setLeadModalOpen(true)
                }}
              >
                {' '}
                FREE Guidance
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='courses-sec'>
        <div className='wrap'>
          <div className='sec-head'>
            <h2 className='sec-title '>{Program?.heading || 'Our Programs'}</h2>

          </div>

          <div className='intro-text'>
            <div
              className='eligibility-content'
              dangerouslySetInnerHTML={{
                __html: Program?.description || ''
              }}
            />
          </div>

          <div className='tabs'>
            <button
              className={`tab-btn${activeTab === 'bachelor' ? ' active' : ''}`}
              onClick={() => handleTabChange('bachelor')}
            >
              Bachelor Courses
            </button>

            <button
              className={`tab-btn${activeTab === 'master' ? ' active' : ''}`}
              onClick={() => handleTabChange('master')}
            >
              Master Courses
            </button>
          </div>

        <div className='course-grid'>
  {displayedCourses.map(course => (
    <CourseCard key={course.id} c={course} />
  ))}
</div>

{courseData.length > 8 && (
  <div className='text-center mt-10'>
    <button
      type='button'
      className='btn btn-gold'
      onClick={() => setShowAllCourses(!showAllCourses)}
    >
      
      {showAllCourses ? 'View Less' : 'View More'}
    </button>
  </div>
)}
        </div>
      </section>

      <section className='eligibility'>
        <div className='wrap'>
          <div className='grid'>
            <div>
              <h2>{Eligibility?.title}</h2>
              <div
                className='eligibility-content'
                dangerouslySetInnerHTML={{
                  __html: Eligibility?.description || ''
                }}
              />
            </div>

            <div className='degree-card'>
              <div className='degree-frame'>
                {Eligibility?.certificate_image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${Eligibility.certificate_image}`}
                    alt={Eligibility?.title || 'Certificate'}
                    width={420}
                    height={560}
                    className='img-fluid'
                  />
                )}
              </div>

              <button
                 onClick={() => {
                  closeMobile()
                  setLeadModalOpen(true)
                }}
                className='btn btn-gold'
              >
                {Eligibility?.button_text}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='why'>
        <div className='wrap'>
          <div className='grid'>
            {/* <div className='why-illus'> */}
            <div className=''>
              {WhyChooseData?.image && (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${WhyChooseData.image}`}
                  alt={WhyChooseData?.title || 'Why Choose'}
                  width={500}
                  height={450}
                  className='img-fluid'
                />
              )}
            </div>

            <div>
              {WhyChooseData?.subtitle && (
                <span className='eyebrow'>{WhyChooseData.subtitle}</span>
              )}

              <h2>{WhyChooseData?.title}</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: WhyChooseData?.description || ''
                }}
              />

              <ul className='why-list'>
                {WhyChooseData?.points?.map((item, index) => (
                  <li key={index}>
                    <svg viewBox='0 0 24 24'>
                      <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 14.5L6.5 12l1.4-1.4L11 13.6l5.1-5.1 1.4 1.4z' />
                    </svg>

                    {item.value}
                  </li>
                ))}
              </ul>

              {WhyChooseData?.button_text && (
                <button
                   onClick={() => {
                  closeMobile()
                  setLeadModalOpen(true)
                }}
                  className='btn btn-purple'
                >
                  {WhyChooseData.button_text}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>


    <HowToApply/>

      <section className='faq'>
        <div className='wrap'>
          <div className='sec-head'>
            <h2 className='sec-title'>Frequently Asked Questions</h2>
          </div>

          <div className='faq-grid'>
            {FaqData.map(item => (
              <FaqItem key={item.id} q={item.question} a={item.answer} />
            ))}
          </div>
        </div>
      </section>

      <PodcastUI
        show={showModal}
        onClose={() => setShowModal(false)}
        title='Delhi University, School Of Open Learning'
        audioSrc={
          BannerData?.podcast_audio
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${BannerData.podcast_audio}`
            : ''
        }
      />

      <LeadModal
        open={leadModalOpen}
        setOpen={setLeadModalOpen}
        pageType='home'
        pageId={homeData?.id}
      />
    </>
  )
}

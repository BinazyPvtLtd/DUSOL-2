'use client'

import { useState } from 'react'
import Link from 'next/link'

const BLOGS = [
  {
    slug: 'online-mba-in-digital-marketing',
    title:
      'Online MBA in Digital Marketing: Scope, Syllabus, Fees & Career Guide 2026',
    excerpt:
      'An Online MBA in Digital Marketing helps you master SEO, social media, analytics and growth strategy while you keep working. Here is everything you need to know before you enrol.',
    date: 'June 5, 2026',
    category: 'MBA'
  },
  {
    slug: 'dusol-admission-2026-form-filling-guide',
    title: 'DU SOL Admission 2026: Step-by-Step Form Filling Guide',
    excerpt:
      'Complete walkthrough of the DU SOL online admission process — from registration to document upload and fee payment. Avoid common mistakes with this step-by-step guide.',
    date: 'May 28, 2026',
    category: 'Admission'
  },
  {
    slug: 'dusol-exam-pattern-explained',
    title: 'DU SOL Exam Pattern Explained for New Students',
    excerpt:
      'A clear breakdown of the DU SOL examination pattern, marking scheme, assignment weightage and how to prepare effectively for your semester exams.',
    date: 'April 15, 2026',
    category: 'Exams'
  },
  {
    slug: 'delhi-university-online-courses-admission-2026',
    title: 'Delhi University Online Courses Admission 2026 Guide',
    excerpt:
      'Everything you need to know about DU online course admissions for 2026 — eligibility, available programs, fees and how to apply with free expert support.',
    date: 'April 14, 2026',
    category: 'Admission'
  },
  {
    slug: 'dusol-online-mba-fees-guide',
    title: 'DU SOL Online MBA Course Fees: Complete Guide',
    excerpt:
      'Detailed fee breakdown for the DU SOL Online MBA — application fee, semester fee, exam fee and total cost. Compare with other universities and understand scholarship options.',
    date: 'April 9, 2026',
    category: 'Fees'
  },
  {
    slug: 'dusol-support-grievance-guide',
    title: 'DU SOL Support & Grievance Redressal Guide',
    excerpt:
      'Learn how to raise a grievance, track your complaint and get support from DU SOL — covering portal issues, fee problems, study material queries and exam concerns.',
    date: 'April 7, 2026',
    category: 'Support'
  },
  {
    slug: 'dusol-admission-competitive-exam-aspirants',
    title: 'DU SOL Admission for Competitive Exam Aspirants',
    excerpt:
      'How DU SOL programs are ideal for students preparing for UPSC, SSC, banking exams and other competitive tests — study at your pace while continuing exam preparation.',
    date: 'April 2, 2026',
    category: 'Admission'
  }
]

const TRENDING = [
  {
    slug: 'online-mba-in-digital-marketing',
    title:
      'Online MBA in Digital Marketing: Scope, Syllabus, Fees & Career Guide 2026'
  },
  {
    slug: 'dusol-admission-2026-form-filling-guide',
    title: 'DU SOL Admission 2026: Step-by-Step Form Filling Guide'
  },
  {
    slug: 'dusol-exam-pattern-explained',
    title: 'DU SOL Exam Pattern Explained for New Students'
  }
]

function BlogCard ({ blog }) {
  return (
    <div className='blog-card'>
      <Link
        href={`/blog/${blog.slug}`}
        style={{ color: 'var(--purple)', fontWeight: 600, fontSize: '12px' }}
      >
        <div className='blog-thumb'>
          <svg viewBox='0 0 86 86' fill='none'>
            <rect
              x='13'
              y='10'
              width='60'
              height='66'
              rx='6'
              fill='rgba(255,255,255,.15)'
            />
            <rect
              x='21'
              y='24'
              width='44'
              height='6'
              rx='3'
              fill='rgba(255,255,255,.5)'
            />
            <rect
              x='21'
              y='36'
              width='44'
              height='4'
              rx='2'
              fill='rgba(255,255,255,.35)'
            />
            <rect
              x='21'
              y='46'
              width='30'
              height='4'
              rx='2'
              fill='rgba(255,255,255,.25)'
            />
            <circle cx='67' cy='62' r='12' fill='#f7c615' />
            <path
              d='M62 62l3.5 3.5L72 59'
              stroke='#43205f'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
          </svg>
          <div className='gold-corner'></div>
        </div>
        <div className='bc-body'>
          <h3>{blog.title}</h3>
          <p>{blog.excerpt}</p>
          {/* <div className='bc-foot'>
            <span>{blog.date}</span>
            <Link
              href={`/blog/${blog.slug}`}
              style={{
                color: 'var(--purple)',
                fontWeight: 600,
                fontSize: '12px'
              }}
            >
              Read More →
            </Link>
          </div> */}
        </div>
      </Link>
    </div>
  )
}

export default function BlogsPage () {
  const [query, setQuery] = useState('')

  const filtered = BLOGS.filter(
    b =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      {/* HERO */}
      <section className='blog-hero'>
        <div className='wrap'>
          <h1>Delhi University School OF Open Learning (DU SOL)</h1>
          <h2>Blogs and Articles</h2>
          <p>
            Stay updated on DU SOL with our blog. Get the latest information on
            admissions, exams, online courses, eligibility and more. Your
            reliable source for DU SOL news.
          </p>
        </div>
      </section>

      {/* BLOG LAYOUT */}
      <section>
        <div className='wrap'>
          <div className='blog-layout'>
            <div>
              <div className='search-bar'>
                <input
                  type='text'
                  placeholder='Search here...'
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <button aria-label='Search'>
                  <svg
                    viewBox='0 0 24 24'
                    width='18'
                    height='18'
                    fill='currentColor'
                  >
                    <path d='M15.5 14h-.79l-.28-.27A6.5 6.5 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                  </svg>
                </button>
              </div>
              <div className='blog-grid'>
                {filtered.map(blog => (
                  <BlogCard key={blog.slug} blog={blog} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p
                  style={{
                    color: 'var(--muted)',
                    padding: '20px 0',
                    textAlign: 'center'
                  }}
                >
                  No articles found matching &ldquo;{query}&rdquo;
                </p>
              )}
              <div className='pagination'>
                <a href='#' className='active'>
                  1
                </a>
                <a href='#'>2</a>
                <a href='#'>3</a>
                <a href='#'>…</a>
                <a href='#'>32</a>
              </div>
            </div>

            <aside>
              <div className='card' style={{ padding: '22px' }}>
                <div className='side-trending'>
                  <h3>Trending Post</h3>
                  {TRENDING.map(t => (
                    <div key={t.slug} className='trend-item'>
                      <div className='trend-thumb'>
                        <svg viewBox='0 0 30 30' fill='none'>
                          <rect
                            x='4'
                            y='3'
                            width='22'
                            height='24'
                            rx='3'
                            fill='rgba(255,255,255,.2)'
                          />
                          <rect
                            x='8'
                            y='9'
                            width='14'
                            height='2.5'
                            rx='1.2'
                            fill='rgba(255,255,255,.6)'
                          />
                          <rect
                            x='8'
                            y='14'
                            width='10'
                            height='2'
                            rx='1'
                            fill='rgba(255,255,255,.4)'
                          />
                        </svg>
                      </div>
                      <div>
                        <h4>{t.title}</h4>
                        <Link href={`/blog/${t.slug}`}>Read More →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
            </aside>
          </div>
        </div>
      </section>

      {/* STILL CONFUSED */}
      <section className='still'>
        <div className='wrap'>
          <div className='still-box'>
            <h2>Still Confused?</h2>
            <p>
              Get 100% free, personalised guidance from our experts — compare
              courses, check eligibility and find the right path for you.
            </p>
            <Link
              href='/blogs'
              className='btn btn-gold'
              style={{ marginTop: '18px' }}
            >
              GET FREE COUNSELLING
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

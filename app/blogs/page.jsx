'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBlogDataApi } from '@/api'
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadForm } from '@/hooks/useLeadForm'
import { INDIAN_STATES } from '@/constant/indianStates'
import LeadModal from '@/components/LeadModal'
import TrendingSidebar from '@/components/TrendingSidebar'

function BlogCard ({ blog }) {
  return (
    <div className='blog-card'>
      <Link href={`/blog/${blog.slug}`}>
        <div className='blog-thumb'>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.featured_image}`}
            alt={blog.title}
            className='w-full h-full object-cover'
          />
        </div>

        <div className='bc-body'>
          <h3>{blog.title}</h3>

          <p>{blog.short_description}</p>

          <div className='bc-foot'>
            <span>
              {new Date(blog.published_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>

            {/* <span>{blog.views} Views</span> */}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function BlogsPage () {
  const [blogs, setBlogs] = useState([])
  const [query, setQuery] = useState('')
  const [pagination, setPagination] = useState(null)
  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openItem, setOpenItem] = useState(null)

  const {
    formData,
    loading,
    courseOptions,
    handleChange,
    setPhone,
    handleSubmit
  } = useLeadForm({ source: 'Blogs Listing Page' })

  const filtered = blogs.filter(
    blog =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.short_description.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    fetchBlogs(1)
  }, [])

  const fetchBlogs = async (page = 1) => {
    try {
      const response = await getBlogDataApi(page)
      setBlogs(response.data.data)
      setPagination(response.data.pagination)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePageChange = (e, page) => {
    e.preventDefault()
    if (!pagination || page === pagination.current_page) return
    fetchBlogs(page)
  }

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenItem(null)
  }

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
                  <BlogCard key={blog.id} blog={blog} />
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
              {!query && pagination && pagination.last_page > 1 && (
                <div className='pagination'>
                  {Array.from(
                    { length: pagination.last_page },
                    (_, i) => i + 1
                  ).map(page => (
                    <a
                      key={page}
                      href='#'
                      className={
                        page === pagination.current_page ? 'active' : ''
                      }
                      onClick={e => handlePageChange(e, page)}
                    >
                      {page}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <aside>
              <TrendingSidebar />
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

                  <PhoneInputField value={formData.phone} onChange={setPhone} />

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
            </aside>
          </div>
        </div>
      </section>

      {/* STILL CONFUSED */}
      <section className='still sticky top-20'>
        <div className='wrap'>
          <div className='still-box'>
            <h2>Still Confused?</h2>
            <p>
              Get 100% free, personalised guidance from our experts — compare
              courses, check eligibility and find the right path for you.
            </p>
            {/* <Link
              // href='/blogs'
              className='btn btn-gold'
              style={{ marginTop: '18px' }}
              onClick={() => {
                closeMobile()
                setLeadModalOpen(true)
              }}
            >
              GET FREE COUNSELLING
            </Link> */}

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
        </div>
      </section>

      <LeadModal
        open={leadModalOpen}
        setOpen={setLeadModalOpen}
        pageType='home'
        pageId={blogs?.id}
      />
    </>
  )
}

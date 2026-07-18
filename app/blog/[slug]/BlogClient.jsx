'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBlogFaqsApi, getOneBlogDataApi } from '@/api'
import { useParams } from 'next/navigation'
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadSubmit } from '@/hooks/useLeadSubmit'
import { useCourseOptions } from '@/hooks/useCourseOptions'
import { INDIAN_STATES } from '@/constant/indianStates'

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

export default function BlogClient ({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp || params?.slug
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState(null)
  const submitLead = useLeadSubmit()
  const courseOptions = useCourseOptions()
  const [toc, setToc] = useState([])
  const [faqData, setFaqData] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    remarks: '',
    consent: false
  })
  useEffect(() => {
    if (slug) {
      fetchBlog()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const fetchBlogFaqs = async blogId => {
    try {
      const response = await getBlogFaqsApi(blogId)
      setFaqData(response?.data?.data || [])
    } catch (error) {
      console.error('Failed to fetch blog FAQs:', error)
      setFaqData([])
    }
  }

  const fetchBlog = async () => {
    let blog = null

    // Fetch blog
    try {
      const response = await getOneBlogDataApi(slug)
      blog = response?.data?.data?.blog

      if (!blog) {
        return
      }

      setPost(blog)
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      return
    }

    // Fetch FAQs
    try {
      await fetchBlogFaqs(blog.id)
    } catch (error) {
      console.error('Error while fetching FAQs:', error)
    }

    // Generate TOC
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(blog.content || '', 'text/html')

      const headings = [...doc.querySelectorAll('h2')].map(heading => {
        const id = heading.textContent
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, '-')

        heading.id = id

        return {
          title: heading.textContent,
          id
        }
      })

      setToc(headings)

      setPost({
        ...blog,
        content: doc.body.innerHTML
      })
    } catch (error) {
      console.error('Failed to generate table of contents:', error)
    }
  }

  if (!post) {
    return <h3 className='text-center py-5'>Loading...</h3>
  }

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
    source: 'Blog Page',
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

  return (
    <>
      <section className='post-section'>
        <div className='wrap'>
          <div className='post-layout'>
            <article className='post-body'>
              <div className='breadcrumb dark'>
                <Link href='/'>Home</Link>
                <span className='sep'>›</span>
                <Link href='/blogs'>Blogs</Link>
                <span className='sep'>›</span>
                <span>{post.category}</span>
              </div>
              <h1 className='post-title'>{post.title}</h1>
              <div className='post-pub'>
                Published on{' '}
                {new Date(post.published_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                {' · '}
                By {post.author_name}
                {' · '}
                {post.views} Views
              </div>
              <div className=" w-full aspect-video overflow-hidden rounded-xl bg-white">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.featured_image}`}
                  alt={post.title}
                  className="w-full h-full object-contain"
                />
              </div>
              {toc.length > 0 && (
                <div className='toc'>
                  <h4>Table of Contents</h4>

                  <ol>
                    {toc.map(item => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>{item.title}</a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <p className='mb-4'>{post.short_description}</p>

              <div
                dangerouslySetInnerHTML={{
                  __html: post.content
                }}
              />
            </article>

            <aside>
              <div className='blog-lead'>
                <div className='bl-head'>
                  <h3>Book 100% Free Counseling</h3>
                  <p>Get 1-to-1 expert guidance from Distance Education Learning</p>
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
            </aside>
          </div>
        </div>
      </section>

      {faqData.length > 0 && (
        <section className='faq'>
          <div className='wrap'>
            <div className='sec-head'>
              <h2 className='sec-title underline'>FAQs</h2>
              <p className='sec-sub'>
                We've addressed the key questions to help you make a confident
                decision.
              </p>
            </div>

            <div className='faq-grid'>
              {faqData.map(item => (
                <FaqItem
                  key={item.id}
                  q={item.question}
                  a={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.answer
                        
                      }}
                    />
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className='blog-cta'>
        <div className='wrap'>
          <div className='blog-cta-box'>
            <h3>Ready to Take the Next Step?</h3>
            <p>
              Get personalised guidance from Distance Education Learning experts — compare
              programs, check eligibility and find the right university for you.
              100% free.
            </p>
            <Link href='/blogs' className='btn btn-purple'>
              GET FREE COUNSELLING
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

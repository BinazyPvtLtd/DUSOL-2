'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBlogFaqsApi, getOneBlogDataApi } from '@/api'
import { useParams } from 'next/navigation'

const BLOG_POSTS = {
  'online-mba-in-digital-marketing': {
    slug: 'online-mba-in-digital-marketing',
    title:
      'Online MBA in Digital Marketing: Scope, Syllabus, Fees & Career Guide 2026',
    excerpt:
      'An Online MBA in Digital Marketing helps you master SEO, social media, analytics and growth strategy while you keep working.',
    date: 'June 5, 2026',
    category: 'MBA',
    toc: [
      ['What is an Online MBA in Digital Marketing?', '#overview'],
      ['Why Choose an Online MBA in Digital Marketing?', '#why'],
      ['Course Curriculum and Key Subjects', '#curriculum'],
      ['Skills You Will Develop', '#skills'],
      ['Eligibility and Admission Process', '#eligibility'],
      ['Fees and Affordability', '#fees'],
      ['Career Opportunities and Salary Scope', '#career'],
      ['Is an Online MBA in Digital Marketing Worth It?', '#worth']
    ],
    body: `
      <p>The way brands reach customers has changed forever, and digital channels now drive most of that growth. This is exactly why an <strong>Online MBA in Digital Marketing</strong> has become one of the most in-demand postgraduate programs for working professionals, fresh graduates and entrepreneurs in 2026.</p>
      <p>In this complete guide we cover what the program is, its benefits, syllabus, eligibility, fees, career scope and whether an Online MBA in Digital Marketing is actually worth it.</p>

      <h2 id="overview">What is an Online MBA in Digital Marketing?</h2>
      <p>An <strong>Online MBA in Digital Marketing</strong> is a two-year postgraduate management degree delivered through a flexible online learning platform. Alongside foundation MBA subjects such as finance, operations and human resources, it focuses deeply on digital specialisations like search engine optimisation, paid advertising, social media marketing and marketing analytics.</p>
      <p>Because it is offered in online or distance mode, you can study from anywhere, attend live and recorded sessions, and complete assignments at your own pace without pausing your career.</p>

      <h2 id="why">Why Choose an Online MBA in Digital Marketing?</h2>
      <p>The biggest reason students pick this program is flexibility paired with strong career relevance. Digital marketing is one of the fastest-growing fields, and companies of every size need skilled professionals who understand both strategy and execution.</p>
      <ul>
        <li><strong>Study while you earn:</strong> keep your job and apply new skills immediately at work.</li>
        <li><strong>Affordable fees:</strong> online programs usually cost far less than full-time campus MBAs.</li>
        <li><strong>Industry-ready skills:</strong> learn tools and platforms used by real marketing teams.</li>
        <li><strong>High demand:</strong> every business going online needs digital marketers.</li>
        <li><strong>Flexible schedule:</strong> ideal for working professionals and exam aspirants.</li>
      </ul>

      <h2 id="curriculum">Course Curriculum and Key Subjects</h2>
      <p>The syllabus is designed to build a strong management base in the first year and deep specialisation in the second. Although subjects vary by university, most programs cover:</p>
      <ul>
        <li>Principles of Management and Marketing Management</li>
        <li>Search Engine Optimisation (SEO) and Search Engine Marketing (SEM)</li>
        <li>Social Media Marketing and Influencer Strategy</li>
        <li>Content Marketing and Email Marketing</li>
        <li>Web Analytics, Google Analytics and Performance Measurement</li>
        <li>Consumer Behaviour and Digital Branding</li>
        <li>E-commerce, Marketing Automation and Growth Hacking</li>
        <li>Capstone Project or Live Digital Campaign</li>
      </ul>

      <h2 id="skills">Skills You Will Develop</h2>
      <p>By the end of the program, students gain practical, job-ready capabilities rather than only theory. You will learn how to research keywords and rank websites, run paid ad campaigns on Google and Meta, design content calendars, analyse traffic data and turn insights into decisions.</p>

      <h2 id="eligibility">Eligibility and Admission Process</h2>
      <p>To apply for an Online MBA in Digital Marketing you generally need a bachelor's degree in any discipline from a recognised university. Many programs offer direct, merit-based admission without an entrance exam. The admission process is fully online: register on the portal, fill the application form, upload your documents and pay the fee.</p>

      <h2 id="fees">Fees and Affordability</h2>
      <p>One of the strongest advantages of an Online MBA in Digital Marketing is its affordability. Because there are no campus, hostel or commuting costs, the total fee is usually much lower than a full-time MBA. Fees typically range from ₹50,000 to ₹1,20,000 for the full program depending on the university.</p>

      <h2 id="career">Career Opportunities and Salary Scope</h2>
      <p>Graduates of an Online MBA in Digital Marketing can pursue a wide range of roles across industries. Common career paths include:</p>
      <ul>
        <li>Digital Marketing Manager — ₹6–12 LPA</li>
        <li>SEO/SEM Specialist — ₹4–8 LPA</li>
        <li>Social Media Manager — ₹4–7 LPA</li>
        <li>Content Strategist — ₹5–9 LPA</li>
        <li>Growth Hacker / Performance Marketer — ₹7–15 LPA</li>
        <li>Brand Manager — ₹8–16 LPA</li>
        <li>E-commerce Manager — ₹6–14 LPA</li>
      </ul>

      <h2 id="worth">Is an Online MBA in Digital Marketing Worth It?</h2>
      <p>Yes — if you choose a program from a UGC-DEB recognised university, an Online MBA in Digital Marketing offers excellent value. The combination of a recognised MBA degree with high-demand digital skills gives you a strong advantage in the job market at a fraction of the cost of a campus MBA.</p>
      <p>Whether you are a fresh graduate wanting to enter marketing, a working professional seeking a promotion, or an entrepreneur looking to grow your brand online — this program can accelerate your goals with flexibility and affordability.</p>
    `,
    faq: [
      [
        'What is the duration of an Online MBA in Digital Marketing?',
        'The program is typically 2 years (4 semesters), though some universities offer an accelerated 1-year option.'
      ],
      [
        'Is an Online MBA in Digital Marketing valid for government jobs?',
        'Yes, if the university is UGC-DEB approved, the degree holds equal validity to a regular MBA for government jobs and higher studies.'
      ],
      [
        'What is the average fee for an Online MBA in Digital Marketing?',
        'Fees range from ₹50,000 to ₹1,20,000 for the full program, making it significantly more affordable than a full-time campus MBA.'
      ],
      [
        'Can I pursue this program while working full time?',
        'Yes, the flexible online format is designed specifically for working professionals. You can attend live sessions on weekends and access recorded lectures anytime.'
      ]
    ]
  },
  'dusol-admission-2026-form-filling-guide': {
    slug: 'dusol-admission-2026-form-filling-guide',
    title: 'DU SOL Admission 2026: Step-by-Step Form Filling Guide',
    excerpt: 'Complete walkthrough of the DU SOL online admission process.',
    date: 'May 28, 2026',
    category: 'Admission',
    toc: [
      ['Overview of DU SOL Admission 2026', '#overview'],
      ['Eligibility Criteria', '#eligibility'],
      ['Documents Required', '#documents'],
      ['Step-by-Step Form Filling', '#steps'],
      ['Fee Payment', '#payment']
    ],
    body: `
      <h2 id="overview">Overview of DU SOL Admission 2026</h2>
      <p>The School of Open Learning (SOL), University of Delhi, opens admissions for its UG and PG programs annually. For the 2026 session, the last date to apply for distance courses is generally <strong>31st May 2026</strong>.</p>

      <h2 id="eligibility">Eligibility Criteria</h2>
      <p>For UG programs (BA, BCom, BBA, BMS): candidates must have passed their 10+2 examination from a recognized board. For PG programs (MA, MCom, MBA): a bachelor's degree from a recognized university is required.</p>

      <h2 id="documents">Documents Required</h2>
      <ul>
        <li>Class 10 and 12 mark sheets (for UG) or degree certificate (for PG)</li>
        <li>Passport-size photograph (recent, against white background)</li>
        <li>Signature on white paper</li>
        <li>Aadhaar card or other valid ID proof</li>
        <li>Category certificate (SC/ST/OBC/EWS, if applicable)</li>
        <li>Migration certificate (if applicable)</li>
      </ul>

      <h2 id="steps">Step-by-Step Form Filling</h2>
      <p><strong>Step 1:</strong> Visit the official DU SOL portal and click on "New Registration".</p>
      <p><strong>Step 2:</strong> Enter your mobile number and email to receive OTPs. Verify both.</p>
      <p><strong>Step 3:</strong> Fill in your personal details — name (as on certificates), date of birth, category, etc.</p>
      <p><strong>Step 4:</strong> Enter your academic details — 10+2 marks, stream, year of passing.</p>
      <p><strong>Step 5:</strong> Select your desired program (BA, BCom, BBA, BMS for UG; MA, MCom, MBA for PG).</p>
      <p><strong>Step 6:</strong> Upload all required documents in the specified format and size.</p>
      <p><strong>Step 7:</strong> Preview your application carefully before submission.</p>

      <h2 id="payment">Fee Payment</h2>
      <p>The application fee is typically ₹1,000 (check the official portal for the current fee). Payment can be made via net banking, debit/credit card or UPI. After successful payment, download and save your payment receipt.</p>
      <p>For free step-by-step guidance on filling your DU SOL application form, get in touch with College Drishti counsellors — the service is 100% free.</p>
    `,
    faq: [
      [
        'When does DU SOL admission start for 2026?',
        'DU SOL admission for the 2026 session typically opens in May and the last date to apply is around 31st May 2026.'
      ],
      [
        'What is the application fee for DU SOL?',
        'The application fee is approximately ₹1,000. Check the official portal for the exact and current fee.'
      ],
      [
        'Can I apply for DU SOL admission without an entrance exam?',
        'Yes, DU SOL offers merit-based admission for most programs without an entrance exam.'
      ]
    ]
  },
  'dusol-exam-pattern-explained': {
    slug: 'dusol-exam-pattern-explained',
    title: 'DU SOL Exam Pattern Explained for New Students',
    excerpt:
      'A clear breakdown of the DU SOL examination pattern, marking scheme and assignment weightage.',
    date: 'April 15, 2026',
    category: 'Exams',
    toc: [
      ['Overview of DU SOL Exam Pattern', '#overview'],
      ['Assignment-Based Evaluation', '#assignments'],
      ['Semester End Examination', '#exams'],
      ['How to Prepare', '#prepare']
    ],
    body: `
      <h2 id="overview">Overview of DU SOL Exam Pattern</h2>
      <p>DU SOL follows a semester system for its UG and PG programs. The evaluation is divided into two components: internal assessment (assignments) and the semester-end examination.</p>

      <h2 id="assignments">Assignment-Based Evaluation</h2>
      <p>Assignments carry 30% of the total marks. Students are required to submit assignments for each subject before the semester-end exam. The assignments are evaluated by the university faculty and contribute directly to your final grade.</p>

      <h2 id="exams">Semester End Examination</h2>
      <p>The semester-end examination accounts for 70% of the total marks. These are conducted at designated exam centres. The exam is conducted in an offline (pen and paper) format. Each paper is typically 3 hours long.</p>

      <h2 id="prepare">How to Prepare</h2>
      <p>Focus on the self-learning material (SLM) provided by DU SOL, which is the primary resource for the exam. Supplement with reference books and previous year question papers available on the portal. Attend the personal contact program (PCP) sessions if offered for your program.</p>
    `,
    faq: [
      [
        'What is the exam pattern for DU SOL?',
        'DU SOL has a 70:30 pattern — 70 marks for semester-end exams and 30 marks for assignments.'
      ],
      [
        'Are DU SOL exams online or offline?',
        'Semester-end exams are conducted offline (pen and paper) at designated exam centres.'
      ]
    ]
  },
  'delhi-university-online-courses-admission-2026': {
    slug: 'delhi-university-online-courses-admission-2026',
    title: 'Delhi University Online Courses Admission 2026 Guide',
    excerpt:
      'Everything you need to know about DU online course admissions for 2026.',
    date: 'April 14, 2026',
    category: 'Admission',
    toc: [
      ['DU Online Courses Available', '#courses'],
      ['Admission Process', '#process'],
      ['Eligibility', '#eligibility'],
      ['Fees', '#fees']
    ],
    body: `
      <h2 id="courses">DU Online Courses Available</h2>
      <p>The University of Delhi through DU SOL offers a wide range of online and distance programs including BA, BCom, BBA, BMS, MA, MCom, MBA, MCA, MSc, MJMC, MLIS and MTech.</p>

      <h2 id="process">Admission Process</h2>
      <p>The admission process is completely online. Students register on the DU SOL portal, fill the application form, upload documents and pay the application fee. Merit-based admission is followed for most programs.</p>

      <h2 id="eligibility">Eligibility</h2>
      <p>UG programs require 10+2 from a recognized board. PG programs require a bachelor's degree from a recognized university. Specific programs may have additional eligibility criteria.</p>

      <h2 id="fees">Fees</h2>
      <p>DU SOL is known for its affordable fee structure. UG program fees range from ₹27,999 to ₹49,999 for the full program. PG fees range from ₹17,999 to ₹99,999 depending on the course. Get a free fee comparison and counselling from College Drishti.</p>
    `,
    faq: [
      [
        'Which online courses does Delhi University offer?',
        'DU SOL offers BA, BCom, BBA, BMS, MA, MCom, MBA, MCA, MSc, MJMC, MLIS and MTech in online/distance mode.'
      ],
      [
        'Is DU SOL the same as Delhi University?',
        'DU SOL (School of Open Learning) is a constituent institution of the University of Delhi, offering distance and online education.'
      ]
    ]
  },
  'dusol-online-mba-fees-guide': {
    slug: 'dusol-online-mba-fees-guide',
    title: 'DU SOL Online MBA Course Fees: Complete Guide',
    excerpt: 'Detailed fee breakdown for the DU SOL Online MBA.',
    date: 'April 9, 2026',
    category: 'Fees',
    toc: [
      ['DU SOL Online MBA Fee Structure', '#fees'],
      ['Fee Components', '#components'],
      ['Payment Schedule', '#schedule'],
      ['Comparison with Other Universities', '#comparison']
    ],
    body: `
      <h2 id="fees">DU SOL Online MBA Fee Structure</h2>
      <p>The DU SOL Online MBA is one of the most affordable MBA programs in India. The total fee for the 2-year program is approximately <strong>₹89,999</strong>, payable in installments.</p>

      <h2 id="components">Fee Components</h2>
      <p>The fee structure includes: Application Fee (₹1,500), Semester Fee (payable each semester), and Examination Fee (₹2,500 per year). Study material and learning resources are included in the program fee.</p>

      <h2 id="schedule">Payment Schedule</h2>
      <p>The fee is payable on a semester basis. Students can pay via net banking, debit/credit card or UPI. Late payment attracts a fine as per university norms.</p>

      <h2 id="comparison">Comparison with Other Universities</h2>
      <p>Compared to other online MBA programs, DU SOL offers excellent value. While private university online MBAs can cost ₹1.5–3 lakhs, the DU SOL program at under ₹90,000 provides a University of Delhi degree with UGC-DEB recognition.</p>
    `,
    faq: [
      [
        'What is the total fee for DU SOL Online MBA?',
        'The total fee for the DU SOL Online MBA is approximately ₹89,999 for the full 2-year program.'
      ],
      [
        'Can I pay the fee in installments?',
        'Yes, the fee is payable on a per-semester basis, making it manageable for students and working professionals.'
      ]
    ]
  },
  'dusol-support-grievance-guide': {
    slug: 'dusol-support-grievance-guide',
    title: 'DU SOL Support & Grievance Redressal Guide',
    excerpt: 'Learn how to raise a grievance and get support from DU SOL.',
    date: 'April 7, 2026',
    category: 'Support',
    toc: [
      ['DU SOL Support Channels', '#channels'],
      ['How to Raise a Grievance', '#grievance'],
      ['Common Issues and Solutions', '#issues']
    ],
    body: `
      <h2 id="channels">DU SOL Support Channels</h2>
      <p>DU SOL provides multiple channels for student support including the official student portal, email support, helpline numbers and in-person support at the SOL office. For free expert guidance, College Drishti offers personalised counselling.</p>

      <h2 id="grievance">How to Raise a Grievance</h2>
      <p>Login to the DU SOL student portal and navigate to the Grievance section. Fill in the complaint form with details of the issue, attach supporting documents if needed, and submit. You will receive a ticket number to track the status of your complaint.</p>

      <h2 id="issues">Common Issues and Solutions</h2>
      <p>Common issues include portal login problems, fee payment errors, study material not received, admit card issues and result discrepancies. For each of these, the portal has dedicated resolution pathways. If unresolved, escalate to the University Ombudsman.</p>
    `,
    faq: [
      [
        'How long does DU SOL take to resolve grievances?',
        'DU SOL typically resolves grievances within 15–30 working days. Track your complaint using the ticket number provided.'
      ]
    ]
  },
  'dusol-admission-competitive-exam-aspirants': {
    slug: 'dusol-admission-competitive-exam-aspirants',
    title: 'DU SOL Admission for Competitive Exam Aspirants',
    excerpt:
      'How DU SOL programs are ideal for students preparing for UPSC, SSC, banking exams.',
    date: 'April 2, 2026',
    category: 'Admission',
    toc: [
      ['Why DU SOL for Competitive Exam Aspirants', '#why'],
      ['Best Programs for Aspirants', '#programs'],
      ['Balancing Study and Preparation', '#balance']
    ],
    body: `
      <h2 id="why">Why DU SOL for Competitive Exam Aspirants</h2>
      <p>Many UPSC, SSC and banking exam aspirants choose DU SOL because it allows them to pursue a degree simultaneously with their competitive exam preparation. The flexible schedule means you are not bound by daily classroom attendance.</p>

      <h2 id="programs">Best Programs for Aspirants</h2>
      <p>The BA program with Political Science, History or Economics is particularly popular among UPSC aspirants. The BCom and BBA programs are preferred by banking and SSC aspirants. These programs provide academic depth relevant to competitive exams while offering the flexibility needed for self-study.</p>

      <h2 id="balance">Balancing Study and Preparation</h2>
      <p>DU SOL study material covers subjects that overlap significantly with competitive exam syllabi. Studying DU SOL BA subjects like Economics, Political Science and History simultaneously builds your competitive exam knowledge. Assignments can be completed during lighter preparation periods, and semester exams require only focused preparation for a few weeks.</p>
    `,
    faq: [
      [
        'Can I do DU SOL while preparing for UPSC?',
        'Yes, DU SOL is one of the best options for UPSC aspirants as it provides a recognized degree with maximum flexibility for self-study.'
      ],
      [
        'Is a DU SOL degree valid for government jobs?',
        'Yes, DU SOL degrees are fully recognized for government job applications as they are awarded by the University of Delhi and approved by UGC-DEB.'
      ]
    ]
  }
}

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

export default function BlogPage () {
  const { slug } = useParams()

  const [post, setPost] = useState(null)
  const [toc, setToc] = useState([])
  const [faqData, setFaqData] = useState([])
  useEffect(() => {
    if (slug) {
      fetchBlog()
    }
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
              <div className='post-cover'>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.featured_image}`}
                  alt={post.title}
                  className='img-fluid'
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

              {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
            </article>

            <aside>
              <div className='blog-lead'>
                <div className='bl-head'>
                  <h3>Book 100% Free Counseling</h3>
                  <p>Get 1-to-1 expert guidance from College Drishti</p>
                </div>
                <form
                  className='bl-form'
                  onSubmit={e => {
                    e.preventDefault()
                    alert('Thank you! Our counsellor will contact you shortly.')
                    e.target.reset()
                  }}
                >
                  <input type='text' placeholder='Enter Your Name' required />
                  <input type='email' placeholder='Enter Your Email' required />
                  <input type='tel' placeholder='Enter Your Number' required />
                  <select required>
                    <option value=''>Select Course</option>
                    <option>Online MBA</option>
                    <option>Online MCA</option>
                    <option>Online BBA</option>
                    <option>Online BCom</option>
                    <option>Online BA</option>
                    <option>Other</option>
                  </select>
                  <label className='bl-consent'>
                    <input type='checkbox' required /> I agree to receive
                    updates via email / mobile.
                  </label>
                  <button type='submit' className='btn btn-purple btn-block'>
                    SUBMIT
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
              Get personalised guidance from College Drishti experts — compare
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

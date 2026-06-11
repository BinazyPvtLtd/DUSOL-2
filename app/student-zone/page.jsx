'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const SZ = {
  'dusol-admission': {
    title: 'DU SOL Admission 2026',
    lead: 'Complete guide to DU SOL UG & PG admission for the 2026 session.',
    body: `
      <p>The School of Open Learning (SOL), University of Delhi follows an annual admission process for its undergraduate and postgraduate programmes. The last date to apply for DU SOL online and distance courses is generally <strong>31st May 2026</strong>.</p>
      <h3>Admission Process</h3>
      <ul class="bullets">
        <li>Visit the official DU SOL portal and register as a new applicant.</li>
        <li>Fill the application form with personal and academic details.</li>
        <li>Upload required documents (photo, signature, mark sheets, ID proof).</li>
        <li>Pay the application fee online.</li>
        <li>Submit the form and track confirmation.</li>
      </ul>
      <h3>Documents Required</h3>
      <ul class="bullets">
        <li>Class 10 & 12 mark sheets (UG) / Degree (PG)</li>
        <li>Passport-size photograph and signature</li>
        <li>Aadhaar / ID proof</li>
        <li>Category certificate (if applicable)</li>
      </ul>
    `,
  },
  'dusol-courses-fees': {
    title: 'DU SOL Courses & Fees 2026',
    lead: 'Course-wise fee structure for DU SOL online and distance programs.',
    table: {
      head: ['Course', 'Duration', 'Total Fee (approx.)'],
      rows: [
        ['BA', '3 Years', '₹27,999'],
        ['BCom', '3 Years', '₹29,999'],
        ['BBA', '3 Years', '₹49,999'],
        ['BMS', '3 Years', '₹44,999'],
        ['MA', '2 Years', '₹19,999'],
        ['MCom', '2 Years', '₹24,999'],
        ['MBA', '2 Years', '₹89,999'],
        ['MCA', '2 Years', '₹79,999'],
      ],
    },
    body: `<p>DU SOL is known for its affordable fee structure. Fees vary by program and are payable per year or per semester. Below is an indicative fee list — exact fees are confirmed at the time of admission.</p>`,
  },
  'dusol-hall-ticket': {
    title: 'DU SOL Hall Ticket / Admit Card',
    lead: 'How to download your DU SOL examination hall ticket.',
    body: `
      <p>The DU SOL hall ticket (admit card) is released before each semester examination and is mandatory to appear for exams.</p>
      <h3>Steps to Download</h3>
      <ul class="bullets">
        <li>Visit the official DU SOL student portal.</li>
        <li>Login with your roll number / enrolment number and password.</li>
        <li>Go to the "Admit Card" section.</li>
        <li>Download and print the hall ticket along with a valid photo ID.</li>
      </ul>
    `,
  },
  'du-sol-study-material': {
    title: 'DU SOL Study Material',
    lead: 'Access self-learning material, e-books and lecture resources.',
    body: `
      <p>DU SOL provides self-learning study material (SLM) including printed books, e-books, assignments and recorded lectures for all enrolled students.</p>
      <h3>How to Access</h3>
      <ul class="bullets">
        <li>Login to the DU SOL learning portal.</li>
        <li>Select your program and semester.</li>
        <li>Download subject-wise PDFs and reference material.</li>
        <li>Printed material is dispatched to your registered address where applicable.</li>
      </ul>
    `,
  },
  'dusol-result': {
    title: 'DU SOL Result 2026',
    lead: 'Check your DU SOL semester and annual examination results.',
    body: `
      <p>DU SOL results are published on the University of Delhi examination portal after each semester / annual examination cycle.</p>
      <h3>Steps to Check Result</h3>
      <ul class="bullets">
        <li>Visit the DU examination results portal.</li>
        <li>Select School of Open Learning and your course.</li>
        <li>Enter your roll number / exam roll number.</li>
        <li>View and download your result / mark sheet.</li>
      </ul>
    `,
  },
  'du-sol-library-portal': {
    title: 'DU SOL Library Portal',
    lead: 'Digital library access for DU SOL students.',
    body: `
      <p>The DU SOL library portal gives enrolled students access to a wide range of e-books, journals, question papers and digital learning resources.</p>
      <h3>Features</h3>
      <ul class="bullets">
        <li>Thousands of e-books and reference titles</li>
        <li>Previous year question papers</li>
        <li>Research journals and periodicals</li>
        <li>24x7 online access with student login</li>
      </ul>
    `,
  },
  'du-sol-assignment-status': {
    title: 'DU SOL Assignment Status',
    lead: 'Track submission and evaluation status of your assignments.',
    body: `
      <p>Internal assignments are a part of DU SOL evaluation. Students can track submission and marking status through the student portal.</p>
      <h3>How to Check</h3>
      <ul class="bullets">
        <li>Login to the DU SOL student portal.</li>
        <li>Open the "Assignments" section.</li>
        <li>View submitted, pending and evaluated assignments.</li>
        <li>Download submission receipts for your records.</li>
      </ul>
    `,
  },
  'dusol-alternative-universities': {
    title: 'DU SOL Alternative Universities',
    lead: 'Compare DU SOL with other UGC-DEB approved online & distance universities.',
    table: {
      head: ['University', 'Mode', 'NAAC Grade'],
      rows: [
        ['Amity University Online', 'Online', 'A+'],
        ['IGNOU', 'Distance / Online', 'A++'],
        ['Manipal University Online', 'Online', 'A+'],
        ['LPU Online', 'Online', 'A++'],
        ['NMIMS Distance', 'Distance', 'A+'],
      ],
    },
    body: `<p>If you are exploring options beyond DU SOL, several UGC-DEB approved universities offer flexible online and distance programs. Compare recognition, fees and specializations before choosing. Get free guidance from College Drishti to pick the right fit.</p>`,
  },
}

const SZ_LINKS = [
  ['DUSOL Admission', 'dusol-admission'],
  ['DUSOL Courses Fees', 'dusol-courses-fees'],
  ['DUSOL Hall Ticket', 'dusol-hall-ticket'],
  ['DU SOL Study Material', 'du-sol-study-material'],
  ['DUSOL Result', 'dusol-result'],
  ['DU SOL Library Portal', 'du-sol-library-portal'],
  ['DU SOL Assignment Status', 'du-sol-assignment-status'],
  ['DUSOL Alternative Universities', 'dusol-alternative-universities'],
]

function StudentZoneContent() {
  const searchParams = useSearchParams()
  const pageKey = searchParams.get('p') || 'dusol-admission'
  const page = SZ[pageKey] || SZ['dusol-admission']

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            <span>Student Zone</span>
            <span className="sep">›</span>
            <span>{page.title}</span>
          </div>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="content-page">
        <div className="wrap">
          <div className="content-layout">
            <div className="content-main">
              {page.table && (
                <table className="info-table">
                  <thead>
                    <tr>
                      {page.table.head.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {page.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div dangerouslySetInnerHTML={{ __html: page.body }} />
            </div>
            <aside>
              <div className="counsel-card">
                <div className="counsel-head">
                  <h3>Book 100% Free Counseling</h3>
                  <p>Get 1 to 1 Expert Guidance from DU SOL</p>
                </div>
                <div className="counsel-body">
                  <input type="text" placeholder="Enter Your Name" />
                  <input type="email" placeholder="Enter Your Email" />
                  <input type="tel" placeholder="🇮🇳 Enter Your Number" />
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
                  <p className="consent">I authorise DU SOL to contact me with updates via SMS / Email / WhatsApp.</p>
                  <button
                    className="btn btn-purple btn-block"
                    onClick={() => alert('Thank you! Our counsellor will contact you soon.')}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
              <div className="side-card" style={{ marginTop: '22px' }}>
                <h3>Student Zone Links</h3>
                <ul className="qual-list">
                  {SZ_LINKS.map(([label, slug]) => (
                    <li key={slug}>
                      <Link
                        href={`/student-zone?p=${slug}`}
                        style={{
                          color: pageKey === slug ? 'var(--purple)' : 'inherit',
                          fontWeight: pageKey === slug ? 700 : 500,
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default function StudentZonePage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>}>
      <StudentZoneContent />
    </Suspense>
  )
}

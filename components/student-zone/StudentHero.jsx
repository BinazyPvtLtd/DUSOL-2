'use client'

import Link from 'next/link'

export default function StudentHero({
  title,
  description
}) {
  return (
    <section className='page-hero'>
      <div className='wrap'>
        <div className='breadcrumb'>
          <Link href='/'>Home</Link>

          <span className='sep'>›</span>

          <span>Student Zone</span>

          <span className='sep'>›</span>

          <span>{title}</span>
        </div>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>
    </section>
  )
}
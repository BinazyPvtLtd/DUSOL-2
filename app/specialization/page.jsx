import Link from 'next/link'

export const metadata = {
  title: 'Specialization | DU SOL',
  description:
    'Explore course specializations and choose the right path for your academic and career goals.'
}

export default function SpecializationPage () {
  return (
    <section className='page-hero'>
      <div className='wrap'>
        <div className='breadcrumb'>
          <Link href='/'>Home</Link>
          <span className='sep'>›</span>
          <span>Specialization</span>
        </div>

        <h1>Specialization</h1>
        <p>
          Explore specializations for DU SOL courses. This page is a placeholder
          to keep Next.js prerender stable.
        </p>
      </div>
    </section>
  )
}


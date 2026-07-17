import Link from 'next/link'

export const metadata = {
  title: 'Thank You | Distance Education Learning',
  description: 'Your counselling request has been submitted successfully.',
  robots: {
    index: false,
    follow: false
  }
}

export default function ThankYouPage () {
  return (
    <section className='flex min-h-[70vh] items-center justify-center bg-bg px-4 py-16'>
      <div className='w-full max-w-xl rounded-site bg-white p-8 text-center shadow sm:p-12'>
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green/10'>
          <svg
            className='h-10 w-10 text-green'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='M20 6L9 17l-5-5' />
          </svg>
        </div>

        <h1 className='mb-3 font-head text-3xl font-bold text-ink sm:text-4xl'>
          Thank You!
        </h1>

        <p className='mb-8 text-base text-muted sm:text-lg'>
          Your counselling request has been submitted successfully.
          <br />
          Our admission experts will contact you shortly.
        </p>

        <div className='flex flex-col justify-center gap-3 sm:flex-row'>
          <Link
            href='/courses'
            className='rounded-lg bg-purple px-6 py-3 font-semibold text-white transition hover:bg-purple-dark'
          >
            Explore Courses
          </Link>
          <Link
            href='/'
            className='rounded-lg border border-line px-6 py-3 font-semibold text-ink transition hover:bg-bg'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}

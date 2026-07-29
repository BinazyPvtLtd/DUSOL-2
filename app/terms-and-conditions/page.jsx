import TermsConditionsContent from '@/components/legal/TermsConditionsContent'

export const metadata = {
  title: 'Terms & Conditions | Distance Education Learning',
  description:
    'Review the Terms & Conditions for using distanceeducationlearning.com, including acceptable use, intellectual property and limitation of liability.',
  alternates: {
    canonical: '/terms-and-conditions'
  }
}

export default function TermsAndConditionsPage() {
  return (
    <section className='bg-bg px-4 py-12 sm:py-16'>
      <div className='mx-auto max-w-3xl rounded-site bg-white p-6 shadow sm:p-10'>
        <TermsConditionsContent />
      </div>
    </section>
  )
}

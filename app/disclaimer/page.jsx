import DisclaimerContent from '@/components/legal/DisclaimerContent'

export const metadata = {
  title: 'Disclaimer | Distance Education Learning',
  description:
    'Read the disclaimer for distanceeducationlearning.com regarding university names, trademarks and the accuracy of information published on this website.',
  alternates: {
    canonical: '/disclaimer'
  }
}

export default function DisclaimerPage() {
  return (
    <section className='bg-bg px-4 py-12 sm:py-16'>
      <div className='mx-auto max-w-3xl rounded-site bg-white p-6 shadow sm:p-10'>
        <DisclaimerContent />
      </div>
    </section>
  )
}

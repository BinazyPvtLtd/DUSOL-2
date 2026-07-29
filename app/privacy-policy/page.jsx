import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent'

export const metadata = {
  title: 'Privacy Policy | Distance Education Learning',
  description:
    'Learn how distanceeducationlearning.com collects, uses and protects your personal information when you use our website and counselling services.',
  alternates: {
    canonical: '/privacy-policy'
  }
}

export default function PrivacyPolicyPage() {
  return (
    <section className='bg-bg px-4 py-12 sm:py-16'>
      <div className='mx-auto max-w-3xl rounded-site bg-white p-6 shadow sm:p-10'>
        <PrivacyPolicyContent />
      </div>
    </section>
  )
}

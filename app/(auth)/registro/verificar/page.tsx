'use client'

import { useState } from 'react'

import { VerifyEmailForm } from '../../_components/verify-email-form'
import { useRouter } from 'next/navigation'
import { CompleteRegisterForm } from '../../_components/complete-register-form'

export default function VerifyPage() {
  const router = useRouter()
  const [view, setView] = useState<'COMPLETE' | 'OTP'>('OTP')

  return (
    <main className='flex min-h-screen items-center justify-center px-4'>
      <div className='mx-auto w-full max-w-sm space-y-6'>

        {view === 'OTP' && (
          <VerifyEmailForm onSucceded={() => setView('COMPLETE')} />
        )}

        {view === 'COMPLETE' && (
          <CompleteRegisterForm onSucceded={() => router.push('/')} />
        )}

      </div>
    </main>
  )
}

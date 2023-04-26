import Link from 'next/link'

import { QrCode } from 'lucide-react'

import { getCurrentUser } from '@/hooks/auth'

import Navbar from '@/components/navbar'
import MainTabs from '@/components/main-tabs'
import { Button } from '@/ui/button'
import { headers } from 'next/headers'

async function getQr(origin: string, email: string,) {
  const res = await fetch(origin + '/api/qr/' + email, {
    next: {
      revalidate: 10,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch qr')
  }
  return res.json()
}

export default async function Home() {
  const headersList = headers()
  const origin = headersList.get('x-origin') || ''

  const user = await getCurrentUser()
  const qr = await getQr(origin, user?.email ?? '')
  return (
    <main>
      <Navbar />
      <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
        <h1 className='text-5xl font-bold leading-loose truncate'>{user?.user_metadata.name}</h1>
        <MainTabs
          qr={qr}
        />
        <Link href={'/metadata'} className='rounded-2xl'>
          <div className='absolute z-30 w-16 right-4'>
            <Button type='submit' className='w-16 fixed bottom-8'>
              <QrCode />
            </Button>
          </div>
        </Link>
      </div>
    </main >
  )
}

import Link from 'next/link'

import { QrCode } from 'lucide-react'

import { getCurrentUser } from '@/hooks/auth'

import Navbar from '@/components/navbar'
import MainTabs from '@/components/main-tabs'
import { Button } from '@/ui/button'
import { headers } from 'next/headers'

export const revalidate = 0

async function getQr(origin: string, email: string,) {
  const res = await fetch(origin + '/api/qr/' + email)
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
    <main className='px-4 min-h-screen relative max-w-7xl mx-auto'>
      <Navbar />
      <h1 className='text-5xl font-bold leading-loose truncate'>{user?.user_metadata.name}</h1>
      <MainTabs
        qr={qr}
      />
      <Link href={'/metadata'} className='rounded-2xl'>
        <Button className='w-16 fixed xl:absolute right-4 bottom-8'>
          <QrCode />
        </Button>
      </Link>
    </main >
  )
}

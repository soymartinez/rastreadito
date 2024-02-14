import Link from 'next/link'
import { QrCode } from 'lucide-react'
import { getCurrentUser } from '@/hooks/auth'

import Navbar from '@/components/navbar'
import MainTabs from '@/components/main-tabs'
import { Button } from '@/components/ui/button'
import LandingPage from '../landing-page'

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) return <LandingPage />

  return (
    <main>
      <Navbar />
      <div className='pb-10'>
        <h1 className='truncate text-5xl font-bold leading-loose'>{user?.user_metadata.name}</h1>
        {/* @ts-expect-error Async Server Component */}
        <MainTabs />
        <Link href={'/metadata'} className='rounded-2xl'>
          <div className='absolute right-4 z-30 w-16'>
            <Button type='submit' className='fixed bottom-8 w-16'>
              <QrCode />
            </Button>
          </div>
        </Link>
      </div>
    </main>
  )
}

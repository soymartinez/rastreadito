import Link from 'next/link'
import { redirect } from 'next/navigation'

import { QrCode } from 'lucide-react'

import { useCurrentUser } from '@/hooks/auth'

import Navbar from '@/components/navbar'
import MainTabs from '@/components/main-tabs'
import { Button } from '@/ui/button'

export const revalidate = 0

export default async function Home() {
  const user = await useCurrentUser()
  if (!user) redirect('/auth')
  return (
    <main className='px-4 min-h-screen relative max-w-7xl mx-auto'>
      <Navbar />
      <h1 className='text-5xl font-bold leading-loose truncate'>{user.user_metadata.name}</h1>
      <MainTabs />
      <Link href={'/metadata'} className='rounded-2xl'>
        <Button className='w-16 fixed xl:absolute right-4 bottom-8'>
          <QrCode />
        </Button>
      </Link>
    </main >
  )
}

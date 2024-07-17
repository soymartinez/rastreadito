import Footer from '@/components/site/footer'
import Navbar from '@/components/site/navbar'
import { createClient } from '@/utils/supabase/server'
import { ReactNode } from 'react'

export default async function HomeLayout({ children }: { children: ReactNode }) {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <main className='flex min-h-screen flex-col'>
      <Navbar variant={data.user ? 'HOME' : 'LANDING'} />
      <div className='flex-1'>
        {children}
      </div>
      <Footer />
    </main>
  )
}

import React from 'react'
import LandingPage from '../home/page'
import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/navbar'

export default async function page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return <LandingPage />

  return (
    <main>
      <Navbar user={user} variant='HOME' />
    </main>
  )
}

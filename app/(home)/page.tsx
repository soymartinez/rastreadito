import React from 'react'
import LandingPage from '../(landing)/home/page'
import { createClient } from '@/utils/supabase/server'

export default async function page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return <LandingPage />

  return (
    <main>
    </main>
  )
}

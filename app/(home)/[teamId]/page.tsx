import React from 'react'
import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/navbar'

export default async function TeamId() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main>
      <Navbar user={user} variant='HOME' />
    </main>
  )
}

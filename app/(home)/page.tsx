import React from 'react'
import LandingPage from '../(landing)/home/page'
import { createClient } from '@/utils/supabase/server'
import { env } from '@/env'

export default async function page() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.user_metadata.id

  if (!data.user) return <LandingPage />

  const userData = await (await fetch(env.NEXT_PUBLIC_APP_URL + '/api/users/' + userId)).json()

  return (
    <main>
      <pre>
        {JSON.stringify(userData, null, 2)}
      </pre>
    </main>
  )
}

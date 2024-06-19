'use client'

import { Toaster } from 'sonner'
import { useTheme } from 'next-themes'

export default function Toast() {
  const { resolvedTheme } = useTheme()
  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#00e99e',
          borderRadius: '1rem',
          border: 'none',
          fontWeight: 600,
        },
      }}
      position='bottom-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      expand={true}
      closeButton
    />
  )
}

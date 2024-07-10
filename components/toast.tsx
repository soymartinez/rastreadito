'use client'

import { Toaster } from 'sonner'
import { useTheme } from 'next-themes'

export default function Toast() {
  const { resolvedTheme } = useTheme()
  return (
    <Toaster
      position='bottom-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      expand={true}
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'group text-[13px] bg-primary gap-[6px] p-[16px] rounded-[8px] shadow-lg flex items-center w-full',
          success: 'bg-primary text-dark',
          error: 'bg-red text-white',
          info: 'bg-blue text-white',
          warning: 'bg-gray',
          loader: 'bg-gray text-white',
          closeButton: 'group-hover:opacity-100 transition opacity-0 bg-white text-dark',
        }
      }}
    />
  )
}

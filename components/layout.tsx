import React from 'react'

interface LayoutBoundaryProps {
    children: React.ReactNode
}

export default function LayoutBoundary({ children }: LayoutBoundaryProps) {
  return (
    <main
      className='
        relative
        mx-auto
        min-h-screen
        max-w-7xl
        px-4
        lg:px-6
      '
    >
      {children}
    </main>
  )
}

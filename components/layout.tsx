import React from 'react'

interface LayoutBoundaryProps {
    children: React.ReactNode
}

export default function LayoutBoundary({ children }: LayoutBoundaryProps) {
  return (
    <main
      className='
        px-4
        lg:px-8
        min-h-screen
        relative
        max-w-7xl
        mx-auto
      '
    >
      {children}
    </main>
  )
}

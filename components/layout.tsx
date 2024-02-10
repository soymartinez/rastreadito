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
      '
    >
      {children}
    </main>
  )
}

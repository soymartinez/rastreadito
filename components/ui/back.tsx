'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { ChevronLeft, LucideProps } from 'lucide-react'
import clsx from 'clsx'
// import { revalidateAction } from '@/app/(home)/actions/revalidate'

interface BackProps extends LucideProps {
    pushRoute?: string,
    revalidate?: string,
}

const Back = React.forwardRef<SVGSVGElement, BackProps>(
  ({ pushRoute, revalidate, className, ...props }, ref) => {
    const { back, push } = useRouter()
    return <ChevronLeft
      ref={ref}
      className={clsx('mx-3 cursor-pointer text-dark dark:text-white', className)}
      size={32}
      strokeWidth={3}
      onClick={async () => {
        // revalidate && await revalidateAction(revalidate)
        // pushRoute && await revalidateAction(pushRoute)
        pushRoute
          ? push(pushRoute)
          : back()
      }}
      {...props}
    />
  }
)
Back.displayName = 'Back'

export { Back }

'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { ChevronLeft, LucideProps } from 'lucide-react'
import clsx from 'clsx'

interface BackProps extends LucideProps {
    pushRoute?: string
}

const Back = React.forwardRef<SVGSVGElement, BackProps>(
    ({ pushRoute, className, ...props }, ref) => {
        const { back, push } = useRouter()
        return <ChevronLeft
            ref={ref}
            className={clsx('text-_dark dark:text-_white mx-3 cursor-pointer', className)}
            size={32}
            strokeWidth={3}
            onClick={() => {
                pushRoute
                    ? push(pushRoute)
                    : back()
            }}
            {...props}
        />
    }
)

export { Back }

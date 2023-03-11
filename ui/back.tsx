'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { ChevronLeft, LucideProps } from 'lucide-react'
import clsx from 'clsx'

const Back = React.forwardRef<SVGSVGElement, LucideProps>(
    ({ className, ...props }, ref) => {
        const router = useRouter()
        return <ChevronLeft
            ref={ref}
            className={clsx('text-_dark mx-3 cursor-pointer', className)}
            size={32}
            strokeWidth={3}
            onClick={() => router.back()}
            {...props}
        />
    }
)

export { Back }

'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

interface EmptyProps {
    title: string,
    description: string,
    height?: 'default' | 'full',
    className?: string,
}

export default function Empty({
    title,
    description,
    height = 'default',
    className,
}: EmptyProps) {
    return (
        <div className={clsx('flex justify-center items-center',
            height === 'default' && 'h-96 my-6',
            className,
        )}>
            <Balancer ratio={0.4}>
                {title}{' '}
                <span className='text-_primary hover:underline animate-pulse'>
                    <Link href='/metadata'>
                        {description}
                    </Link>
                </span>
            </Balancer>
        </div>

    )
}

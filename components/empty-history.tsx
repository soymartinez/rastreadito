'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

interface EmptyHistoryProps {
    title: string,
    description: string,
    height?: 'default' | 'full',
    className?: string,
}

export default function EmptyHistory({
    title,
    description,
    height = 'default',
    className,
}: EmptyHistoryProps) {
    return (
        <div className={clsx('flex justify-center items-center',
            height === 'default' && 'h-96 my-6',
            className,
        )}>
            <Balancer ratio={0.4}>
                Aún no tienes {title} registrados.{' '}
                <span className='text-_primary hover:underline animate-pulse'>
                    <Link href='/metadata'>
                        Registra tu primer {description}
                    </Link>
                </span>
            </Balancer>
        </div>

    )
}

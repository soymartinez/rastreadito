'use client'

import clsx from 'clsx'
import Link from 'next/link'

interface EmptyProps {
  title: string,
  description?: string,
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
    <div className={clsx('flex items-center justify-center text-balance',
      height === 'default' && 'my-6 h-96',
      className,
    )}>
      {title}{' '}
      {description &&
        <span className='animate-pulse text-_primary hover:underline'>
          <Link href='/metadata'>
            {description}
          </Link>
        </span>}
    </div>

  )
}

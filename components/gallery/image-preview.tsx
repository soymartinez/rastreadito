'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { RotateCcw } from 'lucide-react'
import clsx from 'clsx'

interface ImagePreviewProps {
    src: string
    alt: string
    selected?: boolean
    changeIcon?: boolean
    className?: string
    onClick?: () => void
}

export default function ImagePreview({
    src,
    alt,
    selected,
    changeIcon = true,
    className,
    onClick,
}: ImagePreviewProps) {
    const [hover, setHover] = useState(false)
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={clsx(`
                relative
                min-w-[100px]
                min-h-[100px]
                w-28 h-28
                cursor-pointer
                flex
                justify-center 
                items-center
                border
                border-_gray
                dark:border-_darkText
                rounded-2xl
                overflow-hidden
            `, className)}
        >
            <Image
                className={clsx('transition-transform object-contain', {
                    'scale-105': hover,
                    'scale-100': !hover,
                })}
                src={src}
                alt={alt}
                width={200}
                height={200}
            />
            <div className={clsx('absolute inset-0 transition flex justify-center items-center rounded-2xl overflow-hidden', {
                'opacity-0 scale-125': !hover,
                'opacity-100 scale-100 bg-_dark/30': hover,
                'hidden': !changeIcon,
            })}>
                <RotateCcw />
            </div>
            <div className={clsx('absolute inset-0 pointer-events-none', {
                'bg-_primary bg-opacity-50': selected,
            })} />
        </div>
    )
}

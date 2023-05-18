'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { RotateCcw, X } from 'lucide-react'
import clsx from 'clsx'

interface ImagePreviewProps {
    src: string
    alt: string
    selected?: boolean
    changeIcon?: boolean
    defaultIcon?: boolean
    className?: string
    onChangeImage?: () => void
    onRemoveImage?: () => void
}

export default function ImagePreview({
    src,
    alt,
    selected,
    changeIcon = true,
    defaultIcon = false,
    className,
    onChangeImage,
    onRemoveImage
}: ImagePreviewProps) {
    const [hover, setHover] = useState(false)
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative'
        >
            <div
                onClick={onChangeImage}
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
                    blurDataURL={src}
                    placeholder='blur'
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
            <button
                onClick={onRemoveImage}
                style={{
                    top: '0.3rem',
                    right: '0.3rem',
                }}
                className={clsx('absolute z-50 transition rounded-full p-1 overflow-hidden bg-_primary text-_dark', {
                    'opacity-0 scale-125': !hover,
                    'opacity-100 scale-100': hover,
                    'hidden': !defaultIcon,
                })}
            >
                <X size={16} />
            </button>
        </div>
    )
}

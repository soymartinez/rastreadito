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
            flex
            h-28
            min-h-[100px] w-28
            min-w-[100px]
            cursor-pointer
            items-center 
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-_gray
            dark:border-_darkText
        `, className)}
      >
        <Image
          className={clsx('object-contain transition-transform', {
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
        <div className={clsx('absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl transition', {
          'opacity-0 scale-125': !hover,
          'opacity-100 scale-100 bg-_dark/30': hover,
          'hidden': !changeIcon,
        })}>
          <RotateCcw />
        </div>
        <div className={clsx('pointer-events-none absolute inset-0', {
          'bg-_primary/50': selected,
        })} />
      </div>
      <button
        onClick={onRemoveImage}
        style={{
          top: '0.3rem',
          right: '0.3rem',
        }}
        className={clsx('absolute z-50 overflow-hidden rounded-full bg-_primary p-1 text-_dark transition', {
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

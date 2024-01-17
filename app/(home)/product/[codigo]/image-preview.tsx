'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

export default function ImagePreview({ imagenes, alt }: { imagenes: string[], alt: string }) {
  const [preview, setPreview] = useState<string>(imagenes[0])

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='relative h-64 w-64 xl:h-80 xl:w-80'>
        <Image
          fill
          src={preview}
          alt={alt}
          priority
        />
      </div>
      <div className='flex justify-center gap-3'>
        <Button
          size={'nothing'}
          variant={'image'}
          onClick={() => setPreview(imagenes[0])}
          className={clsx({
            'ring-2 ring-_primary': imagenes[0] === preview,
          })}
        >
          <Image src={imagenes[0]} alt={`${alt}-0`} fill />
        </Button>
        <Button
          size={'nothing'}
          variant={'image'}
          onClick={() => setPreview(imagenes[1])}
          className={clsx({
            'hidden': imagenes.length < 2,
          })}
        >
          {imagenes[1] && <Image src={imagenes[1]} alt={`${alt}-1`} fill />}
        </Button>
        <Button
          size={'nothing'}
          variant={'image'}
          onClick={() => setPreview(imagenes[2])}
          className={clsx({
            'hidden': imagenes.length < 3,
          })}
        >
          {imagenes[2] && <Image src={imagenes[2]} alt={`${alt}-2`} fill />}
        </Button>
        <Button
          size={'nothing'}
          variant={'image'}
          onClick={() => setPreview(imagenes[3])}
          className={clsx({
            'hidden': imagenes.length < 4,
          })}
        >
          {imagenes[3] && <Image src={imagenes[3]} alt={`${alt}-3`} fill />}
        </Button>
      </div>
    </div>
  )
}

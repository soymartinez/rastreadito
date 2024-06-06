'use client'

import { useState } from 'react'
import { QrProductType } from '@/types'
import clsx from 'clsx'
import Modal from './modal/modal'
import GenerateQr from './generate-qr'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ActiveButton, DestroyButton, UseButton } from './status'
import Link from 'next/link'
import { Maximize2 } from 'lucide-react'
import { getRelativeTime } from '@/lib/timeago'

interface Props {
  data: QrProductType
}

export default function TrOverview({
  data: {
    id,
    estatus,
    valor,
    codigo,
    fechaRegistro,
    producto: {
      nombre,
      descripcion,
      categoria,
      imagen,
    }
  },
}: Props) {
  const [showQr, setShowQr] = useState(false)
  const timeAgo = getRelativeTime(fechaRegistro.getTime() / 1000)
  return (
    <tr
      key={id}
      className={clsx('overflow-x-auto bg-white hover:bg-gray/80 dark:bg-dark dark:hover:bg-darkText/50')}
    >
      <td className='px-3 py-1'>
        <div className='w-min'>
          <Link href={`/product/${codigo}`}>
            <div className='rounded-full bg-white p-2 transition dark:bg-dark dark:hover:bg-primary/[15%]'>
              <Maximize2 size={14} className='text-dark dark:text-primary' />
            </div>
          </Link>
        </div>
      </td>
      <td className='px-3 py-1'>
        <h1 className='whitespace-nowrap font-semibold uppercase text-dark dark:text-white'>#{categoria} {id}</h1>
      </td>
      <td className='px-3 py-1'>
        <h1 className='whitespace-nowrap text-base font-semibold'>{nombre}</h1>
      </td>
      <td className='px-3 py-1'>
        <Button className='h-min transition-none hover:bg-grayText/30 hover:text-darkText dark:hover:bg-dark' style={{ padding: '0 8px' }} variant={'outline'} onClick={() => setShowQr(true)}>
          <h1 className='whitespace-nowrap text-base font-semibold text-grayText'>Mostar código</h1>
        </Button>
        {showQr && <Modal onClose={() => setShowQr(false)}>
          <div className='flex flex-col items-center px-2 py-16 text-darkText'>
            <div className='flex size-20 items-center justify-center rounded-lg bg-[#00DB94] object-contain'>
              <Image src={imagen?.[0] ?? ''} alt={nombre} width={63} height={63} />
            </div>
            <div className='flex w-full flex-col items-center justify-center pb-10 pt-8 font-semibold'>
              <h1 className='text-center text-4xl font-semibold dark:text-white'>{nombre}</h1>
              <p className='text-balance text-center dark:text-grayText'>
                {descripcion}
                <p>
                  Fecha: <span className='font-semibold'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</span>
                </p>
              </p>
            </div>
            <div className='overflow-hidden rounded-2xl'>
              {valor && <GenerateQr value={valor} />}
            </div>
          </div>
        </Modal>}
      </td>
      <td className='whitespace-nowrap px-3 py-2 font-semibold'>{timeAgo}</td>
      <td className='sticky right-0 z-20 border-l-4 border-gray bg-inherit px-3 py-1 font-semibold backdrop-blur-md dark:border-darkText'>
        {estatus === 'active' && <ActiveButton />}
        {estatus === 'inactive' && <UseButton />}
        {estatus === 'destroied' && <DestroyButton />}
      </td>
    </tr>
  )
}

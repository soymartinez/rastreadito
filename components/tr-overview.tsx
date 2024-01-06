'use client'

import { useState } from 'react'
import { QrProductType } from '@/types'
import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'
import Modal from './modal/modal'
import GenerateQr from './generateQr'
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
      className={clsx('overflow-x-auto bg-_white hover:bg-_gray/80 dark:bg-_dark dark:hover:bg-_darkText/50')}
    >
      <td className='px-3 py-1'>
        <div className='w-min'>
          <Link href={`/product/${codigo}`}>
            <div className='rounded-full bg-_white p-2 transition dark:bg-_dark dark:hover:bg-_primary/[15%]'>
              <Maximize2 size={14} className='text-_dark dark:text-_primary' />
            </div>
          </Link>
        </div>
      </td>
      <td className='px-3 py-1'>
        <h1 className='whitespace-nowrap font-semibold uppercase text-_dark dark:text-_white'>#{categoria} {id}</h1>
      </td>
      <td className='px-3 py-1'>
        <h1 className='whitespace-nowrap text-base font-semibold'>{nombre}</h1>
      </td>
      <td className='px-3 py-1'>
        <Button className='h-min transition-none hover:bg-_grayText/30 hover:text-_darkText dark:hover:bg-_dark' style={{ padding: '0 8px' }} variant={'outline'} onClick={() => setShowQr(true)}>
          <h1 className='whitespace-nowrap text-base font-semibold text-_grayText'>Mostar código</h1>
        </Button>
        {showQr && <Modal onClose={() => setShowQr(false)}>
          <div className='flex flex-col items-center px-2 py-16 text-_darkText'>
            <div className='flex h-20 w-20 items-center justify-center rounded-lg bg-[#00DB94] object-contain'>
              <Image src={imagen[0]} alt={nombre} width={63} height={63} />
            </div>
            <div className='flex w-full flex-col items-center justify-center pb-10 pt-8 font-semibold'>
              <h1 className='text-center text-4xl font-semibold dark:text-_white'>{nombre}</h1>
              <Balancer className='text-center dark:text-_grayText'>
                {descripcion}
                <p>
                  Fecha: <span className='font-semibold'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</span>
                </p>
              </Balancer>
            </div>
            <div className='overflow-hidden rounded-2xl'>
              {valor && <GenerateQr value={valor} />}
            </div>
          </div>
        </Modal>}
      </td>
      <td className='whitespace-nowrap px-3 py-2 font-semibold'>{timeAgo}</td>
      <td className='sticky right-0 z-20 border-l-4 border-_gray bg-inherit px-3 py-1 font-semibold backdrop-blur-md dark:border-_darkText'>
        {estatus === 'ACTIVO' && <ActiveButton />}
        {estatus === 'USADO' && <UseButton />}
        {estatus === 'DESTRUIDO' && <DestroyButton />}
      </td>
    </tr>
  )
}

'use client'

import { useState } from 'react'
import { QrProductType } from '@/types'
import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'
import Modal from './modal/modal'
import GenerateQr from './generateQr'
import Image from 'next/image'
import { Button } from '@/ui/button'
import { ActiveButton, DestroyButton, UseButton } from './status'
import Link from 'next/link'
import { Maximize2 } from 'lucide-react'

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
    return (
        <tr
            key={id}
            className={clsx('bg-_white hover:bg-_gray/80 dark:bg-_dark dark:hover:bg-_darkText/50 overflow-x-auto')}
        >
            <td className='px-3 py-1'>
                <div className='w-min'>
                    <Link href={`/product/${codigo}`}>
                        <div className='bg-_white dark:bg-_dark dark:hover:bg-_primary/[15%] transition p-2 rounded-full'>
                            <Maximize2 size={14} className='text-_dark dark:text-_primary' />
                        </div>
                    </Link>
                </div>
            </td>
            <td className='px-3 py-1'>
                <h1 className='font-semibold whitespace-nowrap text-_dark dark:text-_white uppercase'>#{categoria} {id}</h1>
            </td>
            <td className='px-3 py-1'>
                <h1 className='text-base font-semibold whitespace-nowrap'>{nombre}</h1>
            </td>
            <td className='px-3 py-1'>
                <Button className='h-min hover:bg-_grayText/30 hover:text-_darkText dark:hover:bg-_dark transition-none' style={{ padding: '0 8px' }} variant={'outline'} onClick={() => setShowQr(true)}>
                    <h1 className='text-base font-semibold whitespace-nowrap text-_grayText'>Mostar código</h1>
                </Button>
                {showQr && <Modal onClose={() => setShowQr(false)}>
                    <div className='flex flex-col items-center py-16 px-2 text-_darkText'>
                        <div className='w-20 h-20 bg-[#00DB94] rounded-lg flex justify-center items-center object-contain'>
                            <Image src={imagen[0]} alt={nombre} width={63} height={63} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-full font-semibold pt-8 pb-10'>
                            <h1 className='font-semibold text-4xl text-center dark:text-_white'>{nombre}</h1>
                            <Balancer className='text-center dark:text-_grayText'>
                                {descripcion}
                                <p>
                                    Fecha: <span className='font-semibold'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</span>
                                </p>
                            </Balancer>
                        </div>
                        <div className='rounded-2xl overflow-hidden'>
                            {valor && <GenerateQr value={valor} />}
                        </div>
                    </div>
                </Modal>}
            </td>
            <td className='px-3 py-2 font-semibold whitespace-nowrap'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</td>
            <td className='px-3 py-1 font-semibold sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray dark:border-_darkText'>
                {estatus === 'ACTIVO' && <ActiveButton />}
                {estatus === 'USADO' && <UseButton />}
                {estatus === 'DESTRUIDO' && <DestroyButton />}
            </td>
        </tr>
    )
}

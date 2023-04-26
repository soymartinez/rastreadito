'use client'

import { useState } from 'react'
import { QrProductType } from '@/types'
import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'
import Modal from './modal/modal'
import GenerateQr from './generateQr'
import Image from 'next/image'
import { Button } from '@/ui/button'

interface Props {
    data: QrProductType
}

export default function TrOverview({
    data: {
        id,
        estatus,
        codigo,
        fechaRegistro,
        producto: {
            nombre,
            descripcion,
            categoria,
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
                <h1 className='font-semibold whitespace-nowrap text-_dark dark:text-_white uppercase'>#{categoria} {id}</h1>
            </td>
            <td className='px-3 py-1'>
                <h1 className='text-base font-semibold'>{nombre}</h1>
            </td>
            <td className='px-3 py-1 w-full'>
                <Button className='h-min hover:bg-_grayText/30 hover:text-_darkText dark:hover:bg-_dark' style={{ padding: '0 8px' }} variant={'outline'} onClick={() => setShowQr(true)}>
                    <h1 className='text-base font-semibold whitespace-nowrap text-_grayText'>Mostar código</h1>
                </Button>
                {showQr && <Modal onClose={() => setShowQr(false)}>
                    <div className='flex flex-col items-center py-16 px-2 text-_darkText'>
                        <div className='w-20 h-20 bg-[#00DB94] rounded-lg flex justify-center items-center object-contain'>
                            <Image src='/cart-mango-96.png' alt='cart-mango-96' width={63} height={63} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-full font-semibold pt-8 pb-10'>
                            <h1 className='font-semibold text-4xl text-center'>{nombre}</h1>
                            <Balancer className='text-center dark:text-_grayText'>
                                {descripcion}
                                <p>
                                    Fecha: <span className='font-semibold'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</span>
                                </p>
                            </Balancer>
                        </div>
                        <div className='rounded-2xl overflow-hidden'>
                            <GenerateQr value={codigo} />
                        </div>
                    </div>
                </Modal>}
            </td>
            <td className='px-3 py-1 sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray dark:border-_darkText'>
                <div className='flex items-center gap-2'>
                    <div className='flex justify-center items-center relative'>
                        <div className={clsx('w-4 h-4 rounded-full', {
                            'bg-_primary': estatus === 'ACTIVO',
                            'bg-[#00d0ff]': estatus === 'USADO',
                            'bg-_darkText': estatus === 'DESTRUIDO',
                        })} />
                        <div className={clsx('w-4 h-4 rounded-full absolute animate-ping', {
                            'bg-_primary': estatus === 'ACTIVO',
                            'bg-[#00d0ff]': estatus === 'USADO',
                            'bg-_darkText': estatus === 'DESTRUIDO',
                        })} />
                    </div>
                    <h1 className='text-base font-medium text-_dark dark:text-_white'>{estatus}</h1>
                </div>
            </td>
        </tr>
    )
}

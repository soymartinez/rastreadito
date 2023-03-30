'use client'

import { Back } from '@/ui/back'
import { Button } from '@/ui/button'
import { Download, Printer, QrCode, Send } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import Modal from '@/components/modal'

export default function Generate() {
    const [modal, setModal] = useState(false)
    return (
        <main className='min-h-screen relative max-w-7xl mx-auto'>
            <div className='px-4 '>
                <div className='flex justify-center items-center py-8 relative'>
                    <Back className='absolute left-0' />
                    <h1 className='font-bold text-xl'>QR generado</h1>
                </div>
                <div className='flex justify-center items-center mt-2'>
                    <Balancer className='font-semibold text-xl text-_darkText dark:text-_grayText'>
                        Ahora puedes asignar el identificador al producto
                    </Balancer>
                </div>
                <div className='flex flex-col justify-center items-center py-40 h-full'>
                    <h3 className='font-semibold text-4xl text-_darkText dark:text-_grayText'>Orden</h3>
                    <h1 className='font-semibold text-[110px] text-_dark dark:text-_primary'>#89</h1>
                </div>
                <Button onClick={() => setModal(true)} className='w-16 fixed xl:absolute right-4 bottom-8'>
                    <QrCode />
                </Button>
            </div>

            {modal && (
                <Modal onClose={() => setModal(false)}>
                    <div className='flex flex-col items-center py-16 px-2'>
                        <div className='w-20 h-20 bg-[#00DB94] rounded-lg flex justify-center items-center object-contain'>
                            <Image src='/cart-mango-96.png' alt='cart-mango-96' width={63} height={63} />
                        </div>
                        <div className='flex flex-col justify-center items-center w-full text-_darkText dark:text-_white font-medium pt-8 pb-10'>
                            <h1 className='font-semibold text-4xl text-center'>Purple Kush</h1>
                            <Balancer className='text-center dark:text-_grayText'>
                                Una cepa híbrida de cannabis, conocida por su aroma a tierra y sus efectos relajantes.
                                <p>
                                    Fecha: <span className='font-semibold'>03/03/2023</span>
                                </p>
                            </Balancer>
                        </div>
                        <QrCode className='text-_dark dark:text-_primary' size={250} />
                        <div className='flex gap-4 mt-8'>
                            <Button variant={'outline'}
                                className='w-16 h-16 dark:border-[#474747] hover:bg-_primary hover:border-_primary hover:text-_dark duration-75'>
                                <Printer />
                            </Button>
                            <Button variant={'outline'}
                                className='w-16 h-16 dark:border-[#474747] hover:bg-_primary hover:border-_primary hover:text-_dark duration-75'>
                                <Download />
                            </Button>
                            <Button variant={'outline'}
                                className='w-16 h-16 dark:border-[#474747] hover:bg-_primary hover:border-_primary hover:text-_dark duration-75'>
                                <Send />
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </main>
    )
}

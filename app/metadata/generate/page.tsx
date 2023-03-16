'use client'

import { Back } from '@/ui/back'
import { Button } from '@/ui/button'
import { QrCode } from 'lucide-react'
import React, { useState } from 'react'
import Balancer from 'react-wrap-balancer'

import Modal from '@/components/modal'

export default function Generate() {
    const [modal, setModal] = useState(false)
    return (
        <div className='min-h-screen relative'>
            <div className='px-4 '>
                <div className='flex justify-center items-center py-8 relative'>
                    <Back className='absolute left-0' />
                    <h1 className='font-bold text-xl'>QR generado</h1>
                </div>
                <div className='flex justify-center items-center mt-2'>
                    <Balancer className='font-semibold text-xl'>
                        Ahora puedes asignar el identificador al producto
                    </Balancer>
                </div>
                <div className='flex flex-col justify-center items-center py-40 h-full'>
                    <h3 className='font-semibold text-4xl text-_darkText'>Orden</h3>
                    <h1 className='font-semibold text-[110px] text-_dark'>#89</h1>
                </div>
                <Button onClick={() => setModal(true)} className='w-16 fixed right-4 bottom-8'>
                    <QrCode />
                </Button>
            </div>

            {modal && (
                <Modal onClose={() => setModal(false)}>
                    <div className='flex flex-col items-center py-16 px-2'>
                        <div className='w-20 h-20 bg-[#00DB94] rounded-lg'></div>
                        <div className='flex flex-col justify-center items-center w-full text-_darkText font-medium pt-8 pb-10'>
                            <h1 className='font-semibold text-4xl text-center'>Purple Kush</h1>
                            <Balancer className='text-center'>
                                Una cepa híbrida de cannabis, conocida por su aroma a tierra y sus efectos relajantes.
                                <p>
                                    Fecha: <span className='font-semibold'>03/03/2023</span>
                                </p>
                            </Balancer>
                        </div>
                        <QrCode size={250} />
                    </div>
                </Modal>
            )}
        </div>
    )
}

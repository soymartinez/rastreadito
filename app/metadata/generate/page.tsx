import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { Download, Printer, Send } from 'lucide-react'

import { Back } from '@/ui/back'
import { Button } from '@/ui/button'

import ModalButton from '@/components/modal/modal-button'
import GenerateQr from '@/components/generateQr'
import { Producto, Qr } from '@prisma/client'
import { headers } from 'next/headers'

type GetDataType = Qr & {
    producto: Producto
}

interface Params {
    origin: string,
    search: string,
}

async function getData({ origin, search }: Params): Promise<GetDataType> {
    const res = await fetch(`${origin}/api/qr${search}`)

    if (!res.ok) {
        throw new Error('Error al obtener el QR')
    }

    return res.json()
}

export default async function Generate() {
    const headersList = headers()
    const search = headersList.get('x-search') || ''
    const origin = headersList.get('x-origin') || ''

    const {
        id,
        codigo,
        producto: { nombre, descripcion, fechaRegistro },
    } = await getData({ origin, search })
    return (
        <main className='min-h-screen relative max-w-7xl mx-auto'>
            <div className='px-4'>
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
                    <h1 className='font-semibold text-[120px] text-_dark dark:text-_primary'>#{id}</h1>
                </div>
            </div>

            <ModalButton icon='QrCode'>
                <div className='flex flex-col items-center py-16 px-2'>
                    <div className='w-20 h-20 bg-[#00DB94] rounded-lg flex justify-center items-center object-contain'>
                        <Image src='/cart-mango-96.png' alt='cart-mango-96' width={63} height={63} />
                    </div>
                    <div className='flex flex-col justify-center items-center w-full text-_darkText dark:text-_white font-medium pt-8 pb-10'>
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
                    <div className='flex gap-4 mt-8'>
                        <Button variant={'outline'}
                            className='w-16 h-16 dark:border-[#474747] hover:bg-_primary hover:border-_primary dark:hover:border-_primary hover:text-_dark duration-75'>
                            <Printer />
                        </Button>
                        <Button variant={'outline'}
                            className='w-16 h-16 dark:border-[#474747] hover:bg-_primary hover:border-_primary dark:hover:border-_primary hover:text-_dark duration-75'>
                            <Download />
                        </Button>
                        <Button variant={'outline'}
                            className='w-16 h-16 dark:border-[#474747] hover:bg-_primary hover:border-_primary dark:hover:border-_primary hover:text-_dark duration-75'>
                            <Send />
                        </Button>
                    </div>
                </div>
            </ModalButton>
        </main>
    )
}

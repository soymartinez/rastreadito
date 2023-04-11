import { Back } from '@/ui/back'
import { Producto, Qr } from '@prisma/client'
import { headers } from 'next/headers'
import Scanned from './scanned'

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

export default async function ScannedProduct() {
    const header = headers()
    const origin = header.get('x-origin') || ''
    const search = header.get('x-search') || ''

    const qr = await getData({ origin, search })
    return (
        <main className='min-h-screen relative max-w-7xl mx-auto'>
            <div className='px-4'>
                <div className='flex justify-center items-center py-8 relative'>
                    <Back className='absolute left-0' />
                    {/* <h1 className='font-bold text-xl'>QR generado</h1> */}
                </div>
            </div>
            <Scanned {...qr} />
        </main>
    )
}

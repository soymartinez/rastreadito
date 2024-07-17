import { Back } from '@/components/ui/back'
import { Product, Qr } from '@prisma/client'
import { headers } from 'next/headers'
import Scanned from './scanned'

type GetDataType = Qr & {
    producto: Product
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
    <main className='relative mx-auto min-h-screen max-w-7xl'>
      <div className='absolute inset-x-0 top-0 px-4 py-8'>
        <div className='relative flex h-7 items-center'>
          <Back className='absolute left-0' />
        </div>
      </div>
      {/* <Scanned {...qr} /> */}
    </main>
  )
}

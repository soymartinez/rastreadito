import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { Download, Printer, Send } from 'lucide-react'

import { Back } from '@/components/ui/back'
import { Button } from '@/components/ui/button'

import ModalButton from '@/components/modal/modal-button'
import GenerateQr from '@/components/generateQr'
import { headers } from 'next/headers'
import { QrProductType } from '@/types'
import Link from 'next/link'

interface Params {
    origin: string,
    codigo: string,
}

async function getData({ origin, codigo }: Params): Promise<QrProductType> {
  const res = await fetch(`${origin}/api/qr?codigo=${codigo}`)

  if (!res.ok) {
    throw new Error('Error al obtener el QR')
  }

  return res.json()
}

export default async function Generate({ params }: { params: { codigo: string } }) {
  const headersList = headers()
  const origin = headersList.get('x-origin') || ''

  const {
    id,
    codigo,
    valor,
    producto: { nombre, descripcion, imagen, fechaRegistro },
  } = await getData({ origin, codigo: params.codigo })
  return (
    <>
      <div className='px-4'>
        <div className='relative flex items-center justify-center py-8'>
          <Back pushRoute='/' className='absolute left-0' />
          <h1 className='text-xl font-bold'>QR generado</h1>
        </div>
        <div className='mt-2 flex items-center justify-center'>
          <Balancer className='text-xl font-semibold text-_darkText dark:text-_grayText'>
                        Ahora puedes asignar el identificador al producto
          </Balancer>
        </div>
        <div className='flex h-full flex-col items-center justify-center py-40'>
          <h3 className='text-4xl font-semibold text-_darkText dark:text-_grayText'>Orden</h3>
          <h1 className='text-[120px] font-semibold text-_dark dark:text-_primary'>#{id}</h1>
        </div>
      </div>

      <ModalButton icon='QrCode'>
        <div className='flex flex-col items-center px-2 py-16'>
          <div className='flex h-20 w-20 items-center justify-center rounded-lg bg-[#00DB94] object-contain'>
            <Image src={imagen[0]} alt={nombre} width={63} height={63} />
          </div>
          <div className='flex w-full flex-col items-center justify-center pb-10 pt-8 font-medium text-_darkText dark:text-_white'>
            <h1 className='text-center text-4xl font-semibold'>{nombre}</h1>
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
          <div className='mt-8 flex gap-4'>
            <Button variant={'outline'}
              className='h-16 w-16 duration-75 hover:border-_primary hover:bg-_primary hover:text-_dark dark:border-[#474747] dark:hover:border-_primary'>
              <Printer />
            </Button>
            <Button variant={'outline'}
              className='h-16 w-16 duration-75 hover:border-_primary hover:bg-_primary hover:text-_dark dark:border-[#474747] dark:hover:border-_primary'>
              <Download />
            </Button>
            <Link href={`/product/${codigo}`}>
              <Button variant={'outline'}
                className='h-16 w-16 duration-75 hover:border-_primary hover:bg-_primary hover:text-_dark dark:border-[#474747] dark:hover:border-_primary'>
                <Send />
              </Button>
            </Link>
          </div>
        </div>
      </ModalButton>
    </>
  )
}

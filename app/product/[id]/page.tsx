import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

import { Back } from '@/ui/back'
import Image from 'next/image'
import imageExample from '@/public/cart-mango-96.png'
import { Label } from '@/ui/label'
import { Button } from '@/ui/button'

async function getProduct(id: string) {
  const res = await prisma.qr.findUnique({
    where: {
      productoId: Number(id),
    },
    include: {
      producto: true,
    }
  })

  if (!res) {
    throw new Error('Failed to fetch qr')
  }

  return res
}

const getCategorias = async (origin: string) => {
  const res = await fetch(origin + '/api/categorias')
  const data = await res.json()
  return data
}

export default async function Product({ params }: { params: { id: string } }) {
  const { get } = headers()
  const origin = get('x-origin') || ''
  const categorias = await getCategorias(origin)
  const {
    estatus,
    producto
  } = await getProduct(params.id)

  return (
    <main className='px-4 min-h-screen relative max-w-7xl mx-auto overflow-hidden'>
      <div className='flex justify-center items-center py-8 relative'>
        <Back className='absolute left-0' />
        <h1 className='font-bold text-xl'>Producto</h1>
      </div>
      <div className='py-4'>
        <h1 className='text-5xl font-bold'>Purple Kush</h1>
      </div>
      <div className='flex flex-col gap-12 my-10 relative'>
        <div className='flex flex-col gap-8'>
          <Image
            src={imageExample}
            alt='mango-cart'
          />
          <div className='flex justify-center gap-3'>
            <Button size={'nothing'} variant={'image'}>
              <Image src={imageExample} alt='mango-cart' />
            </Button>
            <Button size={'nothing'} variant={'image'}>
              <Image src={imageExample} alt='mango-cart' />
            </Button>
            <Button size={'nothing'} variant={'image'}>
              <Image src={imageExample} alt='mango-cart' />
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-7'>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Descripcion</Label>
            <span className='text-base font-semibold'>Cartucho sabor mango</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Porcentaje</Label>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                  <Label className='text-sm font-semibold'>THC</Label>
                  <span className='text-sm font-semibold'>20%</span>
                </div>
                <div className='h-2 bg-_gray dark:bg-_darkText rounded-full'>
                  <div className='h-full w-[20%] bg-_primary hover:bg-_primary/80 hover:scale-105 cursor-pointer rounded-full' />
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                  <Label className='text-sm font-semibold'>CBD</Label>
                  <span className='text-sm font-semibold'>5%</span>
                </div>
                <div className='h-2 bg-_gray dark:bg-_darkText rounded-full'>
                  <div className='h-full w-[5%] bg-_primary hover:bg-_primary/80 hover:scale-105 cursor-pointer rounded-full' />
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Categoria</Label>
            <span className='text-sm font-semibold'>CARTUCHO</span>
          </div>
        </div>
      </div>
    </main>
  )
}

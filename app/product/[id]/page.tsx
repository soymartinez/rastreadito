import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

import { ActiveButton, DestroyButton, UseButton } from '@/components/status'
import { Back } from '@/ui/back'
import FormMetadata from '@/components/form-metadata'

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
    <main className='px-4 min-h-screen relative max-w-7xl mx-auto'>
      <div className='flex justify-center items-center py-8 relative'>
        <Back className='absolute left-0' />
        <h1 className='font-bold text-xl'>Producto</h1>
      </div>
      <div className='sticky top-0 z-50 flex justify-between items-center bg-_white dark:bg-_dark border-b border-_darkText'>
        <h1 className='text-5xl font-bold leading-loose truncate'>{producto.nombre}</h1>
        <div>
          {estatus === 'ACTIVO' && <ActiveButton />}
          {estatus === 'DESTRUIDO' && <DestroyButton />}
          {estatus === 'USADO' && <UseButton />}
        </div>
      </div>
      <FormMetadata
        className='mb-8 my-4'
        categorias={categorias}
        producto={producto}
      />
    </main>
  )
}

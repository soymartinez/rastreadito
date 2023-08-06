import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { QrProductType } from '@/types'
import { Back } from '@/ui/back'
import { Suspense } from 'react'
import ProductInfo from './product'

async function getProduct(codigo: string) {
  const res = await prisma.qr.findUnique({
    where: {
      codigo,
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

export default async function Product({ params }: { params: { codigo: string } }) {
  const product = getProduct(params.codigo)
  return (
    <main className='md:max-w-4xl xl:max-w-7xl mx-auto overflow-hidden'>
      <div className='flex justify-center items-center py-8 relative'>
        <Back className='absolute left-0' />
        <h1 className='font-bold text-xl'>Producto</h1>
      </div>
      <Suspense fallback={<div>loading product...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <ProductAsync
          product={product}
        />
      </Suspense>
    </main >
  )
}

async function ProductAsync({ product }: { product: Promise<QrProductType> }) {
  const user = await getCurrentUser()
  const producto = await product
  return (
    <ProductInfo
      user={user}
      data={producto}
    />
  )
}
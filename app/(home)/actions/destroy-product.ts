'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function destroyProduct(ids: number[]) {
  const res = await prisma.qr.updateMany({
    data: {
      estatus: 'DESTRUIDO',
    },
    where: {
      id: {
        in: ids
      }
    },
  })

  revalidatePath('/')
  revalidatePath('/history')
  return res
}
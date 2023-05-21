'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(ids: number[]) {
    const res = await prisma.producto.deleteMany({
        where: {
            qr: {
                id: {
                    in: ids
                }
            }
        }
    })

    revalidatePath('/')
    revalidatePath('/history')
    return res
}
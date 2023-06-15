import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const res = await prisma.galeria.delete({
        where: {
            id: Number(params.id),
        }
    })

    return NextResponse.json(res)
}
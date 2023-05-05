import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const {
        ids,
    } = await request.json()

    console.log(ids)

    const res = await prisma.qr.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    return NextResponse.json(res)
}
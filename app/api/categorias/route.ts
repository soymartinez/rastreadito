import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const res = await prisma.categoria.findMany({
        orderBy: {
            id: 'asc'
        },
        include: {
            galeria: true
        },
    })
    return NextResponse.json(res)
}
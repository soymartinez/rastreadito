import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { Productos } from '@prisma/client'

export async function POST(req: Request) {
    const {
        nombre,
        descripcion,
        tipo,
        cepa,
        thc,
        cbd,
        aroma,
        efecto,
    }: Productos = await req.json()

    const res = await prisma.productos.create({
        data: {
            nombre,
            descripcion,
            tipo,
            cepa,
            thc: Number(thc),
            cbd: Number(cbd),
            aroma,
            efecto,
        },
    })

    return NextResponse.json(res)
}
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { Producto } from '@prisma/client'
import { useSupabaseServer } from '@/hooks/auth'

export async function POST(req: Request) {
    const { user } = await useSupabaseServer()

    const {
        nombre,
        descripcion,
        categoria,
        cepa,
        thc,
        cbd,
        imagen,
        aroma,
        efecto,
        fabricante,
        pais,
        proveedor,
        precio,
        peso,
        fechaCosecha,
        fechaEnvasado,
        fechaCaducidad,
        lote,
        certificado,
        notas,
    }: Producto = await req.json()

    const res = await prisma.producto.create({
        data: {
            nombre,
            descripcion,
            categoria,
            cepa,
            thc: Number(thc),
            cbd: Number(cbd),
            imagen,
            aroma,
            efecto,
            fabricante,
            pais,
            proveedor,
            precio: Number(precio),
            peso: Number(peso),
            fechaCosecha: new Date(fechaCosecha || new Date()),
            fechaEnvasado: new Date(fechaEnvasado || new Date()),
            fechaCaducidad: new Date(fechaCaducidad || new Date()),
            lote,
            certificado,
            notas,
            usuario: user?.email || '',
        },
    })

    return NextResponse.json(res)
}
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { Producto } from '@prisma/client'
import { useSupabaseServer } from '@/hooks/auth'

export async function POST(req: Request) {
    const { user } = await useSupabaseServer()

    const {
        id,
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

    const res = await prisma.producto.upsert({
        where: {
            id
        },
        create: {
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
        update: {
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
        },
    })

    return NextResponse.json(res)
}
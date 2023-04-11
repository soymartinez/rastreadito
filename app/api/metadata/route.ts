import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { Producto } from '@prisma/client'

export async function POST(req: Request) {
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
        usuarioEmail,
    }: Producto = await req.json()

    console.log(await req.json())

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
            usuarioEmail: 'martnzomg@gmail.com',
        },
    })

    return NextResponse.json(res)
}
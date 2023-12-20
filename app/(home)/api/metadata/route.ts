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
      id: id !== undefined ? Number(id) : -1,
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
      fechaCosecha: fechaCosecha ? new Date(fechaCosecha) : null,
      fechaEnvasado: fechaEnvasado ? new Date(fechaEnvasado) : null,
      fechaCaducidad: fechaCaducidad ? new Date(fechaCaducidad) : null,
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
      fechaCosecha: fechaCosecha ? new Date(fechaCosecha) : null,
      fechaEnvasado: fechaEnvasado ? new Date(fechaEnvasado) : null,
      fechaCaducidad: fechaCaducidad ? new Date(fechaCaducidad) : null,
      lote,
      certificado,
      notas,
    },
  })

  return NextResponse.json(res)
}
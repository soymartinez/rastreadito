import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const qr = await prisma.qr.findMany()
  return NextResponse.json(qr)
}

export async function POST(request: Request) {
  const {
    idProducto,
    codigo,
  } = await request.json()

  const res = await prisma.qr.create({
    data: {
      Productos: { connect: { id: idProducto } },
      codigo,
      status: 'ACTIVO',
    },
  })
  return NextResponse.json(res)
}
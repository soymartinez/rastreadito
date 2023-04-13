import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import qs from 'query-string'

export async function GET(request: Request) {
  const searchParams = qs.parseUrl(request.url).query
  const qr = await prisma.qr.findUnique({
    where: {
      productoId: Number(searchParams.id),
    },
    include: {
      producto: true,
    }
  })
  return NextResponse.json(qr)
}

export async function POST(request: Request) {
  const {
    idProducto,
    codigo,
  } = await request.json()

  const res = await prisma.qr.create({
    data: {
      producto: { connect: { id: idProducto } },
      codigo: 'https://rastreadito.vercel.app/scan/product' + codigo,
      estatus: 'ACTIVO',
    },
  })
  return NextResponse.json(res)
}
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import qs from 'query-string'

export async function GET(request: Request) {
  const searchParams = qs.parseUrl(request.url).query
  const codigo = qs.stringify(searchParams)
  const qr = await prisma.qr.findUnique({
    where: {
      codigo: '/?' + codigo
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
      codigo,
      estatus: 'ACTIVO',
    },
  })
  return NextResponse.json(res)
}
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import qs from 'query-string'

export async function GET(request: Request) {
  const searchParams = qs.parseUrl(request.url).query
  const qr = await prisma.qr.findUnique({
    where: {
      codigo: `${searchParams.codigo}`,
    },
    include: {
      producto: true,
    }
  })
  return NextResponse.json(qr)
}

export async function POST(request: Request) {
  const {
    producto
  } = await request.json()

  const res = await prisma.qr.create({
    data: {
      producto: { connect: { id: producto.id } },
      estatus: 'USADO',
    },
    include: {
      producto: true,
    }
  }).then(async (res) => {
    const codigo = (res.producto.categoria + res.id).toLocaleLowerCase()

    const qr = await prisma.qr.update({
      where: {
        id: res.id,
      },
      data: {
        codigo,
        valor: 'https://rastreadito.vercel.app/product/' + codigo,
      }
    })

    return qr
  })

  return NextResponse.json(res)
}
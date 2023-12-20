import { useSupabaseServer } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const { user } = await useSupabaseServer()

  const res = await prisma.categoria.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
      galeria: {
        where: {
          usuario: user?.email,
        }
      },
    },
  })
  return NextResponse.json(res)
}
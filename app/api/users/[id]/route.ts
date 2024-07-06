import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    if (!id) {
      throw new Error('No se proporciono el id.')
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        organization_members: {
          select: {
            role: true,
            organization: true,
          },
        },
      },
    })

    if (!userDetails) {
      throw new Error('Usuario no encontrado.')
    }

    return NextResponse.json(userDetails)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

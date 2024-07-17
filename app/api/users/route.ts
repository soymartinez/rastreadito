import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get('email')

    const users = await prisma.user.findMany({
      where: {
        email: email ?? undefined
      }
    })

    if (!users) {
      throw new Error('Usuario no encontrado.')
    }

    return NextResponse.json(users)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

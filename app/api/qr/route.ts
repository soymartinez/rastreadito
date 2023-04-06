import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const qr = await prisma.qr.findMany()
  return NextResponse.json(qr)
}

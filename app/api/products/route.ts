import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return Response.json(products)
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
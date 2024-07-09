import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany()

  return Response.json(products)
}
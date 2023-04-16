import { prisma } from '@/lib/prisma'

async function getProduct(id: string) {
  const res = await prisma.qr.findUnique({
    where: {
      productoId: Number(id),
    },
    include: {
      producto: true,
    }
  })

  if (!res) {
    throw new Error('Failed to fetch qr')
  }

  return res
}

export default async function Product({ params }: { params: { id: string } }) {
  const qr = await getProduct(params.id)
  return (
    <main>
      <h1 className='text-5xl font-bold leading-loose truncate'>Product</h1>
      <code>
        <pre>
          {JSON.stringify(qr, null, 2)}
        </pre>
      </code>
    </main>
  )
}

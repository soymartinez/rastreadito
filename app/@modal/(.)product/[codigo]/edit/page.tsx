import FormMetadata from '@/components/form-metadata'
import ModalPage from '@/components/modal/modal-page'
import { prisma } from '@/lib/prisma'
import { Back } from '@/ui/back'

async function getProduct(codigo: string) {
  const res = await prisma.qr.findUnique({
    where: {
      codigo,
    },
    include: {
      producto: true,
    },
  })

  return res
}

async function getCategorias() {
  const res = await prisma.categoria.findMany({
    include: {
      galeria: true,
    }
  })
  return res
}

export default async function EditProduct({ params }: { params: { codigo: string } }) {
  const producto = await getProduct(params.codigo)
  const categorias = await getCategorias()
  return (
    <ModalPage>
      <div className='flex justify-center items-center py-8 relative'>
        <Back className='absolute left-0' />
        <h1 className='font-bold text-xl'>Editar producto</h1>
      </div>
      <div className='py-4'>
        <h1 className='text-5xl font-bold'>{producto?.producto.nombre}</h1>
      </div>
      <FormMetadata
        producto={producto?.producto}
        categorias={categorias}
      />
    </ModalPage>
  )
}

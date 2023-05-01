import Image from 'next/image'
import { prisma } from '@/lib/prisma'

import imageExample from '@/public/cart-mango-96.png'
import { Back } from '@/ui/back'
import { Label } from '@/ui/label'
import { Button } from '@/ui/button'

async function getProduct(codigo: string) {
  const res = await prisma.qr.findUnique({
    where: {
      codigo,
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

export default async function Product({ params }: { params: { codigo: string } }) {
  const {
    producto: {
      nombre,
      imagen,
      descripcion,
      thc,
      cbd,
      categoria,
      aroma,
      efecto,
      cepa,
      fabricante,
      proveedor,
      pais,
      lote,
      peso,
      precio,
      certificado,
      notas,
      fechaRegistro,
      fechaCaducidad,
      fechaCosecha,
      fechaEnvasado,
    },
  } = await getProduct(params.codigo)

  return (
    <main className='px-4 min-h-screen relative md:max-w-4xl xl:max-w-7xl mx-auto overflow-hidden'>
      <div className='flex justify-center items-center py-8 relative'>
        <Back className='absolute left-0' />
        <h1 className='font-bold text-xl'>Producto</h1>
      </div>
      <div className='py-4'>
        <h1 className='text-5xl font-bold'>{nombre}</h1>
      </div>
      <div className='flex flex-col gap-12 my-10'>
        <div className='grid md:grid-cols-2 items-center gap-12'>
          <div className='flex flex-col items-center gap-8'>
            <div className='w-64 h-64 xl:w-80 xl:h-80 relative'>
              <Image
                fill
                src={imagen[0]}
                alt={nombre}
                priority
              />
            </div>
            <div className='flex justify-center gap-3'>
              <Button size={'nothing'} variant={'image'}>
                <Image src={imageExample} alt='mango-cart' />
              </Button>
              <Button size={'nothing'} variant={'image'}>
                <Image src={imageExample} alt='mango-cart' />
              </Button>
              <Button size={'nothing'} variant={'image'}>
                <Image src={imageExample} alt='mango-cart' />
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-7'>
            <div className='md:order-2'>
              <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Descripción</Label>
              <span className='text-base block'>{descripcion}</span>
            </div>
            <div className='order-1 flex flex-col gap-3'>
              <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Porcentaje</Label>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <Label className='text-sm font-semibold'>THC</Label>
                    <span className='text-sm font-semibold'>{thc}%</span>
                  </div>
                  <div className='h-2 bg-_gray dark:bg-_darkText rounded-full'>
                    <div className='h-full bg-_primary hover:bg-_primary/80 hover:animate-pulse cursor-pointer rounded-full transition' style={{ width: `${thc}%` }} />
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <Label className='text-sm font-semibold'>CBD</Label>
                    <span className='text-sm font-semibold'>{cbd}%</span>
                  </div>
                  <div className='h-2 bg-_gray dark:bg-_darkText rounded-full'>
                    <div className='h-full bg-_primary hover:bg-_primary/80 hover:animate-pulse cursor-pointer rounded-full transition' style={{ width: `${cbd}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-7'>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Categoria</Label>
            <span className='text-base font-semibold'>{categoria}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Aroma</Label>
            <span className='text-base font-semibold'>{aroma}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Efecto</Label>
            <span className='text-base font-semibold'>{efecto}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Cepa</Label>
            <span className='text-base font-semibold'>{cepa}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Fabricante</Label>
            <span className='text-base font-semibold'>{fabricante}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Proveedor</Label>
            <span className='text-base font-semibold'>{proveedor}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Pais</Label>
            <span className='text-base font-semibold'>{pais}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Lote</Label>
            <span className='text-base font-semibold'>{lote ? lote : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Precio</Label>
            <span className='text-base font-semibold'>${precio}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Peso</Label>
            <span className='text-base font-semibold'>{peso}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Certificado</Label>
            <span className='text-base font-semibold'>{certificado ? certificado : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Notas</Label>
            <span className='text-base font-semibold'>{notas ? notas : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Fecha de registro</Label>
            <span className='text-base font-semibold'>{new Date(fechaRegistro).toLocaleString()}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Fecha de caducidad</Label>
            <span className='text-base font-semibold'>{fechaCaducidad ? new Date(fechaCaducidad).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Fecha de cosecha</Label>
            <span className='text-base font-semibold'>{fechaCosecha ? new Date(fechaCosecha).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold text-_grayTextLight uppercase'>Fecha de envasado</Label>
            <span className='text-base font-semibold'>{fechaEnvasado ? new Date(fechaEnvasado).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
        </div>
      </div>
    </main>
  )
}

import { Label } from '@/components/ui/label'
import { Producto } from '@prisma/client'
import ImagePreview from '../../app/(home)/product/[codigo]/image-preview'
import ModalPage from '../modal/modal-page'

export default function ModalProduct({ data }: { data: Producto }) {
  const {
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
  } = data

  return (
    <ModalPage>
      <div className='py-4'>
        <h1 className='text-5xl font-bold'>{nombre}</h1>
      </div>
      <div className='flex flex-col gap-12 overflow-auto scrollbar-thin'>
        <div className='grid items-center gap-12'>
          <ImagePreview imagenes={imagen} alt={nombre} />
          <div className='flex flex-col gap-7 p-2'>
            <div className='md:order-2'>
              <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Descripción</Label>
              <span className='block text-base'>{descripcion}</span>
            </div>
            <div className='order-1 flex flex-col gap-3'>
              <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Porcentaje</Label>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <Label className='text-sm font-semibold'>THC</Label>
                    <span className='text-sm font-semibold'>{thc}%</span>
                  </div>
                  <div className='h-2 rounded-full bg-_gray dark:bg-_darkText'>
                    <div className='h-full cursor-pointer rounded-full bg-_primary transition hover:animate-pulse hover:bg-_primary/80' style={{ width: `${thc}%` }} />
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <Label className='text-sm font-semibold'>CBD</Label>
                    <span className='text-sm font-semibold'>{cbd}%</span>
                  </div>
                  <div className='h-2 rounded-full bg-_gray dark:bg-_darkText'>
                    <div className='h-full cursor-pointer rounded-full bg-_primary transition hover:animate-pulse hover:bg-_primary/80' style={{ width: `${cbd}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-7'>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Categoria</Label>
            <span className='text-base font-semibold'>{categoria}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Aroma</Label>
            <span className='text-base font-semibold'>{aroma}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Efecto</Label>
            <span className='text-base font-semibold'>{efecto}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Cepa</Label>
            <span className='text-base font-semibold'>{cepa}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fabricante</Label>
            <span className='text-base font-semibold'>{fabricante}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Proveedor</Label>
            <span className='text-base font-semibold'>{proveedor}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Pais</Label>
            <span className='text-base font-semibold'>{pais}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Lote</Label>
            <span className='text-base font-semibold'>{lote ? lote : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Precio</Label>
            <span className='text-base font-semibold'>${precio}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Peso</Label>
            <span className='text-base font-semibold'>{peso}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Certificado</Label>
            <span className='text-base font-semibold'>{certificado ? certificado : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Notas</Label>
            <span className='text-base font-semibold'>{notas ? notas : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de registro</Label>
            <span className='text-base font-semibold'>{new Date(fechaRegistro).toLocaleString('es', { hour12: true })}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de caducidad</Label>
            <span className='text-base font-semibold'>{fechaCaducidad ? new Date(fechaCaducidad).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de cosecha</Label>
            <span className='text-base font-semibold'>{fechaCosecha ? new Date(fechaCosecha).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de envasado</Label>
            <span className='text-base font-semibold'>{fechaEnvasado ? new Date(fechaEnvasado).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
        </div>
      </div>
    </ModalPage>
  )
}

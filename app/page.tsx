import { Bell, LayoutGrid, Package, PackageOpen, QrCode } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='px-4 min-h-screen relative'>
      <div className='flex justify-between items-center py-6 relative'>
        <h1 className='font-black text-2xl uppercase italic'>weedtrace</h1>
        <div className='flex gap-2'>
          <div className='w-11 h-11 border-2 border-_gray rounded-full flex items-center justify-center'>
            <Bell />
          </div>
          <Link href={'/account'}>
            <div className='w-11 h-11 border-2 border-_gray bg-_primary rounded-full' />
          </Link>
        </div>
      </div>
      <h1 className='text-5xl font-bold leading-loose truncate'>BeeHealthy</h1>
      <div className='py-2 flex gap-2 w-full overflow-x-auto'>
        <Link href={'/'}>
          <div className='w-28 h-12 flex justify-center items-center bg-_dark text-_white font-medium rounded-full'>
            Inicio
          </div>
        </Link>
        <Link href={'/history'}>
          <div className='w-28 h-12 flex justify-center items-center hover:bg-_dark hover:text-_white hover:border-none border-2 border-_gray font-medium rounded-full'>
            Historial
          </div>
        </Link>
      </div>
      <section>
        <div className='flex justify-between items-center pt-6 pb-3'>
          <h1 className='font-semibold text-xl'>General</h1>
          <button className='p-2 border-2 border-_gray rounded-full'>
            <LayoutGrid />
          </button>
        </div>
        <div className='grid gap-3'>
          <div className='grid grid-flow-col-dense auto-cols-auto mx-auto gap-4 justify-start items-center bg-_dark p-4 rounded-2xl'>
            <QrCode size={56} className='text-_primary' />
            <div>
              <h1 className='text-xl font-semibold text-_white'>Activo</h1>
              <p className='text-xs font-medium text-_grayText'>
                El código aún no ha sido escaneado y utilizado para su propósito previsto.
              </p>
            </div>
            <h1 className='text-5xl font-semibold text-_white'>86</h1>
          </div>
          <div className='grid grid-flow-col-dense auto-cols-auto mx-auto gap-4 justify-start items-center bg-_dark p-4 rounded-2xl'>
            <Package size={56} className='text-_primary' />
            <div>
              <h1 className='text-xl font-semibold text-_white'>Uso</h1>
              <p className='text-xs font-medium text-_grayText'>
                El código ha sido utilizado y ya no es válido. Evitar el fraude o la duplicación de códigos.
              </p>
            </div>
            <h1 className='text-5xl font-semibold text-_white'>62</h1>
          </div>
          <div className='grid grid-flow-col-dense auto-cols-auto mx-auto gap-4 justify-start items-center bg-_dark p-4 rounded-2xl'>
            <PackageOpen size={56} className='text-_primary' />
            <div>
              <h1 className='text-xl font-semibold text-_white'>Destruido</h1>
              <p className='text-xs font-medium text-_grayText'>
                Un ticket destruido no puede ser utilizado y su estado indica que ha sido anulado.
              </p>
            </div>
            <h1 className='text-5xl font-semibold text-_white'>24</h1>
          </div>
        </div>
      </section>
    </main>
  )
}

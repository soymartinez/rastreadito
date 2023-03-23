import { Bell } from 'lucide-react'
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
    </main>
  )
}

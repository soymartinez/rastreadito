import { Bell } from 'lucide-react'

export default function Home() {
  return (
    <main className='px-4 min-h-screen relative'>
      <div className='flex justify-between items-center py-8 relative'>
        <h1 className='font-black text-2xl uppercase italic'>weedtrace</h1>
        <div className='flex gap-2'>
          <div className='w-12 h-12 border-2 rounded-full flex items-center justify-center'>
            <Bell />
          </div>
          <div className='w-12 h-12 border-2 bg-_primary rounded-full' />
        </div>
      </div>
      <h1 className='text-5xl font-bold leading-loose'>BeeHealthy</h1>
    </main>
  )
}

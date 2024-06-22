import { Skeleton } from '@/components/ui/skeleton'

export default function TeamIdLoading() {
  return (
    <main className='px-4 py-8'>
      <div className='mx-auto grid max-w-screen-desktop grid-cols-1 gap-6 mid:grid-cols-10'>
        {/* REPORT OF RECORDS */}
        <Skeleton className='col-span-1 h-[324px] w-full mid:col-span-7'>
          <div className='h-6 w-1/4 rounded-sm bg-dark/5' />
          <div className='mt-4 flex-1 rounded-lg bg-dark/5' />
        </Skeleton>

        {/* TRAFFIC SOURCES */}
        <Skeleton className='col-span-1 h-[324px] w-full mid:col-span-3'>
          <div className='h-6 w-1/4 rounded-sm bg-dark/10' />
          <div className='mt-4 flex-1 rounded-lg bg-dark/5' />
        </Skeleton>

        {/* RECORDS  */}
        <Skeleton className='col-span-1 h-[580px] w-full mid:col-span-7'>
          <div className='h-6 w-1/4 rounded-sm bg-dark/10' />
          <div className='mt-4 flex-1 rounded-lg bg-dark/5' />
        </Skeleton>

        {/* USERS ACTIVITY  */}
        <Skeleton className='col-span-1 h-[580px] w-full mid:col-span-3'>
          <div className='h-6 w-1/4 rounded-sm bg-dark/10' />
          <div className='mt-4 flex-1 rounded-lg bg-dark/5' />
        </Skeleton>
      </div>
    </main>
  )
}

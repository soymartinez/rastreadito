import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { ChevronRight } from 'lucide-react'

import Navbar from '@/components/navbar'
import Brands from '@/components/looper/brands'
import { InfiniteLooper } from '@/components/looper/infinite-looper'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <header className='flex flex-col gap-10 pb-24 pt-20 lg:pt-36 2xl:pt-32'>
        <section className='mx-auto gap-2 text-center text-7xl font-bold leading-[70px] tracking-[-4px] md:text-8xl lg:flex lg:text-7xl 2xl:text-[90px]'>
          <h1 className='animate-blur'>Registra.</h1>
          <h1 className='animate-blur delay-2000'>Escanea.</h1>
          <h1 className='animate-blur delay-4000'>Visualiza.</h1>
        </section>
        <p className='mx-auto w-full max-w-md text-center md:max-w-2xl xl:max-w-4xl'>
          <Balancer className='lg:text-lg 2xl:text-2xl'>
            Rastrea productos cannábicos con códigos QR. {' '}
            <span className='text-_grayTextLight'>
              Escanea y accede a información detallada sobre cada producto de manera rápida y segura.
            </span>
          </Balancer>
        </p>
        <div className='mt-8 flex justify-center'>
          <Link href={'/auth'} className='rounded-2xl'>
            <Button size={'nothing'} className='h-14 w-min whitespace-nowrap px-7 text-[18px] font-medium'>
              Empieza gratis <ChevronRight size={16} strokeWidth={3} className='ml-1' />
            </Button>
          </Link>
        </div>
      </header>
      <section className='flex flex-col gap-10 pb-20'>
        <p className='text-center text-sm font-bold uppercase tracking-widest text-_grayTextLight'>
          <Balancer>
            Impulsando los mejores equipos de productos cannábicos
          </Balancer>
        </p>
        <div className='relative mx-auto flex w-full max-w-[600px] items-center justify-center'>
          <div className='hidden w-full justify-between sm:flex'>
            <Brands />
          </div>
          <div className='relative w-full sm:hidden'>
            <div className='absolute left-0 top-0 z-10 -mx-1 h-16 w-24 bg-gradient-to-r from-white dark:from-_dark' />
            <InfiniteLooper speed={10} direction='left'>
              <Brands />
            </InfiniteLooper>
            <div className='absolute right-0 top-0 z-10 -mx-1 h-16 w-24 bg-gradient-to-l from-white dark:from-_dark' />
          </div>
        </div>
      </section>
    </>
  )
}

import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { ChevronRight } from 'lucide-react'

import LayoutBoundary from '@/components/layout'
import Navbar from '@/components/navbar'
import Brands from '@/components/looper/brands'
import { InfiniteLooper } from '@/components/looper/infinite-looper'
import { Button } from '@/ui/button'

export default function LandingPage() {
    return (
        <LayoutBoundary>
            <Navbar isAuth={false} />
            <header className='flex flex-col gap-10 pt-20 pb-24 lg:pt-36 2xl:pt-32'>
                <section className='font-bold text-7xl md:text-8xl lg:text-7xl 2xl:text-[90px] text-center leading-[70px] -tracking-[4px] lg:flex mx-auto gap-2'>
                    <h1 className='blur-[2px]'>Registra.</h1>
                    <h1 className=''>Escanea.</h1>
                    <h1 className='blur-[4px]'>Visualiza.</h1>
                </section>
                <p className='text-center max-w-md md:max-w-2xl xl:max-w-4xl mx-auto w-full'>
                    <Balancer className='lg:text-lg 2xl:text-2xl'>
                        Rastrea productos cannábicos con códigos QR. {' '}
                        <span className='text-_grayTextLight'>
                            Escanea y accede a información detallada sobre cada producto de manera rápida y segura.
                        </span>
                    </Balancer>
                </p>
                <div className='flex justify-center mt-8'>
                    <Link href={'/auth'} className='rounded-2xl'>
                        <Button size={'nothing'} className='h-14 w-min whitespace-nowrap font-medium text-[18px] px-7'>
                            Empieza gratis <ChevronRight size={16} strokeWidth={3} className='ml-1' />
                        </Button>
                    </Link>
                </div>
            </header>
            <section className='flex flex-col gap-10 pb-20'>
                <p className='text-center font-bold uppercase text-sm tracking-widest text-_grayTextLight'>
                    <Balancer>
                        Impulsando los mejores equipos de productos cannábicos
                    </Balancer>
                </p>
                <div className='flex justify-center items-center max-w-[600px] w-full mx-auto relative'>
                    <div className='hidden sm:flex justify-between w-full'>
                        <Brands />
                    </div>
                    <div className='sm:hidden brands w-full'>
                        <InfiniteLooper speed={10} direction='left'>
                            <Brands />
                        </InfiniteLooper>
                    </div>
                </div>
            </section>
        </LayoutBoundary>
    )
}

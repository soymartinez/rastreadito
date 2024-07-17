import Marquee from 'react-fast-marquee'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export default async function LandingPage() {
  return (
    <main>
      {/* MAIN TEXT */}
      <header className='relative flex h-[400px] w-auto flex-col items-center justify-center px-4 md:h-[550px] lg:h-[600px]'>
        <h1
          className='
            relative
            text-balance
            text-center
            text-4xl
            font-bold
            xs:text-5xl
            md:text-7xl
            md:leading-[78px]
            md:tracking-[-2px]
            mid:max-w-[724px]
            xl:max-w-[1000px]
            xl:text-[90px]
            xl:leading-[105%]
          '
        >
          Donde Cada <span className='-mx-1 inline-block h-[50px] bg-darkText pl-1 pr-[10px] text-white md:h-[80px] xl:h-[100px]'>Código</span>{' '}
          Cuenta Una Historia.

          {/* BIG STAR */}
          <Icons.star
            className='
              absolute
              -top-10
              right-0
              -z-10
              size-16
              transition-all
              xs:-top-12
              md:size-24
              mid:-right-24
              mid:-top-12
            '
          />
        </h1>

        <div className='mt-6 md:mt-11 md:w-[600px]'>
          <p className='text-balance text-center text-xs md:text-base lg:text-base'>
            Desde el cultivo hasta tus manos, garantizamos una trazabilidad
            completa y confiable. Explora, verifica y compra con confianza.
          </p>
        </div>

        <div className='relative mt-10 flex w-full max-w-sm justify-center md:max-w-xl xl:max-w-2xl'>
          <Button size='sm' className='rounded-[10px] px-5 py-6'>
            Empieza gratis
          </Button>

          {/* SMALL STAR */}
          <Icons.star
            className='
              absolute
              -left-0
              top-[5px]
              size-[25px]
              md:left-0
            '
          />

          {/* MID STAR */}
          <Icons.star
            className='
              absolute
              right-0
              top-[25px]
              size-[42px]
              md:right-10
            '
          />
        </div>
      </header>

      {/* BRANDS */}
      <section className='my-16 px-4 mid:mt-0'>
        <div className='mx-auto max-w-4xl'>
          <div className='mx-auto flex max-w-sm items-center justify-between'>
            <div className='h-0.5 w-9 bg-primary' />
            <h1 className='text-center text-xs font-bold'>MARCAS INCREÍBLES CONFÍAN EN NOSOTROS</h1>
            <div className='h-0.5 w-9 bg-primary' />
          </div>

          <div className='mt-8 flex rounded-xl bg-darkText/5 p-4'>
            <div className='relative mx-auto flex w-full max-w-[600px] items-center justify-center'>
              <div className='hidden w-full justify-between sm:flex'>
                <Brands />
              </div>
              <div className='relative w-full sm:hidden'>
                <Marquee
                  gradient
                  gradientColor='#f0f0f0'
                >
                  <Brands />
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Brands() {
  return (
    <>
      <div className='relative mx-4 h-16 w-24'>
        <Icons.vacay className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 size-16'>
        <Icons.sundial className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 h-16 w-36'>
        <Icons.grasslands className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 size-16'>
        <Icons.beehigh className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 h-16 w-32'>
        <Icons.versus className='size-full dark:text-primary' />
      </div>
    </>
  )
}
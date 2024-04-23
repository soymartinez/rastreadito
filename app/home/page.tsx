import Navbar from '@/components/navbar'
import Brands from '@/components/looper/brands'
import { InfiniteLooper } from '@/components/looper/infinite-looper'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { createClient } from '@/utils/supabase/server'

export default async function LandingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <main>
      <Navbar user={user} />

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
      <section className='mx-auto mt-16 max-w-4xl px-4 mid:mt-0'>
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
              <div className='absolute left-0 top-0 z-10 -mx-1 h-16 w-24 bg-gradient-to-r from-[#f5f5f5]' />
              <InfiniteLooper speed={15} direction='left'>
                <Brands />
              </InfiniteLooper>
              <div className='absolute right-0 top-0 z-10 -mx-1 h-16 w-24 bg-gradient-to-l from-[#f5f5f5]' />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

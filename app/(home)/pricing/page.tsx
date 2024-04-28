import PricingCard from '@/components/card/pricing'
import { Back } from '@/components/ui/back'

export default function Pricing() {
  return (
    <main>
      <div className='relative flex items-center justify-center py-8'>
        <Back className='absolute left-0' />
        <h1 className='text-xl font-bold'>Precios</h1>
      </div>
      <div className='mx-auto max-w-2xl py-8 text-center lg:py-12'>
        <h1 className='text-3xl font-bold leading-tight lg:text-5xl'>
          Encuentre un plan que se adapte a sus necesidades.
        </h1>
      </div>
      <div className='grid gap-4 pb-3 pt-12 lg:grid-cols-3'>
        <PricingCard
          name='Comunidad'
          price='$0'
          duration='4 / por mes'
          description='Todo lo que necesitas para comenzar a etiquetar tus productos.'
          button='Prueba gratis'
        />
        <PricingCard
          name='Emprendedor'
          price='$149'
          duration='200 / por mes'
          description='Para equipos pequeños que quieren etiquetar sus productos.'
          button='Prueba gratis'
          popular
        />
        <PricingCard
          name='Profesional'
          price='$299'
          duration='ilimitado / por mes'
          description='Para los que quieren más. Más etiquetas, más usuarios y más funciones.'
          button='Prueba gratis'
        />
      </div>
    </main>
  )
}

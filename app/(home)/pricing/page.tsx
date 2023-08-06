import PricingCard from '@/components/card/pricing'
import { Back } from '@/ui/back'
import Balancer from 'react-wrap-balancer'

export default function Pricing() {
    return (
        <main>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Precios</h1>
            </div>
            <h1 className='text-center py-8 lg:py-12 max-w-2xl mx-auto'>
                <Balancer className='text-3xl lg:text-5xl font-bold leading-tight'>
                    Encuentre un plan que se adapte a sus necesidades.
                </Balancer>
            </h1>
            <div className='grid lg:grid-cols-3 gap-4 pt-12 pb-3'>
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

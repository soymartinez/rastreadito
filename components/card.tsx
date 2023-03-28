import clsx from 'clsx'
import { Package, PackageOpen, QrCode } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import { Button } from '@/ui/button'

function GeneralCard({ props, layoutGrid }: {
    props: {
        title: string
        description: string
        number: number,
        icon: 'active' | 'use' | 'destroy',
    },
    layoutGrid: 'layout-list' | 'layout-grid',
}) {
    return (
        <div className={clsx('grid mx-auto gap-4 justify-start items-center bg-_dark dark:bg-_darkText hover:bg-_dark/95 dark:hover:bg-_darkText/80 transition-all cursor-pointer p-4 rounded-2xl', {
            'grid-flow-col': layoutGrid === 'layout-list',
            'grid-cols-2': layoutGrid === 'layout-grid',
        })}>
            {props.icon === 'active' && <QrCode size={56} className='text-_primary' />}
            {props.icon === 'use' && <Package size={56} className='text-_primary' />}
            {props.icon === 'destroy' && <PackageOpen size={56} className='text-_primary' />}
            <div className={clsx('', {
                'col-span-full': layoutGrid === 'layout-grid',
            })}>
                <h1 className='text-xl font-semibold text-_white'>{props.title}</h1>
                <p className='text-xs font-medium text-_grayText'>
                    {props.description}
                </p>
            </div>
            <h1 className={clsx('text-5xl font-semibold text-_white', {
                'row-start-1 col-start-2 text-end': layoutGrid === 'layout-grid',
            })}>{props.number}</h1>
        </div>
    )
}

function PricingCard({
    name,
    price,
    duration,
    description,
    button,
    popular,
}: {
    name: string,
    price: string,
    duration?: string,
    description: string,
    button: string,
    popular?: boolean,
}) {
    return (
        <div className='flex flex-col justify-between relative items-center gap-4 p-12 border-2 border-_gray hover:bg-[#fcfcfc] rounded-2xl w-full'>
            {popular && <div className='absolute -top-5 text-xs font-semibold bg-_primary px-6 py-3 rounded-full'>Popular</div>}
            <div className='flex flex-col items-center justify-center gap-4 w-full'>
                <h1 className='font-semibold text-xl'>{name}</h1>
                <div>
                    <h1 className='font-semibold text-6xl'>{price}</h1>
                    {duration && <h1 className='font-semibold text-base text-end'>{duration}</h1>}
                </div>
                <Balancer className='text-center'>
                    {description}
                </Balancer>
            </div>
            <Button variant={'outline'} className={clsx('mt-4 w-full', {
                'bg-_primary hover:bg-_primary/80 border-_primary': popular,
                'hover:bg-_gray': !popular,
            })}>{button}</Button>
        </div>
    )
}

export {
    GeneralCard,
    PricingCard,
}
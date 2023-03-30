import clsx from 'clsx'
import { Package, PackageOpen, QrCode } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import { Button } from '@/ui/button'
import Image from 'next/image'

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
        <div className={clsx('grid items-center gap-4 bg-_dark dark:bg-_darkText hover:bg-_dark/95 dark:hover:bg-_darkText/80 transition-all cursor-pointer p-4 rounded-2xl', {
            'grid-flow-col sm:flex': layoutGrid === 'layout-list',
            'grid-cols-2': layoutGrid === 'layout-grid',
        })}>
            <span>
                {props.icon === 'active' && <QrCode size={56} className='text-_primary' />}
                {props.icon === 'use' && <Package size={56} className='text-_primary' />}
                {props.icon === 'destroy' && <PackageOpen size={56} className='text-_primary' />}
            </span>
            <div className={clsx('w-full', {
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
        <div className='flex flex-col justify-between relative items-center gap-4 p-12 border-2 border-_gray dark:border-_darkText hover:bg-[#fcfcfc] dark:hover:bg-[#232323] rounded-2xl w-full'>
            {popular && <div className='absolute -top-5 text-xs font-semibold bg-_primary dark:text-_dark px-6 py-3 rounded-full'>Popular</div>}
            <div className='flex flex-col items-center justify-center gap-4 w-full'>
                <h1 className='font-semibold text-xl'>{name}</h1>
                <div>
                    <h1 className='font-semibold text-6xl'>{price}</h1>
                    {duration && <h1 className='font-semibold text-base text-end'>{duration}</h1>}
                </div>
                <Balancer className='text-center text-_darkText dark:text-_grayText'>
                    {description}
                </Balancer>
            </div>
            <Button variant={'outline'} className={clsx('mt-4 w-full', {
                'bg-_primary border-_primary dark:text-_dark hover:border-none': popular,
                'hover:bg-_gray dark:hover:bg-_darkText dark:border-_darkText': !popular,
            })}>{button}</Button>
        </div>
    )
}

function CategoryCard({
    name,
    icon,
}: {
    name: string,
    icon: 'dropper' | 'bottle' | 'mortar' | 'cart' | 'blood-drop',
}) {
    return (
        <div className='bg-_dark hover:bg-_dark/95 dark:bg-_darkText dark:hover:bg-_darkText/80 transition-all p-4 overflow-auto rounded-2xl flex gap-4 justify-between items-center cursor-pointer'>
            <h1 className='text-xl font-semibold text-_white'>{name}</h1>
            <Image src={`/categories/${icon}.png`} alt={icon} width={44} height={44} />
        </div>
    )
}

export {
    GeneralCard,
    PricingCard,
    CategoryCard,
}
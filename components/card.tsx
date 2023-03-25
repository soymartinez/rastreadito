import clsx from 'clsx'
import { Package, PackageOpen, QrCode } from 'lucide-react'

interface CardProps {
    title: string
    description: string
    number: number,
    icon: 'active' | 'use' | 'destroy',
}

export default function Card({ props, layoutGrid }: {
    props: CardProps,
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

import {
    Package,
    PackageOpen,
    QrCode
} from 'lucide-react'

export default function GeneralCard({ props }: {
    props: {
        title: string
        description: string
        number: number,
        icon: 'active' | 'use' | 'destroy',
    },
}) {
    return (
        <div className={'grid grid-flow-col sm:flex items-center gap-4 bg-_dark dark:bg-_darkText hover:bg-_dark/95 dark:hover:bg-_darkText/80 transition-all cursor-pointer p-4 rounded-2xl'}>
            <span>
                {props.icon === 'active' && <QrCode size={56} className='text-_primary' />}
                {props.icon === 'use' && <Package size={56} className='text-_primary' />}
                {props.icon === 'destroy' && <PackageOpen size={56} className='text-_primary' />}
            </span>
            <div className={'w-full'}>
                <h1 className='text-xl font-semibold text-_white'>{props.title}</h1>
                <p className='text-xs font-medium text-_grayText'>
                    {props.description}
                </p>
            </div>
            <h1 className={'text-5xl font-semibold text-_white'}>{props.number}</h1>
        </div>
    )
}
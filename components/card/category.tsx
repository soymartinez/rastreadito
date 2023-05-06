import { Categoria } from '@prisma/client'
import Image from 'next/image'

export default function CategoryCard({ props: {
    acronimo,
    imagen,
} }: { props: Categoria }) {
    return (
        <div
            className='
                bg-_dark
                hover:bg-_dark/95
                dark:bg-_darkText
                dark:hover:bg-_darkText/80
                transition-all
                p-4
                overflow-auto
                rounded-2xl
                flex
                gap-4
                justify-between
                items-center
                cursor-pointer
            '
        >
            <h1 className='text-xl font-semibold text-_white capitalize'>{acronimo.toLowerCase()}</h1>
            <Image src={imagen || ''} alt={acronimo} width={44} height={44} />
        </div>
    )
}
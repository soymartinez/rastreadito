import { Categoria } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoryCard({ props: {
  acronimo,
  imagen,
} }: { props: Categoria }) {
  return (
    <Link
      href={`/categoria/${acronimo.toLowerCase()}`}
      className='
        flex
        cursor-pointer
        items-center
        justify-between
        gap-4
        overflow-auto
        rounded-2xl
        bg-_dark
        p-4
        transition-all
        hover:bg-_dark/95
        dark:bg-_darkText
        dark:hover:bg-_darkText/80
      '
    >
      <h1 className='text-xl font-semibold capitalize text-_white'>{acronimo.toLowerCase()}</h1>
      <Image src={imagen || ''} alt={acronimo} width={44} height={44} />
    </Link>
  )
}
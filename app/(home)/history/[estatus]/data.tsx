'use client'

import Empty from '@/components/empty'
import { QrProductType } from '@/types'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DataHistoryEstatus({ data }: { data: QrProductType[] }) {
  const [history] = React.useState(data)
  const [search, setSearch] = React.useState('')
  return (
    <section className='flex flex-col gap-6'>
      {history.length > 0
        ? <>
          <Input
            variant='search'
            name='search'
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Buscar por nombre'
            className='h-full border-2 p-1'
          />
          <div className='flex flex-col gap-4'>
            {history
              .filter(({ producto }) => producto.nombre.toLowerCase().includes(search.toLowerCase()))
              .map(({ id, producto, codigo }) => (
                <Link href={`/product/${codigo}`} key={id}>
                  <div className='flex items-center gap-4'>
                    <Image
                      src={producto.imagen[0]}
                      alt={producto.nombre}
                      width={64}
                      height={64}
                      className='rounded-xl border border-_gray object-contain dark:border-_darkText'
                    />
                    <div>
                      <span className='text-xl font-semibold'>{producto.nombre}</span>
                      <span className='text-xs font-medium text-_grayText line-clamp-2'>{producto.descripcion}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
        : <Empty title='Aún no hay productos en este estado.' />}
    </section>
  )
}

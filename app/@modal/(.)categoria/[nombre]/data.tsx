'use client'

import Empty from '@/components/empty'
import { ActiveButton, DestroyButton, UseButton } from '@/components/status'
import { QrProductType } from '@/types'
import { Input } from '@/ui/input'
import Link from 'next/link'
import { useState } from 'react'

export default function CategoriasData({ data }: { data: QrProductType[] }) {
    const [search, setSearch] = useState('')
    const filteredData = data.filter(({ producto, id }) => {
        return producto.nombre.toLowerCase().includes(search.toLowerCase()) || id.toString().includes(search)
    })
    return (
        <section className='flex flex-col gap-6'>
            {data.length > 0 ? (
                <>
                    <Input
                        variant='search'
                        name='search'
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Buscar por nombre'
                        className='p-1 border-2'
                    />
                    <div className='overflow-auto scrollbar-thin'>
                        {filteredData.length > 0 ? (
                            <>
                                <div className='whitespace-nowrap px-3 pb-6'>
                                    <span className='font-bold'>{filteredData.length}</span>{' '}
                                    {filteredData.length > 1 ? 'productos registrados' : 'producto registrado'}
                                </div>
                                {filteredData.map(({ producto, id, codigo, estatus }) => (
                                    <Link key={id} href={`/product/${codigo}`}>
                                        <div className='flex justify-between gap-4 px-3 py-2 hover:bg-_gray/80 dark:bg-_dark dark:hover:bg-_darkText/50'>
                                            <h1 className='text-xl font-semibold truncate'>
                                                {producto.nombre} <span className='text-_grayText dark:text-_primary text-sm'>#{producto.categoria} {id}</span>
                                            </h1>
                                            <div>
                                                {estatus === 'ACTIVO' && <ActiveButton />}
                                                {estatus === 'USADO' && <UseButton />}
                                                {estatus === 'DESTRUIDO' && <DestroyButton />}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        ) : <Empty title='No se encontraron productos con ese nombre.' />}
                    </div>
                </>
            ) : <Empty title='No hay productos en esta categoría.' />}
        </section>
    )
}

'use client'

import { QrProductType } from '@/types'
import { Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ActiveButton, DestroyButton, UseButton } from '../status'

interface Props {
    data: QrProductType
}

export default function Tr({
    data: {
        id,
        estatus,
        fechaRegistro,
        producto: {
            id: productoId,
            nombre: productoNombre,
            categoria,
            usuario,
        }
    }
}: Props) {
    const [hover, setHover] = useState(false)

    return (
        <tr
            key={id}
            className='bg-_white hover:bg-_gray/80 dark:bg-_dark dark:hover:bg-_darkText/50 overflow-x-auto'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <td className='px-3 py-2'>
                <div className='flex items-center justify-center'>
                    <input
                        type='checkbox'
                        name={`${id}`}
                        id={`${id}`}
                        className='w-4 h-4 m-auto accent-_primary rounded-full' />
                </div>
            </td>
            <td className='px-3 py-2 font-semibold whitespace-nowrap text-_dark dark:text-_white uppercase'>#{categoria} {id}</td>
            <td className='px-3 py-2 font-semibold whitespace-nowrap relative'>
                {hover &&
                    <Link href={`/product/${productoId}`}>
                        <div className='absolute right-0 top-2.5 bg-_white dark:bg-_dark dark:hover:bg-_primary/[15%] transition p-2 rounded-full'>
                            <Maximize2 size={14} className='text-_dark dark:text-_primary' />
                        </div>
                    </Link>}
                {productoNombre}
            </td>
            <td className='px-3 py-2 font-semibold whitespace-nowrap'>{usuario}</td>
            <td className='px-3 py-2 font-semibold whitespace-nowrap'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</td>
            <td className='px-3 py-2 font-semibold sticky right-0 z-20 bg-inherit backdrop-blur-md border-l-4 border-_gray dark:border-_darkText'>
                {estatus === 'ACTIVO' && <ActiveButton />}
                {estatus === 'USADO' && <UseButton />}
                {estatus === 'DESTRUIDO' && <DestroyButton />}
            </td>
        </tr>
    )
}

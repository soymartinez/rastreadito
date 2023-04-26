'use client'

import { useEffect, useState } from 'react'
import { QrProductType } from '@/types'
import clsx from 'clsx'
import { Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { ActiveButton, DestroyButton, UseButton } from './status'

interface Props {
    data: QrProductType
    defaultChecked?: boolean
    isSelected: (id: number) => void
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
    },
    defaultChecked = false,
    isSelected,
}: Props) {
    const [checked, setChecked] = useState(false)
    const [hover, setHover] = useState(false)

    const handleSelected = (checkedInput: boolean) => {
        setChecked(checkedInput)
        isSelected(id)
    }

    useEffect(() => {
        setChecked(defaultChecked)
    }, [defaultChecked])

    return (
        <tr
            key={id}
            className={clsx('bg-_white hover:bg-_gray/80 dark:bg-_dark dark:hover:bg-_darkText/50 overflow-x-auto', {
                'bg-_primary/[15%] hover:bg-_primary/[15%] dark:bg-_primary/[15%] dark:hover:bg-_primary/[15%]': checked,
            })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <td className='pl-3 pr-1 py-2 w-20'>
                <div className='flex justify-between items-center w-16'>
                    <div className='flex items-center justify-center'>
                        <input
                            onChange={(e) => handleSelected(e.target.checked)}
                            type='checkbox'
                            name={`${id}`}
                            id={`${id}`}
                            checked={checked}
                            className='w-4 h-4 m-auto accent-_primary rounded-full' />
                    </div>
                    <div>
                        <Link href={`/product/${productoId}`} className={clsx({
                            'md:hidden ': !hover,
                        })}>
                            <div className='bg-_white dark:bg-_dark dark:hover:bg-_primary/[15%] transition p-2 rounded-full'>
                                <Maximize2 size={14} className='text-_dark dark:text-_primary' />
                            </div>
                        </Link>
                    </div>
                </div>
            </td>
            <td className='px-3 py-2 font-semibold whitespace-nowrap text-_dark dark:text-_white uppercase'>#{categoria} {id}</td>
            <td className='px-3 py-2 font-semibold whitespace-nowrap'>{productoNombre}</td>
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

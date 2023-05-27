'use client'

import Tr from '@/components/tr'
import { QrProductType } from '@/types'
import { AlertCircle, X } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { deleteProduct } from '../actions/delete-product'

interface TableProps {
    data: QrProductType[]
}

export default function Table({ data }: TableProps) {
    const [selectList, setSelectList] = useState<number[]>([])
    let [_, startTransition] = useTransition()

    const handleSelectedAll = (checked: boolean) => {
        checked
            ? setSelectList(data.map((item) => item.id))
            : setSelectList([])
    }

    const handleSelected = (id: number) => {
        const index = selectList.indexOf(id)
        index === -1
            ? setSelectList([...selectList, id])
            : setSelectList(selectList.filter((item) => item !== id))
    }

    const handleDelete = () => {
        toast(`¿Estás seguro de eliminar ${selectList.length > 1 ? 'los productos seleccionados' : 'el producto seleccionado'}?`, {
            icon: <AlertCircle size={18} />,
            cancel: { label: 'Cancelar' },
            action: {
                label: 'Eliminar',
                onClick: () => {
                    toast.promise(deleteProduct(selectList), {
                        loading: 'Eliminando...',
                        success: () => {
                            setSelectList([])
                            return <>
                                <strong>{selectList.length}</strong> {selectList.length > 1 ? 'productos eliminados' : 'producto eliminado'}
                            </>
                        },
                        error: (err) => err.message,
                    },
                    )
                }
            },
        })
    }

    return (
        <>
            <div className='flex justify-start items-center gap-6 h-12 mt-6 px-3 sticky left-0'>
                <div className='flex items-center gap-3'>
                    {selectList.length > 0 && (
                        <div
                            className='w-4 h-4 flex justify-center items-center bg-_dark hover:bg-_dark/80 dark:bg-_darkText dark:hover:bg-_white/20 border border-_grayText/30 text-_white rounded-sm cursor-pointer'
                            onClick={() => handleSelectedAll(false)}
                        >
                            <X strokeWidth={3.5} size={18} />
                        </div>
                    )}
                    <p className='whitespace-nowrap'>
                        <span className='font-bold'>{selectList.length > 0 ? selectList.length : data.length}</span>{' '}
                        {selectList.length > 0
                            ? selectList.length > 1 ? 'seleccionados' : 'seleccionado'
                            : data.length > 1 ? 'productos' : 'producto'}
                    </p>
                </div>
                {selectList.length > 0 && <div className='w-1 h-full bg-_gray dark:bg-_darkText' />}
                {selectList.length > 0 && (
                    <button onClick={() => startTransition(handleDelete)} className={`
                            w-36 h-8 flex justify-center items-center gap-1 transition-all bg-_white text-_dark border-2 hover:bg-_gray 
                            border-_gray font-medium rounded-full dark:bg-_dark dark:text-_white dark:border-_darkText dark:hover:bg-_darkText`}>
                        Eliminar <span className='font-bold'>{selectList.length}</span> {selectList.length > 1 ? 'filas' : 'fila'}
                    </button>
                )}
            </div>
            <table className='table-auto text-xs w-full border-separate border-spacing-0 my-6'>
                <thead className='text-_grayText uppercase sticky top-0 z-30'>
                    <tr className='text-left'>
                        <th className='pl-3 pr-1 py-2 flex justify-between'>
                            <div className='flex items-center justify'>
                                <input
                                    onChange={(e) => handleSelectedAll(e.target.checked)}
                                    type='checkbox'
                                    name='select-all'
                                    id='select-all'
                                    checked={selectList.length === data.length}
                                    className='w-4 h-4 m-auto accent-_primary rounded-full'
                                />
                            </div>
                        </th>
                        <th className='px-3 py-2 font-medium'>Factura</th>
                        <th className='px-3 py-2 font-medium'>Producto</th>
                        <th className='px-3 py-2 font-medium'>Cliente</th>
                        <th className='px-3 py-2 font-medium'>Fecha</th>
                        <th className='px-3 py-2 font-medium sticky right-0 bg-_white dark:bg-_dark border-l-4 border-_gray dark:border-_darkText'>Estado</th>
                    </tr>
                </thead>
                <tbody className='text-_grayText text-base overflow-hidden'>
                    {data.map((data: QrProductType) => (
                        <Tr
                            key={data.id}
                            data={data}
                            defaultChecked={selectList.length > 0 ? selectList.includes(data.id) : false}
                            isSelected={(id: number) => handleSelected(id)}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

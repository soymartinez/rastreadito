'use client'

import Tr from '@/components/tr'
import { QrProductType } from '@/types'
import { AlertCircle, X } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { deleteProduct } from '../actions/delete-product'
import { destroyProduct } from '../actions/destroy-product'

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
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          setSelectList([])
        },
      },
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

  const handleDestroy = () => {
    toast(`¿Estás seguro de destruir ${selectList.length > 1 ? 'los productos seleccionados' : 'el producto seleccionado'}?`, {
      icon: <AlertCircle size={18} />,
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          setSelectList([])
        },
      },
      action: {
        label: 'Destruir',
        onClick: () => {
          toast.promise(destroyProduct(selectList), {
            loading: 'Destruyendo...',
            success: () => {
              setSelectList([])
              return <>
                <strong>{selectList.length}</strong> {selectList.length > 1 ? 'productos destruidos' : 'producto destruido'}
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
      <div className='sticky left-0 mt-6 flex h-12 items-center justify-start gap-6 overflow-auto px-3'>
        <div className='flex items-center gap-3'>
          {selectList.length > 0 && (
            <div
              className='flex size-4 cursor-pointer items-center justify-center rounded-sm border border-_grayText/30 bg-_dark text-_white hover:bg-_dark/80 dark:bg-_darkText dark:hover:bg-_white/20'
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
        {selectList.length > 0 && <div className='h-full w-1 bg-_gray dark:bg-_darkText' />}
        <div className='flex w-min gap-2'>
          {selectList.length > 0 && (
            <button onClick={() => startTransition(handleDelete)} className={`
                            flex h-8 w-36 items-center justify-center gap-1 rounded-full border-2 border-_gray bg-_white font-medium 
                            text-_dark transition-all hover:bg-_gray dark:border-_darkText dark:bg-_dark dark:text-_white dark:hover:bg-_darkText`}>
                            Eliminar <span className='font-bold'>{selectList.length}</span> {selectList.length > 1 ? 'filas' : 'fila'}
            </button>
          )}
          {selectList.length > 0 && (
            <button onClick={() => startTransition(handleDestroy)} className={`
                            flex h-8 w-36 items-center justify-center gap-1 rounded-full border-2 border-_gray bg-_white font-medium 
                            text-_dark transition-all hover:bg-_gray dark:border-_darkText dark:bg-_dark dark:text-_white dark:hover:bg-_darkText`}>
                            Destruir <span className='font-bold'>{selectList.length}</span> {selectList.length > 1 ? 'filas' : 'fila'}
            </button>
          )}
        </div>
      </div>
      <table className='my-6 w-full table-auto border-separate border-spacing-0 text-xs'>
        <thead className='sticky top-0 z-30 uppercase text-_grayText'>
          <tr className='text-left'>
            <th className='flex justify-between py-2 pl-3 pr-1'>
              <div className='flex items-center justify-center'>
                <input
                  onChange={(e) => handleSelectedAll(e.target.checked)}
                  type='checkbox'
                  name='select-all'
                  id='select-all'
                  checked={selectList.length === data.length}
                  className='m-auto size-4 rounded-full accent-_primary'
                />
              </div>
            </th>
            <th className='px-3 py-2 font-medium'>Factura</th>
            <th className='px-3 py-2 font-medium'>Producto</th>
            <th className='px-3 py-2 font-medium'>Cliente</th>
            <th className='px-3 py-2 font-medium'>Fecha</th>
            <th className='sticky right-0 border-l-4 border-_gray bg-_white px-3 py-2 font-medium dark:border-_darkText dark:bg-_dark'>Estado</th>
          </tr>
        </thead>
        <tbody className='overflow-hidden text-base text-_grayText'>
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

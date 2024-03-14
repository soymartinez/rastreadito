'use client'

import { useEffect, useState } from 'react'
import { QrProductType } from '@/types'
import clsx from 'clsx'
import { Maximize2, QrCode } from 'lucide-react'
import Link from 'next/link'
import { ActiveButton, DestroyButton, UseButton } from './status'
import ModalDialog from './modal/modal-dialog'
import GenerateQr from './generateQr'

interface Props {
  data: QrProductType
  defaultChecked?: boolean
  isSelected: (id: number) => void
}

export default function Tr({
  data: {
    id,
    estatus,
    codigo,
    valor,
    fechaRegistro,
    producto: {
      nombre: productoNombre,
      descripcion: productoDescripcion,
      categoria,
      usuario,
    }
  },
  defaultChecked = false,
  isSelected,
}: Props) {
  const [checked, setChecked] = useState(false)
  const [hover, setHover] = useState(false)
  const [show, setShow] = useState(false)

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
      className={clsx('overflow-x-auto hover:bg-_gray/80 dark:bg-_dark dark:hover:bg-_darkText/50', {
        'bg-_primary/[15%] hover:bg-_primary/[15%] dark:bg-_primary/[15%] dark:hover:bg-_primary/[15%]': checked,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <td className='w-28 py-2 pl-3 pr-1'>
        <div className='flex w-[100px] items-center justify-between'>
          <div className='flex items-center justify-center'>
            <input
              onChange={(e) => handleSelected(e.target.checked)}
              type='checkbox'
              name={`${id}`}
              id={`${id}`}
              checked={checked}
              className='m-auto size-4 rounded-full accent-_primary' />
          </div>
          <div className='flex gap-2'>
            <Link href={`/product/${codigo}`} className={clsx({
              'md:hidden ': !hover,
            })}>
              <div className='rounded-full bg-_white p-2 transition dark:bg-_dark dark:hover:bg-_primary/[15%]'>
                <Maximize2 size={14} className='text-_dark dark:text-_primary' />
              </div>
            </Link>
            <button
              onClick={() => { setShow(true); setHover(false) }}
              className={clsx({ 'md:hidden ': !hover })}
            >
              <div className='rounded-full bg-_white p-2 transition dark:bg-_dark dark:hover:bg-_primary/[15%]'>
                <QrCode size={14} className='text-_dark dark:text-_primary' />
              </div>
            </button>
            {show && (
              <ModalDialog onOpenChange={setShow}>
                <div className='flex h-full flex-col items-center justify-center'>
                  <div className='flex w-full flex-col items-center justify-center gap-6 pb-10 pt-8 font-medium text-_darkText dark:text-_white'>
                    <h1 className='text-center text-4xl font-semibold md:text-5xl'>{productoNombre}</h1>
                    <div className='overflow-hidden rounded-2xl'>
                      {valor && <GenerateQr value={valor} />}
                    </div>
                    <p className='text-balance text-center dark:text-_grayText'>
                      {productoDescripcion}
                      <p className='text-_white'>
                                                Fecha: <span className='font-semibold'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</span>
                      </p>
                    </p>
                  </div>
                </div>
              </ModalDialog>
            )}
          </div>
        </div>
      </td>
      <td className='whitespace-nowrap px-3 py-2 font-semibold uppercase text-_dark dark:text-_white'>#{categoria} {id}</td>
      <td className='whitespace-nowrap px-3 py-2 font-semibold'>{productoNombre}</td>
      <td className='whitespace-nowrap px-3 py-2 font-semibold'>{usuario}</td>
      <td className='whitespace-nowrap px-3 py-2 font-semibold'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</td>
      <td className='sticky right-0 z-20 border-l-4 border-_gray bg-inherit px-3 py-2 font-semibold backdrop-blur-md dark:border-_darkText'>
        {estatus === 'active' && <ActiveButton />}
        {estatus === 'inactive' && <UseButton />}
        {estatus === 'destroied' && <DestroyButton />}
      </td>
    </tr>
  )
}

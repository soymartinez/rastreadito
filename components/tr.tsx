'use client'

import { useEffect, useState } from 'react'
import { QrProductType } from '@/types'
import clsx from 'clsx'
import { Maximize2, QrCode } from 'lucide-react'
import Link from 'next/link'
import { ActiveButton, DestroyButton, UseButton } from './status'
import ModalDialog from './modal/modal-dialog'
import GenerateQr from './generateQr'
import Balancer from 'react-wrap-balancer'

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
      className={clsx('hover:bg-_gray/80 dark:bg-_dark dark:hover:bg-_darkText/50 overflow-x-auto', {
        'bg-_primary/[15%] hover:bg-_primary/[15%] dark:bg-_primary/[15%] dark:hover:bg-_primary/[15%]': checked,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <td className='pl-3 pr-1 py-2 w-28'>
        <div className='flex justify-between items-center w-[100px]'>
          <div className='flex items-center justify-center'>
            <input
              onChange={(e) => handleSelected(e.target.checked)}
              type='checkbox'
              name={`${id}`}
              id={`${id}`}
              checked={checked}
              className='w-4 h-4 m-auto accent-_primary rounded-full' />
          </div>
          <div className='flex gap-2'>
            <Link href={`/product/${codigo}`} className={clsx({
              'md:hidden ': !hover,
            })}>
              <div className='bg-_white dark:bg-_dark dark:hover:bg-_primary/[15%] transition p-2 rounded-full'>
                <Maximize2 size={14} className='text-_dark dark:text-_primary' />
              </div>
            </Link>
            <button
              onClick={() => { setShow(true); setHover(false) }}
              className={clsx({ 'md:hidden ': !hover })}
            >
              <div className='bg-_white dark:bg-_dark dark:hover:bg-_primary/[15%] transition p-2 rounded-full'>
                <QrCode size={14} className='text-_dark dark:text-_primary' />
              </div>
            </button>
            {show && (
              <ModalDialog onOpenChange={setShow}>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center gap-6 w-full text-_darkText dark:text-_white font-medium pt-8 pb-10'>
                    <h1 className='font-semibold text-4xl md:text-5xl text-center'>{productoNombre}</h1>
                    <div className='rounded-2xl overflow-hidden'>
                      {valor && <GenerateQr value={valor} />}
                    </div>
                    <Balancer className='text-center dark:text-_grayText'>
                      {productoDescripcion}
                      <p className='text-_white'>
                                                Fecha: <span className='font-semibold'>{new Date(fechaRegistro).toLocaleString(undefined, { hour12: true })}</span>
                      </p>
                    </Balancer>
                  </div>
                </div>
              </ModalDialog>
            )}
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

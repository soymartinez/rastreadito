'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const menu = [
  {
    label: 'General',
    index: true
  },
  {
    label: 'Productos',
    href: '/productos'
  },
  {
    label: 'Historial',
    href: '/historial'
  },
  {
    label: 'Recompensas',
    href: '/recompensas'
  },
  {
    label: 'Configuración',
    href: '/configuracion'
  },
]

export default function StackMenu() {
  const pathname = usePathname()
  const { teamId } = useParams()
  return (
    <div className='sticky top-14 z-40 -mt-2 border-b bg-white/60 backdrop-blur-md'>
      <div className='flex items-center overflow-x-auto px-1 scrollbar-none md:px-4'>
        {menu.map((item, index) => (
          <Link
            key={index}
            href={'/' + teamId + (item.href ? item.href : '')}
            data-selected={pathname === '/' + teamId + (item.href ? item.href : '')}
            // TODO: mejorar menu activo + animaciones
            className={'group border-b-2 border-white px-3 py-4 text-sm font-normal leading-none data-[selected="true"]:border-dark'}
          >
            <span className='group-data-[selected="true"]:font-medium'>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

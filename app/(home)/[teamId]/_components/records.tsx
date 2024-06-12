'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  ArrowDownToLine,
  Box,
  ChevronRight,
  Dot,
  MoreHorizontal,
  QrCode
} from 'lucide-react'
import clsx from 'clsx'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RecordsTable } from '@/components/tables/records/records-table'
import { Record } from '@/types/record'
import { ColumnDef } from '@tanstack/react-table'
import { getRelativeTime } from '@/lib/timeago'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  className?: string
}

export const records: Record[] = [
  {
    id: 'rd100',
    key: 'RD-200ER CART',
    status: 'active',
    description: 'Rastreos realizados',
    date: new Date()
  },
  {
    id: 'rd101',
    key: 'RD-201ER CART',
    status: 'active',
    description: 'Rastreos realizados',
    date: new Date(new Date().setMinutes(-1))
  },
  {
    id: 'rd102',
    key: 'RD-202ER CART',
    status: 'inactive',
    description: 'Rastreos realizados',
    date: new Date(new Date().setHours(-1))
  },
  {
    id: 'rd103',
    key: 'RD-203ER CART',
    status: 'destroyed',
    description: 'Rastreos realizados',
    date: new Date(new Date().setMonth(-1))
  },
  {
    id: 'rd104',
    key: 'RD-204ER CART',
    status: 'inactive',
    description: 'Rastreos realizados',
    date: new Date(new Date().setHours(-1))
  },
  {
    id: 'rd105',
    key: 'RD-205ER CART',
    status: 'inactive',
    description: 'Rastreos realizados',
    date: new Date(new Date().setHours(-1))
  },
  {
    id: 'rd106',
    key: 'RD-206ER CART',
    status: 'destroyed',
    description: 'Rastreos realizados',
    date: new Date(new Date().setMonth(-1))
  },
  {
    id: 'rd107',
    key: 'RD-207ER CART',
    status: 'inactive',
    description: 'Rastreos realizados',
    date: new Date(new Date().setHours(-1))
  },
  {
    id: 'rd108',
    key: 'RD-208ER CART',
    status: 'inactive',
    description: 'Rastreos realizados',
    date: new Date(new Date().setHours(-1))
  },
]

export default function Records({ className }: Props) {
  const [tab, setTab] = useState('history')

  return (
    <div className={clsx('rounded-xl border bg-white px-5 py-4 shadow-mid', className)}>
      {/* HEADER */}
      <div className='mb-4 flex items-center justify-between'>
        <div className='space-y-[2px]'>
          <h1 className='text-base font-semibold'>Registros</h1>
          <p className='text-xs font-medium text-grayTextLight selection:bg-gray'>Productos registrados y asociado a un qr</p>
        </div>
        <Button
          onClick={() => toast.success('Ver todos los registros')}
          variant='ghost'
          className='-mx-2 h-6 gap-[4px] py-[3px] pl-[8px] pr-[4px] text-sm !text-violet selection:bg-violet selection:text-white hover:bg-violet/5'
        >
          Ver todos los registros
          <ChevronRight className='size-4' />
        </Button>
      </div>

      {/* TABS CONTENT */}
      <div>
        <Tabs defaultValue='history' value={tab} onValueChange={setTab}>
          <TabsList className='flex w-full justify-start overflow-auto text-grayText'>
            <TabsTrigger
              value='history'
              className='min-w-[135px] rounded-none border-primary py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-dark'
            >
              Historial
            </TabsTrigger>
            <TabsTrigger
              value='active'
              className='min-w-[135px] rounded-none border-primary py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-dark'
            >
              Activos
            </TabsTrigger>
            <TabsTrigger
              value='inactive'
              className='min-w-[135px] rounded-none border-primary py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-dark'
            >
              Inactivos
            </TabsTrigger>
            <TabsTrigger
              value='destroyed'
              className='min-w-[135px] rounded-none border-primary py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-dark'
            >
              Destruidos
            </TabsTrigger>
          </TabsList>
          <div className='relative'>
            <div
              className='absolute h-[2px] w-[135px] rounded-full bg-primary transition-transform'
              style={{ transform: `translateX(${135 * ['history', 'active', 'inactive', 'destroyed'].indexOf(tab)}px)` }}
            />
            <div className='h-[2px] w-full rounded-full bg-border' />
          </div>
          <TabsContent value='history'>
            <RecordsTable data={records} />
          </TabsContent>
          <TabsContent value='active'>
            <RecordsTable data={records} filter={{ status: 'active' }} />
          </TabsContent>
          <TabsContent value='inactive'>
            <RecordsTable data={records} filter={{ status: 'inactive' }} />
          </TabsContent>
          <TabsContent value='destroyed'>
            <RecordsTable data={records} filter={{ status: 'destroyed' }} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

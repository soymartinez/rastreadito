'use client'

import { toast } from 'sonner'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Dot, FileBarChart2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'

const data = [
  {
    'fecha': 'Enero',
    'Inactivo': 400,
    'Activo': 0,
    'Canjeado': 0
  },
  {
    'fecha': 'Febrero',
    'Inactivo': 400,
    'Activo': 0,
    'Canjeado': 0
  },
  {
    'fecha': 'Marzo',
    'Inactivo': 200,
    'Activo': 400,
    'Canjeado': 100
  },
  {
    'fecha': 'Abril',
    'Inactivo': 150,
    'Activo': 500,
    'Canjeado': 150
  },
  {
    'fecha': 'Mayo',
    'Inactivo': 100,
    'Activo': 550,
    'Canjeado': 100
  },
  {
    'fecha': 'Junio',
    'Inactivo': 50,
    'Activo': 700,
    'Canjeado': 100
  },
  {
    'fecha': 'Julio',
    'Inactivo': 80,
    'Activo': 750,
    'Canjeado': 70
  },
  {
    'fecha': 'Agosto',
    'Inactivo': 60,
    'Activo': 800,
    'Canjeado': 90
  },
  {
    'fecha': 'Septiembre',
    'Inactivo': 90,
    'Activo': 850,
    'Canjeado': 60
  },
  {
    'fecha': 'Octubre',
    'Inactivo': 100,
    'Activo': 800,
    'Canjeado': 200
  },
  {
    'fecha': 'Noviembre',
    'Inactivo': 80,
    'Activo': 950,
    'Canjeado': 300
  },
  {
    'fecha': 'Diciembre',
    'Inactivo': 100,
    'Activo': 800,
    'Canjeado': 500
  },
]

interface Props {
  className?: string
}

export default function ReportRecords({ className }: Props) {
  return (
    <div className={clsx('rounded-xl border bg-white px-5 py-4 shadow-mid', className)}>
      {/* HEADER */}
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-base font-semibold'>Reporte de registros</h1>
        <Button
          onClick={() => toast.success('Reporte de registros exportado correctamente')}
          variant='outline'
          className='h-6 gap-[6px] px-[6px] py-[3px] text-xs'
        >
          <FileBarChart2 className='size-4' />
          Exportar
        </Button>
      </div>

      {/* GRAPH */}
      <ResponsiveContainer className={'max-h-[248px] w-full'}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id='colorTotal' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='violet' stopOpacity={0.5} />
              <stop offset='95%' stopColor='violet' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorActive' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#00E99E' stopOpacity={0.5} />
              <stop offset='95%' stopColor='#00E99E' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorInactive' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#d3d7de' stopOpacity={0.5} />
              <stop offset='95%' stopColor='#d3d7de' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorDestroyed' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#444CF7' stopOpacity={0.5} />
              <stop offset='95%' stopColor='#444CF7' stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            interval={'preserveStartEnd'}
            dataKey='fecha'
            tick={{
              fill: '#8D8D8D',
              fontSize: 12,
              fontWeight: 600,
            }}
            tickFormatter={(value) => value.slice(0, 3)}
            tickMargin={16}
            axisLine={{ display: 'none' }}
            tickLine={{ display: 'none' }}
          />

          <CartesianGrid strokeDasharray='0' vertical={false} stroke='#EDEDED50' strokeWidth={2} />

          <Tooltip
            cursor={{ stroke: 'var(--primary)', strokeWidth: 2 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className='rounded-xl border bg-white/70 px-4 py-2 shadow-lg backdrop-blur-sm'>
                    <p className='text-sm font-normal'>{label}</p>
                    {payload
                      .map((data) => (
                        <div
                          key={data.dataKey}
                          className='flex items-center gap-2'
                        >
                          <Dot className={clsx('-ml-2 -mr-1 stroke-[6]', {
                            'text-primary': data.dataKey === 'Activo',
                            'text-gray': data.dataKey === 'Inactivo',
                            'text-violet': data.dataKey === 'Canjeado',
                          })} />
                          <p className='text-sm'>
                            {data.name}: <span className='font-medium'>{data.value} qr</span>
                          </p>
                        </div>
                      ))}
                  </div>
                )
              }

              return null
            }}
          />
          <Area type='monotone' dataKey='Activo' stroke='#00E99E' strokeWidth={2} fillOpacity={1} fill='url(#colorActive)' />
          <Area type='monotone' dataKey='Inactivo' stroke='#b3b3b3' strokeWidth={2} fillOpacity={1} fill='url(#colorInactive)' />
          <Area type='monotone' dataKey='Canjeado' stroke='#444CF7' strokeWidth={2} fillOpacity={1} fill='url(#colorDestroyed)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

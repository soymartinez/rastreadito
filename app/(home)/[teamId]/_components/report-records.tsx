'use client'

import { toast } from 'sonner'
import { FileBarChart2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'

// TODO: ONLY FOR TEST
type ChartData = Array<{
  date: string,
  Activo: number,
  Inactivo: number,
  Destruido: number
}>

const chartdata: ChartData = [
  {
    date: 'Enero',
    Activo: 2890,
    Inactivo: 2338,
    Destruido: 3253
  },
  {
    date: 'Febrero',
    Activo: 2890,
    Inactivo: 2342,
    Destruido: 1342
  },
  {
    date: 'Marzo',
    Activo: 4452,
    Inactivo: 3234,
    Destruido: 4234
  },
  {
    date: 'Abril',
    Activo: 1729,
    Inactivo: 234,
    Destruido: 2222
  },
  {
    date: 'Mayo',
    Activo: 4352,
    Inactivo: 3234,
    Destruido: 4034
  },
  {
    date: 'Junio',
    Activo: 3452,
    Inactivo: 3234,
    Destruido: 4234
  },
  {
    date: 'Julio',
    Activo: 2389,
    Inactivo: 234,
    Destruido: 5346
  },
  {
    date: 'Agosto',
    Activo: 4345,
    Inactivo: 234,
    Destruido: 5323
  },
  {
    date: 'Septiembre',
    Activo: 5345,
    Inactivo: 2233,
    Destruido: 2342
  },
  {
    date: 'Octubre',
    Activo: 1234,
    Inactivo: 5235,
    Destruido: 6455
  },
  {
    date: 'Noviembre',
    Activo: 23,
    Inactivo: 525,
    Destruido: 3443
  },
  {
    date: 'Diciembre',
    Activo: 6434,
    Inactivo: 233,
    Destruido: 639
  },
]

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`

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
      <div>
        {/* <AreaChart
          className="h-[270px]"
          data={chartdata}
          index="date"
          showYAxis={false}
          showAnimation
          showGradient
          showGridLines
          showLegend
          showTooltip
          suppressHydrationWarning
          categories={['Activo', 'Inactivo', 'Destruido']}
          colors={['primary', '', 'violet']}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
        /> */}
      </div>
    </div>
  )
}

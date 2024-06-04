import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import clsx from 'clsx'

const data = [
  {
    name: 'Cart',
    count: 1387,
    total: 1500,
  },
  {
    name: 'Edibles',
    count: 896,
    total: 1500,
  },
  {
    name: 'Ungüentos',
    count: 679,
    total: 1500,
  },
  {
    name: 'Aceites',
    count: 367,
    total: 1500,
  },
  {
    name: 'Plantas',
    count: 103,
    total: 1500,
  },
]

interface Props {
  className?: string
}

export default function TrafficSources({ className }: Props) {
  return (
    <div className={clsx('rounded-xl border bg-white px-5 py-4', className)}>
      {/* HEADER */}
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-base font-semibold'>Fuentes de tráfico</h1>
        <Select>
          <SelectTrigger className='-mx-1 h-6 w-auto gap-1 border-none py-0.5 pr-1 !text-sm font-semibold text-grayText'>
            <SelectValue placeholder='Últimos días' className='w-min' />
          </SelectTrigger>
          <SelectContent align='end'>
            {[
              {
                label: 'Últimos 7 días',
                value: 7
              },
              {
                label: 'Últimos 15 días',
                value: 15
              },
              {
                label: 'Últimos 30 días',
                value: 30
              },
            ].map(({ label, value }) => (
              <SelectItem key={value} value={label}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* BODY */}
      <div className='space-y-4'>
        {data.map((traffic, index) => (
          <div key={index}>
            <div className='flex justify-between text-sm font-semibold text-grayText'>
              <h1>{traffic.name}</h1>
              <h1>{traffic.count}</h1>
            </div>

            <Progress
              className='!mt-2'
              value={(traffic.count / traffic.total) * 100}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

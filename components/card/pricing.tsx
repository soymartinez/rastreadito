import { Button } from '@/components/ui/button'
import clsx from 'clsx'

export default function PricingCard({
  name,
  price,
  duration,
  description,
  button,
  popular,
}: {
    name: string,
    price: string,
    duration?: string,
    description: string,
    button: string,
    popular?: boolean,
}) {
  return (
    <div className='relative flex w-full flex-col items-center justify-between gap-4 rounded-2xl border-2 border-gray p-12 hover:bg-[#fcfcfc] dark:border-darkText dark:hover:bg-[#232323]'>
      {popular && <div className='absolute -top-5 rounded-full bg-primary px-6 py-3 text-xs font-semibold dark:text-dark'>Popular</div>}
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <div>
          <h1 className='text-6xl font-semibold'>{price}</h1>
          {duration && <h1 className='text-end text-base font-semibold'>{duration}</h1>}
        </div>
        <span className='text-balance text-center text-darkText dark:text-grayText'>
          {description}
        </span>
      </div>
      <Button variant={'outline'} className={clsx('mt-4 w-full', {
        'bg-primary border-primary dark:text-dark hover:border-none': popular,
        'hover:bg-gray dark:hover:bg-darkText dark:border-darkText': !popular,
      })}>{button}</Button>
    </div>
  )
}
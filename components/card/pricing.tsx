import Balancer from 'react-wrap-balancer'
import { Button } from "@/ui/button";
import clsx from 'clsx';

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
    <div className='flex flex-col justify-between relative items-center gap-4 p-12 border-2 border-_gray dark:border-_darkText hover:bg-[#fcfcfc] dark:hover:bg-[#232323] rounded-2xl w-full'>
      {popular && <div className='absolute -top-5 text-xs font-semibold bg-_primary dark:text-_dark px-6 py-3 rounded-full'>Popular</div>}
      <div className='flex flex-col items-center justify-center gap-4 w-full'>
        <h1 className='font-semibold text-xl'>{name}</h1>
        <div>
          <h1 className='font-semibold text-6xl'>{price}</h1>
          {duration && <h1 className='font-semibold text-base text-end'>{duration}</h1>}
        </div>
        <Balancer className='text-center text-_darkText dark:text-_grayText'>
          {description}
        </Balancer>
      </div>
      <Button variant={'outline'} className={clsx('mt-4 w-full', {
        'bg-_primary border-_primary dark:text-_dark hover:border-none': popular,
        'hover:bg-_gray dark:hover:bg-_darkText dark:border-_darkText': !popular,
      })}>{button}</Button>
    </div>
  )
}
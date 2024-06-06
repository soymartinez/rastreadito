import { TabsTrigger } from '@/components/ui/tabs'
import clsx from 'clsx'

interface TabTriggerProps {
  value: string
  label: string
  className?: string
}

export default function TabTrigger({ value, label, className }: TabTriggerProps) {
  return (
    <TabsTrigger
      value={value}
      className={clsx(`
        flex h-12
        w-28 items-center justify-center rounded-full
        border-2 border-gray bg-white font-[500] 
        text-dark transition-all data-[state=active]:border-none 
        data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-white hover:bg-gray data-[state=active]:hover:bg-dark dark:border-darkText dark:bg-dark dark:text-white
        dark:data-[state=active]:bg-primary dark:data-[state=active]:text-dark dark:hover:bg-darkText dark:data-[state=active]:hover:bg-primary
      `, className)}
    >
      {label}
    </TabsTrigger>
  )
}
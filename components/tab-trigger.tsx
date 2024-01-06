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
        border-2 border-_gray bg-_white font-[500] 
        text-_dark transition-all data-[state=active]:border-none 
        data-[state=active]:bg-[#1b1b1b] data-[state=active]:text-_white hover:bg-_gray data-[state=active]:hover:bg-_dark dark:border-_darkText dark:bg-_dark dark:text-_white
        dark:data-[state=active]:bg-_primary dark:data-[state=active]:text-_dark dark:hover:bg-_darkText dark:data-[state=active]:hover:bg-_primary
      `, className)}
    >
      {label}
    </TabsTrigger>
  )
}
import { TabsTrigger } from '@/ui/tabs'
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
        w-28 h-12
        flex justify-center items-center transition-all
        data-[state=active]:bg-[#1b1b1b] data-[state=active]:hover:bg-_dark data-[state=active]:text-_white data-[state=active]:border-none 
        dark:data-[state=active]:bg-_primary dark:data-[state=active]:hover:bg-_primary dark:data-[state=active]:text-_dark 
        bg-_white text-_dark border-2 hover:bg-_gray border-_gray font-[500] rounded-full
        dark:bg-_dark dark:text-_white dark:border-_darkText dark:hover:bg-_darkText
      `, className)}
    >
      {label}
    </TabsTrigger>
  )
}
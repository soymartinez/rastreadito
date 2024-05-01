'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronsUpDown } from 'lucide-react'

import clsx from 'clsx'
import { Label } from './label'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
    labelText?: string,
}

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    SelectTriggerProps
>(({ labelText, className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsx(
      'flex w-full items-center justify-between rounded-2xl border border-primary bg-transparent px-5 py-3 text-base font-medium placeholder:text-grayTextLight focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkText',
      className
    )}
    {...props}
  >
    <div className='flex w-full flex-col items-start'>
      <Label className='text-xs text-primary'>{labelText}</Label>
      {children}
    </div>
    <ChevronsUpDown className='size-4' />
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsx(
        'relative z-50 min-w-32 overflow-hidden rounded-2xl border border-primary bg-white text-darkText shadow-md animate-in fade-in-80 dark:border-darkText dark:bg-dark dark:text-primary',
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className='p-1'>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={clsx(
      'py-1.5 pl-8 pr-2 text-sm font-semibold text-dark dark:text-white',
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base font-medium outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-gray dark:focus:bg-darkText',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex size-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <Check className='size-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clsx('-mx-1 my-1 h-px bg-gray dark:bg-darkText', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}

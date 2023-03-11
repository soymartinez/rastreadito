'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronsUpDown } from 'lucide-react'

import clsx from 'clsx'
import { Label } from './label'

interface SelectProps {
    labelText: string,
}

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
            'flex w-full items-center justify-between rounded-2xl border border-_primary bg-transparent py-3 px-5 text-base font-medium placeholder:text-_grayTextLight focus:outline-none focus:ring-2 focus:ring-_primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        {...props}
    >
        <div className='flex flex-col items-start w-full'>
            <Label className='text-_primary text-xs'>{labelText}</Label>
            {children}
        </div>
        <ChevronsUpDown className='h-4 w-4' />
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
                'animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden rounded-2xl border border-slate-100 bg-white text-_darkText shadow-md',
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
            'py-1.5 pr-2 pl-8 text-sm font-semibold text-slate-900 dark:text-slate-300',
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
            'relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700',
            className
        )}
        {...props}
    >
        <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
            <SelectPrimitive.ItemIndicator>
                <Check className='h-4 w-4' />
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
        className={clsx('-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-700', className)}
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

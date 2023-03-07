'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import clsx from 'clsx'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={clsx(
            'inline-flex items-center justify-center rounded-2xl bg-_primary p-1 dark:bg-_primary',
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        className={clsx(
            'inline-flex min-w-[100px] items-center justify-center rounded-[14px] px-3 py-4 text-base font-semibold text-_dark/50 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-_dark data-[state=active]:shadow-sm dark:text-_dark/50 dark:data-[state=active]:bg-_white dark:data-[state=active]:text-_dark',
            className
        )}
        {...props}
        ref={ref}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        className={clsx(
            'mt-9',
            className
        )}
        {...props}
        ref={ref}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

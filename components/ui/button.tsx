import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import clsx from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-2 transition-colors data-[state=open]:bg-_primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-_primary active:scale-[99%] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-_primary text-_dark hover:bg-_primary/80',
        image:
          'h-14 w-14 overflow-hidden rounded-2xl border border-_gray bg-_gray p-2 hover:bg-_gray/50 dark:border-_darkText dark:bg-_darkText dark:hover:bg-_darkText/50',
        outline:
          'border-2 border-_gray dark:border-_darkText',
        subtle:
          'bg-_gray text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-_gray',
        ghost:
          'bg-transparent data-[state=open]:bg-transparent hover:bg-_gray dark:text-_primary dark:data-[state=open]:bg-transparent dark:hover:bg-_darkText',
        link: 'bg-transparent text-slate-900 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent dark:text-_gray dark:hover:bg-transparent',
      },
      size: {
        default: 'h-16 px-4 py-2',
        sm: 'h-9 rounded-md px-2',
        icon: 'h-11 w-11 rounded-full',
        lg: 'h-11 rounded-md px-8',
        nothing: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

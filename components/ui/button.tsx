import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import clsx from 'clsx'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-2 transition-colors data-[state=open]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[99%] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-dark hover:bg-primary/80',
        image:
          'size-14 overflow-hidden rounded-2xl border border-gray bg-gray p-2 hover:bg-gray/50 dark:border-darkText dark:bg-darkText dark:hover:bg-darkText/50',
        outline:
          'border-2 border-gray dark:border-darkText',
        subtle:
          'bg-gray text-dark hover:bg-darkText dark:bg-gray dark:text-gray',
        ghost:
          'bg-transparent data-[state=open]:bg-transparent hover:bg-gray dark:text-primary dark:data-[state=open]:bg-transparent dark:hover:bg-darkText',
        link: 'bg-transparent text-dark underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent dark:text-gray dark:hover:bg-transparent',
      },
      size: {
        default: 'h-16 px-4 py-2',
        sm: 'h-9 rounded-md px-2',
        icon: 'size-11 rounded-full',
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

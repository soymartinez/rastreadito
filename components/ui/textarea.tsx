import clsx from 'clsx'
import * as React from 'react'
import { Label } from './label'

interface TextareaPropsExtended {
    labelText?: string,
}

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaPropsExtended { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ labelText, className, ...props }, ref) => {
    const id = React.useId()
    const [isFocused, setIsFocused] = React.useState(false)
    return (
      <div
        className={clsx(
          'flex w-full items-center gap-3 rounded-2xl border border-primary bg-transparent px-5 py-3 text-base font-medium placeholder:text-grayText disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkText',
          { 'outline-none ring-2 ring-primary': isFocused },
          className,
        )}
      >
        <div className='flex w-full flex-col'>
          <Label htmlFor={`textarea-${id}`} className='text-xs text-primary'>{labelText}</Label>
          <textarea
            id={`textarea-${id}`}
            className={clsx(
              'flex w-full bg-transparent text-base font-medium placeholder:text-grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }

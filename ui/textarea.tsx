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
                    'flex items-center gap-3 w-full rounded-2xl border border-_primary dark:border-_darkText bg-transparent py-3 px-5 text-base font-medium placeholder:text-_grayTextDisabled disabled:cursor-not-allowed disabled:opacity-50',
                    { 'outline-none ring-2 ring-_primary': isFocused },
                    className,
                )}
            >
                <div className='flex flex-col w-full'>
                    <Label htmlFor={`textarea-${id}`} className='text-_primary text-xs'>{labelText}</Label>
                    <textarea
                        id={`textarea-${id}`}
                        className={clsx(
                            'flex w-full bg-transparent text-base font-medium placeholder:text-_grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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

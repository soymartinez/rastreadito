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
        return (
            <div
                className={clsx(
                    'flex items-center gap-3 w-full rounded-2xl border border-_primary bg-transparent py-3 px-5 text-base font-medium placeholder:text-_grayTextDisabled focus:outline-none focus:ring-2 focus:ring-_primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-_primary',
                    className
                )}
            >
                <div className='flex flex-col w-full'>
                    <Label htmlFor={`textarea-${id}`} className='text-_primary text-xs'>{labelText}</Label>
                    <textarea
                        id={`textarea-${id}`}
                        className={clsx(
                            'flex h-20 w-full bg-transparent text-base font-medium placeholder:text-_grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                            className
                        )}
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

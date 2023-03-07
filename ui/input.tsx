import * as React from 'react'

import clsx from 'clsx'

import { Mail } from 'lucide-react'
import { Label } from './label'

interface InputPropsExtended {
    icon?: 'email',
    labelText?: string,
}

export interface IconProps
    extends React.HTMLAttributes<SVGSVGElement>, InputPropsExtended { }

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>, InputPropsExtended { }

const Icons = React.forwardRef<HTMLDivElement, IconProps>(
    ({ icon, ...props }, ref) => {
        return (
            <>
                {icon === 'email' && <Mail {...props} />}
            </>
        )
    }
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, labelText, icon, ...props }, ref) => {
        return (
            <div
                className={clsx(
                    'flex items-center gap-3 w-full rounded-2xl border border-_primary bg-transparent py-3 px-5 text-base font-medium placeholder:text-_grayTextDisabled focus:outline-none focus:ring-2 focus:ring-_primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-_dark dark:text-_dark dark:focus:ring-_primary dark:focus:ring-offset-_primary',
                    className
                )}
                ref={ref}
                {...props}
            >
                {icon &&
                    <>
                        <Icons icon={icon} className={'text-_dark mx-2'} />
                        <div className='bg-_primary w-px h-10 rounded-full' />
                    </>
                }
                <div className='flex flex-col'>
                    <Label htmlFor='input' className='text-_primary text-xs'>{labelText}</Label>
                    <input
                        id='input'
                        className={clsx(
                            'flex w-full bg-transparent text-base font-medium placeholder:text-_grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
Input.displayName = 'Input'

export { Input }

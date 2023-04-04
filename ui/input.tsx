import * as React from 'react'

import clsx from 'clsx'

import { Lock, Mail } from 'lucide-react'
import { Label } from './label'

interface InputPropsExtended {
    icon?: 'email' | 'password',
    labelText?: string,
    variant?: 'normal' | 'porcentage',
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
                {icon === 'password' && <Lock {...props} />}
            </>
        )
    }
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant = 'normal', labelText, icon, ...props }, ref) => {
        const id = React.useId()
        return (
            <div
                className={clsx(
                    'flex h-16 items-center gap-3 w-full rounded-2xl border border-_primary dark:border-_darkText bg-transparent py-3 px-5 text-base font-medium placeholder:text-_grayTextDisabled focus:outline-none focus:ring-2 focus:ring-_primary disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            >
                {variant === 'normal' && <>
                    {icon &&
                        <>
                            <Icons icon={icon} className={'text-_dark dark:text-_white mx-2'} />
                            <div className='bg-_primary dark:bg-_darkText w-px h-10 rounded-full' />
                        </>
                    }
                    <div className='flex flex-col w-full'>
                        <Label htmlFor={`input-${id}`} className='text-_primary text-xs'>{labelText}</Label>
                        <input
                            id={`input-${id}`}
                            className={clsx(
                                'flex w-full bg-transparent text-base font-medium placeholder:text-_grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                                className
                            )}
                            autoComplete='off'
                            ref={ref}
                            {...props}
                        />
                    </div>
                </>}
                {variant === 'porcentage' &&
                    <div className='flex items-center gap-2 w-full'>
                        <Label htmlFor={`input-${id}`} className='text-_darkText dark:text-_white text-[17px] font-semibold'>{labelText}</Label>
                        <div className='flex items-center justify-end gap-2 w-full'>
                            <input
                                id={`input-${id}`}
                                className={clsx(
                                    'flex w-full bg-transparent text-end text-[17px] font-medium placeholder:text-_grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                                    className
                                )}
                                type='number'
                                step={0.1}
                                min={0.0}
                                autoComplete='off'
                                ref={ref}
                                {...props}
                            />
                            <span className='text-_primary text-lg font-medium'>%</span>
                        </div>
                    </div>}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }

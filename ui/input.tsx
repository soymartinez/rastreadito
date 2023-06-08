'use client'

import * as React from 'react'

import clsx from 'clsx'

import { Lock, Mail, Search } from 'lucide-react'
import { Label } from './label'

interface InputPropsExtended {
    icon?: 'email' | 'password',
    labelText?: string,
    variant?: 'normal' | 'porcentage' | 'currency' | 'weight' | 'date' | 'search',
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
        const [isFocused, setIsFocused] = React.useState(false)
        const id = React.useId()
        return (
            <div
                id='input-wrapper'
                className={clsx(
                    'flex h-16 items-center gap-3 w-full rounded-2xl border border-_primary dark:border-_darkText bg-transparent py-3 px-5 text-base font-medium',
                    className,
                    { 'outline-none ring-2 ring-_primary': isFocused }
                )}
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
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
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
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                ref={ref}
                                {...props}
                            />
                            <span className='text-_primary text-lg font-medium'>%</span>
                        </div>
                    </div>}
                {variant === 'currency' &&
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
                                min={0.0}
                                autoComplete='off'
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                ref={ref}
                                {...props}
                            />
                            <span className='text-_primary text-lg font-medium'>$</span>
                        </div>
                    </div>}
                {variant === 'weight' &&
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
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                ref={ref}
                                {...props}
                            />
                            <span className='text-_primary text-lg font-medium'>g</span>
                        </div>
                    </div>}
                {variant === 'date' &&
                    <div className='flex items-center justify-between gap-2 w-full'>
                        <Label htmlFor={`input-${id}`} className='uppercase text-_darkText dark:text-_white text-[17px] font-semibold'>{labelText}</Label>
                        <input
                            id={`input-${id}`}
                            className={clsx(
                                'flex w-min bg-transparent text-end text-[17px] font-medium placeholder:text-_grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                                className
                            )}
                            type='date'
                            autoComplete='off'
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            ref={ref}
                            {...props}
                        />
                    </div>}
                {variant === 'search' &&
                    <>
                        <label htmlFor={`input-${id}`} className='hidden sm:block'>
                            <Search className='w-5 h-5' />
                        </label>
                        <div className={clsx('w-px bg-_primary h-full rounded-full hidden sm:block', {
                            'dark:bg-_darkText': !isFocused,
                        })} />
                        <div className='flex flex-col w-full'>
                            <Label htmlFor={`input-${id}`} className='text-_primary text-xs'>{labelText}</Label>
                            <input
                                id={`input-${id}`}
                                className={'flex w-full bg-transparent text-base font-medium placeholder:text-_grayTextLight focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'}
                                autoComplete='off'
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                ref={ref}
                                {...props}
                            />
                        </div>
                    </>}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }

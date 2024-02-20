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
Icons.displayName = 'Icons'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'normal', labelText, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const id = React.useId()
    return (
      <div
        id='input-wrapper'
        className={clsx(
          'flex h-16 w-full items-center gap-3 rounded-2xl border border-_primary bg-transparent px-5 py-3 text-base font-medium dark:border-_darkText',
          className,
          { 'outline-none ring-2 ring-_primary': isFocused }
        )}
      >
        {variant === 'normal' && <>
          {icon &&
            <>
              <Icons icon={icon} className={'mx-2 text-_dark dark:text-_white'} />
              <div className='h-10 w-px rounded-full bg-_primary dark:bg-_darkText' />
            </>
          }
          <div className='flex w-full flex-col'>
            <Label htmlFor={`input-${id}`} className='text-xs text-_primary'>{labelText}</Label>
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
          <div className='flex w-full items-center gap-2'>
            <Label htmlFor={`input-${id}`} className='text-[17px] font-semibold text-_darkText dark:text-_white'>{labelText}</Label>
            <div className='flex w-full items-center justify-end gap-2'>
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
              <span className='text-lg font-medium text-_primary'>%</span>
            </div>
          </div>}
        {variant === 'currency' &&
          <div className='flex w-full items-center gap-2'>
            <Label htmlFor={`input-${id}`} className='text-[17px] font-semibold text-_darkText dark:text-_white'>{labelText}</Label>
            <div className='flex w-full items-center justify-end gap-2'>
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
              <span className='text-lg font-medium text-_primary'>$</span>
            </div>
          </div>}
        {variant === 'weight' &&
          <div className='flex w-full items-center gap-2'>
            <Label htmlFor={`input-${id}`} className='text-[17px] font-semibold text-_darkText dark:text-_white'>{labelText}</Label>
            <div className='flex w-full items-center justify-end gap-2'>
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
              <span className='text-lg font-medium text-_primary'>g</span>
            </div>
          </div>}
        {variant === 'date' &&
          <div className='flex w-full items-center justify-between gap-2'>
            <Label htmlFor={`input-${id}`} className='text-[17px] font-semibold uppercase text-_darkText dark:text-_white'>{labelText}</Label>
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
              <Search className='h-5 w-5' />
            </label>
            <div className={clsx('hidden h-full w-px rounded-full bg-_primary sm:block', {
              'dark:bg-_darkText': !isFocused,
            })} />
            <div className='flex w-full flex-col'>
              <Label htmlFor={`input-${id}`} className='text-xs text-_primary'>{labelText}</Label>
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

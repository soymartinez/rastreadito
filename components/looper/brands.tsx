import React from 'react'
import { Icons } from '../icons'

export default function Brands() {
  return (
    <>
      <div className='relative mx-4 h-16 w-24'>
        <Icons.vacay className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 size-16'>
        <Icons.sundial className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 h-16 w-36'>
        <Icons.grasslands className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 size-16'>
        <Icons.beehigh className='size-full dark:text-primary' />
      </div>
      <div className='relative mx-4 h-16 w-32'>
        <Icons.versus className='size-full dark:text-primary' />
      </div>
    </>
  )
}

import React from 'react'
import { Icons } from '../icons'

export default function Brands() {
  return (
    <>
      <div className='relative mx-4 h-16 w-16'>
        <Icons.sundial className='h-full w-full dark:text-_primary' />
      </div>
      <div className='relative mx-4 h-16 w-36'>
        <Icons.grasslands className='h-full w-full dark:text-_primary' />
      </div>
      <div className='relative mx-4 h-16 w-16'>
        <Icons.beehigh className='h-full w-full dark:text-_primary' />
      </div>
      <div className='relative mx-4 h-16 w-32'>
        <Icons.versus className='h-full w-full dark:text-_primary' />
      </div>
    </>
  )
}

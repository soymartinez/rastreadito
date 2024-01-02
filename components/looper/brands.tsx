import React from 'react'
import { Icons } from '../icons'

export default function Brands() {
  return (
    <>
      <div className='relative w-16 h-16 mx-4'>
        <Icons.sundial className='dark:text-_primary h-full w-full' />
      </div>
      <div className='relative w-36 h-16 mx-4'>
        <Icons.grasslands className='dark:text-_primary h-full w-full' />
      </div>
      <div className='relative w-16 h-16 mx-4'>
        <Icons.beehigh className='dark:text-_primary h-full w-full' />
      </div>
      <div className='relative w-32 h-16 mx-4'>
        <Icons.versus className='dark:text-_primary h-full w-full' />
      </div>
    </>
  )
}

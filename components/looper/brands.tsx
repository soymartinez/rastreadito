import Image from 'next/image'
import React from 'react'

export default function Brands() {
    return (
        <>
            <div className='relative w-16 h-16 mx-4'>
                <Image src={'/brands/sundial.svg'} alt={'Sundial'} fill />
            </div>
            <div className='relative w-36 h-16 mx-4'>
                <Image src={'/brands/grasslands.svg'} alt={'Grasslands'} fill />
            </div>
            <div className='relative w-16 h-16 mx-4'>
                <Image src={'/brands/beehigh.svg'} alt={'Beehigh'} fill />
            </div>
            <div className='relative w-32 h-16 mx-4'>
                <Image src={'/brands/versus.svg'} alt={'Versus'} fill />
            </div>
        </>
    )
}

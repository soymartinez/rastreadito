'use client'

import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function ScannedProduct() {
    const [step, setStep] = useState(0)

    const goStep = (step: number) => setStep(step)

    const steps = [
        <Balancer className='space-y-3 text-center'>
            <h1 className='text-_dark font-bold text-4xl uppercase'>CART 96% Mango</h1>
            <p className='font-semibold text-base max-w-2xl'>
                Destilado del 96% total cannabinoides con terpeno orgánico
            </p>
        </Balancer>,
        <Balancer className='space-y-3 text-center'>
            <h1 className='text-_dark font-bold text-4xl uppercase'>Dulce y Tropical</h1>
            <p className='font-semibold text-base max-w-2xl'>
                El sabor dulce y tropical del mango se combina con el relajante efecto de la Kush
                en este cartucho de vapeo de alta potencia. Perfecto para una experiencia de vapeo premium.
            </p>
        </Balancer>,
        <Balancer className='space-y-3 text-center'>
            <h1 className='text-_dark font-bold text-4xl uppercase'>Cítrico y Duradero</h1>
            <p className='font-semibold text-base max-w-2xl'>
                Si eres fanático de los sabores cítricos, este cartucho te encantará.
                Disfruta de una explosiva mezcla de mango maduro en este cartucho con un sabor
                intenso y un efecto duradero.
            </p>
        </Balancer>,
    ]
    return (
        <main className='flex flex-col items-center justify-between p-4 w-full h-screen'>
            <Image src='/cart-mango-96.png' alt='cart-mango-96' width={450} height={450} />
            <div className='flex flex-col justify-center items-center w-full px-9 py-20 rounded-[40px] bg-_gray border border-_grayBorder text-_grayText relative'>
                <button
                    onClick={() => setStep(count => count === 2 ? 0 : count + 1)}
                    className='absolute -top-9 bg-_primary hover:opacity-80 p-6 rounded-full'>
                    <ArrowRight color='white' strokeWidth={3} />
                </button>

                {steps[step]}

                <div className='flex gap-2 w-[100px] py-6'>
                    <button onClick={() => goStep(0)} className={clsx('h-2 hover:opacity-80 rounded-full', { 'bg-_primary w-1/2': step === 0, 'w-1/4 bg-_grayBorder': step !== 0 })} />
                    <button onClick={() => goStep(1)} className={clsx('h-2 hover:opacity-80 rounded-full', { 'bg-_primary w-1/2': step === 1, 'w-1/4 bg-_grayBorder': step !== 1 })} />
                    <button onClick={() => goStep(2)} className={clsx('h-2 hover:opacity-80 rounded-full', { 'bg-_primary w-1/2': step === 2, 'w-1/4 bg-_grayBorder': step !== 2 })} />
                </div>

                {step !== 2 &&
                    <button
                        onClick={() => setStep(2)}
                        className='font-semibold text-sm underline underline-offset-2 hover:opacity-80'>
                        Omitir
                    </button>}
            </div>
        </main>
    )
}

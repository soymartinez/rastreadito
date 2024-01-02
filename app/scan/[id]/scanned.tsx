'use client'

import { useState } from 'react'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import { Producto, Qr } from '@prisma/client'

enum STEPS {
    PREVIEW = 0,
    SABOR = 1,
    FULL = 2,
}

type Props = Qr & {
    producto: Producto
}

export default function Scanned({
  producto: {
    nombre,
    descripcion,
    categoria,
    cepa,
    thc,
    cbd,
    aroma,
    efecto,
  },
}: Props) {
  const [step, setStep] = useState(STEPS.PREVIEW)

  const goStep = () => setStep(currentStep => currentStep === 2 ? 0 : currentStep + 1)

  const steps = [
    <Balancer key='0' className='space-y-3 text-center'>
      <h1 className='text-_dark dark:text-_white font-bold text-4xl uppercase'>{nombre}</h1>
      <p className='font-semibold text-base max-w-2xl'>
        {descripcion}
      </p>
    </Balancer>,
    <Balancer key='1' className='space-y-3 text-center'>
      <h1 className='text-_dark dark:text-_white font-bold text-4xl uppercase'>{categoria} / {cepa}</h1>
      <p className='font-semibold text-base max-w-2xl'>
        {aroma} / {efecto}
      </p>
    </Balancer>,
    <Balancer key='2' className='space-y-3 text-center'>
      <h1 className='text-_dark dark:text-_white font-bold text-4xl uppercase'>{nombre}</h1>
      <p className='font-semibold text-base max-w-2xl'>
                Si eres fanático de los sabores cítricos, este cartucho te encantará.
                Disfruta de una explosiva mezcla de mango maduro en este cartucho con un sabor
                intenso y un efecto duradero.
      </p>
    </Balancer>,
  ]
  return (
    <>
      <div className='flex justify-center'>
        <Image src='/cart-mango-96.png' alt='cart-mango-96' width={450} height={450} />
      </div>
      <div className='absolute bottom-6 inset-x-6'>
        <div
          className='
            flex
            flex-col
            justify-center
            items-center
            w-full
            px-9
            py-20
            rounded-[40px]
            bg-_gray
            dark:bg-_darkText
            border
            border-_grayBorder
            dark:border-_darkText
            text-_grayText
            relative
          '
        >
          <button
            onClick={goStep}
            className='absolute -top-9 bg-_primary hover:bg-_primary/80 transition backdrop-blur-sm p-6 rounded-full'>
            <ArrowRight color='white' strokeWidth={3} />
          </button>

          {steps[step]}

          <div className='flex gap-2 w-[100px] py-6'>
            <button onClick={() => setStep(STEPS.PREVIEW)} className={clsx('h-2 hover:opacity-80 rounded-full', { 'bg-_primary w-1/2': step === 0, 'w-1/4 bg-_grayBorder': step !== 0 })} />
            <button onClick={() => setStep(STEPS.SABOR)} className={clsx('h-2 hover:opacity-80 rounded-full', { 'bg-_primary w-1/2': step === 1, 'w-1/4 bg-_grayBorder': step !== 1 })} />
            <button onClick={() => setStep(STEPS.FULL)} className={clsx('h-2 hover:opacity-80 rounded-full', { 'bg-_primary w-1/2': step === 2, 'w-1/4 bg-_grayBorder': step !== 2 })} />
          </div>

          {step !== 2 &&
            <button
              onClick={() => setStep(2)}
              className='font-semibold text-sm underline underline-offset-2 hover:opacity-80'>
                Omitir
            </button>}
        </div>
      </div>
    </>
  )
}

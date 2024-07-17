'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import { Product, Qr } from '@prisma/client'

enum STEPS {
  PREVIEW = 0,
  SABOR = 1,
  FULL = 2,
}

type Props = Qr & {
  product: Product
}

export default function Scanned({
  product
}: Props) {
  const [step, setStep] = useState(STEPS.PREVIEW)

  const goStep = () => setStep(currentStep => currentStep === 2 ? 0 : currentStep + 1)

  const steps = [
    <div key='0' className='space-y-3 text-center'>
      <h1 className='text-4xl font-bold uppercase text-dark dark:text-white'>{product.name}</h1>
      <p className='max-w-2xl text-base font-semibold'>
        {product.description}
      </p>
    </div>,
    <div key='1' className='space-y-3 text-center'>
      {/* <h1 className='text-4xl font-bold uppercase text-dark dark:text-white'>{categoria} / {cepa}</h1>
      <p className='max-w-2xl text-base font-semibold'>
        {aroma} / {efecto}
      </p> */}
    </div>,
    <div key='2' className='space-y-3 text-center'>
      <h1 className='text-4xl font-bold uppercase text-dark dark:text-white'>{product.name}</h1>
      <p className='max-w-2xl text-base font-semibold'>
        Si eres fanático de los sabores cítricos, este cartucho te encantará.
        Disfruta de una explosiva mezcla de mango maduro en este cartucho con un sabor
        intenso y un efecto duradero.
      </p>
    </div>,
  ]
  return (
    <>
      <div className='flex justify-center'>
        <Image src='/cart-mango-96.png' alt='cart-mango-96' width={450} height={450} />
      </div>
      <div className='absolute inset-x-6 bottom-6'>
        <div
          className='
            relative
            flex
            w-full
            flex-col
            items-center
            justify-center
            rounded-[40px]
            border
            border-border
            bg-gray
            px-9
            py-20
            text-grayText
            dark:border-darkText
            dark:bg-darkText
          '
        >
          <button
            onClick={goStep}
            className='absolute -top-9 rounded-full bg-primary p-6 backdrop-blur-sm transition hover:bg-primary/80'>
            <ArrowRight color='white' strokeWidth={3} />
          </button>

          {steps[step]}

          <div className='flex w-[100px] gap-2 py-6'>
            <button onClick={() => setStep(STEPS.PREVIEW)} className={clsx('h-2 rounded-full hover:opacity-80', { 'bg-primary w-1/2': step === 0, 'w-1/4 bg-grayBorder': step !== 0 })} />
            <button onClick={() => setStep(STEPS.SABOR)} className={clsx('h-2 rounded-full hover:opacity-80', { 'bg-primary w-1/2': step === 1, 'w-1/4 bg-grayBorder': step !== 1 })} />
            <button onClick={() => setStep(STEPS.FULL)} className={clsx('h-2 rounded-full hover:opacity-80', { 'bg-primary w-1/2': step === 2, 'w-1/4 bg-grayBorder': step !== 2 })} />
          </div>

          {step !== 2 &&
            <button
              onClick={() => setStep(2)}
              className='text-sm font-semibold underline underline-offset-2 hover:opacity-80'>
              Omitir
            </button>}
        </div>
      </div>
    </>
  )
}

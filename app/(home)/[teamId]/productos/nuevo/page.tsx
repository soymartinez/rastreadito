'use client'

import GenerateQr from '@/components/generate-qr'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/color-picker'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Info, PaintBucket, Type } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function NewProductPage() {
  const [backgroundPrimary, setBackgroundPrimary] = useState('#00E99E')
  const [backgroundSecondary, setBackgroundSecondary] = useState('#ffffff')
  return (
    <div className='px-4 py-8'>
      <div className='mx-auto max-w-screen-desktop'>
        <div>
          {/* QR */}
          <div
            className='mx-auto max-w-[480px] rounded-xl bg-primary p-1'
            style={{ background: backgroundPrimary }}
          >
            <div
              className='relative flex overflow-hidden rounded-lg bg-white p-4 shadow-lg'
              style={{ background: backgroundSecondary }}
            >
              <div className='z-10 max-w-full sm:max-w-[50%]'>
                <div className='-mx-0.5 text-xl font-black uppercase italic'>
                  rastreadito
                </div>

                <div className='block sm:hidden'>
                  <Image
                    src='/images/pineapple-express.webp'
                    // src='/cart-mango-96.png'
                    alt='pineapple-express'
                    width={200}
                    height={200}
                    className='bottom-0 left-[40%] z-0 size-full object-contain sm:absolute sm:left-1/4'
                  />
                </div>

                <div className='z-10 mt-5 space-y-2'>
                  <Badge>Híbrida</Badge>
                  <h1 className='text-4xl font-medium leading-[108%]'>
                    Pineapple Express
                  </h1>
                  <p
                    className='text-xs font-medium leading-relaxed text-darkText'
                  >
                    La Pineapple Express es una cepa de
                    cannabis de predominancia sativa con
                    un contenido de THC de alrededor del 20%.
                  </p>
                </div>
              </div>

              <div className='hidden sm:block'>
                <Image
                  src='/images/pineapple-express.webp'
                  // src='/cart-mango-96.png'
                  alt='pineapple-express'
                  width={200}
                  height={200}
                  className='bottom-0 left-[40%] z-0 size-full object-contain sm:absolute sm:left-1/4'
                />
              </div>
            </div>

            {/* CODE */}
            <div className='flex gap-4 px-4 pb-4 pt-5'>
              <div>
                <GenerateQr
                  value='Pineapple Express'
                  ecLevel='M'
                  size={120}
                  quietZone={0}
                  bgColor='transparent'
                />
              </div>
              <div className='flex flex-1 flex-col items-end justify-end text-end'>
                <h3 className='text-base font-medium'>Administración de red</h3>
                <h2 className='text-2xl font-semibold'>RD-200ER FLOWER</h2>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className='mt-10 flex items-center justify-center gap-x-2 pb-16'>
            <Info size={18} />
            <span className='text-sm'>
              Todos los demás detalles se añadirán en el qr
            </span>
          </div>

          {/* CUSTOM */}
          <div className='flex flex-col justify-center gap-3 sm:flex-row'>
            {/* BACKGROUND */}
            <div className='flex gap-1 rounded-xl border bg-gray p-1'>
              <HoverCard openDelay={150} closeDelay={150}>
                <HoverCardTrigger>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-min justify-start rounded-lg text-left font-normal px-2 gap-1.5 h-8 text-white !bg-dark border-dark',
                    )}
                  >
                    <PaintBucket className='size-4' />
                    <span className='font-medium'>Fondo</span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className='text-sm' sideOffset={10} side='left'>
                  <span>
                    <b>Primario</b>: Asegúrate de que el texto e imágenes sean legibles con el nuevo color de fondo primario.
                  </span>
                  <br />
                  <br />
                  <span>
                    <b>Secundario</b>: Usa imágenes con fondo transparente para que el color secundario se aplique uniformemente.
                  </span>
                </HoverCardContent>
              </HoverCard>

              <ColorPicker
                background={backgroundPrimary}
                setBackground={setBackgroundPrimary}
              >
                <Button
                  variant={'ghost'}
                  className={cn(
                    'w-min justify-start rounded-lg text-left font-normal px-2 gap-1.5 h-8 hover:bg-dark/5',
                  )}
                >
                  <span className='font-medium'>Primario</span>
                  <div
                    className='size-6 rounded-full border !bg-cover !bg-center transition-all'
                    style={{ background: backgroundPrimary }}
                  />
                </Button>
              </ColorPicker>

              <ColorPicker
                background={backgroundSecondary}
                setBackground={setBackgroundSecondary}
              >
                <Button
                  variant={'ghost'}
                  className={cn(
                    'w-min justify-start rounded-lg text-left font-normal px-2 gap-1.5 h-8 hover:bg-dark/5',
                  )}
                >
                  <span className='font-medium'>Secundario</span>
                  <div
                    className='size-6 rounded-full border !bg-cover !bg-center transition-all'
                    style={{ background: backgroundSecondary }}
                  />
                </Button>
              </ColorPicker>
            </div>

            {/* TEXT */}
            <div className='flex items-center gap-1 rounded-xl border bg-gray p-1'>
              <HoverCard openDelay={150} closeDelay={150}>
                <HoverCardTrigger>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-min justify-start rounded-lg text-left px-2 gap-1.5 h-8 text-white !bg-dark border-dark',
                    )}
                  >
                    <Type className='size-4' />
                    <span className='font-medium'>Fuente</span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className='text-sm' sideOffset={10} side='left'>
                  <span>
                    <b>Primario</b>: Asegúrate de que el texto e imágenes sean legibles con el nuevo color de fondo primario.
                  </span>
                  <br />
                  <br />
                  <span>
                    <b>Secundario</b>: Usa imágenes con fondo transparente para que el color secundario se aplique uniformemente.
                  </span>
                </HoverCardContent>
              </HoverCard>

              <Select>
                <SelectTrigger className='h-8 w-auto gap-1 rounded-lg border-none bg-transparent py-0.5 pr-1 !text-sm font-medium text-grayText focus-within:!ring-0'>
                  <SelectValue placeholder='Fuente de textos' className='w-min' />
                </SelectTrigger>
                <SelectContent align='end'>
                  {[
                    {
                      label: 'Poppins',
                      value: 'poppins'
                    },
                    {
                      label: 'Arial',
                      value: 'arial'
                    },
                    {
                      label: 'Sans Serif',
                      value: 'sans-serif'
                    },
                  ].map(({ label, value }) => (
                    <SelectItem key={value} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { cn } from '@/lib/utils'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from './button'

type Position = 'top' | 'bottom' | 'left' | 'right'

export function ColorPicker({
  children,
  background,
  setBackground,
}: {
  children: ReactNode
  background: string
  setBackground: (background: string) => void
}) {
  // GRADIENT CONFIG
  const [startPosition, setStartPosition] = useState<Position>('top')
  const [endPosition, setEndPosition] = useState<Position>('left')
  const [colors, setColors] = useState<string[]>([])

  const solids = [
    '#FFFFFF',
    '#00E99E',
    '#E2E2E2',
    '#ff75c3',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ]

  const gradients = [
    'linear-gradient(to top left,#accbee,#e7f0fd)',
    'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)',
    'linear-gradient(to top left,#000000,#434343)',
    'linear-gradient(to top left,#09203f,#537895)',
    'linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)',
    'linear-gradient(to top left,#f953c6,#b91d73)',
    'linear-gradient(to top left,#ee0979,#ff6a00)',
    'linear-gradient(to top left,#F00000,#DC281E)',
    'linear-gradient(to top left,#00c6ff,#0072ff)',
    'linear-gradient(to top left,#4facfe,#00f2fe)',
    'linear-gradient(to top left,#0ba360,#3cba92)',
    'linear-gradient(to top left,#FDFC47,#24FE41)',
    'linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)',
    'linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)',
    'linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
    'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
  ]

  const images = [
    'url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90',
    'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
    'url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
  ]

  const defaultTab = useMemo(() => {
    if (background.includes('url')) return 'image'
    if (background.includes('gradient')) return 'gradient'
    return 'solid'
  }, [background])

  // linear-gradient(to top left,#4facfe,#00f2fe)
  const handleGradient = (index: number, color: string) => {
    const updatedColors = [...colors]
    updatedColors[index] = color
    setColors(updatedColors)

    const gradient = `linear-gradient(to ${startPosition} ${endPosition}, ${updatedColors.join(', ')})`
    setBackground(gradient)
  }

  // INITIALIZE BACKGROUND COLORS BY PROPS
  useEffect(() => {
    if (background.includes('gradient')) {
      const colorPattern = /#[a-fA-F0-9]{6}/g
      const gradientColors = background.match(colorPattern)
      if (gradientColors) {
        setColors(gradientColors)
      }
    } else {
      setColors([background])
    }
  }, [background])

  // UPDATE POSITION
  useEffect(() => {
    const gradient = `linear-gradient(to ${startPosition} ${endPosition}, ${colors.join(', ')})`
    setBackground(gradient)
  }, [startPosition, endPosition])

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className='w-64 border shadow-md' sideOffset={10}>
        <Tabs defaultValue={defaultTab} className='w-full'>
          <TabsList className='mb-4 w-full'>
            <TabsTrigger className='flex-1' value='solid'>
              Solid
            </TabsTrigger>
            <TabsTrigger className='flex-1' value='gradient'>
              Gradient
            </TabsTrigger>
            <TabsTrigger className='flex-1' value='image'>
              Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value='solid' className='mt-0 flex flex-wrap gap-1'>
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className='size-6 cursor-pointer rounded-md border active:scale-105'
                onClick={() => setBackground(s)}
              />
            ))}

            <Input
              id='custom'
              value={background}
              className='col-span-2 mt-4 h-8'
              onChange={(e) => setBackground(e.currentTarget.value)}
            />
          </TabsContent>

          <TabsContent value='gradient' className='mt-0'>
            <div className='flex flex-wrap gap-1'>
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className='size-6 cursor-pointer rounded-md active:scale-105'
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>

            {/* POSITION */}
            <div className='mt-1'>
              <label htmlFor="" className='text-xs text-grayText'>Posición</label>
              <div className='grid grid-cols-2 gap-1'>
                <Select value={startPosition} onValueChange={(value) => setStartPosition(value as Position)}>
                  <SelectTrigger className='h-8 text-xs'>
                    <SelectValue placeholder='Inicio' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='left'>Izquierda</SelectItem>
                    <SelectItem value='right'>Derecha</SelectItem>
                    <SelectItem value='top'>Arriba</SelectItem>
                    <SelectItem value='bottom'>Abajo</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={endPosition} onValueChange={(value) => setEndPosition(value as Position)}>
                  <SelectTrigger className='h-8 text-xs'>
                    <SelectValue placeholder='Fin' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='left'>Izquierda</SelectItem>
                    <SelectItem value='right'>Derecha</SelectItem>
                    <SelectItem value='top'>Arriba</SelectItem>
                    <SelectItem value='bottom'>Abajo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* COLORS */}
            <div className='mt-1'>
              <label htmlFor="" className='text-xs text-grayText'>Colores</label>
              <div className={
                cn('grid grid-cols-2 gap-1', {
                  '!grid-cols-3': colors.length >= 2
                })
              }>
                {colors.map((color, index) => (
                  <div key={index} className='group relative overflow-hidden rounded-md border'>
                    <Input
                      id='custom'
                      type='color'
                      value={color}
                      className='h-8 !border-none'
                      onChange={(e) => handleGradient(index, e.currentTarget.value)}
                    />

                    <button
                      onClick={() => {
                        setColors((prev) => prev.filter((_, idx) => idx !== index))
                      }}
                      className='absolute inset-y-0 right-0 flex translate-x-8 items-center rounded-r-[2.8px] border-l bg-white/80 px-0.5 transition group-hover:-translate-x-0'
                    >
                      <Trash2 size={16} className='text-red' />
                    </button>
                  </div>
                ))}

                <Button
                  variant='ghost'
                  className='h-8'
                  onClick={() => {
                    setColors((prev) => {
                      return [...prev, '#FFFFFF']
                    })
                  }}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='image' className='mt-0'>
            <div className='mb-2 grid grid-cols-2 gap-1'>
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className='h-12 w-full cursor-pointer rounded-md bg-cover bg-center active:scale-105'
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

const GradientButton = ({
  background,
  children,
}: {
  background: string
  children: React.ReactNode
}) => {
  return (
    <div
      className='relative rounded-md !bg-cover !bg-center p-0.5 transition-all'
      style={{ background }}
    >
      <div className='bg-popover/80 rounded-md p-1 text-center text-xs'>
        {children}
      </div>
    </div>
  )
}
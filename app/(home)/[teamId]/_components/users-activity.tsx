import clsx from 'clsx'
import { ArrowLeftRight, ChevronRight, Plus, Gift } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const data = [
  {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/72507996?v=4',
      name: 'Alvaro',
      lastName: 'Martinez Martinez',
      email: 'rastreadito@gmail.com',
    },
    activity: 'add',
    icon: Plus,
    points: 4,
  },
  {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/9113740?v=4',
      name: 'Lee',
      lastName: 'Robinson',
      email: 'rastreadito@gmail.com',
    },
    activity: 'transfer',
    icon: ArrowLeftRight,
    points: 12,
  },
  {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/3676859?v=4',
      name: 'Shu',
      lastName: 'Ding',
      email: 'rastreadito@gmail.com',
    },
    activity: 'redeem',
    icon: Gift,
    points: 12,
  },
  {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/1561955?v=4',
      name: 'Miguel',
      lastName: 'Ángel',
      email: 'rastreadito@gmail.com',
    },
    activity: 'add',
    icon: Plus,
    points: 12,
  },
  {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
      name: 'Shadcn',
      lastName: '',
      email: 'rastreadito@gmail.com',
    },
    activity: 'transfer',
    icon: ArrowLeftRight,
    points: 12,
  },
  {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/23662329?v=4',
      name: 'Rauno',
      lastName: 'Freiberg',
      email: 'rastreadito@gmail.com',
    },
    activity: 'redeem',
    icon: Gift,
    points: 12,
  },
  {
    user: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/13041?v=4',
      name: 'Guillermo',
      lastName: 'Rauch',
      email: 'rastreadito@gmail.com',
    },
    activity: 'redeem',
    icon: Gift,
    points: 12,
  },
]

interface Props {
  className?: string
}

export default function UsersActivity({ className }: Props) {
  return (
    <div className={clsx('rounded-xl border bg-white px-5 py-4', className)}>
      {/* HEADER */}
      <div className='mb-6 space-y-[2px]'>
        <h1 className='text-base font-semibold'>Actividad de usuarios</h1>
        <p className='text-xs font-medium text-grayTextLight selection:bg-gray'>
          Ultimas actividades de tus clientes
        </p>
      </div>

      {/* BODY */}
      <div className='space-y-4'>
        {data.map((item, index) => {
          const avatarFallback = item.user.name.charAt(0) + item.user.lastName.charAt(0)
          return (
            <div key={index}>
              <div className='flex justify-between'>
                <div className='flex items-center gap-2 overflow-hidden'>
                  <Avatar>
                    <AvatarImage
                      src={item.user.avatarUrl}
                      alt={item.user.name}
                    />
                    <AvatarFallback>
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col justify-center truncate'>
                    <h1 className='truncate text-xs font-semibold'>
                      {item.user.name} {item.user.lastName.split(' ').shift()}
                    </h1>
                    <span className='truncate text-xs font-medium text-grayText'>
                      {item.user.email}
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-1'>
                  <item.icon
                    className={clsx('size-4', {
                      'text-violet': item.activity === 'add',
                      'text-blue': item.activity === 'transfer',
                      'text-primary': item.activity === 'redeem',
                    })}
                  />

                  <Button
                    className={
                      clsx('h-5 min-w-[70px] rounded-full border p-0 px-2 text-xs font-semibold', {
                        'border-violet bg-violet/10 text-violet': item.activity === 'add',
                        'border-blue bg-blue/10 text-blue': item.activity === 'transfer',
                        'border-primary bg-primary/10 text-primary': item.activity === 'redeem',
                      })
                    }
                    variant='outline'
                  >
                    {item.activity === 'redeem'
                      ? 'Canje'
                      : <>{item.points} puntos</>}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* SEE MORE */}
      <Link
        href=''
        className={
          clsx(
            'mt-8',
            '-mx-2 h-6 gap-[4px] py-[3px] pl-[8px] pr-[4px] text-sm !text-violet selection:bg-violet selection:text-white hover:bg-violet/5',
            buttonVariants({ variant: 'ghost' })
          )
        }
      >
        Ver todas las actividades
        <ChevronRight className='size-4' />
      </Link>
    </div>
  )
}

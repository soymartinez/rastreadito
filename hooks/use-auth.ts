'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@prisma/client'

type Auth = {
  signInStore: (id: string) => Promise<void>;
  signOut: () => void;
  error: string | null
  user?: User | null;
  isLoading: boolean;
}

export const useAuth = create(
  persist<Auth>(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,
      signInStore: async (id: string) => {
        set({ isLoading: true })
        try {
          const res = await fetch(`/api/users/${id}`)
          const data = await res.json()

          console.log(data)

          if (res.ok) {
            set({ user: data, error: null })
          } else {
            set({ error: data.error })
          }
        } catch (error) {
          set({ error: 'Ocurrió un error al obtener los datos del usuario.' })
        } finally {
          set({ isLoading: false })
        }
      },
      signOut: () => set({
        user: null,
      })
    }),
    {
      name: 'user',
    }
  )
)

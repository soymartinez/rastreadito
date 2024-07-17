import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { customAlphabet } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ramdomId(defaultSize: number = 12) {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(alphabet, defaultSize)
  return nanoid()
}

// URL FOR `redirectTo`
export function getUrl() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  // url = url.endsWith('/') ? url : `${url}/`
  return url
}
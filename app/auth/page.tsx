'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import Link from 'next/link'
import { useSupabase } from '@/components/supabase-provider'

interface Props {
    name?: string
    email: string
    password: string
}

export default function Auth() {
    const { supabase } = useSupabase()
    const { push } = useRouter()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const form = Object.fromEntries(formData.entries()) as object as Props

        const { error } = await supabase.auth.signUp(
            {
                email: form.email,
                password: form.password,
                options: {
                    data: {
                        name: form.name,
                    }
                }
            }
        )

        if (error) console.log(error)

        push('/')
    }
    return (
        <section className='flex items-center justify-center min-h-screen px-2 py-16'>
            <Tabs defaultValue='login' className='w-full max-w-md'>
                <TabsContent value='login'>
                    <h1 className='text-3xl leading-normal font-semibold text-center'>Bienvenido</h1>
                    <h3 className='text-_grayText font-semibold text-center'>Por favor ingrese sus datos</h3>
                </TabsContent>
                <TabsContent value='signup'>
                    <h1 className='text-3xl leading-normal font-semibold text-center'>Crear una cuenta</h1>
                    <h3 className='text-_grayText font-semibold text-center'>Por favor ingrese sus datos</h3>
                </TabsContent>
                <TabsList className='inline-flex w-full mt-7 bg-_primary p-1'>
                    <TabsTrigger
                        value='login'
                        className='w-full data-[state=active]:bg-_white dark:data-[state=active]:bg-_dark font-semibold data-[state=active]:text-_dark dark:data-[state=active]:text-_white text-_dark/50 dark:text-_dark/70'>
                        Iniciar sesión
                    </TabsTrigger>
                    <TabsTrigger
                        value='signup'
                        className='w-full data-[state=active]:bg-_white dark:data-[state=active]:bg-_dark font-semibold data-[state=active]:text-_dark dark:data-[state=active]:text-_white text-_dark/50 dark:text-_dark/70'>
                        Registrarse
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                    <form className='grid gap-4 mt-10'>
                        <Input placeholder='bee@example.com' type={'email'} icon={'email'} labelText='Correo electrónico' autoComplete='off' required />
                        <Link href={'/'} className='rounded-2xl'>
                            <Button className='w-full'>Continuar</Button>
                        </Link>
                    </form>
                </TabsContent>
                <TabsContent value='signup'>
                    <form onSubmit={handleSignUp} className='grid gap-4 mt-10'>
                        <Input name='name' placeholder='bee' labelText='Nombre' autoComplete='off' required />
                        <Input name='email' placeholder='bee@example.com' type={'email'} labelText='Correo electrónico' autoComplete='off' required />
                        <Input name='password' placeholder='••••••••' type={'password'} labelText='Contraseña' required />
                        <Button type='submit' className='w-full'>Continuar</Button>
                    </form>
                </TabsContent>
                <section>
                    <div className='flex items-center gap-6 my-8'>
                        <div className='bg-_primary w-full h-px rounded-full' />
                        <span className='text-_grayText font-medium whitespace-nowrap'>O Continúa con</span>
                        <div className='bg-_primary w-full h-px rounded-full' />
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <button className='flex justify-center items-center w-12 h-12 rounded-full bg-_gray hover:opacity-80 dark:hover:opacity-90 transition-all'>
                            <svg width={16} height={17} viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <mask id='mask0_42_69' maskUnits='userSpaceOnUse' x='0' y='0' width='16' height='17'>
                                    <path d='M15.9034 0H0V17H15.9034V0Z' fill='white' />
                                </mask>
                                <g mask='url(#mask0_42_69)'>
                                    <path d='M15.9034 8.69519C15.9034 8.11738 15.8587 7.53646 15.7633 6.96802H8.11119V10.2412H12.4932C12.3113 11.2969 11.7271 12.2308 10.8716 12.8241V14.9479H13.4859C15.0211 13.4675 15.9034 11.2813 15.9034 8.69519Z' fill='#4285F4' />
                                    <path d='M8.11119 17.0001C10.2992 17.0001 12.1444 16.2474 13.4888 14.9481L10.8745 12.8243C10.1472 13.3428 9.20818 13.6364 8.11416 13.6364C5.99769 13.6364 4.20315 12.1402 3.55927 10.1289H0.861496V12.3183C2.2387 15.1887 5.04379 17.0001 8.11119 17.0001Z' fill='#34A853' />
                                    <path d='M3.55628 10.1289C3.21645 9.07327 3.21645 7.93015 3.55628 6.87448V4.68506H0.8615C-0.28915 7.08686 -0.28915 9.91655 0.8615 12.3183L3.55628 10.1289Z' fill='#FBBC04' />
                                    <path d='M8.11119 3.36385C9.2678 3.34512 10.3857 3.80111 11.2233 4.63816L13.5395 2.21136C12.0729 0.768411 10.1263 -0.0249017 8.11119 8.45217e-05C5.04377 8.45217e-05 2.2387 1.81159 0.861496 4.685L3.55628 6.87442C4.19718 4.8599 5.9947 3.36385 8.11119 3.36385Z' fill='#EA4335' />
                                </g>
                            </svg>
                        </button>
                        <button className='flex justify-center items-center w-12 h-12 rounded-full bg-_dark dark:bg-_darkText hover:opacity-95 dark:hover:opacity-80 transition-all'>
                            <svg width={16} height={18} viewBox='0 0 16 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <mask id='mask0_42_67' maskUnits='userSpaceOnUse' x='0' y='0' width='16' height='18'>
                                    <path d='M15.3335 0H0V18H15.3335V0Z' fill='white' />
                                </mask>
                                <g mask='url(#mask0_42_67)'>
                                    <path d='M12.784 17.2801C11.7969 18.2268 10.7079 18.0793 9.66992 17.6328C8.56635 17.1774 7.55747 17.1487 6.39198 17.6328C4.94058 18.2521 4.17027 18.0721 3.29615 17.2801C-1.63897 12.2581 -0.910539 4.60807 4.69838 4.32007C6.05872 4.39207 7.01115 5.06347 7.81242 5.11927C9.00341 4.87987 10.1434 4.19407 11.4182 4.28407C12.9496 4.40647 14.0951 5.00407 14.86 6.07867C11.7095 7.95067 12.4562 12.0547 15.3499 13.2067C14.7707 14.7097 14.0277 16.1947 12.7822 17.2927L12.784 17.2801ZM7.70316 4.26607C7.55565 2.03407 9.38583 0.198066 11.491 0.0180664C11.7805 2.59207 9.1236 4.51807 7.70316 4.26607Z' fill='white' />
                                </g>
                            </svg>

                        </button>
                    </div>
                </section>
            </Tabs>
        </section>
    )
}

import { SignIn, SignInWhitGoogle, SignUp } from '@/components/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

export default async function Auth() {
    return (
        <section className='flex items-center justify-center min-h-screen px-4 py-16'>
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
                    <SignIn />
                </TabsContent>
                <TabsContent value='signup'>
                    <SignUp />
                </TabsContent>
                <section>
                    <div className='flex items-center gap-6 my-8'>
                        <div className='bg-_primary w-full h-px rounded-full' />
                        <span className='text-_grayText font-medium whitespace-nowrap'>O Continúa con</span>
                        <div className='bg-_primary w-full h-px rounded-full' />
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <SignInWhitGoogle />
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

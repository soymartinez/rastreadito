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
                    </div>
                </section>
            </Tabs>
        </section>
    )
}

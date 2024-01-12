import { SignIn, SignInWhitGoogle, SignUp } from '@/components/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function Auth() {
  return (
    <section className='flex min-h-screen items-center justify-center px-4 py-16'>
      <Tabs defaultValue='login' className='w-full max-w-md'>
        <TabsContent value='login'>
          <h1 className='text-center text-3xl font-semibold leading-normal'>Bienvenido</h1>
          <h3 className='text-center font-semibold text-_grayText'>Por favor ingrese sus datos</h3>
        </TabsContent>
        <TabsContent value='signup'>
          <h1 className='text-center text-3xl font-semibold leading-normal'>Crear una cuenta</h1>
          <h3 className='text-center font-semibold text-_grayText'>Por favor ingrese sus datos</h3>
        </TabsContent>
        <TabsList className='mt-7 inline-flex w-full bg-_primary p-1'>
          <TabsTrigger
            value='login'
            className='w-full font-semibold text-_dark/50 data-[state=active]:bg-_white data-[state=active]:text-_dark dark:text-_dark/70 dark:data-[state=active]:bg-_dark dark:data-[state=active]:text-_white'>
                        Iniciar sesión
          </TabsTrigger>
          <TabsTrigger
            value='signup'
            className='w-full font-semibold text-_dark/50 data-[state=active]:bg-_white data-[state=active]:text-_dark dark:text-_dark/70 dark:data-[state=active]:bg-_dark dark:data-[state=active]:text-_white'>
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
          <div className='my-8 flex items-center gap-6'>
            <div className='h-px w-full rounded-full bg-_primary' />
            <span className='whitespace-nowrap font-medium text-_grayText'>O Continúa con</span>
            <div className='h-px w-full rounded-full bg-_primary' />
          </div>
          <div className='flex items-center justify-center gap-4'>
            <SignInWhitGoogle />
          </div>
        </section>
      </Tabs>
    </section>
  )
}

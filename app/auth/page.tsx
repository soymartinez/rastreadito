import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

export default function Auth() {
    return (
        <section className='flex flex-col items-center px-2'>
            <h1 className='text-_dark text-3xl font-semibold'>Bienvenido</h1>
            <span className='text-_grayText font-semibold'>Por favor ingrese sus datos</span>
            <Tabs defaultValue='login' className='w-full max-w-md mt-7'>
                <TabsList className='w-full'>
                    <TabsTrigger value='login' className='w-full'>Iniciar sesión</TabsTrigger>
                    <TabsTrigger value='signup' className='w-full'>Registrarse</TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                    <div className='grid gap-4'>
                        <Input placeholder='qr@example.com' icon='email' labelText='Correo electrónico' />
                        <Button>Save changes</Button>
                    </div>
                </TabsContent>
                <TabsContent value='signup'>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                        Change your password here. After saving, you'll be logged out.
                    </p>
                    <div className='grid gap-2 py-4'>
                        <div className='space-y-1'>
                            <Label htmlFor='current'>Current password</Label>
                            <Input id='current' type='password' />
                        </div>
                        <div className='space-y-1'>
                            <Label htmlFor='new'>New password</Label>
                            <Input id='new' type='password' />
                        </div>
                    </div>
                    <div className='flex'>
                        <Button>Save password</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    )
}

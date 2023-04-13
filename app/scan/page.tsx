'use client'

import { Back } from '@/ui/back'
import { useRouter } from 'next/navigation'
import { QrReader } from 'react-qr-reader'
import Balancer from 'react-wrap-balancer'
import { toast } from 'sonner'

export default function Scan() {
    const router = useRouter()

    const handleScan = (result: string | null) => {
        if (!result?.startsWith(process.env.VERCEL_URL as string)) {
            toast.error('QR no válido', {
                style: {
                    background: '#F87171',
                }
            })
            return
        }

        router.push(result)
    }

    const corner = {
        start: 'calc((100% - 230px) / 2)',
        end: 'calc(((100% - 230px) / 2) + 230px)',
    }

    return (
        <>
            <main className='px-4 overflow-hidden h-screen relative'>
                <div className='absolute inset-x-0 px-4 max-w-7xl mx-auto'>
                    <div className='flex justify-center items-center py-8 relative text-_white'>
                        <Back className='absolute left-0 text-_white' />
                        <h1 className='font-bold text-xl'>Escanear</h1>
                    </div>
                </div>
                <div id='clip-path' className='absolute inset-0 -z-20 bg-_dark/50 backdrop-blur-sm' />
                <div className='absolute inset-0 -z-10 flex items-center justify-center'>
                    <div className='border-corner relative w-60 h-60'>
                        <span className='border_bottom' />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center h-full space-y-[380px]'>
                    <Balancer className='text-center'>
                        <h1 className='text-_white font-bold text-4xl'>Escanea</h1>
                        <p className='text-_grayTextLight text font-medium'>Encuéntralo en la parte inferior de tu producto</p>
                    </Balancer>
                    <div />
                </div>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            handleScan(result?.getText())
                        }

                        if (!!error) {
                            console.info(error)
                        }
                    }}
                    className='absolute inset-0 -z-30'
                    videoContainerStyle={{
                        padding: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    videoStyle={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    constraints={{
                        facingMode: 'environment',
                    }}
                />

            </main>
            <style jsx>{`
                    #clip-path {
                        clip-path: polygon(
                            0% 0%, 
                            0% 100%, 
                            ${corner.start} 100%, 
                            ${corner.start} ${corner.start}, 
                            ${corner.end} ${corner.start}, 
                            ${corner.end} ${corner.end}, 
                            ${corner.start} ${corner.end}, 
                            ${corner.start} 100%, 
                            100% 100%, 
                            100% 0%);
                    }

                    .border-corner:before {
                        display: block;
                        content: '';
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-top: 8px solid #00E99E;
                        border-left: 8px solid #00E99E;
                        border-radius: 15px 0;
                    }

                    .border-corner:after {
                        display: block;
                        content: '';
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        border-top: 8px solid #00E99E;
                        border-right: 8px solid #00E99E;
                        border-radius: 0 15px;
                    }

                    .border-corner span.border_bottom:before {
                        display: block;
                        content: '';
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        border-bottom: 8px solid #00E99E;
                        border-left: 8px solid #00E99E;
                        border-radius: 0 15px;
                    }

                    .border-corner span.border_bottom:after {
                        display: block;
                        content: '';
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        border-bottom: 8px solid #00E99E;
                        border-right: 8px solid #00E99E;
                        border-radius: 15px 0;
                    }
            `}</style>
        </>
    )
}

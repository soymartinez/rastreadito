'use client'

import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import Balancer from 'react-wrap-balancer'

export default function Scan() {
    const [data, setData] = useState('')
    return (
        <>
            <main className='flex flex-col justify-center items-center gap-10 h-screen px-4 bg-_dark/80'>
                <Balancer className='text-center'>
                    <h1 className='text-_white font-bold text-4xl'>Escanea</h1>
                    <p className='text-_grayTextLight text font-medium'>Encuéntralo en la parte inferior de tu producto</p>
                </Balancer>
                <div className='border-corner p-5 relative mx-auto rounded-xl bg-cover w-60 h-60 flex'>
                    <span className='border_bottom'>
                        <QrReader
                            onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.getText())
                                }

                                if (!!error) {
                                    console.info(error)
                                }
                            }}
                            className='w-full'
                            videoContainerStyle={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                inset: 0,
                                zIndex: -1,
                            }}
                            constraints={{}}
                        />
                    </span>
                </div>
                <Balancer ratio={0} className='text-_grayTextLight font-bold text-lg truncate'>
                    <a href={data} target='_blank' rel='noreferrer' className='hover:underline decoration-_primary'>
                        {data}
                    </a>
                </Balancer>
            </main>
            <style jsx>{`
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

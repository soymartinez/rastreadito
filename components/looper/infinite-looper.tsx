'use client'

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'

interface InfiniteLooperProps {
    speed: number
    direction: 'right' | 'left'
    children: React.ReactNode
}

export function InfiniteLooper({ speed, direction, children }: InfiniteLooperProps) {
    const [looperInstances, setLooperInstances] = useState(1)
    const outerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    function resetAnimation() {
        if (innerRef?.current) {
            innerRef.current.setAttribute('data-animate', 'false')

            setTimeout(() => {
                if (innerRef?.current) {
                    innerRef.current.setAttribute('data-animate', 'true')
                }
            }, 50)
        }
    }

    const setupInstances = useCallback(() => {
        if (!innerRef?.current || !outerRef?.current) return

        const { width } = innerRef.current.getBoundingClientRect()

        const { width: parentWidth } = outerRef.current.getBoundingClientRect()

        const widthDeficit = parentWidth - width
        const instanceWidth = width / innerRef.current.children.length

        if (widthDeficit) {
            setLooperInstances(looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1)
        }

        resetAnimation()
    }, [looperInstances])

    useEffect(() => setupInstances(), [setupInstances])
    useEffect(() => {
        window.addEventListener('resize', setupInstances)

        return () => {
            window.removeEventListener('resize', setupInstances)
        }
    }, [looperInstances, setupInstances])

    return (
        <div className='looper' ref={outerRef}>
            <div className='looper_list' ref={innerRef} data-animate='true'>
                {[...Array(looperInstances)].map((_, ind) => (
                    <div
                        key={ind}
                        className='looper_list_instance'
                        style={{
                            animationDuration: `${speed}s`,
                            animationDirection: direction === 'right' ? 'reverse' : 'normal',
                        }}
                    >
                        {children}
                    </div>
                ))}
            </div>
        </div>
    )
}
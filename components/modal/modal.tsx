import { motion, Variants, PanInfo } from 'framer-motion'
import { useRef } from 'react'

type Props = {
    onClose: () => void
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants: Variants = {
  hidden: {
    y: 1000,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
}

export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: Props['onClose'] }) {
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 200) {
      onClose()
    }
  }

  const constraintsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <motion.div
        className='fixed inset-0 z-50 h-screen w-full bg-dark/80 backdrop-blur-sm'
        initial='hidden'
        animate='visible'
        exit='hidden'
        onClick={() => onClose()}
        variants={overlayVariants}
      />
      <motion.div
        className='fixed inset-x-0 top-[20%] z-50 min-h-min min-w-min cursor-grab select-none rounded-t-[50px] shadow-sm active:cursor-grabbing'
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={panelVariants}
        style={{ height: 'calc(100vh - 100vh * .2)' }}
        drag='y'
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
      >
        <div className='mx-auto my-2 h-[10px] w-24 rounded-full bg-white dark:bg-darkText' />
        <motion.div
          ref={constraintsRef}
          style={{ height: 'calc(100% - 26px)' }}
          className='relative overflow-hidden rounded-t-[50px] bg-white dark:bg-darkText'>
          <motion.div
            className='absolute inset-x-0 rounded-t-[50px]'
            drag='y'
            dragConstraints={constraintsRef}
            dragElastic={0.8}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

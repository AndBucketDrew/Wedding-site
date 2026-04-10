import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
  amount?: number
}

const directionMap: Record<NonNullable<FadeInProps['direction']>, object> = {
  up:    { y: 30 },
  down:  { y: -30 },
  left:  { x: 30 },
  right: { x: -30 },
  none:  {},
}

export function FadeIn({
  children,
  delay     = 0,
  direction = 'up',
  className,
  once      = true,
  amount    = 0.15,
}: FadeInProps) {
  const initial: Variants['hidden'] = {
    opacity: 0,
    ...directionMap[direction],
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

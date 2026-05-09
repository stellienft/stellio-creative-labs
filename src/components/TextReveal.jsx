import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.3 })

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={isInView ? { y: 0 } : { y: '110%' }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </Tag>
  )
}

import React from 'react'
import { motion } from 'framer-motion'

const logos = [
  { name: 'greenfunding', src: '/logo-greenfunding.png', alt: 'greenfunding' },
  { name: 'PropCheck', src: '/logo-propcheck.png', alt: 'PropCheck' },
  { name: 'HauOS', src: '/logo-hauos.png', alt: 'HauOS' },
  { name: 'BLNDL', src: '/logo-blndl.png', alt: 'BLNDL' },
  { name: 'Remotely', src: '/logo-remotely.png', alt: 'Remotely' },
  { name: 'ARBISAN', src: '/logo-arbisan.png', alt: 'ARBISAN' },
]

export default function LogoCarousel() {
  const doubled = [...logos, ...logos, ...logos]

  return (
    <section className="py-16 overflow-hidden border-y border-white/[0.04]">
      <p className="text-[0.8rem] text-[#71717A] uppercase tracking-[0.12em] mb-10 text-center">
        Trusted by ambitious teams
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-24 whitespace-nowrap"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {doubled.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-20 w-auto object-contain"
                loading="lazy"
              />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

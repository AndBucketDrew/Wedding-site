import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

interface HeroProps {
  image?:    string
  eyebrow?:  string
  title:     string
  subtitle?: string
  ctaLabel?: string
  ctaTo?:    string
  fullScreen?: boolean
}

export function Hero({
  image     = 'https://picsum.photos/seed/dzejlan-hero/1920/1080',
  eyebrow   = 'Photography & Film',
  title     = 'Every Frame\nTells a Story',
  subtitle  = 'We craft cinematic memories that last a lifetime.',
  ctaLabel  = 'View Portfolio',
  ctaTo     = '/posts',
  fullScreen = true,
}: HeroProps) {
  return (
    <section
      className={`relative w-full ${fullScreen ? 'h-screen' : 'h-[70vh]'} flex items-center justify-center overflow-hidden`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 overlay-hero" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A96E] block mb-6"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight whitespace-pre-line mb-6"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="font-sans text-base md:text-lg text-white/75 mb-10 max-w-md mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {ctaLabel && ctaTo && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.25em] uppercase border border-[#C9A96E] text-[#C9A96E] px-9 py-4 hover:bg-[#C9A96E] hover:text-white transition-all duration-400"
            >
              {ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {fullScreen && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} />
        </motion.div>
      )}
    </section>
  )
}

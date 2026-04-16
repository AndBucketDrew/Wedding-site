import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSiteImages } from '@/hooks/useSiteImages'

export function ContactCTA() {
  const { t } = useTranslation()
  const { images } = useSiteImages()

  return (
    <section
      className="relative py-36 px-6 bg-[#111111] bg-cover bg-center overflow-hidden"
      style={images.cta ? { backgroundImage: `url(${images.cta})` } : undefined}
    >
      {images.cta && <div className="absolute inset-0 bg-[#111111]/80" />}

      <div className="relative z-10 max-w-3xl mx-auto text-center text-white flex flex-col gap-8 items-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A96E]"
        >
          {t('contactCTA.eyebrow')}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-4xl md:text-6xl font-bold leading-tight"
        >
          {t('contactCTA.titleMain')}
          <br />
          <em className="not-italic text-[#C9A96E]">{t('contactCTA.titleHighlight')}</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sans text-white/70 text-base max-w-lg"
        >
          {t('contactCTA.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/contact"
            className="font-sans text-xs tracking-[0.25em] uppercase bg-[#C9A96E] text-white px-10 py-4 hover:bg-[#A8843E] transition-colors duration-300"
          >
            {t('contactCTA.contact')}
          </Link>
          <Link
            to="/posts"
            className="font-sans text-xs tracking-[0.25em] uppercase border border-white/40 text-white px-10 py-4 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
          >
            {t('contactCTA.gallery')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

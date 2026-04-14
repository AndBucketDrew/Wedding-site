import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function StatsBar() {
  const { t } = useTranslation()

  const stats = [
    { number: '30',   label: t('stats.experience') },
    { number: '300+', label: t('stats.weddings')   },
    { number: '15',    label: t('stats.delivery')   },
  ]

  return (
    <section className="bg-white py-8 md:py-14">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center divide-x divide-stone-200"
        >
          {stats.map(({ number, label }) => (
            <div key={label} className="flex-1 flex flex-col items-center text-center px-3 sm:px-8 gap-1 min-w-0">
              <span className="font-serif text-5xl md:text-6xl font-bold text-stone-900 leading-none">
                {number}
              </span>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mt-1 w-full text-center" style={{ textIndent: '0.2em' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

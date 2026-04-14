import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'

const SERVICE_SLUGS = ['niski-dim', 'vatromet', 'photobook', 'lazni-maticar'] as const

const SERVICE_ICONS: Record<string, JSX.Element> = {
  'niski-dim': (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M6 26c0-3.314 2.686-6 6-6 .35 0 .693.03 1.026.088C13.9 17.686 16.74 16 20 16c4.418 0 8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 30h28M8 33h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 12V8M14 13l-2-3M22 13l2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'vatromet': (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 28V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 18l-6-8M18 18l6-8M18 18l-9-3M18 18l9-3M18 18l-9 3M18 18l9 3M18 18l-6 8M18 18l6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="18" r="2" fill="currentColor"/>
      <path d="M18 32v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'photobook': (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="8" y="6" width="20" height="24" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 10h20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6v24" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 16h8M16 20h6M16 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'lazni-maticar': (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 16l2 2-2 2M26 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 22l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

export function Services() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">

        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_SLUGS.map((slug, i) => (
            <FadeIn key={slug} delay={i * 0.1}>
              <Link
                to={`/services/${slug}`}
                className="group flex flex-col h-full border border-[#E8E4DF] bg-[#F8F5F0] p-8 gap-6 hover:border-[#C9A96E] hover:shadow-md transition-all duration-300"
              >
                {/* Icon */}
                <div className="text-[#C9A96E]">
                  {SERVICE_ICONS[slug]}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-serif text-xl text-[#111111]">
                    {t(`services.items.${slug}.title`)}
                  </h3>
                  <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                    {t(`services.items.${slug}.description`)}
                  </p>
                </div>

                {/* CTA arrow */}
                <div className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] group-hover:gap-3 transition-all duration-300">
                  {t('services.learnMore')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}

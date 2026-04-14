import { useParams, Navigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactCTA } from '@/components/sections/ContactCTA'

const VALID_SLUGS = ['niski-dim', 'vatromet', 'photobook', 'lazni-maticar']

export function Service() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  if (!slug || !VALID_SLUGS.includes(slug)) {
    return <Navigate to="/" replace />
  }

  const includes = t(`services.items.${slug}.includes`, { returnObjects: true }) as string[]

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-32 px-6 bg-[#F8F5F0]">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <FadeIn>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] hover:opacity-70 transition-opacity duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('services.title')}
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#C9A96E]">
              {t('services.eyebrow')}
            </span>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#111111] leading-tight">
              {t(`services.items.${slug}.title`)}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="divider-gold" />
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="font-sans text-lg text-[#6B6B6B] leading-relaxed max-w-2xl">
              {t(`services.items.${slug}.description`)}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Full description */}
          <FadeIn>
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-[#111111]">
                {t(`services.items.${slug}.title`)}
              </h2>
              <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
                {t(`services.items.${slug}.fullDescription`)}
              </p>
            </div>
          </FadeIn>

          {/* What's included */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-6">
              <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-[#C9A96E]">
                {t('services.eyebrow')}
              </h3>
              <ul className="flex flex-col gap-4">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-[#444444]">
                    <svg className="mt-0.5 shrink-0 text-[#C9A96E]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="self-start mt-4 font-sans text-xs tracking-[0.25em] uppercase border border-[#C9A96E] text-[#C9A96E] px-8 py-3 hover:bg-[#C9A96E] hover:text-white transition-all duration-300"
              >
                {t('contactCTA.contact')}
              </Link>
            </div>
          </FadeIn>

        </div>
      </section>

      <ContactCTA />
    </Layout>
  )
}

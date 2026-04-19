import { useParams, Navigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { useServiceImages } from '@/hooks/useServiceImages'
import type { ServiceSlug } from '@/types'

const VALID_SLUGS: ServiceSlug[] = ['niski-dim', 'vatromet', 'photobook', 'lazni-maticar']

export function Service() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { serviceImages } = useServiceImages()

  if (!slug || !VALID_SLUGS.includes(slug as ServiceSlug)) {
    return <Navigate to="/" replace />
  }

  const typedSlug = slug as ServiceSlug
  const includes = t(`services.items.${slug}.includes`, { returnObjects: true }) as string[]
  const { heroImage, galleryImages } = serviceImages[typedSlug]

  return (
    <Layout>
      {/* Hero */}
      <section className={`relative py-20 md:py-32 px-6 overflow-hidden ${heroImage ? 'min-h-[60vh] flex items-center' : 'bg-cream'}`}>
        {/* Background image + overlay */}
        {heroImage && (
          <>
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/55" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto flex flex-col gap-6 w-full">
          <FadeIn>
            <Link
              to="/"
              className={`inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase hover:opacity-70 transition-opacity duration-200 ${heroImage ? 'text-white/70' : 'text-gold'}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('services.title')}
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold">
              {t('services.eyebrow')}
            </span>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className={`font-serif text-5xl md:text-6xl font-bold leading-tight ${heroImage ? 'text-white' : 'text-charcoal'}`}>
              {t(`services.items.${slug}.title`)}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="divider-gold" />
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className={`font-sans text-lg leading-relaxed max-w-2xl ${heroImage ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
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
              <h2 className="font-serif text-2xl text-charcoal">
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
              <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-gold">
                {t('services.eyebrow')}
              </h3>
              <ul className="flex flex-col gap-4">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-[#444444]">
                    <svg className="mt-0.5 shrink-0 text-gold" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="self-start mt-4 font-sans text-xs tracking-[0.25em] uppercase border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-white transition-all duration-300"
              >
                {t('contactCTA.contact')}
              </Link>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="pb-16 md:pb-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {galleryImages.map((url, i) => (
                  <FadeIn key={url} delay={i * 0.05}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <ContactCTA />
    </Layout>
  )
}

import { useTranslation } from 'react-i18next'
import { FadeIn } from '@/components/ui/FadeIn'
import { Link } from 'react-router-dom'
import { useGallery } from '@/hooks/useGallery'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function GalleryShowcase() {
  const { t } = useTranslation()
  const { images, loading } = useGallery()

  return (
    <section id="about" className="py-12 md:py-28 px-6 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* ── Intro text ── */}
        <div className="w-full flex flex-col gap-6">
          <FadeIn>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#C9A96E]">
              {t('about.eyebrow')}
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              {t('about.titleMain')}<br />
              <em className="not-italic text-[#C9A96E]">{t('about.titleHighlight')}</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="divider-gold" />
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
              {t('about.text1')}<br /><br />
              {t('about.text2')}
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <Link
              to="/posts"
              className="self-start font-sans text-xs tracking-[0.25em] uppercase border border-[#C9A96E] text-[#C9A96E] px-8 py-3 hover:bg-[#C9A96E] hover:text-white transition-all duration-300"
            >
              {t('about.cta')}
            </Link>
          </FadeIn>
        </div>

        {/* ── Photo grid ── */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : images.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((image, i) => (
              <FadeIn key={image.id} delay={i * 0.07} className="break-inside-avoid">
                <div className="img-zoom overflow-hidden rounded-sm">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        ) : null}

      </div>
    </section>
  )
}

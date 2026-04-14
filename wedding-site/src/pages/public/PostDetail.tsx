import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { FadeIn } from '@/components/ui/FadeIn'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getPostBySlug } from '@/services/posts.service'
import type { Post } from '@/types'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'

const PLACEHOLDER: Post = {
  id: 'placeholder',
  slug: 'placeholder',
  title: 'Editorial Session',
  title_bs: 'Editorijalna sesija',
  description: 'A moody editorial shoot exploring light and shadow in an urban landscape.',
  description_bs: 'Atmosferično editorijalno snimanje koje istražuje svjetlo i sjenu u urbanom pejzažu.',
  content: `This session was born from a vision of contrasts — soft light against hard architecture, vulnerability amid the city's relentless movement.

We spent a morning exploring the industrial edges of the city, letting the available light guide each frame. The goal was never perfection, but presence.

The result is a series that feels alive — each image a quiet moment pulled from an otherwise rushing world.`,
  content_bs: `Ova sesija nastala je iz vizije kontrasta — meko svjetlo nasuprot tvrdoj arhitekturi, ranjivost usred neumornog gradskog kretanja.

Proveli smo jutro istražujući industrijske rubove grada, pustivši dostupno svjetlo da vodi svaki kadar. Cilj nikada nije bila savršenost, već prisutnost.

Rezultat je niz koji djeluje živo — svaka slika tihi trenutak izvučen iz inače užurbanog svijeta.`,
  coverImage: 'https://picsum.photos/seed/post-detail-hero/1920/900',
  images: [
    'https://picsum.photos/seed/gallery-1/800/1000',
    'https://picsum.photos/seed/gallery-2/800/600',
    'https://picsum.photos/seed/gallery-3/800/800',
    'https://picsum.photos/seed/gallery-4/800/600',
    'https://picsum.photos/seed/gallery-5/800/1200',
    'https://picsum.photos/seed/gallery-6/800/700',
  ],
  status: 'published',
  createdAt: null,
  updatedAt: null,
}

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { i18n } = useTranslation()
  const [post,       setPost]       = useState<Post | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [lightbox,   setLightbox]   = useState<number | null>(null)

  function localise(en: string, bs: string) {
    return i18n.language === 'bs' && bs ? bs : en
  }

  useEffect(() => {
    if (!slug) return
    getPostBySlug(slug)
      .then(p => setPost(p ?? PLACEHOLDER))
      .catch(() => setPost(PLACEHOLDER))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <Layout>
        <div className="pt-32"><LoadingSpinner /></div>
      </Layout>
    )
  }

  const p = post ?? PLACEHOLDER

  return (
    <Layout>
      {/* Hero image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={p.coverImage || `https://picsum.photos/seed/${slug}/1920/900`}
          alt={p.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 overlay-hero" />
        <div className="absolute bottom-12 left-0 right-0 text-center text-white px-6">
          <FadeIn>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold block mb-4">
              Photography
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">{localise(p.title, p.title_bs)}</h1>
          </FadeIn>
        </div>
      </div>

      {/* Content */}
      <article className="py-20 px-6 max-w-3xl mx-auto">
        <FadeIn>
          <p className="font-sans text-lg text-[#6B6B6B] leading-relaxed mb-10 italic">
            {localise(p.description, p.description_bs)}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="font-sans text-ink leading-loose space-y-6 whitespace-pre-line">
            {localise(p.content, p.content_bs)}
          </div>
        </FadeIn>

        {/* Back link */}
        <FadeIn delay={0.2} className="mt-16 pt-10 border-t border-mist">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:gap-4 transition-all"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </FadeIn>
      </article>

      {/* Photo gallery */}
      {p.images.length > 0 && (
        <section className="py-20 px-6 bg-cream">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold block mb-3">Gallery</span>
              <h2 className="font-serif text-3xl text-charcoal mb-10">Wedding Photos</h2>
            </FadeIn>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {p.images.map((src, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="block w-full overflow-hidden rounded-sm group cursor-zoom-in"
                  >
                    <img
                      src={src}
                      alt={`${p.title} — photo ${i + 1}`}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setLightbox(null) }}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={28} />
          </button>
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null && i > 0 ? i - 1 : p.images.length - 1) }}
            className="absolute left-5 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={p.images[lightbox]}
            alt={`${p.title} — photo ${lightbox + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
            onClick={e => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null && i < p.images.length - 1 ? i + 1 : 0) }}
            className="absolute right-5 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight size={36} />
          </button>
          <span className="absolute bottom-5 font-sans text-xs tracking-widest text-white/50">
            {lightbox + 1} / {p.images.length}
          </span>
        </div>
      )}
    </Layout>
  )
}

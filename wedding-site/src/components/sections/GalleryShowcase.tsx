import { FadeIn } from '@/components/ui/FadeIn'
import { Link } from 'react-router-dom'
import { useGallery } from '@/hooks/useGallery'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function GalleryShowcase() {
  const { images, loading } = useGallery()

  return (
    <section id="about" className="py-12 md:py-28 px-6 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* ── Intro text ── */}
        <div className="w-full flex flex-col gap-6">
          <FadeIn>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#C9A96E]">
              O nama
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              Momenti stvaraju<br />
              <em className="not-italic text-[#C9A96E]">Uspomene</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="divider-gold" />
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
              Halilagić Weddings je profesionalni svadbeni foto i video tim sa sjedištem u Bihaću, Bosna i Hercegovina, dostupan za vjenčanja širom Europe. Sa više od 30 godina iskustva i timom od više stručnjaka, specijalizirali smo se za stvaranje najljepših trenutaka vašeg dana na romantičan i poseban način, onako kako ih srce pamti.<br /><br />
              Svako vjenčanje nosi svoju jedinstvenu priču. Naš zadatak nije samo fotografisati, već osjetiti atmosferu, uhvatiti neizrečene emocije i pretvoriti ih u slike i filmove koji će vas vraćati u taj dan iznova i iznova.
              Ono što nudimo nije samo usluga,  to je iskustvo. Od prvih konsultacija do konačne isporuke materijala, brinemo o svakom detalju kako bi uspomene na vaš najvažniji dan bile savršene. Bez obzira da li planirate intimno vjenčanje ili veliku svečanost, naš tim je tu da ga učinimo nezaboravnim.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <Link
              to="/posts"
              className="self-start font-sans text-xs tracking-[0.25em] uppercase border border-[#C9A96E] text-[#C9A96E] px-8 py-3 hover:bg-[#C9A96E] hover:text-white transition-all duration-300"
            >
              Pregledajte našu galeriju
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

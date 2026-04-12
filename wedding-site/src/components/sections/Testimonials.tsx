import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useTestimonials } from '@/hooks/useTestimonials'

export function Testimonials() {
  const { testimonials, loading } = useTestimonials()

  return (
    <section className="py-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionHeading
          eyebrow="Recenzije"
          title="Iskustva naših klijenata"
        />

        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : testimonials.length === 0 ? null : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.12}>
                <div className="bg-white p-8 flex flex-col gap-6 h-full">
                  <span className="font-serif text-5xl text-gold leading-none select-none">&ldquo;</span>

                  <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed flex-1 -mt-4">
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-mist">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                        <span className="font-sans text-sm font-semibold text-gold">
                          {t.name[0]?.toUpperCase() ?? '?'}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-sans text-sm font-semibold text-charcoal">{t.name}</p>
                      <p className="font-sans text-xs text-gold tracking-wide">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

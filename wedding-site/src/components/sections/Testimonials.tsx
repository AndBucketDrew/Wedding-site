import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Testimonial } from '@/types'

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sophie & James',
    role: 'Wedding Clients',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    quote:
      'Dzejlan captured our wedding day beyond anything we imagined. Every photo feels like a painting — emotional, luminous, and timeless.',
  },
  {
    id: '2',
    name: 'Marta Kowalski',
    role: 'Editorial Client',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    quote:
      'The portrait series they created for our campaign was breathtaking. The team has a rare ability to find the soul in a moment.',
  },
  {
    id: '3',
    name: 'Lena & Artan',
    role: 'Engagement Session',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
    quote:
      'We barely noticed the camera — they made us feel so comfortable. The results are pure magic. We will treasure these forever.',
  },
]

export function Testimonials() {
  return (
    <section className="py-28 px-6 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionHeading
          eyebrow="Recenzije"
          title="Iskustva naših klijenata"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.12}>
              <div className="bg-white p-8 flex flex-col gap-6 h-full">
                {/* Quote mark */}
                <span className="font-serif text-5xl text-[#C9A96E] leading-none select-none">&ldquo;</span>

                <p className="font-sans text-[#6B6B6B] text-sm leading-relaxed flex-1 -mt-4">
                  {t.quote}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-[#E8E4DF]">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-sans text-sm font-semibold text-[#111111]">{t.name}</p>
                    <p className="font-sans text-xs text-[#C9A96E] tracking-wide">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

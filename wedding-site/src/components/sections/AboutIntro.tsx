import { FadeIn } from '@/components/ui/FadeIn'
import { Link } from 'react-router-dom'

export function AboutIntro() {
  return (
    <section id="about" className="py-28 px-6 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto">
        {/* Text */}
        <div className="flex flex-col gap-6 max-w-2xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#C9A96E]">
              About the Studio
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              Moments Made<br />
              <em className="not-italic text-[#C9A96E]">Timeless</em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <span className="divider-gold" />
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
              We are a boutique photography and film studio dedicated to the art of visual storytelling.
              Each session is crafted with intentional light, emotion, and composition — resulting
              in imagery that feels as alive ten years from now as it does today.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
              Based in the heart of the city, we work with clients across weddings, portraits,
              editorial, and commercial projects.
            </p>
          </FadeIn>

          <FadeIn delay={0.55}>
            <Link
              to="/contact"
              className="self-start font-sans text-xs tracking-[0.25em] uppercase border border-[#C9A96E] text-[#C9A96E] px-8 py-3 hover:bg-[#C9A96E] hover:text-white transition-all duration-300 mt-2"
            >
              Work With Us
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

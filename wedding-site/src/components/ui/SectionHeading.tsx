import { FadeIn } from './FadeIn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const textColor  = light ? 'text-white' : 'text-[#111111]'
  const subColor   = light ? 'text-white/70' : 'text-[#9C9C9C]'

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <FadeIn>
          <span
            className={`font-sans text-xs tracking-[0.25em] uppercase font-medium text-[#C9A96E]`}
          >
            {eyebrow}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2 className={`font-serif text-4xl md:text-5xl font-bold leading-tight ${textColor}`}>
          {title}
        </h2>
      </FadeIn>
      {eyebrow && (
        <FadeIn delay={0.15}>
          <span className="divider-gold" />
        </FadeIn>
      )}
      {subtitle && (
        <FadeIn delay={0.2}>
          <p className={`font-sans text-base md:text-lg max-w-xl leading-relaxed ${subColor}`}>
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  )
}

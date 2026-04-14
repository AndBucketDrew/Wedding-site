import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'

const REGIONS = [
  { value: 'region-1' },
  { value: 'region-2' },
  { value: 'region-3' },
] as const

type RegionValue = (typeof REGIONS)[number]['value']

interface PackageData {
  name: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
}

export function Packages() {
  const { t } = useTranslation()
  const [region, setRegion] = useState<RegionValue>('region-1')

  const packages = t(`packages.data.${region}`, { returnObjects: true }) as PackageData[]

  const gridClass =
    packages.length === 3
      ? 'grid md:grid-cols-3 gap-6'
      : 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6'

  return (
    <section className="py-12 md:py-28 px-6 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">

        {/* Heading + region selector */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-0 md:justify-between">
          <SectionHeading
            eyebrow={t('packages.eyebrow')}
            title={t('packages.title')}
            subtitle={t('packages.subtitle')}
          />

          <FadeIn delay={0.2} className="shrink-0">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="region-select"
                className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C9A96E]"
              >
                {t('packages.regionLabel')}
              </label>
              <div className="relative">
                <select
                  id="region-select"
                  value={region}
                  onChange={e => setRegion(e.target.value as RegionValue)}
                  className="
                    appearance-none w-56 bg-white border border-[#C9A96E]
                    font-sans text-sm text-[#111111] px-4 py-3 pr-10
                    focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40
                    cursor-pointer transition-colors duration-200
                    hover:border-[#A8843E]
                  "
                >
                  {REGIONS.map(r => (
                    <option key={r.value} value={r.value}>
                      {t(`packages.regions.${r.value}`)}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A96E]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Package cards */}
        <div className={gridClass}>
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1}>
              <div
                className={`
                  relative flex flex-col h-full border transition-shadow duration-300
                  ${pkg.highlight
                    ? 'border-[#C9A96E] bg-white shadow-lg shadow-[#C9A96E]/10'
                    : 'border-[#E8E4DF] bg-white hover:border-[#C9A96E]/50 hover:shadow-md'}
                `}
              >
                {pkg.highlight && (
                  <div className="bg-[#C9A96E] text-white font-sans text-[10px] tracking-[0.2em] uppercase text-center py-1.5">
                    {t('packages.mostPopular')}
                  </div>
                )}

                <div className="flex flex-col flex-1 p-8 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-2xl text-[#111111]">{pkg.name}</span>
                    <span className="font-sans text-3xl font-semibold text-[#C9A96E]">{pkg.price}</span>
                    <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{pkg.description}</p>
                  </div>

                  <span className="divider-gold" />

                  <ul className="flex flex-col gap-3 flex-1">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-3 font-sans text-sm text-[#444444]">
                        <svg className="mt-0.5 shrink-0 text-[#C9A96E]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`
                      mt-4 text-center font-sans text-xs tracking-[0.25em] uppercase px-6 py-3 transition-all duration-300
                      ${pkg.highlight
                        ? 'bg-[#C9A96E] text-white hover:bg-[#A8843E]'
                        : 'border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white'}
                    `}
                  >
                    {t('packages.bookNow')}
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}

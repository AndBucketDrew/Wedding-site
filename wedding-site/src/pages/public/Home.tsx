import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { GalleryShowcase } from '@/components/sections/GalleryShowcase'
import { StatsBar } from '@/components/sections/StatsBar'
import { FeaturedPosts } from '@/components/sections/FeaturedPosts'
import { Testimonials } from '@/components/sections/Testimonials'
import { Packages } from '@/components/sections/Packages'
import { ContactCTA } from '@/components/sections/ContactCTA'

export function Home() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Hero
        image="https://picsum.photos/seed/dzejlan-hero/1920/1080"
        eyebrow={t('home.eyebrow')}
        title={t('home.title')}
        subtitle={t('home.subtitle')}
        ctaLabel={t('home.cta')}
        ctaTo="/posts"
      />
      <StatsBar />
      <GalleryShowcase />
      <FeaturedPosts />
      <Packages />
      <Testimonials />
      <ContactCTA />
    </Layout>
  )
}

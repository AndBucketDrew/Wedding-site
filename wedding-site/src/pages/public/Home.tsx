import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { GalleryShowcase } from '@/components/sections/GalleryShowcase'
import { StatsBar } from '@/components/sections/StatsBar'
import { Services } from '@/components/sections/Services'
import { FeaturedPosts } from '@/components/sections/FeaturedPosts'
import { Testimonials } from '@/components/sections/Testimonials'
import { Packages } from '@/components/sections/Packages'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { useSiteImages } from '@/hooks/useSiteImages'

export function Home() {
  const { t } = useTranslation()
  const { images } = useSiteImages()

  return (
    <Layout>
      <Hero
        image={images.heroHome}
        eyebrow={t('home.eyebrow')}
        title={t('home.title')}
        subtitle={t('home.subtitle')}
        ctaLabel={t('home.cta')}
        ctaTo="/posts"
      />
      <StatsBar />
      <GalleryShowcase />
      <Services />
      <FeaturedPosts />
      <Packages />
      <Testimonials />
      <ContactCTA />
    </Layout>
  )
}

import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { GalleryShowcase } from '@/components/sections/GalleryShowcase'
import { StatsBar } from '@/components/sections/StatsBar'
import { FeaturedPosts } from '@/components/sections/FeaturedPosts'
import { Testimonials } from '@/components/sections/Testimonials'
import { Packages } from '@/components/sections/Packages'
import { ContactCTA } from '@/components/sections/ContactCTA'

export function Home() {
  return (
    <Layout>
      <Hero
        image="https://picsum.photos/seed/dzejlan-hero/1920/1080"
        eyebrow="HALILAGIĆ WEDDINGS"
        title={'Vaša priča\nNaša fotografija'}
        subtitle="Stvaramo filmske uspomene koje traju cijeli život."
        ctaLabel="Galerija"
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

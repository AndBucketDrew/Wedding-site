import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { AboutIntro } from '@/components/sections/AboutIntro'
import { FeaturedPosts } from '@/components/sections/FeaturedPosts'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'

export function Home() {
  return (
    <Layout>
      <Hero
        image="https://picsum.photos/seed/dzejlan-hero/1920/1080"
        eyebrow="Photography & Film Studio"
        title={'Every Frame\nTells a Story'}
        subtitle="We craft cinematic memories that last a lifetime."
        ctaLabel="View Portfolio"
        ctaTo="/posts"
      />
      <AboutIntro />
      <FeaturedPosts />
      <Testimonials />
      <ContactCTA />
    </Layout>
  )
}

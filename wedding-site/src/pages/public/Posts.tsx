import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { FadeIn } from '@/components/ui/FadeIn'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { usePosts } from '@/hooks/usePosts'

const PLACEHOLDER_POSTS = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  slug: `project-${i + 1}`,
  title: `Project ${i + 1}`,
  description: 'A beautifully crafted visual story told through light and composition.',
  coverImage: `https://picsum.photos/seed/posts-grid-${i + 1}/800/600`,
  status: 'published' as const,
}))

export function Posts() {
  const { t } = useTranslation()
  const { posts, loading, error } = usePosts()
  const display = posts.length > 0 ? posts : PLACEHOLDER_POSTS

  return (
    <Layout>
      <Hero
        image="https://picsum.photos/seed/dzejlan-portfolio/1920/600"
        eyebrow={t('portfolio.eyebrow')}
        title={t('portfolio.title')}
        subtitle={t('portfolio.subtitle')}
        fullScreen={false}
        ctaLabel={undefined}
        ctaTo={undefined}
      />

      <section className="py-24 px-6 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto">
          {error && (
            <p className="text-center text-red-500 font-sans text-sm mb-10">{error}</p>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {display.map((post, i) => (
                <FadeIn key={post.id} delay={(i % 3) * 0.1}>
                  <Link to={`/posts/${post.slug}`} className="group block">
                    <div className="img-zoom overflow-hidden aspect-[4/3] rounded-sm mb-4">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] block mb-1">
                      {t('portfolio.category')}
                    </span>
                    <h2 className="font-serif text-lg text-[#111111] group-hover:text-[#C9A96E] transition-colors mb-1">
                      {post.title}
                    </h2>
                    <p className="font-sans text-sm text-[#9C9C9C] line-clamp-2">
                      {post.description}
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

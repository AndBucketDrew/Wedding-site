import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePosts } from '@/hooks/usePosts'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export function FeaturedPosts() {
  const { posts, loading } = usePosts()
  const display = posts.slice(0, 3)

  if (loading) {
    return (
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex justify-center">
          <LoadingSpinner />
        </div>
      </section>
    )
  }

  if (display.length === 0) return null

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionHeading
          eyebrow="Blogovi"
          title="Naša Vjenčanja"
          subtitle="Pogledajte selekciju naših posebnih vjenčanja iz prošle godine."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {display.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.12}>
              <Link to={`/posts/${post.slug}`} className="group block">
                <div className="img-zoom aspect-[4/5] overflow-hidden rounded-sm mb-5">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] block mb-2">
                  Photography
                </span>
                <h3 className="font-serif text-xl text-[#111111] group-hover:text-[#C9A96E] transition-colors">
                  {post.title}
                </h3>
                <p className="font-sans text-sm text-[#9C9C9C] mt-1 line-clamp-2">
                  {post.description}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="flex justify-center">
          <Link
            to="/posts"
            className="font-sans text-xs tracking-[0.25em] uppercase border border-[#2A2A2A] text-[#2A2A2A] px-10 py-4 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
          >
            View All Work
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

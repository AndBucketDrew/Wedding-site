import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePosts } from '@/hooks/usePosts'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

// Placeholder posts shown when no Firebase data exists yet
const PLACEHOLDER_POSTS = [
  {
    id: '1',
    slug: 'editorial-session',
    title: 'Editorial Session',
    description: 'A moody editorial shoot exploring light and shadow in an urban setting.',
    coverImage: 'https://picsum.photos/seed/post-feat-1/800/600',
    status: 'published',
  },
  {
    id: '2',
    slug: 'wedding-in-tuscany',
    title: 'Wedding in Tuscany',
    description: 'A golden-hour ceremony amid rolling hills and ancient olive groves.',
    coverImage: 'https://picsum.photos/seed/post-feat-2/800/600',
    status: 'published',
  },
  {
    id: '3',
    slug: 'portrait-series',
    title: 'Portrait Series',
    description: 'Intimate close-up portraits capturing raw, unscripted emotion.',
    coverImage: 'https://picsum.photos/seed/post-feat-3/800/600',
    status: 'published',
  },
]

export function FeaturedPosts() {
  const { posts, loading } = usePosts()
  const display = posts.length > 0 ? posts.slice(0, 3) : PLACEHOLDER_POSTS

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionHeading
          eyebrow="Selected Work"
          title="Our Latest Projects"
          subtitle="A curated selection of our most recent photographic work."
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
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
        )}

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

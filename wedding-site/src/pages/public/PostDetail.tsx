import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { FadeIn } from '@/components/ui/FadeIn'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getPostBySlug } from '@/services/posts.service'
import type { Post } from '@/types'
import { ArrowLeft } from 'lucide-react'

const PLACEHOLDER: Post = {
  id: 'placeholder',
  slug: 'placeholder',
  title: 'Editorial Session',
  description: 'A moody editorial shoot exploring light and shadow in an urban landscape.',
  content: `This session was born from a vision of contrasts — soft light against hard architecture, vulnerability amid the city's relentless movement.

We spent a morning exploring the industrial edges of the city, letting the available light guide each frame. The goal was never perfection, but presence.

The result is a series that feels alive — each image a quiet moment pulled from an otherwise rushing world.`,
  coverImage: 'https://picsum.photos/seed/post-detail-hero/1920/900',
  status: 'published',
  createdAt: null,
  updatedAt: null,
}

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post,    setPost]    = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getPostBySlug(slug)
      .then(p => setPost(p ?? PLACEHOLDER))
      .catch(() => setPost(PLACEHOLDER))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <Layout>
        <div className="pt-32"><LoadingSpinner /></div>
      </Layout>
    )
  }

  const p = post ?? PLACEHOLDER

  return (
    <Layout>
      {/* Hero image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={p.coverImage || `https://picsum.photos/seed/${slug}/1920/900`}
          alt={p.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 overlay-hero" />
        <div className="absolute bottom-12 left-0 right-0 text-center text-white px-6">
          <FadeIn>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-gold block mb-4">
              Photography
            </span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">{p.title}</h1>
          </FadeIn>
        </div>
      </div>

      {/* Content */}
      <article className="py-20 px-6 max-w-3xl mx-auto">
        <FadeIn>
          <p className="font-sans text-lg text-[#6B6B6B] leading-relaxed mb-10 italic">
            {p.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="font-sans text-ink leading-loose space-y-6 whitespace-pre-line">
            {p.content}
          </div>
        </FadeIn>

        {/* Back link */}
        <FadeIn delay={0.2} className="mt-16 pt-10 border-t border-mist">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:gap-4 transition-all"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </FadeIn>
      </article>

      {/* Related posts placeholder */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl text-charcoal mb-10">More Work</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <Link key={n} to="/posts" className="group block img-zoom overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/related-${n}/800/600`}
                  alt={`Related project ${n}`}
                  className="w-full aspect-4/3 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
